from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from .serializers.profile import ProfileSerializer, CustomUserProfileSerializer
from django.contrib.auth import get_user_model

# Create your views here.

User = get_user_model()



@api_view(['GET', 'PUT', 'DELETE'])
def profile(request, username):
    user = get_object_or_404(User, username=username)
    def profile_detail():
        serializer = ProfileSerializer(user)
        return Response(serializer.data)

    def update_profile():
        serializer = ProfileSerializer(instance=user, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)

    def delete_profile():
        if request.user == user:
            user.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)


    if request.method == 'GET':
        return profile_detail()
    elif request.method == 'PUT':
        if request.user == user:
            return update_profile()
    elif request.method == 'DELETE':
        if request.suer == user:
            return delete_profile()

@api_view(['PUT'])
def nickname(request, username):
    user = get_object_or_404(User, username=username)
    if request.user == user:
        serializer = CustomUserProfileSerializer(instance=user, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)