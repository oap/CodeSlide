FROM python:3.12.2-slim

# Install dependencies
RUN apt-get update && apt-get install -y \
    curl \
    wget \
    nginx \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Install Remark.js
RUN mkdir -p /home/dev/html/js && \
    curl -fsSL https://remarkjs.com/downloads/remark-latest.min.js -o /home/dev/html/js/remark-latest.min.js

# Install Code-Server
RUN curl -fsSL https://code-server.dev/install.sh | sh

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy files into the container
COPY html /home/dev/html
COPY slides /home/dev/slides

# Set the working directory
WORKDIR /home/dev

# Expose ports for Nginx (port 80) and Code-Server (port 8080)
EXPOSE 80 8080

# Start Nginx and Code-Server
CMD ["sh", "-c", "nginx && code-server --bind-addr 0.0.0.0:8080"]
