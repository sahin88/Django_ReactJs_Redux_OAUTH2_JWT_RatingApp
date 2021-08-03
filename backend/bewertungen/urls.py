
from django.urls import path
from .views import RatingsView,RatingView,RatingCreateView,RatingDeleteView
urlpatterns = [
    path('', RatingsView.as_view()),
    path('post', RatingCreateView.as_view()),
    path('<int:id>',RatingView.as_view()),
    path('delete/<int:id>',RatingDeleteView.as_view()),
]