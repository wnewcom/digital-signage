#!/usr/bin/env python3
"""
Setup script for Digital Signage application.
This script sets up the environment and installs dependencies.
"""

import os
import sys
import subprocess
import platform
from pathlib import Path

def run_command(command, cwd=None):
    """Run a command and handle errors"""
    try:
        result = subprocess.run(command, shell=True, cwd=cwd, check=True, 
                              capture_output=True, text=True)
        return result.stdout
    except subprocess.CalledProcessError as e:
        print(f"Error running command: {command}")
        print(f"Error: {e.stderr}")
        return None

def install_python_dependencies():
    """Install Python dependencies"""
    print("Installing Python dependencies...")
    
    # Try minimal requirements first
    if run_command(f"{sys.executable} -m pip install -r requirements-minimal.txt"):
        print("✓ Minimal Python dependencies installed successfully")
        
        # Try to install optional dependencies
        optional_deps = [
            "channels==4.0.0",
            "channels-redis==4.1.0", 
            "redis==5.0.1",
            "Pillow==10.1.0",
            "gunicorn==21.2.0"
        ]
        
        for dep in optional_deps:
            if run_command(f"{sys.executable} -m pip install {dep}"):
                print(f"✓ Installed {dep}")
            else:
                print(f"⚠ Could not install {dep} (optional)")
    else:
        print("❌ Failed to install minimal dependencies")
        return False
    
    return True

def setup_django():
    """Setup Django application"""
    print("Setting up Django application...")
    
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'digital_signage.settings')
    
    # Run migrations
    if run_command(f"{sys.executable} manage.py migrate"):
        print("✓ Database migrations completed")
    else:
        print("❌ Database migration failed")
        return False
    
    # Create superuser
    create_user_script = """
from django.contrib.auth.models import User
if not User.objects.filter(username='demo').exists():
    User.objects.create_user('demo', 'demo@example.com', 'demo')
    print('Demo user created')
else:
    print('Demo user already exists')
"""
    
    if run_command(f"{sys.executable} manage.py shell -c \"{create_user_script}\""):
        print("✓ Demo user setup completed")
    else:
        print("❌ Demo user creation failed")
    
    return True

def check_system_requirements():
    """Check system requirements"""
    print("Checking system requirements...")
    
    # Check Python version
    if sys.version_info < (3, 8):
        print("❌ Python 3.8 or higher is required")
        return False
    else:
        print(f"✓ Python {sys.version_info.major}.{sys.version_info.minor} detected")
    
    # Check pip
    if run_command(f"{sys.executable} -m pip --version"):
        print("✓ pip is available")
    else:
        print("❌ pip is not available")
        return False
    
    return True

def main():
    """Main setup function"""
    print("🚀 Digital Signage Setup")
    print("=" * 50)
    
    if not check_system_requirements():
        print("❌ System requirements not met")
        sys.exit(1)
    
    if not install_python_dependencies():
        print("❌ Failed to install dependencies")
        sys.exit(1)
    
    if not setup_django():
        print("❌ Django setup failed")
        sys.exit(1)
    
    print("\n✅ Setup completed successfully!")
    print("\nTo start the application:")
    print("  python run.py")
    print("\nDemo credentials:")
    print("  Username: demo")
    print("  Password: demo")

if __name__ == '__main__':
    main()