from django.conf import settings
from django.db import models


# Create your models here.
class Genre(models.Model):
    genre_name = models.CharField(max_length=100)
    secret_number = models.IntegerField(default=0)
    
    def __str__(self):
        return self.genre_name

class Director(models.Model):
    director_name = models.CharField(max_length=100)
    director_image_path = models.CharField(max_length=200, null=True)

    def __str__(self):
        return self.director_name

class Actors(models.Model):
    actor_name = models.CharField(max_length=100)
    actor_image_path = models.CharField(max_length=200, null=True)   

    def __str__(self):
        return self.actor_name

class Movie(models.Model):
    title = models.CharField(max_length=100)
    release_date = models.CharField(max_length=200)
    vote_average = models.FloatField()
    popularity = models.IntegerField()
    overview = models.TextField()
    poster_path = models.CharField(max_length=200)
    video_key = models.CharField(max_length=250)
    genres = models.ManyToManyField(Genre, related_name='genre_movie')
    actors = models.ManyToManyField(Actors, related_name='actors_movie')
    director = models.ManyToManyField(Director, related_name='director_movie')
    like_users = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='like_movies')
    user_review = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='movie_review')

    def __str__(self):
        return self.title


class Review(models.Model):
    content = models.CharField(max_length=200)
    user_vote = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='reviews')
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE, related_name='reviews')
    