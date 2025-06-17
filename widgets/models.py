from django.db import models
from core.models import BaseModel
from displays.models import Display

class Widget(BaseModel):
    WIDGET_TYPES = [
        ('slideshow', 'Slideshow'),
        ('weather', 'Weather'),
        ('clock', 'Clock'),
        ('text', 'Text'),
        ('image', 'Image'),
        ('web', 'Web Page'),
        ('youtube', 'YouTube'),
    ]

    display = models.ForeignKey(Display, on_delete=models.CASCADE, related_name='widgets')
    widget_type = models.CharField(max_length=50, choices=WIDGET_TYPES)
    name = models.CharField(max_length=255)
    config = models.JSONField(default=dict)
    
    # Grid layout properties
    x = models.IntegerField(default=0)
    y = models.IntegerField(default=0)
    w = models.IntegerField(default=1)
    h = models.IntegerField(default=1)

    def __str__(self):
        return f"{self.display.name} - {self.name}"

    class Meta:
        ordering = ['created_at']