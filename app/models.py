from django.db import models
from django.conf import settings
from datetime import date


class Shape(models.Model):
    height = models.IntegerField(blank=True, null=True)  # зріст
    weight = models.IntegerField(blank=True, null=True)  # вага
    waist = models.IntegerField(blank=True, null=True)  # талія
    glutes = models.IntegerField(blank=True, null=True)  # сідниці
    biceps = models.IntegerField(blank=True, null=True)  # біцепси
    thighs = models.IntegerField(blank=True, null=True)  # бедра
    calf = models.IntegerField(blank=True, null=True)  # ікри
    neck = models.IntegerField(blank=True, null=True)  # шия
    shoulders = models.IntegerField(blank=True, null=True)  # плечі
    chest = models.IntegerField(blank=True, null=True)  # груди
    forearm = models.IntegerField(blank=True, null=True)  # передпліччя
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    class Meta:
        ordering = ["id"]

    def __str__(self):
        return f"Height:{self.height}, Weight:{self.weight}, Waist:{self.waist}"


class Water(models.Model):
    date = models.DateField(default=date.today)
    water = models.IntegerField(default=0)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    class Meta:
        ordering = ["date"]

    def __str__(self):
        return str(self.date)


class Exercise(models.Model):
    class TypeChoices(models.TextChoices):
        WORKOUT = "Workout"
        STRETCHING = "Stretching"

    type = models.CharField(max_length=20, choices=TypeChoices.choices)
    info = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    muscle = models.CharField(max_length=20, default="muscle")
    video = models.URLField()
    sets = models.IntegerField()
    reps = models.IntegerField()
    rest = models.IntegerField(default=30)
    time_per_rep = models.IntegerField()

    class Meta:
        ordering = ["info"]

    def __str__(self):
        return self.info


class Program(models.Model):
    class DifficultyChoices(models.TextChoices):
        EASY = "Easy"
        MEDIUM = "Medium"
        HARD = "Hard"

    name = models.CharField(max_length=63)
    exercises = models.ManyToManyField(Exercise)
    difficulty = models.CharField(max_length=20, choices=DifficultyChoices.choices, default="Easy")

    class Meta:
        ordering = ["name"]

    def __str__(self):
        return self.name


class Training(models.Model):
    name = models.CharField(max_length=63)
    comment = models.CharField(max_length=255, blank=True, null=True)
    date = models.DateField(default=date.today)
    program = models.ForeignKey(Program, on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    class Meta:
        ordering = ["date"]

    def __str__(self):
        return self.name
