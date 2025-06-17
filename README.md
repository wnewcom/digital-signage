# Digital Signage - Django Backend

A modern digital signage application built with Django REST Framework.

## 🚀 Quick Start

### Prerequisites

- Python 3.8 or higher
- pip (Python package installer)

### Installation & Setup

1. **Clone or download the project**
   ```bash
   # If you have the project files
   cd digital-signage
   ```

2. **Run the setup script**
   ```bash
   python setup.py
   ```

3. **Start the application**
   ```bash
   python run.py
   ```

4. **Access the application**
   - Frontend: http://localhost:8080
   - Django Admin: http://localhost:8000/admin/
   - API: http://localhost:8000/api/v1/

### Demo Credentials

- **Username**: demo
- **Password**: demo

## 🛠️ Manual Installation (Alternative)

If the setup script doesn't work, you can install manually:

```bash
# Install minimal dependencies
pip install Django==4.2.7 djangorestframework==3.14.0 django-cors-headers==4.3.1 python-decouple==3.8 whitenoise==6.6.0

# Setup database
python manage.py migrate

# Create demo user
python manage.py shell -c "from django.contrib.auth.models import User; User.objects.create_user('demo', 'demo@example.com', 'demo') if not User.objects.filter(username='demo').exists() else None"

# Run the application
python run.py
```

## 📁 Project Structure

```
digital-signage/
├── digital_signage/          # Django project settings
├── core/                     # Core Django app (auth, websockets)
├── displays/                 # Display management app
├── slideshows/              # Slideshow management app
├── widgets/                 # Widget system app
├── templates/               # Django templates
├── static/                  # Static files
├── requirements.txt         # Python dependencies
├── requirements-minimal.txt # Minimal dependencies
├── setup.py                 # Setup script
├── run.py                   # Application runner
└── manage.py               # Django management script
```

## 🔌 API Endpoints

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

## 🎯 Features

- ✅ **Display Management** - Create and manage digital displays
- ✅ **Slideshow System** - Create multimedia slideshows
- ✅ **Widget System** - Modular widget architecture
- ✅ **REST API** - Full REST API for all operations
- ✅ **Admin Interface** - Django admin for easy management
- ✅ **Real-time Updates** - WebSocket support (if available)
- ✅ **Cross-platform** - Runs on Windows, macOS, and Linux
- ✅ **No npm Required** - Pure Python implementation

## 🔧 Configuration

### Environment Variables

Create a `.env` file for custom configuration:

```env
SECRET_KEY=your-secret-key-here
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
```

### Database

By default, the application uses SQLite. For production, you can configure PostgreSQL:

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

## 🚀 Production Deployment

### Using Gunicorn

```bash
# Install gunicorn
pip install gunicorn

# Collect static files
python manage.py collectstatic

# Run with gunicorn
gunicorn digital_signage.wsgi:application --bind 0.0.0.0:8000
```

### Using Docker

```dockerfile
FROM python:3.11-slim

WORKDIR /app
COPY requirements-minimal.txt .
RUN pip install -r requirements-minimal.txt

COPY . .
RUN python manage.py collectstatic --noinput

EXPOSE 8000
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
```

## 🛠️ Development

### Adding New Features

1. Create new Django apps for major features
2. Add models in `models.py`
3. Create serializers in `serializers.py`
4. Add views in `views.py`
5. Configure URLs in `urls.py`

### Running Tests

```bash
python manage.py test
```

## 🐛 Troubleshooting

### Common Issues

1. **Port already in use**
   ```bash
   # Kill processes on ports 8000 and 8080
   lsof -ti:8000 | xargs kill -9
   lsof -ti:8080 | xargs kill -9
   ```

2. **Database errors**
   ```bash
   # Reset database
   rm db.sqlite3
   python manage.py migrate
   ```

3. **Permission errors**
   ```bash
   # Make scripts executable
   chmod +x setup.py run.py
   ```

### Getting Help

- Check the Django admin at http://localhost:8000/admin/
- Review the API documentation at http://localhost:8000/api/v1/
- Check the console output for error messages

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For support and questions, please check the troubleshooting section or create an issue.