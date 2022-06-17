from rest_framework import serializers
from django.contrib.auth import get_user_model
from ..models import Genre, Movie
from. names import *


User = get_user_model()


class GenreSerializer(serializers.ModelSerializer):
    class MovieSerializer(serializers.ModelSerializer):
        class Meta:
            model = Movie
            fields = '__all__'    
    genre_movie = MovieSerializer(many=True, read_only=True)

    class Meta:
        model = Genre
        fields = ('genre_name', 'genre_movie',)