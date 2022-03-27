from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.
class User(AbstractUser):
    pass

class Watchlist(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="watchlist")
    item = models.CharField(max_length=8, blank=False, null=False)

class currencyPreferences(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="prefcurrency")
    currency = models.CharField(max_length=8, blank=False, null=False)