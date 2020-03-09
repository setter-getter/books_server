from django.db import models

# Create your models here.


class Book(models.Model):
    author = models.CharField(max_length=50)
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=1000)
