from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Slideshow, Slide
from .serializers import SlideshowSerializer, SlideSerializer

class SlideshowViewSet(viewsets.ModelViewSet):
    queryset = Slideshow.objects.all()
    serializer_class = SlideshowSerializer

    def create(self, request, *args, **kwargs):
        # Auto-generate name if not provided
        if not request.data.get('name'):
            count = Slideshow.objects.count()
            request.data['name'] = f'Slideshow #{count + 1}'
        
        return super().create(request, *args, **kwargs)

    @action(detail=True, methods=['get'])
    def slides(self, request, pk=None):
        slideshow = self.get_object()
        slides = slideshow.slides.all()
        serializer = SlideSerializer(slides, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['post'])
    def reorder(self, request, pk=None):
        slideshow = self.get_object()
        old_index = request.data.get('oldIndex')
        new_index = request.data.get('newIndex')
        
        if old_index is not None and new_index is not None:
            slides = list(slideshow.slides.all())
            if 0 <= old_index < len(slides) and 0 <= new_index < len(slides):
                # Move slide from old_index to new_index
                slide = slides.pop(old_index)
                slides.insert(new_index, slide)
                
                # Update order_index for all slides
                for i, slide in enumerate(slides):
                    slide.order_index = i
                    slide.save()
                
                return Response({'success': True})
        
        return Response({'success': False}, status=status.HTTP_400_BAD_REQUEST)

class SlideViewSet(viewsets.ModelViewSet):
    queryset = Slide.objects.all()
    serializer_class = SlideSerializer