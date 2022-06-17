from django.db.models import Avg
from django.db.models.functions import Round
from rest_framework import serializers
from django.contrib.auth import get_user_model
from ..models import Movie, Review, Actors
from .names import *
from .actor import *
from .director import *

# from .review import ReviewSerializer

User = get_user_model()

class MovieListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = '__all__'

class MovieSerializer(serializers.ModelSerializer):
    
    class ReviewSerializer(serializers.ModelSerializer):
        class UserSeiralizer(serializers.ModelSerializer):
            class Meta:
                model = User
                fields = ('pk', 'nickname', 'username')
        user = UserSeiralizer(read_only=True)
        class Meta:
            model = Review
            fields = '__all__'
    
    class ActorMovieSerializer(serializers.ModelSerializer):
        class Meta:
            model = Actors
            fields = ('pk', 'actor_name', 'actor_image_path')
    
    class DirectorMovieSerializer(serializers.ModelSerializer):
        class Meta:
            model = Director
            fields = ('pk', 'director_name', 'director_image_path')


    reviews = ReviewSerializer(many=True, read_only=True)
    actors = ActorMovieSerializer(many=True, read_only=True)
    director = DirectorMovieSerializer(many=True, read_only=True)
    genres = GenreNameSerializer(many=True, read_only=True)

    
    
    like_count = serializers.IntegerField(
        source='like_users.count',
        read_only=True
    )

    user_vote_average = serializers.SerializerMethodField()
    def get_user_vote_average(self, obj):
        average = obj.reviews.all().aggregate((Avg('user_vote'))).get('user_vote__avg')
        if not average:
            return 0
        else:
            return round(average, 1)

    class Meta:
        model = Movie
        fields = "__all__"

