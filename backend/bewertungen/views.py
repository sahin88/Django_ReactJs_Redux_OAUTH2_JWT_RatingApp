from django.shortcuts import render
from .models import Ratings
from rest_framework import mixins
from rest_framework import permissions
from .serializers import RatingsSerializer
from rest_framework.generics import ListAPIView, RetrieveAPIView,CreateAPIView,DestroyAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated

class RatingsView(ListAPIView):
    queryset = Ratings.objects.all().order_by('-date_published')
    permission_classes = (permissions.AllowAny, )
    serializer_class = RatingsSerializer
    lookup_field = 'id'
    permission_classes = [AllowAny]


class RatingView(RetrieveAPIView):
    queryset = Ratings.objects.all().order_by('-date_published')
    serializer_class = RatingsSerializer
    lookup_field = 'id'
    permission_classes = [AllowAny]
class RatingCreateView(CreateAPIView):
    queryset = Ratings.objects.all()
    serializer_class = RatingsSerializer
    permission_classes = [IsAuthenticated]


class RatingDeleteView(DestroyAPIView):
    queryset = Ratings.objects.all()
    serializer_class = RatingsSerializer
    lookup_field = 'id'
    # permission_classes = [IsAuthenticated]
   


# Create your views here.
