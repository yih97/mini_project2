from django.db import models
import closed_school.settings


class ClosedSchoolBoxh(models.Model):
    closed_school_year = models.IntegerField(db_column='Closed_school_year', blank=True, null=True)  # Field name made lowercase.
    closed_school_number = models.IntegerField(db_column='Closed_school_number', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'closed_school_boxh'

class ClosedSchoolMap(models.Model):
    school_name = models.CharField(db_column='School_name', max_length=50, blank=True, null=True)  # Field name made lowercase.
    closed_school_year = models.IntegerField(db_column='Closed_school_year', blank=True, null=True)  # Field name made lowercase.
    address = models.CharField(db_column='Address', max_length=50, blank=True, null=True)  # Field name made lowercase.
    latitude = models.FloatField(db_column='Latitude', blank=True, null=True)  # Field name made lowercase.
    longitude = models.FloatField(db_column='Longitude', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'closed_school_map'





class FertilityRateStudents(models.Model):
    elementary_school_number_of_students = models.IntegerField(db_column='Elementary_school_number_of_students', blank=True, null=True)  # Field name made lowercase.
    seoul = models.IntegerField(db_column='Seoul', blank=True, null=True)  # Field name made lowercase.
    busan = models.IntegerField(db_column='Busan', blank=True, null=True)  # Field name made lowercase.
    daegu = models.IntegerField(db_column='Daegu', blank=True, null=True)  # Field name made lowercase.
    incheon = models.IntegerField(db_column='Incheon', blank=True, null=True)  # Field name made lowercase.
    gwangju = models.IntegerField(db_column='Gwangju', blank=True, null=True)  # Field name made lowercase.
    daejeon = models.IntegerField(db_column='Daejeon', blank=True, null=True)  # Field name made lowercase.
    ulsan = models.IntegerField(db_column='Ulsan', blank=True, null=True)  # Field name made lowercase.
    sejong = models.IntegerField(db_column='Sejong', blank=True, null=True)  # Field name made lowercase.
    gyeonggi = models.IntegerField(db_column='Gyeonggi', blank=True, null=True)  # Field name made lowercase.
    gangwon = models.IntegerField(db_column='Gangwon', blank=True, null=True)  # Field name made lowercase.
    chungbuk = models.IntegerField(db_column='Chungbuk', blank=True, null=True)  # Field name made lowercase.
    chungnam = models.IntegerField(db_column='Chungnam', blank=True, null=True)  # Field name made lowercase.
    jeonbuk = models.IntegerField(db_column='Jeonbuk', blank=True, null=True)  # Field name made lowercase.
    jeonnam = models.IntegerField(db_column='Jeonnam', blank=True, null=True)  # Field name made lowercase.
    gyeongbuk = models.IntegerField(db_column='Gyeongbuk', blank=True, null=True)  # Field name made lowercase.
    gyeongnam = models.IntegerField(db_column='Gyeongnam', blank=True, null=True)  # Field name made lowercase.
    jeju = models.IntegerField(db_column='Jeju', blank=True, null=True)  # Field name made lowercase.
    sigungu = models.CharField(db_column='Sigungu', max_length=50, blank=True, null=True)  # Field name made lowercase.
    total_babies_born = models.CharField(db_column='Total_babies_born', max_length=50, blank=True, null=True)  # Field name made lowercase.
    total_fertility_rate = models.CharField(db_column='Total_fertility_rate', max_length=50, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'fertility_rate_students'


# 9월25일 오전11시09번 가설1-2데이터 장고 연동
class TheNumberOfStudentsPerTeacher(models.Model):
    separate = models.CharField(max_length=50, blank=True, null=True)
    number_2000 = models.FloatField(db_column='2000', blank=True, null=True)  # Field renamed because it wasn't a valid Python identifier.
    number_2001 = models.FloatField(db_column='2001', blank=True, null=True)  # Field renamed because it wasn't a valid Python identifier.
    number_2002 = models.FloatField(db_column='2002', blank=True, null=True)  # Field renamed because it wasn't a valid Python identifier.
    number_2003 = models.FloatField(db_column='2003', blank=True, null=True)  # Field renamed because it wasn't a valid Python identifier.
    number_2004 = models.FloatField(db_column='2004', blank=True, null=True)  # Field renamed because it wasn't a valid Python identifier.
    number_2005 = models.FloatField(db_column='2005', blank=True, null=True)  # Field renamed because it wasn't a valid Python identifier.
    number_2006 = models.FloatField(db_column='2006', blank=True, null=True)  # Field renamed because it wasn't a valid Python identifier.
    number_2007 = models.FloatField(db_column='2007', blank=True, null=True)  # Field renamed because it wasn't a valid Python identifier.
    number_2008 = models.FloatField(db_column='2008', blank=True, null=True)  # Field renamed because it wasn't a valid Python identifier.
    number_2009 = models.FloatField(db_column='2009', blank=True, null=True)  # Field renamed because it wasn't a valid Python identifier.
    number_2010 = models.FloatField(db_column='2010', blank=True, null=True)  # Field renamed because it wasn't a valid Python identifier.
    number_2011 = models.FloatField(db_column='2011', blank=True, null=True)  # Field renamed because it wasn't a valid Python identifier.
    number_2012 = models.FloatField(db_column='2012', blank=True, null=True)  # Field renamed because it wasn't a valid Python identifier.
    number_2013 = models.FloatField(db_column='2013', blank=True, null=True)  # Field renamed because it wasn't a valid Python identifier.
    number_2014 = models.FloatField(db_column='2014', blank=True, null=True)  # Field renamed because it wasn't a valid Python identifier.
    number_2015 = models.FloatField(db_column='2015', blank=True, null=True)  # Field renamed because it wasn't a valid Python identifier.
    number_2016 = models.FloatField(db_column='2016', blank=True, null=True)  # Field renamed because it wasn't a valid Python identifier.
    number_2017 = models.FloatField(db_column='2017', blank=True, null=True)  # Field renamed because it wasn't a valid Python identifier.
    number_2018 = models.FloatField(db_column='2018', blank=True, null=True)  # Field renamed because it wasn't a valid Python identifier.
    number_2019 = models.FloatField(db_column='2019', blank=True, null=True)  # Field renamed because it wasn't a valid Python identifier.
    number_2020 = models.FloatField(db_column='2020', blank=True, null=True)  # Field renamed because it wasn't a valid Python identifier.
    number_2021 = models.FloatField(db_column='2021', blank=True, null=True)  # Field renamed because it wasn't a valid Python identifier.
    number_2022 = models.FloatField(db_column='2022', blank=True, null=True)  # Field renamed because it wasn't a valid Python identifier.

    class Meta:
        managed = False
        db_table = 'the_number_of_students_per_teacher'



