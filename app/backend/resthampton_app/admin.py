from django.contrib import admin

# Register your models here.
''' 
superuser
username: admin
password: powerrank
'''
from .models import Album, Song, SongPart, Person, SongPartToPerson, SongToPerson, Bar
from django.db import models
from django.db.models import Q
# Create your models here.


# Register your models here.
admin.site.register(Album)
admin.site.register(Song)
admin.site.register(SongPart)
admin.site.register(Person)
admin.site.register(SongPartToPerson)
admin.site.register(SongToPerson)
admin.site.register(Bar)

