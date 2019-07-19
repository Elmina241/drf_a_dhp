from django.contrib import admin

from .models import *

admin.site.register(Material)
admin.site.register(Material_group)
admin.site.register(Prefix)
admin.site.register(Unit)
admin.site.register(Container)
admin.site.register(Container_mat)
admin.site.register(Colour)
admin.site.register(Container_group)
admin.site.register(Cap_group)
admin.site.register(Box_group)
admin.site.register(Boxing_mat)

