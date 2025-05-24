# Krake Orchestrator System Deployment Guide

This guide provides instructions for deploying the Krake Orchestrator System on a DigitalOcean droplet.

## Prerequisites

- DigitalOcean account
- Domain name (optional, but recommended for production)
- Docker and Docker Compose installed on the droplet
- SSL certificates for HTTPS (Let's Encrypt recommended)

## Deployment Steps

### 1. Provision a DigitalOcean Droplet

1. Log in to your DigitalOcean account
2. Create a new Droplet with the following specifications:
   - Ubuntu 22.04 LTS
   - Basic plan with at least 2GB RAM / 1 CPU
   - Choose a datacenter region close to your users
   - Add SSH keys for secure access
   - Choose a hostname (e.g., krake-orchestrator)

### 2. Set Up the Droplet

1. SSH into your droplet:
   ```
   ssh root@your_droplet_ip
   ```

2. Update the system:
   ```
   apt update && apt upgrade -y
   ```

3. Install Docker and Docker Compose:
   ```
   # Install Docker
   apt install apt-transport-https ca-certificates curl software-properties-common -y
   curl -fsSL https://download.docker.com/linux/ubuntu/gpg | apt-key add -
   add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
   apt update
   apt install docker-ce -y
   
   # Install Docker Compose
   curl -L "https://github.com/docker/compose/releases/download/v2.18.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
   chmod +x /usr/local/bin/docker-compose
   ```

4. Create a non-root user (optional but recommended):
   ```
   adduser krake
   usermod -aG docker krake
   usermod -aG sudo krake
   ```

### 3. Clone the Repository

1. Install Git:
   ```
   apt install git -y
   ```

2. Clone the repository:
   ```
   git clone https://github.com/your-organization/lunavi-krake.git /opt/lunavi-krake
   cd /opt/lunavi-krake
   ```

### 4. Configure Environment Variables

1. Create a `.env` file in the root directory:
   ```
   touch .env
   ```

2. Add the following environment variables to the `.env` file:
   ```
   # Database
   DATABASE_URL=postgresql://user:password@supabase-db-url:5432/krake
   
   # Authentication
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   SECRET_KEY=your_secret_key
   
   # Integrations
   SHOPIFY_API_KEY=your_shopify_api_key
   SHOPIFY_API_SECRET=your_shopify_api_secret
   GELATO_API_KEY=your_gelato_api_key
   BINANCE_API_KEY=your_binance_api_key
   BINANCE_API_SECRET=your_binance_api_secret
   ```

### 5. Set Up SSL Certificates

1. Install Certbot:
   ```
   apt install certbot -y
   ```

2. Obtain SSL certificates:
   ```
   certbot certonly --standalone -d your-domain.com
   ```

3. Copy the certificates to the Docker volume:
   ```
   mkdir -p /opt/lunavi-krake/docker/ssl
   cp /etc/letsencrypt/live/your-domain.com/fullchain.pem /opt/lunavi-krake/docker/ssl/cert.pem
   cp /etc/letsencrypt/live/your-domain.com/privkey.pem /opt/lunavi-krake/docker/ssl/key.pem
   ```

### 6. Deploy with Docker Compose

1. Navigate to the project directory:
   ```
   cd /opt/lunavi-krake
   ```

2. Build and start the containers:
   ```
   docker-compose -f docker/docker-compose.yml up -d
   ```

3. Verify that the containers are running:
   ```
   docker-compose -f docker/docker-compose.yml ps
   ```

### 7. Set Up Automatic SSL Renewal

1. Create a script to renew certificates:
   ```
   cat > /opt/renew-certs.sh << 'EOF'
   #!/bin/bash
   certbot renew
   cp /etc/letsencrypt/live/your-domain.com/fullchain.pem /opt/lunavi-krake/docker/ssl/cert.pem
   cp /etc/letsencrypt/live/your-domain.com/privkey.pem /opt/lunavi-krake/docker/ssl/key.pem
   docker-compose -f /opt/lunavi-krake/docker/docker-compose.yml restart nginx
   EOF
   ```

2. Make the script executable:
   ```
   chmod +x /opt/renew-certs.sh
   ```

3. Add a cron job to run the script every month:
   ```
   (crontab -l 2>/dev/null; echo "0 0 1 * * /opt/renew-certs.sh") | crontab -
   ```

### 8. Set Up Monitoring (Optional)

1. Install and configure a monitoring tool like Prometheus and Grafana or use DigitalOcean's built-in monitoring.

### 9. Set Up Backups

1. Create a backup script:
   ```
   cat > /opt/backup.sh << 'EOF'
   #!/bin/bash
   TIMESTAMP=$(date +%Y%m%d%H%M%S)
   BACKUP_DIR=/opt/backups
   
   # Create backup directory if it doesn't exist
   mkdir -p $BACKUP_DIR
   
   # Backup environment variables
   cp /opt/lunavi-krake/.env $BACKUP_DIR/env-$TIMESTAMP.backup
   
   # Backup database (if using a local database)
   # docker exec -t lunavi-krake_db_1 pg_dump -U postgres krake > $BACKUP_DIR/db-$TIMESTAMP.sql
   
   # Backup SSL certificates
   cp -r /opt/lunavi-krake/docker/ssl $BACKUP_DIR/ssl-$TIMESTAMP
   
   # Remove backups older than 30 days
   find $BACKUP_DIR -name "*.backup" -type f -mtime +30 -delete
   find $BACKUP_DIR -name "*.sql" -type f -mtime +30 -delete
   find $BACKUP_DIR -name "ssl-*" -type d -mtime +30 -exec rm -rf {} \;
   EOF
   ```

2. Make the script executable:
   ```
   chmod +x /opt/backup.sh
   ```

3. Add a cron job to run the script daily:
   ```
   (crontab -l 2>/dev/null; echo "0 0 * * * /opt/backup.sh") | crontab -
   ```

## Troubleshooting

### Container Issues

If containers fail to start:

1. Check container logs:
   ```
   docker-compose -f docker/docker-compose.yml logs
   ```

2. Check individual container logs:
   ```
   docker-compose -f docker/docker-compose.yml logs frontend
   docker-compose -f docker/docker-compose.yml logs backend
   docker-compose -f docker/docker-compose.yml logs nginx
   ```

### Database Connection Issues

If the backend cannot connect to the database:

1. Verify the DATABASE_URL in the .env file
2. Check if the database is accessible from the droplet:
   ```
   nc -zv supabase-db-url 5432
   ```

### SSL Certificate Issues

If SSL certificates are not working:

1. Verify that the certificates exist in the correct location
2. Check the Nginx logs for SSL-related errors:
   ```
   docker-compose -f docker/docker-compose.yml logs nginx
   ```

## Maintenance

### Updating the Application

1. Pull the latest changes:
   ```
   cd /opt/lunavi-krake
   git pull
   ```

2. Rebuild and restart the containers:
   ```
   docker-compose -f docker/docker-compose.yml down
   docker-compose -f docker/docker-compose.yml up -d --build
   ```

### Scaling (Future Considerations)

For future scaling needs:

1. Consider using a managed Kubernetes service like DigitalOcean Kubernetes
2. Implement a load balancer for horizontal scaling
3. Use a CDN for static assets
4. Implement caching strategies for API responses
