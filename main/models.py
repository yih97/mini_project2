from django.db import models

class Data(models.Model):
    field1 = models.CharField(max_length=255)
    field2 = models.IntegerField()

