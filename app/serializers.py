from rest_framework import serializers

from app.models import Shape, Day, Exercise, Muscle, Training


class ShapeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shape
        fields = ("id", "height", "weight", "waist", "glutes", "biceps",
                  "thighs", "calf", "neck", "shoulders", "chest", "forearm", "user")


class DaySerializer(serializers.ModelSerializer):
    class Meta:
        model = Day
        fields = ("id", "day", "water")


class DayTrainingSerializer(serializers.ModelSerializer):

    class Meta:
        model = Day
        fields = ("id", "day")


class ExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exercise
        fields = ("id", "type", "info", "description", "video", "sets", "reps", "time_per_rep")


class MuscleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Muscle
        fields = ("id", "title", "exercises")


class MuscleListSerializer(MuscleSerializer):
    exercises = ExerciseSerializer()

    class Meta:
        model = Muscle
        fields = ("id", "title", "exercises")


class MuscleTrainingSerializer(serializers.ModelSerializer):

    class Meta:
        model = Muscle
        fields = ("id", "title")


class TrainingSerializer(serializers.ModelSerializer):
    muscles = MuscleTrainingSerializer(many=True, read_only=True)
    day = DayTrainingSerializer(many=False, read_only=True)

    class Meta:
        model = Training

        fields = ("id", "name", "comment", "day", "muscles", "user")
