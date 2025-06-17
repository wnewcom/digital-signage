from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Display
from .serializers import DisplaySerializer
from widgets.models import Widget
from widgets.serializers import WidgetSerializer

class DisplayViewSet(viewsets.ModelViewSet):
    queryset = Display.objects.all()
    serializer_class = DisplaySerializer

    def create(self, request, *args, **kwargs):
        # Auto-generate name if not provided
        if not request.data.get('name'):
            count = Display.objects.count()
            request.data['name'] = f'Display #{count + 1}'
        
        return super().create(request, *args, **kwargs)

    @action(detail=True, methods=['get'])
    def widgets(self, request, pk=None):
        display = self.get_object()
        widgets = Widget.objects.filter(display=display)
        serializer = WidgetSerializer(widgets, many=True)
        return Response(serializer.data)