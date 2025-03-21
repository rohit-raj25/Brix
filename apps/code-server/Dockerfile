FROM codercom/code-server:4.96.4

USER root
RUN apt-get update \
    && apt-get install -y curl \
    && curl -fsSL https://deb.nodesource.com/setup_22.x | bash - \
    && apt-get install -y nodejs \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*  

# Ensure the directory exists and is accessible
RUN mkdir -p /tmp/brix-worker \
    && chown -R coder:coder /tmp/brix-worker \
    && chmod -R 777 /tmp/brix-worker 

USER coder

# Expose code-server's default port
EXPOSE 8080

# Start code-server on container launch
CMD ["code-server", "--auth", "none", "--bind-addr", "0.0.0.0:8080", "/tmp/brix-worker"]
