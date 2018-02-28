# -*- coding: utf-8 -*-
# Generated by Django 1.10 on 2018-02-28 18:59
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('resthampton_app', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='songpart',
            name='partType',
            field=models.CharField(choices=[('Verse', 'Verse'), ('Chorus', 'Chorus'), ('Hook', 'Hook'), ('Bridge', 'Bridge'), ('Intro', 'Intro'), ('Outro', 'Outro'), ('Skit', 'Skit'), ('Pre-Chorus', 'Pre-Chorus'), ('Breakdown', 'Breakdown')], max_length=100),
        ),
    ]
