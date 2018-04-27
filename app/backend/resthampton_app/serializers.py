from .models import Person, Album, Song, SongPart, Bar
from rest_framework import serializers

class PersonSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Person
        fields = ('pk', 'name', 'img_lg', 'img_md', 'img_sm')


class AlbumSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Album
        fields = ('pk', 'name', 'img_lg', 'img_md', 'img_sm', 'year', 'runtime')

class SongSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Song
        fields = ('pk', 'album', 'runtime', 'name', 'position')

class SongPartSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = SongPart
        fields = ('pk', 'partType', 'runtime', 'song', 'position', 'lyrics')

class BarSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Bar
        fields = ('pk', 'songpart', 'notes', 'position', 'lyrics')