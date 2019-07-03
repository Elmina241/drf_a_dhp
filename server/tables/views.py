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