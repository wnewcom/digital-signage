from rest_framework import serializers
from .models import Slideshow, Slide

class SlideSerializer(serializers.ModelSerializer):
    class Meta:
        model = Slide
        fields = '__all__'

class SlideshowSerializer(serializers.ModelSerializer):
    slides = SlideSerializer(many=True, read_only=True)

    class Meta:
        model = Slideshow
        fields = '__all__'