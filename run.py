#!/usr/bin/env python3
"""
Standalone runner for Digital Signage application.
This script runs the Django backend and Vue.js frontend without npm.
"""

import os
import sys
import subprocess
import threading
import time
import signal
from pathlib import Path

# Add the project directory to Python path
project_dir = Path(__file__).parent
sys.path.insert(0, str(project_dir))

def run_django():
    """Run Django development server"""
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'digital_signage.settings')
    
    try:
        from django.core.management import execute_from_command_line
        execute_from_command_line(['manage.py', 'runserver', '8000'])
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc

def run_vue():
    """Run Vue.js development server using Python's http.server"""
    frontend_dir = project_dir / 'frontend'
    dist_dir = frontend_dir / 'dist'
    
    if not dist_dir.exists():
        print("Building Vue.js frontend...")
        # Build the frontend first
        subprocess.run(['npm', 'run', 'build'], cwd=frontend_dir, check=True)
    
    # Serve the built files
    os.chdir(dist_dir)
    subprocess.run([sys.executable, '-m', 'http.server', '8080'])

def setup_database():
    """Setup the database"""
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'digital_signage.settings')
    
    from django.core.management import execute_from_command_line
    
    print("Setting up database...")
    execute_from_command_line(['manage.py', 'migrate'])
    
    # Create demo user
    from django.contrib.auth.models import User
    if not User.objects.filter(username='demo').exists():
        User.objects.create_user('demo', 'demo@example.com', 'demo')
        print("Created demo user (username: demo, password: demo)")

def signal_handler(sig, frame):
    """Handle Ctrl+C gracefully"""
    print('\nShutting down servers...')
    sys.exit(0)

def main():
    """Main function to run both servers"""
    signal.signal(signal.SIGINT, signal_handler)
    
    # Setup database first
    setup_database()
    
    print("Starting Digital Signage application...")
    print("Django backend will run on http://localhost:8000")
    print("Vue.js frontend will run on http://localhost:8080")
    print("Press Ctrl+C to stop both servers")
    
    # Start Django in a separate thread
    django_thread = threading.Thread(target=run_django, daemon=True)
    django_thread.start()
    
    # Wait a moment for Django to start
    time.sleep(2)
    
    # Start Vue.js server (this will block)
    try:
        run_vue()
    except KeyboardInterrupt:
        print("\nShutting down...")

if __name__ == '__main__':
    main()