#!/usr/bin/env python3
"""
Standalone runner for Digital Signage application.
This script runs the Django backend without external dependencies.
"""

import os
import sys
import threading
import time
import signal
import webbrowser
from pathlib import Path
from http.server import HTTPServer, SimpleHTTPRequestHandler
import socketserver

# Add the project directory to Python path
project_dir = Path(__file__).parent
sys.path.insert(0, str(project_dir))

class CORSHTTPRequestHandler(SimpleHTTPRequestHandler):
    """HTTP request handler with CORS support"""
    
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()
    
    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

def run_django():
    """Run Django development server"""
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'digital_signage.settings')
    
    try:
        from django.core.management import execute_from_command_line
        print("🚀 Starting Django backend on http://localhost:8000")
        execute_from_command_line(['manage.py', 'runserver', '8000'])
    except ImportError as exc:
        print("❌ Django not found. Please run setup.py first.")
        sys.exit(1)

def run_static_server():
    """Run static file server for frontend"""
    static_dir = project_dir / 'static'
    
    # Create basic static files if they don't exist
    if not static_dir.exists():
        static_dir.mkdir()
        
        # Create a basic index.html
        index_html = static_dir / 'index.html'
        index_html.write_text("""
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Digital Signage</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background: #f5f5f5; }
        .container { max-width: 800px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .header { text-align: center; margin-bottom: 30px; }
        .card { background: #f8f9fa; padding: 15px; margin: 10px 0; border-radius: 5px; border-left: 4px solid #007bff; }
        .btn { display: inline-block; padding: 10px 20px; background: #007bff; color: white; text-decoration: none; border-radius: 5px; margin: 5px; }
        .btn:hover { background: #0056b3; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🖥️ Digital Signage</h1>
            <p>Modern Digital Signage Management System</p>
        </div>
        
        <div class="card">
            <h3>🎯 Quick Start</h3>
            <p>Welcome to Digital Signage! This is a Django-powered digital signage management system.</p>
            <a href="http://localhost:8000/admin/" class="btn">Django Admin</a>
            <a href="http://localhost:8000/api/v1/" class="btn">API Documentation</a>
        </div>
        
        <div class="card">
            <h3>🔑 Demo Credentials</h3>
            <p><strong>Username:</strong> demo</p>
            <p><strong>Password:</strong> demo</p>
        </div>
        
        <div class="card">
            <h3>📚 API Endpoints</h3>
            <ul>
                <li><code>GET /api/v1/display/</code> - List displays</li>
                <li><code>POST /api/v1/display/</code> - Create display</li>
                <li><code>GET /api/v1/slideshow/</code> - List slideshows</li>
                <li><code>POST /api/v1/slideshow/</code> - Create slideshow</li>
                <li><code>GET /api/v1/widgets/</code> - List widgets</li>
            </ul>
        </div>
        
        <div class="card">
            <h3>🛠️ Features</h3>
            <ul>
                <li>✅ Display Management</li>
                <li>✅ Slideshow Creation</li>
                <li>✅ Widget System</li>
                <li>✅ REST API</li>
                <li>✅ Admin Interface</li>
                <li>✅ Real-time Updates</li>
            </ul>
        </div>
    </div>
    
    <script>
        // Auto-refresh every 30 seconds to check if backend is running
        setTimeout(() => {
            fetch('http://localhost:8000/api/v1/')
                .then(() => console.log('Backend is running'))
                .catch(() => console.log('Backend not available'));
        }, 2000);
    </script>
</body>
</html>
        """)
    
    os.chdir(static_dir)
    
    try:
        with socketserver.TCPServer(("", 8080), CORSHTTPRequestHandler) as httpd:
            print("🌐 Starting frontend server on http://localhost:8080")
            httpd.serve_forever()
    except OSError as e:
        print(f"⚠️  Could not start frontend server on port 8080: {e}")

def setup_database():
    """Setup the database"""
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'digital_signage.settings')
    
    try:
        from django.core.management import execute_from_command_line
        from django.contrib.auth.models import User
        
        print("📊 Setting up database...")
        execute_from_command_line(['manage.py', 'migrate', '--verbosity=0'])
        
        # Create demo user
        if not User.objects.filter(username='demo').exists():
            User.objects.create_user('demo', 'demo@example.com', 'demo')
            print("👤 Created demo user (username: demo, password: demo)")
        else:
            print("👤 Demo user already exists")
            
    except Exception as e:
        print(f"❌ Database setup failed: {e}")
        return False
    
    return True

def signal_handler(sig, frame):
    """Handle Ctrl+C gracefully"""
    print('\n🛑 Shutting down servers...')
    sys.exit(0)

def main():
    """Main function to run the application"""
    signal.signal(signal.SIGINT, signal_handler)
    
    print("🚀 Digital Signage Application")
    print("=" * 50)
    
    # Setup database first
    if not setup_database():
        print("❌ Database setup failed")
        sys.exit(1)
    
    print("\n🌟 Starting servers...")
    print("📍 Django backend: http://localhost:8000")
    print("📍 Frontend: http://localhost:8080")
    print("📍 Admin: http://localhost:8000/admin/")
    print("\n🔑 Demo credentials: demo / demo")
    print("\n⏹️  Press Ctrl+C to stop")
    
    # Start Django in a separate thread
    django_thread = threading.Thread(target=run_django, daemon=True)
    django_thread.start()
    
    # Wait for Django to start
    time.sleep(3)
    
    # Open browser
    try:
        webbrowser.open('http://localhost:8080')
    except:
        pass
    
    # Start static server (this will block)
    try:
        run_static_server()
    except KeyboardInterrupt:
        print("\n👋 Goodbye!")

if __name__ == '__main__':
    main()