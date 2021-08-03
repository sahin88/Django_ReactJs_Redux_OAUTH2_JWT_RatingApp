from django.contrib import admin
from .models import Ratings

class RatingsAdmin(admin.ModelAdmin):
    list_display = ('id', 'first_name', 'last_name',)
    list_display_links = ('id', 'first_name')
    list_filter = ('first_name','last_name' )
  
    search_fields = ('first_name', 'last_name', 'comments')
    list_per_page = 25

admin.site.register(Ratings, RatingsAdmin)