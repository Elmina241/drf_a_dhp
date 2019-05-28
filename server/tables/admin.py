from django.contrib import admin

from .models import Product, Location, Family, Transaction

admin.site.register(Product)
admin.site.register(Location)
admin.site.register(Family)
admin.site.register(Transaction)

