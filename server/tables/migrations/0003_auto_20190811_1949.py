# Generated by Django 2.2.1 on 2019-08-11 09:49

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('tables', '0002_auto_20190710_1224'),
    ]

    operations = [
        migrations.RenameField(
            model_name='composition',
            old_name='package',
            new_name='comp_package',
        ),
    ]
