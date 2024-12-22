FROM node:alpine

# Copy SSL certificate and key
COPY my-cert.crt /usr/local/share/ca-certificates/my-cert.crt
COPY my-cert.key /etc/ssl/private/my-cert.key

RUN cat /usr/local/share/ca-certificates/my-cert.crt >> /etc/ssl/certs/ca-certificates.crt && \
    apk --no-cache add \
        curl

WORKDIR /src/app

COPY . /src/app

RUN npm install -g @angular/cli

RUN npm install

# Expose port 443 for HTTPS
EXPOSE 443

CMD ["ng", "serve", "--configuration=production", "--host", "0.0.0.0", "--ssl", "--ssl-cert", "/usr/local/share/ca-certificates/my-cert.crt", "--ssl-key", "/etc/ssl/private/my-cert.key", "--port", "443"]