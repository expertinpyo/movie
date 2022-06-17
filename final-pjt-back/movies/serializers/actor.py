from rest_framework import serializers
from django.contrib.auth import get_user_model
from ..models import Actors
from. names import *


User = get_user_model()


class ActorsSerializer(serializers.ModelSerializer):
    actors_movie = MovieNameSerializer(many=True, read_only=True)
    
    class Meta:
        model = Actors
        fields = ('pk', 'actor_name', 'actor_image_path', 'actors_movie',)
        # fields = '__all__'
