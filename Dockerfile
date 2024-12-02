FROM python:3.12.2-slim

# Install dependencies
RUN apt-get update && apt-get install -y \
    curl \
    wget \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Install Code-Server
RUN curl -fsSL https://code-server.dev/install.sh | sh

# Set the working directory
WORKDIR /home/coder/project

# Expose both Code-Server and web server ports
EXPOSE 8080 8000

# Start both Code-Server and a web server
CMD ["sh", "-c", "python3 -m http.server 8000 --directory slides & code-server --bind-addr 0.0.0.0:8080"]
