from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.
class User(AbstractUser):
    nickname = models.CharField(max_length=50)
    description = models.CharField(max_length=250)
    secretnumber = models.IntegerField(default=0)
    get_nickname = models.BooleanField(default=False)
    # profile_image = models.CharField(max_length=250, null=True)
    
    def __str__(self):
        return self.username
