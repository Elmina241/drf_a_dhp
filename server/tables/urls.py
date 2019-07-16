#from django.conf.urls import url
from django.contrib import admin
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

from tables import views

urlpatterns = [
    #url(r'^admin/', admin.site.urls),
    path('materials/', views.MaterialList.as_view()),
    path('groups/', views.MaterialGroupList.as_view()),
    path('prefixes/', views.PrefixList.as_view()),
    path('units/', views.UnitList.as_view()),
    path('materials/<int:pk>/', views.MaterialDetail.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)