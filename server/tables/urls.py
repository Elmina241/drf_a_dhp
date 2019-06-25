#from django.conf.urls import url
from django.contrib import admin
from django.urls import path

from tables import views

urlpatterns = [
    #url(r'^admin/', admin.site.urls),
    path('materials/', views.material_list),
    path('materials/<int:pk>/', views.material_detail),
]