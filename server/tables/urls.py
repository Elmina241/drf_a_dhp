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
    path('packing/', views.PackingList.as_view()),
    path('packing_groups/', views.PackingGroupList.as_view()),
    path('colors/', views.ColorList.as_view()),
    path('packing_materials/', views.PackingMatList.as_view()),
    path('packing/<int:pk>/', views.PackingDetail.as_view()),
    path('caps/', views.CapList.as_view()),
    path('cap_groups/', views.CapGroupList.as_view()),
    path('caps/<int:pk>/', views.CapDetail.as_view()),
    path('boxing/', views.BoxingList.as_view()),
    path('boxing_groups/', views.BoxingGroupList.as_view()),
    path('boxing_materials/', views.BoxingMatList.as_view()),
    path('boxing/<int:pk>/', views.BoxingDetail.as_view()),
    path('products/', views.ProductList.as_view()),
    path('product_groups/', views.ProductGroupList.as_view()),
    path('uses/', views.ProductUseList.as_view()),
    path('marks/', views.ProductMarkList.as_view()),
    path('product_forms/', views.ProductFormList.as_view()),
    path('products/<int:pk>/', views.ProductDetail.as_view()),
    path('stickers/', views.StickerList.as_view()),
    path('parts/', views.StickerPartList.as_view()),
    path('stickers/<int:pk>/', views.StickerDetail.as_view()),
    path('compositions/', views.CompositionList.as_view()),
    path('composition_groups/', views.CompositionGroupList.as_view()),
    path('compositions/<int:pk>/', views.CompositionDetail.as_view()),
    path('products/production/', views.ProductionList.as_view()),
    path('products/production/<int:pk>/', views.ProductionDetail.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)