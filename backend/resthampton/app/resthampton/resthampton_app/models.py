from django.db import models
from django.db.models import Q
import re
# Create your models here.

def convert_to_percent(numerator, denominator):
	if denominator <= 0:
		return 0
	return float(numerator/denominator)*100

def is_filler_word(word):
	filler_words = {
		"i": "",
		"me": "",
		"you": "",
		"what": "",
		"that": "",
		"the": "",
		"a": "",
		"to": "",
		"it": "",
		"on": "",
		"is": "",
		"and": ""
	}
	return word in filler_words

class Album(models.Model):
	name = models.CharField(max_length=250)
	img_lg = models.ImageField(upload_to='media/albums/large', blank=True, null=True)
	img_md = models.ImageField(upload_to='media/albums/medium', blank=True, null=True)
	img_sm = models.ImageField(upload_to='media/albums/small', blank=True, null=True)
	year = models.DateTimeField()
	runtime = models.DecimalField(max_digits=13, decimal_places=10, blank=True, null=True)

	def __str__(self):
		return self.name

	def get_info(self):
		json = {}
		json['name'] = self.name
		json['img_lg'] = self.img_lg.url
		json['year'] = self.year
		json['runtime'] = self.runtime
		songs = Song.objects.filter(album=self).order_by("position")
		tracklist = []
		for song in songs:
			tracklist.append(song.get_info()) 


		json['tracklist'] = tracklist
		return json

class Song(models.Model):
	name = models.CharField(max_length=250)
	album = models.ForeignKey(Album)
	runtime = models.DecimalField(max_digits=13, decimal_places=10, blank=True, null=True)
	position = models.IntegerField(default=-1)

	def __str__(self):
		return self.name

	def get_credits(self):

		json = {}
		writers = {}
		producers = {}
		
		song_parts = SongPart.objects.filter(song=self)
		song_credits = SongToPerson.objects.filter(song=self)

		for song_part in song_parts:
			personPartLinks = SongPartToPerson.objects.filter(songPart=song_part)
			for personPartLink in personPartLinks:
				if personPartLink.person.pk not in writers:
					try:
						writers[personPartLink.person.pk] = {
							'name': personPartLink.person.__str__(),
							'img': personPartLink.person.img_sm.url,
							'parts': {personPartLink.songPart.partType},
							'pk' : personPartLink.person.pk
						}
					except ValueError:
						return {
							"person": personPartLink.person.__str__()
						}
				else: {
					writers[personPartLink.person.pk]['parts'].add(personPartLink.songPart.partType)
				}
		
		for credit in song_credits:
			producers[credit.person.pk] = {
				'img': credit.person.img_sm.url,
				'name': credit.person.__str__(),
				'pk' : credit.person.pk
			}

		json['writers'] = writers
		json['producers'] = producers

		return json

	def get_song_parts(self):
		json = {}
		songParts = SongPart.objects.filter(song=self).order_by('-position')
		for songPart in songParts:
			part = {
				'pk': songPart.pk,
				'partType': songPart.partType,
				'runtime': songPart.runtime,
				'position': songPart.position,
				'lyrics': songPart.lyrics
			}
			personPartLinks = SongPartToPerson.objects.filter(songPart=songPart)
			persons = {}
			for personPartLink in personPartLinks:
				persons[personPartLink.person.pk] = {
					"name": personPartLink.person.__str__(),
					"pk": personPartLink.person.pk,
					"img": personPartLink.person.img_sm.url
				}
			part['persons'] = persons
			json[songPart.position] = part

		return json

	def get_info(self):
		json = {}
		credits = self.get_credits()
		json['credits'] = credits
		json['name'] = self.name
		json['album'] = {
			'pk': self.album.pk,
			'name': self.album.name
		}
		json['runtime'] = self.runtime
		body = self.get_song_parts()
		json['body'] = body
		return json

class SongPart(models.Model):
	part_choices = (
		('Verse', 'Verse'),
		('Chorus', 'Chorus'),
		('Hook', 'Hook'),
		('Bridge', 'Bridge'),
		('Intro', 'Intro'),
		('Outro', 'Outro'),
		('Skit', 'Skit'),
		('Pre-Chorus', 'Pre-Chorus'),
		('Breakdown', 'Breakdown')
	)
	partType = models.CharField(choices=part_choices, max_length=100)
	runtime = models.DecimalField(max_digits=13, decimal_places=10, blank=True, null=True)
	song = models.ForeignKey(Song)
	position = models.IntegerField(default=-1)
	lyrics = models.TextField()

	def __str__(self):
		return self.song.name + " " + self.partType + " " + str(self.position)

	def get_count_of_types(self, partType):
		songPartsOfType = SongPart.objects.filter(partType=partType)
		return len(songPartsOfType)

class Bar(models.Model):
	lyrics = models.TextField()
	notes = models.TextField()
	songpart = models.ForeignKey(SongPart)
	position = models.IntegerField(default=-1)
	
