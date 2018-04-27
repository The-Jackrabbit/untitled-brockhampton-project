from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.db import IntegrityError
from .forms import SearchForm
from .models import Person, Album, Song, SongPart, Bar, SongPartToPerson
from .serializers import PersonSerializer, AlbumSerializer, SongSerializer, SongPartSerializer, BarSerializer
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer

from .utility_methods import URL

def get_word_count(request, pk):
	p = Person.objects.filter(pk=pk)[0]
	json = {}
	
	# return JsonResponse({'status': '200 - OK', 'result':json }, status=status.HTTP_200_OK)

def words(request):
	args = {}
	for key in request.GET:
		args[key] = request.GET[key]
	if "pk" in args:
		person = Person.objects.get(pk=args["pk"])
	elif "name" in args:
		person = Person.objects.get(name=args["name"])
	else:
		return JsonResponse({'status': '404 - NOT FOUND'})

	if "n" not in args:
		args["n"] = 10
	if "allowFiller" not in args:
		args["allowFiller"] = False
	if "minLength" not in args:
		args["minLength"] = 1
	words = person.get_top_n_words(
		n=int(args["n"]),
		allowFiller=args["allowFiller"],
		minLength=int(args["minLength"])
	)

	json = {}
	json["args"] = args
	json["words"] = words
	json["albumCategories"] = person.get_album_categories()
	json["wordCount"] = person.get_num_words()
	json["uniqueWordCount"] = person.get_num_unique_words()


	return JsonResponse({'status': '200 - OK', 'result': json }, status=status.HTTP_200_OK)

def memberPage(request):
	args = {}
	for key in request.GET:
		args[key] = request.GET[key]
	if "pk" in args:
		person = Person.objects.get(pk=args["pk"])
	elif "name" in args:
		person = Person.objects.get(name=args["name"])
	else:
		return JsonResponse({'status': '404 - NOT FOUND'})

	partData = person.get_song_parts()

	json = {
		"partData": partData
	}


	return JsonResponse({'status': '200 - OK', 'result': json }, status=status.HTTP_200_OK)

def personPic(request):
	args = {}
	for key in request.GET:
		args[key] = request.GET[key]
	if "pk" in args:
		person = Person.objects.get(pk=args["pk"])
	elif "name" in args:
		person = Person.objects.get(name=args["name"])
	else:
		return JsonResponse({'status': '404 - NOT FOUND'})

	if "size" not in args:
		args["size"] = "sm"
	picUrl = person.get_pic(
		size=args["size"]
	)

	json = {}
	json["args"] = args
	json["picUrl"] = picUrl

	return JsonResponse({'status': '200 - OK', 'result': json }, status=status.HTTP_200_OK)

def parts(request):
	args = {}
	for key in request.GET:
		args[key] = request.GET[key]
	if "pk" in args:
		person = Person.objects.get(pk=args["pk"])
	elif "name" in args:
		person = Person.objects.get(name=args["name"])
	else:
		return JsonResponse({'status': '404 - NOT FOUND'})

	parts = person.get_song_parts()

	json = {}
	json["args"] = args
	json["words"] = parts

	return JsonResponse({'status': '200 - OK', 'result': json }, status=status.HTTP_200_OK)



class ParseSongViewSet(viewsets.ModelViewSet):
	"""
	API endpoint that allows users to be viewed or edited.
	"""
	renderer_classes = (JSONRenderer, )
	
	def delete(self, request, format=None, pk=None):
		pass

	def get(self, request, format=None, pk=None):
		song = Song.objects.filter(pk=pk)[0]
		json = song.get_info()
		return Response({'status': '200 - OK', 'result':json }, status=status.HTTP_200_OK)
	
	def post(self, request, format=None, pk=None):
		json = {}
		body = request.data["body"]
		song_title = request.data["song_title"]
		album_title = request.data["album_title"]
		song_position = request.data["song_position"]
		json['song_title'] = song_title
		json['album_title'] = album_title
		songAlreadyExists = Song.objects.filter(name=song_title)
		if len(songAlreadyExists) == 0:
			persons = {}
			keys = []
			song = Song(
				name=song_title,
				album=Album.objects.get(name=album_title),
				position=song_position
			)
			song.save()
			songPartsAlreadyExist = SongPart.objects.filter(song=songAlreadyExists)
			if len(songPartsAlreadyExist) == 0:
				for key in body:
					songPartInfo = body[key]
					songPart = SongPart(
						partType=songPartInfo.get('partType'),
						song=Song.objects.get(name=song_title), 
						position=songPartInfo.get('position'),
						lyrics=songPartInfo.get('body')
					)
					songPart.save()
					for person in songPartInfo.get('persons'):
						persons[person] = ""
						songPartToPerson = SongPartToPerson(
							relationshipType='Writer',
							person=Person.objects.get(name=person),
							songPart=SongPart.objects.get(pk=songPart.id)
							
						)
						songPartToPerson.save()
					
					json[key] = songPartInfo
				json['persons'] = persons
		return Response({'status': '200 - OK', 'result':json }, status=status.HTTP_200_OK)
	
	def put(self, request, format=None, pk=None):
		pass

class SongDetailViewSet(viewsets.ModelViewSet):
	"""
	API endpoint that allows users to be viewed or edited.
	"""
	renderer_classes = (JSONRenderer, )
	
	def delete(self, request, format=None, pk=None):
		pass

	def get(self, request, format=None, pk=None):
		song = Song.objects.filter(pk=pk)[0]
		json = song.get_info()
		return Response({'status': '200 - OK', 'result':json }, status=status.HTTP_200_OK)
	
	def post(self, request, format=None, pk=None):
		pass
	
	def put(self, request, format=None, pk=None):
		pass

class AlbumDetailViewSet(viewsets.ModelViewSet):
	"""
	API endpoint that allows users to be viewed or edited.
	"""
	renderer_classes = (JSONRenderer, )
	
	def delete(self, request, format=None, pk=None):
		pass

	def get(self, request, format=None, pk=None):
		album = Album.objects.filter(pk=pk)[0]
		json = album.get_info()
		return Response({'status': '200 - OK', 'result':json }, status=status.HTTP_200_OK)
	
	def post(self, request, format=None, pk=None):
		pass
	
	def put(self, request, format=None, pk=None):
		pass
		
class PersonViewSet(viewsets.ModelViewSet):
	renderer_classes = (JSONRenderer, )
	queryset = Person.objects.all()
	serializer_class = PersonSerializer
	model = Person
	
class AlbumViewSet(viewsets.ModelViewSet):
	renderer_classes = (JSONRenderer, )
	queryset = Album.objects.all()
	serializer_class = AlbumSerializer
	model = Album

class SongViewSet(viewsets.ModelViewSet):
	renderer_classes = (JSONRenderer, )
	queryset = Song.objects.all()
	serializer_class = SongSerializer
	model = Song

class SongPartViewSet(viewsets.ModelViewSet):
	renderer_classes = (JSONRenderer, )
	queryset = SongPart.objects.all()
	serializer_class = SongPartSerializer
	model = SongPart

class BarViewSet(viewsets.ModelViewSet):
	renderer_classes = (JSONRenderer, )
	queryset = Bar.objects.all()
	serializer_class = BarSerializer
	model = Bar
	