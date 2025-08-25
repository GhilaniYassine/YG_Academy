#!/bin/sh
set -e

# Clean any existing static files to avoid conflicts
rm -rf /app/staticfiles/*

# Use --clear and --noinput flags for Docker builds
python manage.py collectstatic --noinput --clear --verbosity=1
python manage.py migrate --noinput

exec gunicorn learn.wsgi:application \
  --bind 0.0.0.0:${PORT:-8000} \
  --workers ${WORKERS:-3} \
  --timeout 120
