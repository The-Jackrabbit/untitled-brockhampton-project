"""resthampton URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.10/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.contrib import admin
from django.conf.urls.static import static
from django.conf import settings
from resthampton_app import views
from rest_framework import routers
from rest_framework.routers import DefaultRouter

# View sets have default methods for handling GET/POST/etc, so this is explicitly overriding that

router = DefaultRouter()
router.register(r'persons', views.PersonViewSet, base_name='person')
router.register(r'albums', views.AlbumViewSet, base_name='album')
router.register(r'songs', views.SongViewSet, base_name='song')
router.register(r'songparts', views.SongPartViewSet, base_name='songpart')
router.register(r'bar', views.BarViewSet, base_name='bar')

request_override_map = {
   'get': 'get',
	'post': 'post',
	'put': 'put',
	'delete': 'delete'
}

song_detail = views.SongDetailViewSet.as_view(request_override_map)
album_detail = views.AlbumDetailViewSet.as_view(request_override_map)
parse_song = views.ParseSongViewSet.as_view(request_override_map)
urlpatterns = [
	# API
	url(r'^api/', include(router.urls)),
	url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
	url(r'^api/songs/(?P<pk>[0-9]+)/detail', song_detail, name='song-detail'),
	url(r'^api/parse_song/', parse_song, name='parse-song'),
	url(r'^api/albums/(?P<pk>[0-9]+)/detail', album_detail, name='album-detail'),

   url(r'^admin/', admin.site.urls),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT) +  static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) # Needed to route static files
