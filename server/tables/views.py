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