from .models  import Ratings
from rest_framework import serializers


class RatingsSerializer(serializers.ModelSerializer):
    date_published = serializers.DateTimeField(read_only=True, format="%Y-%m-%d %H:%m")
    class Meta:
        model = Ratings
        fields = [
            'id',
            'first_name',
            'last_name',
            'comments',
            'author',
            'ratings',
            'date_published',
         
        ]

