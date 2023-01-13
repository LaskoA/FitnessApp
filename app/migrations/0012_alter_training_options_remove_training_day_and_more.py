# Generated by Django 4.1.4 on 2023-01-13 18:29

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("app", "0011_program_exercises"),
    ]

    operations = [
        migrations.AlterModelOptions(
            name="training",
            options={"ordering": ["date"]},
        ),
        migrations.RemoveField(
            model_name="training",
            name="day",
        ),
        migrations.AddField(
            model_name="training",
            name="date",
            field=models.DateField(default=datetime.date.today),
        ),
    ]
