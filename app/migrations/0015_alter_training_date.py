# Generated by Django 4.1.4 on 2023-01-14 22:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0014_alter_training_program'),
    ]

    operations = [
        migrations.AlterField(
            model_name='training',
            name='date',
            field=models.CharField(max_length=255),
        ),
    ]
