# Digital Signage - Django + Vue.js

A modern digital signage application built with Django REST Framework backend and Vue.js 3 frontend.

## Features

- **Modern Architecture**: Django REST API + Vue.js 3 with Composition API
- **Real-time Updates**: WebSocket support for live display updates
- **Responsive Design**: Tailwind CSS for modern, mobile-first UI
- **Widget System**: Modular widget architecture for displays
- **Slideshow Management**: Create and manage multimedia slideshows
- **Display Management**: Control multiple digital displays
- **User Authentication**: Secure login system
- **No npm Required**: Can run entirely with Python

## Quick Start

### Prerequisites

- Python 3.8+
- Redis (for WebSocket support)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd digital-signage
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Setup environment**
   ```bash
   cp .env.example .env
   # Edit .env with your settings
   ```

5. **Run the application**
   ```bash
   python run.py
   ```

This will:
- Setup the database
- Create a demo user (username: `demo`, password: `demo`)
- Start Django backend on http://localhost:8000
- Start Vue.js frontend on http://localhost:8080

### Alternative: Development Mode

For development with hot-reload:

1. **Start Django backend**
   ```bash
   python manage.py migrate
   python manage.py runserver 8000
   ```

2. **Start Vue.js frontend** (in another terminal)
   ```bash
   cd frontend
   npm install
   npm run serve
   ```

## Project Structure

```
digital-signage/
├── digital_signage/          # Django project settings
├── core/                     # Core Django app (auth, websockets)
├── displays/                 # Display management app
├── slideshows/              # Slideshow management app
├── widgets/                 # Widget system app
├── frontend/                # Vue.js frontend
│   ├── src/
│   │   ├── components/      # Vue components
│   │   ├── views/           # Page components
│   │   ├── stores/          # Pinia stores
│   │   └── services/        # API services
├── templates/               # Django templates
├── requirements.txt         # Python dependencies
└── run.py                   # Standalone runner
```

## API Endpoints

### Authentication
- `POST /api/v1/auth/login/` - User login
- `POST /api/v1/auth/logout/` - User logout
- `GET /api/v1/auth/me/` - Get current user

### Displays
- `GET /api/v1/display/` - List displays
- `POST /api/v1/display/` - Create display
- `GET /api/v1/display/{id}/` - Get display
- `PATCH /api/v1/display/{id}/` - Update display
- `DELETE /api/v1/display/{id}/` - Delete display
- `GET /api/v1/display/{id}/widgets/` - Get display widgets

### Slideshows
- `GET /api/v1/slideshow/` - List slideshows
- `POST /api/v1/slideshow/` - Create slideshow
- `GET /api/v1/slideshow/{id}/` - Get slideshow
- `PATCH /api/v1/slideshow/{id}/` - Update slideshow
- `DELETE /api/v1/slideshow/{id}/` - Delete slideshow
- `GET /api/v1/slideshow/{id}/slides/` - Get slideshow slides
- `POST /api/v1/slideshow/{id}/reorder/` - Reorder slides

### Widgets
- `GET /api/v1/widgets/` - List widgets
- `POST /api/v1/widgets/` - Create widget
- `GET /api/v1/widgets/{id}/` - Get widget
- `PUT /api/v1/widgets/{id}/` - Update widget
- `DELETE /api/v1/widgets/{id}/` - Delete widget

## WebSocket Endpoints

- `ws://localhost:8000/ws/display/{display_id}/` - Display-specific updates
- `ws://localhost:8000/ws/admin/` - Admin updates

## Technology Stack

### Backend
- **Django 4.2** - Web framework
- **Django REST Framework** - API framework
- **Channels** - WebSocket support
- **Redis** - Channel layer backend
- **SQLite** - Default database (configurable)

### Frontend
- **Vue.js 3** - Frontend framework
- **Pinia** - State management
- **Vue Router** - Routing
- **Tailwind CSS** - Styling
- **Heroicons** - Icons
- **Axios** - HTTP client

## Configuration

### Environment Variables

Create a `.env` file with:

```env
SECRET_KEY=your-secret-key-here
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
DATABASE_URL=sqlite:///db.sqlite3
REDIS_URL=redis://localhost:6379/0
```

### Database

By default, the application uses SQLite. For production, configure PostgreSQL:

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'digital_signage',
        'USER': 'your_user',
        'PASSWORD': 'your_password',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}
```

## Deployment

### Production Setup

1. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

2. **Build frontend**
   ```bash
   cd frontend
   npm run build
   ```

3. **Collect static files**
   ```bash
   python manage.py collectstatic
   ```

4. **Run with Gunicorn**
   ```bash
   gunicorn digital_signage.wsgi:application
   ```

### Docker Deployment

```dockerfile
FROM python:3.11-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .
RUN python manage.py collectstatic --noinput

EXPOSE 8000
CMD ["gunicorn", "digital_signage.wsgi:application", "--bind", "0.0.0.0:8000"]
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Demo Credentials

- **Username**: demo
- **Password**: demo

## Support

For support and questions, please open an issue on the GitHub repository.