class Person(models.Model):
	name = models.CharField(max_length=250)
	img_lg = models.ImageField(upload_to='media/albums/large', blank=True, null=True)
	img_md = models.ImageField(upload_to='media/albums/medium', blank=True, null=True)
	img_sm = models.ImageField(upload_to='media/albums/small', blank=True, null=True)

	def __str__(self):
		return self.name

	def format_word(self, word):
		symbols_to_delimit_on = ["\n"]
		for sym in symbols_to_delimit_on:
			word = word.replace(sym, " ")
		symbols_to_remove = [",", "\r", ")", "(", "\"", "?"]
		for sym in symbols_to_remove:
			word = word.replace(sym, "")

		word = word.lower()

		return word

	def get_pic(self, size=None):
		if size == "lg":
			return self.img_lg.url
		elif size == "md":
			return self.img_md.url
		else:
			return self.img_sm.url

	def get_words(self):
		wordMap = {}
		songParts = SongPartToPerson.objects.filter(person=self)
		for songPart in songParts:
			text = songPart.songPart.lyrics
			album = songPart.songPart.song.album.name
			words = self.format_word(text).split(" ")
			for word in words:
				if word not in wordMap:
					wordEntry = {"overall": 1}
					wordEntry[album] = 1
					wordMap[word] = wordEntry
				else:
					wordMap[word]["overall"] += 1
					if album in wordMap[word]:
						wordMap[word][album] += 1
					else:
						wordMap[word][album] = 1
		
		return wordMap

	def get_num_unique_words(self):
		words = self.get_words()
		return len(words.keys())

	def get_num_words(self):
		words = self.get_words()
		count = 0 
		for word in words:
			count += words[word]["overall"]
		
		return count

	def get_top_n_words(self, n=10, allowFiller=False, minLength=1):
		words = self.get_words().keys()
		vals = self.get_words()
		w = []
		for word in words:
			if allowFiller and len(word) > minLength:
				wordData = {}
				for category in vals[word]:
					wordData[category] = vals[word][category]
				w.append(wordData)
			else:
				if not is_filler_word(word) and len(word) > minLength:
					wordData = {}
					for category in vals[word]:
						wordData[category] = vals[word][category]
					w.append(wordData)
		w.sort(key=lambda x: x["overall"], reverse=True)
		return w[0:n]
	
	def get_song_parts(self):
		songPartsToPerson = SongPartToPerson.objects.filter(person=self)
		data = {
			"barCategories":["Saturation II","Saturation I","Saturation III","overall"],
			"pieAlbumData":[
				{"name":"Saturation II","value":0},
				{"name":"Saturation I","value":0},
				{"name":"Saturation III","value":0}
			],
			"data":[
				{"name":"Bridge","Saturation II":0,"Saturation I":0,"Saturation III":0,"overall":0},
				{"name":"Breakdown","Saturation II":0,"Saturation I":0,"Saturation III":0,"overall":0},
				{"name":"Chorus","Saturation II":0,"Saturation I":0,"Saturation III":0,"overall":0},
				{"name":"Intro","Saturation II":0,"Saturation I":0,"Saturation III":0,"overall":0},
				{"name":"Outro","Saturation II":0,"Saturation I":0,"Saturation III":0,"overall":0},
				{"name":"Verse","Saturation II":0,"Saturation I":0,"Saturation III":0,"overall":0},
				{"name":"Pre-Chorus","Saturation II":0,"Saturation I":0,"Saturation III":0,"overall":0},
				{"name":"Breakdown","Saturation II":0,"Saturation I":0,"Saturation III":0,"overall":0},
				{"name":"Skit","Saturation II":0,"Saturation I":0,"Saturation III":0,"overall":0}
			],
			"piePartData":[
				{"name":"Bridge", "value": 0},
				{"name":"Breakdown","value":0},
				{"name":"Chorus","value":0},
				{"name":"Intro","value":0},
				{"name":"Outro","value":0},
				{"name":"Verse","value":0},
				{"name":"Pre-Chorus", "value":0},
				{"name":"Breakdown", "value":0},
				{"name":"Skit", "value":0}
			]
		}
		# get counts of songParts
		for songPartLink in songPartsToPerson:
			songPart = songPartLink.songPart
			song = songPart.song
			album = song.album
			for pieAlbum in data["pieAlbumData"]:
				if pieAlbum["name"] == album.name:
					pieAlbum["value"] += 1
			
			for piePart in data["piePartData"]:
				if piePart["name"] == songPart.partType:
					piePart["value"] += 1
			
			for dataPoint in data["data"]:
				if dataPoint["name"] == songPart.partType:
					dataPoint[album.name] += 1
					dataPoint["overall"] += 1
			
	
		return data
	

class SongPartToPerson(models.Model):
	relationship_choices = (
		('Writer', 'Writer'),
		('Producer', 'Producer')
	)
	relationshipType = models.CharField(choices=relationship_choices, max_length=100)
	person = models.ForeignKey(Person)
	songPart = models.ForeignKey(SongPart)

	def __str__(self):
		if self.relationshipType == "Producer":
			verb = "produced"
		elif self.relationshipType == "Writer":
			verb = "wrote"
		return self.person.name + " " + verb + " a " + self.songPart.partType + " on " + self.songPart.song.name

class SongToPerson(models.Model):
	relationship_choices = (
		('Writer', 'Writer'),
		('Producer', 'Producer')
	)
	relationshipType = models.CharField(choices=relationship_choices, max_length=100)
	person = models.ForeignKey(Person)
	song = models.ForeignKey(Song)

	def __str__(self):
		if self.relationshipType == "Producer":
			verb = "produced"
		elif self.relationshipType == "Writer":
			verb = "wrote"
		return self.person.name + " " + verb + " " + self.song.name


