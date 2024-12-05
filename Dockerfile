FROM python:3.12.2-slim

# Install dependencies
RUN apt-get update && apt-get install -y \
    curl \
    wget \
    nginx \
    git \
    supervisor && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Create required directories
RUN mkdir -p /home/dev/html/js

# Install Remark.js
RUN curl -fsSL https://remarkjs.com/downloads/remark-latest.min.js -o /home/dev/html/js/remark-latest.min.js

# Install Code-Server
RUN curl -fsSL https://code-server.dev/install.sh | sh

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Create the nginx user
RUN adduser --system --no-create-home --disabled-login --group nginx

# Copy files into the container
COPY html /home/dev/html

# Set the working directory
WORKDIR /home/dev
ENV HOME=/home/dev

# Expose ports for Nginx (port 80) and Code-Server (port 8080)
EXPOSE 80 8080

# Start Nginx and Code-Server
CMD ["sh", "-c", "nginx && code-server --bind-addr 0.0.0.0:8080"]
