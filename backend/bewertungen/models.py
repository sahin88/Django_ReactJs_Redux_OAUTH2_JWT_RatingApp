from django.db import models
from accounts.models import UserAccount



class Ratings(models.Model):
    id = models.AutoField(primary_key=True)
    ratings= models.CharField(max_length=50)
    comments=models.TextField( blank=False)
    date_published=models.DateTimeField(auto_now_add=True, blank=True)
    first_name=models.CharField(max_length=255, blank=False)
    last_name=models.CharField(max_length=255, blank=False)
    author = models.ForeignKey(to=UserAccount, on_delete=models.CASCADE)


