from django.urls import path
from . import views

urlpatterns = [
    path('profile/<username>/', views.profile),
    path('profile/<username>/nickname/', views.nickname),
    
]