from django.db import models
from django.db.models import Q
# Create your models here.

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


