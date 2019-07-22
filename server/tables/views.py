# -*- coding: utf-8 -*-
#from django.views.decorators.csrf import csrf_exempt
from rest_framework import generics

from .models import *
from .serializers import *


class MaterialList(generics.ListCreateAPIView):
    queryset = Material.objects.all()
    serializer_class = MaterialSerializer

class MaterialDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Material.objects.all()
    serializer_class = MaterialSerializer

class MaterialGroupList(generics.ListCreateAPIView):
    queryset = Material_group.objects.all()
    serializer_class = MaterialGroupSerializer

class UnitList(generics.ListCreateAPIView):
    queryset = Unit.objects.all()
    serializer_class = UnitSerializer

class PrefixList(generics.ListCreateAPIView):
    queryset = Prefix.objects.all()
    serializer_class = PrefixSerializer


class PackingList(generics.ListCreateAPIView):
    queryset = Container.objects.all()
    serializer_class = ContainerSerializer

class PackingDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Container.objects.all()
    serializer_class = ContainerSerializer

class PackingGroupList(generics.ListCreateAPIView):
    queryset = Container_group.objects.all()
    serializer_class = ContainerGroupSerializer

class ColorList(generics.ListCreateAPIView):
    queryset = Colour.objects.all()
    serializer_class = ColorSerializer

class PackingMatList(generics.ListCreateAPIView):
    queryset = Container_mat.objects.all()
    serializer_class = ContainerMatSerializer

class CapList(generics.ListCreateAPIView):
    queryset = Cap.objects.all()
    serializer_class = CapSerializer

class CapDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Cap.objects.all()
    serializer_class = CapSerializer

class CapGroupList(generics.ListCreateAPIView):
    queryset = Cap_group.objects.all()
    serializer_class = CapGroupSerializer

class BoxingList(generics.ListCreateAPIView):
    queryset = Boxing.objects.all()
    serializer_class = BoxingSerializer

class BoxingDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Boxing.objects.all()
    serializer_class = BoxingSerializer

class BoxingGroupList(generics.ListCreateAPIView):
    queryset = Box_group.objects.all()
    serializer_class = BoxGroupSerializer

class BoxingMatList(generics.ListCreateAPIView):
    queryset = Boxing_mat.objects.all()
    serializer_class = BoxingMatSerializer

class ProductList(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class ProductDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class ProductGroupList(generics.ListCreateAPIView):
    queryset = Product_group.objects.all()
    serializer_class = ProductGroupSerializer

class ProductUseList(generics.ListCreateAPIView):
    queryset = Product_use.objects.all()
    serializer_class = ProductUseSerializer

class ProductMarkList(generics.ListCreateAPIView):
    queryset = Product_mark.objects.all()
    serializer_class = ProductMarkSerializer

class StickerList(generics.ListCreateAPIView):
    queryset = Sticker.objects.all()
    serializer_class = StickerSerializer

class StickerDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Sticker.objects.all()
    serializer_class = StickerSerializer

class StickerPartList(generics.ListCreateAPIView):
    queryset = Sticker_part.objects.all()
    serializer_class = StickerPartSerializer