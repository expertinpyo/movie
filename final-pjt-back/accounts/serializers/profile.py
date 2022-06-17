from rest_framework import serializers
from django.contrib.auth import get_user_model

from movies.models import Movie, Review
from articles.models import Article, Comment

User = get_user_model()

class CustomUserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('pk', 'username', 'nickname', 'description', 'secretnumber', 'is_superuser', 'get_nickname')

class ProfileSerializer(serializers.ModelSerializer):
    
    class MovieNameListSerializer(serializers.ModelSerializer):
        class Meta:
            model = Movie
            fields = ('pk','title','poster_path',)

    class ArticleNameListSerializer(serializers.ModelSerializer):
        class Meta:
            model = Article
            fields = ('pk', 'title')

    class ReviewSerializer(serializers.ModelSerializer):
        class Meta:
            model = Review
            fields = '__all__'
    class CommentSerializer(serializers.ModelSerializer):
        class Meta:
            model = Comment
            fields = '__all__'

    like_articles = ArticleNameListSerializer(many=True, read_only=True)
    like_movies = MovieNameListSerializer(many=True, read_only=True)
    articles = ArticleNameListSerializer(many=True, read_only=True)
    reviews = ReviewSerializer(many=True, read_only=True)
    comments = CommentSerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = ('pk', 'username', 'nickname', 'articles' , 'like_articles', 'like_movies', 'reviews', 'comments')