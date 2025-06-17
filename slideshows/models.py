from django.db import models
from core.models import BaseModel

class Slideshow(BaseModel):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['-created_at']

class Slide(BaseModel):
    SLIDE_TYPES = [
        ('photo', 'Photo'),
        ('video', 'Video'),
        ('youtube', 'YouTube'),
        ('web', 'Web Page'),
        ('text', 'Text'),
    ]

    slideshow = models.ForeignKey(Slideshow, on_delete=models.CASCADE, related_name='slides')
    name = models.CharField(max_length=255)
    slide_type = models.CharField(max_length=20, choices=SLIDE_TYPES, default='photo')
    content = models.TextField()  # URL, text content, or file path
    duration = models.IntegerField(default=5000)  # Duration in milliseconds
    order_index = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.slideshow.name} - {self.name}"

    class Meta:
        ordering = ['order_index', 'created_at']