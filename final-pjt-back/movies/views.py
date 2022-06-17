from django.shortcuts import get_list_or_404, get_object_or_404, render

from movies.serializers.review import ReviewSerializer
from .models import Movie, Actors, Genre, Director, Review

from .serializers.movie import MovieSerializer, MovieListSerializer
from .serializers.actor import ActorsSerializer
from .serializers.genre import GenreSerializer
from .serializers.director import DirectorSerializer

from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view


# Create your views here.
# 감독 찾을 때 : "job" : "Director"인 사람 찾기

# 전체 영화 조회 view, 순서는 pk 순으로 정렬
@api_view(['GET',])
def total_movies(request):
    movies = Movie.objects.order_by('-popularity')
    serializer = MovieListSerializer(movies, many=True)
    return Response(serializer.data)

# 영화 타이틀 기준으로 데이터 정렬, title name에 속해있는 모든 영화 조회 가능, ex) 아이언 => 아이언맨1, 아이언맨2, 아이언맨3
@api_view(['GET',])
def total_title(request):
    movies = Movie.objects.order_by('title')
    serializer = MovieListSerializer(movies, many=True)
    return Response(serializer.data)

@api_view(['GET',])
def title(request, title_name):
    movies = Movie.objects.filter(title__icontains=title_name).order_by('title')
    serializer = MovieListSerializer(movies, many=True)
    return Response(serializer.data)


# 영화 배우 기준으로 데이터 정렬, actor name에 속해있는 모든 영화 조회 가능, 배우 이름, 영화 목록 이런 식으로 출력
@api_view(['GET',])
def total_actors(request):
    actorss = Actors.objects.order_by('actor_name')
    serializer = ActorsSerializer(actorss, many=True)
    return Response(serializer.data)

@api_view(['GET',])
def actors(request, actor_name):
    actorss = Actors.objects.filter(actor_name__icontains=actor_name).order_by('actor_name')
    serializer = ActorsSerializer(actorss, many=True)
    return Response(serializer.data)

# 위와 동일, 배우 => 감독
@api_view(['GET',])
def total_director(request):
    director = Director.objects.order_by('director_name')
    serializer = DirectorSerializer(director, many=True)
    return Response(serializer.data)

@api_view(['GET',])
def director(request, director_name):
    director = Director.objects.filter(director_name__icontains=director_name).order_by('director_name')
    serializer = DirectorSerializer(director, many=True)
    return Response(serializer.data)

# 위와 동일, 배우 => 장르, vue에 표현할 때 19개 장르를 버튼 식으로 만들고 포함되는 경우를 넣고 싶음
@api_view(['GET',])
def total_genre(request):
    genre = Genre.objects.order_by('genre_name')
    serializer = GenreSerializer(genre, many=True)
    return Response(serializer.data)


@api_view(['GET',])
def genre(request, genre_name):
    genre = Genre.objects.filter(genre_name__icontains=genre_name)
    serializer = GenreSerializer(genre, many=True)
    return Response(serializer.data)

@api_view(['GET',])
def recommend(request, number):
    genre = Genre.objects.filter(secret_number=number)
    serializer = GenreSerializer(genre, many=True)
    return Response(serializer.data)

# 영화 디테일
@api_view(['GET',])
def movie_detail(request, movie_pk):
    movie = get_object_or_404(Movie, pk=movie_pk)
    print(movie.user_review)
    print(request.user)
    serializer = MovieSerializer(movie)
    return Response(serializer.data)
    

# 영화 좋아요
@api_view(['POST',])
def movie_like(request, movie_pk):
    movie = get_object_or_404(Movie, pk=movie_pk)
    user = request.user

    if movie.like_users.filter(pk=user.pk).exists():
        movie.like_users.remove(user)
    else:
        movie.like_users.add(user)
    serializer = MovieSerializer(movie)
    return Response(serializer.data)

# 리뷰 생성
@api_view(['POST'])
def review_create(request, movie_pk):
    user = request.user
    movie = get_object_or_404(Movie, pk=movie_pk)
    serializer = ReviewSerializer(data=request.data)
    
    if not movie.user_review.filter(pk=user.pk).exists():
        if serializer.is_valid(raise_exception=True):
            serializer.save(movie=movie, user=user)
            reviews = movie.reviews.all()
            serializer = ReviewSerializer(reviews, many=True)
            movie.user_review.add(user)
            print(user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

# 리뷰 삭제, 수정
@api_view(['PUT', 'DELETE'])
def review_update_or_delete(request, movie_pk, review_pk):
    movie = get_object_or_404(Movie, pk=movie_pk)
    review = get_object_or_404(Review, pk=review_pk)
    user = request.user 
    def update_review():
        if request.user == review.user:
            serializer = ReviewSerializer(instance=review, data=request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                reviews = movie.reviews.all()
                serializer = ReviewSerializer(reviews, many=True)
                return Response(serializer.data)
    
    def delete_review():
        if request.user == review.user:
            review.delete()
            movie.user_review.remove(user)
            reviews = movie.reviews.all()
            serializer = ReviewSerializer(reviews, many=True)
            return Response(serializer.data)
    
    if request.user == review.user:
        if request.method == 'PUT':
            return update_review()
        elif request.method == 'DELETE':
            return delete_review()