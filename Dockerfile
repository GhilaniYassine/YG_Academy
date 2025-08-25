FROM python:3.11-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

WORKDIR /app

# System deps
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Install Python deps first (better layer caching)
COPY requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy project
COPY . /app

# Create runtime folders
RUN mkdir -p /app/staticfiles /app/media

# Entrypoint
RUN chmod +x docker/entrypoint.sh

EXPOSE 8000

CMD ["docker/entrypoint.sh"]
