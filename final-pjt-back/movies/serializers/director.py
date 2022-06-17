from rest_framework import serializers
from django.contrib.auth import get_user_model
from ..models import Director
from. names import *


User = get_user_model()


class DirectorSerializer(serializers.ModelSerializer):
    director_movie = MovieNameSerializer(many=True, read_only=True)
    
    class Meta:
        model = Director
        fields = '__all__'