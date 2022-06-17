from rest_framework import serializers
from django.contrib.auth import get_user_model

from ..models import Article
from .comment import CommentSerializer

User = get_user_model()

class ArticleSerializer(serializers.ModelSerializer):
    class UserSerializer(serializers.ModelSerializer):
        class Meta:
            model = User
            fields = ('pk', 'nickname', 'username', 'secretnumber')
    
    user = UserSerializer(read_only=True)
    comments = CommentSerializer(many=True, read_only=True)
    like_users = UserSerializer(many=True, read_only=True)


    class Meta:
        model = Article
        fields = '__all__'
    
class ArticleListSerializer(serializers.ModelSerializer):

    class UserSeiralizer(serializers.ModelSerializer):
        class Meta:
            model = User
            fields = ('pk', 'nickname', 'username', 'secretnumber')
    
    user = UserSeiralizer(read_only=True)

    like_count = serializers.IntegerField(
        source='like_users.count',
        read_only=True
    )
    
    comments_count = serializers.IntegerField(
        source='comments.count',
        read_only=True
    )
    # like_count = serializers.IntegerField()

    class Meta:
        model = Article
        fields = ('pk', 'user', 'title', 'comments_count', 'like_count', )
        # fields = '__all__'