from django.db import models
from django.conf import settings


class Shape(models.Model):
    height = models.IntegerField(blank=True, null=True)
    weight = models.IntegerField(blank=True, null=True)
    waist = models.IntegerField(blank=True, null=True)
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    class Meta:
        ordering = ["id"]

    def __str__(self):
        return f"Height:{self.height}, Weight:{self.weight}, Waist:{self.waist}"


class Day(models.Model):
    day = models.DateField()
    water = models.IntegerField(default=0)

    class Meta:
        ordering = ["day"]

    def __str__(self):
        return str(self.day)


class Exercise(models.Model):
    class TypeChoices(models.TextChoices):
        WORKOUT = "Workout"
        STRETCHING = "Stretching"

    type = models.CharField(max_length=20, choices=TypeChoices.choices)
    info = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    video = models.URLField()
    sets = models.IntegerField()
    reps = models.IntegerField()
    time_per_rep = models.IntegerField()

    class Meta:
        ordering = ["info"]

    def __str__(self):
        return self.info


class Muscle(models.Model):
    title = models.CharField(max_length=63)
    exercises = models.ForeignKey(Exercise, on_delete=models.CASCADE)

    class Meta:
        ordering = ["title"]

    def __str__(self):
        return self.title


class Training(models.Model):
    name = models.CharField(max_length=63)
    comment = models.CharField(max_length=255, blank=True, null=True)
    day = models.OneToOneField(Day, on_delete=models.CASCADE)
    muscles = models.ManyToManyField(Muscle)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    class Meta:
        ordering = ["day"]

    def __str__(self):
        return self.name
