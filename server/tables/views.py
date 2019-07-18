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