from django.db import models
import closed_school.settings


class Data(models.Model):
    field1 = models.CharField(max_length=255)
    field2 = models.IntegerField()


# Create your models here.
class ClosedSchool(models.Model):
    폐교연도 = models.IntegerField(blank=True, null=True)
    폐교수 = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'closed_school'

