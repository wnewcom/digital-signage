import json
from channels.generic.websocket import AsyncWebsocketConsumer

class DisplayConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.display_id = self.scope['url_route']['kwargs']['display_id']
        self.display_group_name = f'display_{self.display_id}'

        # Join display group
        await self.channel_layer.group_add(
            self.display_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        # Leave display group
        await self.channel_layer.group_discard(
            self.display_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']

        # Send message to display group
        await self.channel_layer.group_send(
            self.display_group_name,
            {
                'type': 'display_message',
                'message': message
            }
        )

    async def display_message(self, event):
        message = event['message']

        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'message': message
        }))

class AdminConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.group_name = 'admin_updates'

        # Join admin group
        await self.channel_layer.group_add(
            self.group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        # Leave admin group
        await self.channel_layer.group_discard(
            self.group_name,
            self.channel_name
        )

    async def admin_update(self, event):
        # Send update to WebSocket
        await self.send(text_data=json.dumps({
            'type': 'update',
            'data': event['data']
        }))