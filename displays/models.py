from django.db import models
from core.models import BaseModel

class Display(BaseModel):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    location = models.CharField(max_length=255, blank=True, null=True)
    layout = models.CharField(max_length=50, default='spaced')
    status_bar = models.JSONField(default=list)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['-created_at']