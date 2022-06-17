from . import views
from django.urls import path

urlpatterns = [
    path('', views.total_movies),
    path('title/', views.total_title),
    path('title/<title_name>/', views.title),
    path('actors/', views.total_actors),
    path('actors/<actor_name>/', views.actors),
    path('director/', views.total_director),
    path('director/<director_name>/', views.director),
    path('genre/', views.total_genre),
    path('genre/<genre_name>/', views.genre),
    path('<int:movie_pk>/', views.movie_detail),
    path('<int:movie_pk>/like/', views.movie_like),

    path('recommend/<int:number>/', views.recommend),

    path('<int:movie_pk>/review/', views.review_create),
    path('<int:movie_pk>/review/<int:review_pk>/', views.review_update_or_delete),
]
