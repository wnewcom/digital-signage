from rest_framework import serializers
from .models import Display

class DisplaySerializer(serializers.ModelSerializer):
    class Meta:
        model = Display
        fields = '__all__'