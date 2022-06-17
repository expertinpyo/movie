from rest_framework import serializers
from ..models import Movie, Actors, Genre, Director


class ActorNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Actors
        fields = '__all__'

class DirectorNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Director
        fields = '__all__'

class GenreNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = '__all__'

class MovieNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = '__all__'