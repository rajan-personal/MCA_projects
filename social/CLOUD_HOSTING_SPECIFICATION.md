# Cloud Hosting Specification - Social Media Platform

## Executive Summary

This document provides comprehensive cloud hosting specifications for deploying the **Social Media Platform** on a single AWS EC2 instance. The solution is designed for cost-effectiveness, simplicity, and scalability.

### Key Requirements

- **Platform**: Next.js 16.0.1 social networking application
- **Features**: User profiles, posts, comments, likes, image uploads (max 5MB)
- **Expected Load**: 100-1000 concurrent users initially
- **Deployment**: Single EC2 instance with Nginx reverse proxy
- **Database**: PostgreSQL 16 (local instance)
- **File Storage**: Local EBS volume at `/var/www/uploads/`
- **SSL**: Let's Encrypt (free, auto-renewal)
- **Testing**: Vitest framework

### Recommended Configuration

- **Instance Type**: t3.medium (2 vCPU, 4 GB RAM)
- **Storage**: 50 GB EBS gp3 (expandable)
- **Estimated Cost**: $30-45/month initially
- **Setup Time**: 3-5 days
- **Scaling**: Vertical scaling path available

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Technical Requirements](#technical-requirements)
3. [Cloud Provider Comparison](#cloud-provider-comparison)
4. [Architecture Diagram](#architecture-diagram)
5. [EC2 Instance Configuration](#ec2-instance-configuration)
6. [Server Setup Guide](#server-setup-guide)
7. [Application Deployment](#application-deployment)
8. [Database Configuration](#database-configuration)
9. [Nginx Configuration](#nginx-configuration)
10. [File Upload Configuration](#file-upload-configuration)
11. [SSL Certificate Setup](#ssl-certificate-setup)
12. [Monitoring & Logging](#monitoring--logging)
13. [Backup Strategy](#backup-strategy)
14. [Disaster Recovery](#disaster-recovery)
15. [Security Configuration](#security-configuration)
16. [Cost Analysis](#cost-analysis)
17. [Scaling Strategy](#scaling-strategy)
18. [Maintenance Procedures](#maintenance-procedures)
19. [Troubleshooting Guide](#troubleshooting-guide)
20. [Implementation Timeline](#implementation-timeline)

---

## Project Overview

### Platform Description

The Social Media Platform is a modern web application built with:

- **Frontend**: React 19, Next.js 16.0.1, Tailwind CSS
- **Backend**: Next.js API routes (App Router)
- **Authentication**: Better Auth 1.3.33
- **Database**: PostgreSQL with Drizzle ORM 0.36.4
- **File Storage**: Local filesystem for image uploads
- **Testing**: Vitest with React Testing Library

### Core Features

1. **User Management**
   - Signup/Login with email and password
   - User profiles with bio, avatar, social links
   - Profile editing capabilities

2. **Social Networking**
   - Create text posts with images
   - Like/unlike posts
   - Comment on posts
   - Follow/unfollow users
   - User feeds and timelines

3. **Content Management**
   - Image upload support (max 5MB per image)
   - Post privacy controls
   - Content moderation capabilities

4. **Performance**
   - Server-side rendering for SEO
   - Optimized image serving
   - Efficient database queries

### Technical Stack

```
┌─────────────────────────────────────────┐
│ Frontend:                               │
│  • React 19                             │
│  • Next.js 16.0.1 (App Router)          │
│  • Tailwind CSS, shadcn/ui              │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ Backend:                                │
│  • Next.js API Routes                   │
│  • Better Auth 1.3.33                   │
│  • Drizzle ORM 0.36.4                   │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ Database & Storage:                     │
│  • PostgreSQL 16                        │
│  • Local EBS storage for images         │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ Infrastructure:                         │
│  • AWS EC2 (Ubuntu 22.04 LTS)           │
│  • Nginx (reverse proxy)                │
│  • PM2 (process manager)                │
│  • Let's Encrypt (SSL)                  │
└─────────────────────────────────────────┘
```

---

## Technical Requirements

### Compute Requirements

#### Development/Staging
- **CPU**: 1-2 vCPU
- **Memory**: 2-4 GB RAM
- **Users**: 10-100 concurrent
- **Instance**: t3.small or t3.medium

#### Production (Recommended Start)
- **CPU**: 2 vCPU
- **Memory**: 4 GB RAM
- **Users**: 100-500 concurrent
- **Instance**: t3.medium

#### Production Growth
- **CPU**: 2 vCPU
- **Memory**: 8 GB RAM
- **Users**: 500-1000 concurrent
- **Instance**: t3.large

### Storage Requirements

#### System Storage
- **OS & Dependencies**: 10 GB
- **Application Code**: 1 GB
- **Logs**: 2-5 GB
- **Database**: 5-50 GB (grows with users)
- **User Uploads**: 10-100 GB (highly variable)

#### Recommended Storage
- **Start**: 50 GB EBS gp3
- **Growth**: Expand to 100-200 GB as needed
- **Backup**: S3 for long-term storage

### Network Requirements

#### Bandwidth
- **API Requests**: ~10 KB per request
- **Image Uploads**: 1-5 MB per upload
- **Image Serving**: 100-500 KB per image
- **Expected**: 50-200 GB/month data transfer

#### Connections
- **HTTP/HTTPS**: Ports 80, 443
- **SSH**: Port 22 (or custom)
- **Database**: localhost only (not exposed)

---

## Cloud Provider Comparison

### Option 1: AWS EC2 (Recommended)

**Pros:**
- Industry leader, extensive documentation
- Elastic IP for static addressing
- Easy scaling (vertical and horizontal)
- Integrated services (S3, CloudWatch, RDS)
- Free tier available (12 months)

**Cons:**
- Slightly more complex than alternatives
- Pay-per-use can increase with traffic spikes

**Cost Estimate (t3.medium):**
- Instance: $30.37/month
- Storage (50 GB): $4.00/month
- Data Transfer (200 GB): $17.10/month
- **Total**: ~$51/month

### Option 2: DigitalOcean Droplet

**Pros:**
- Simple UI, great for beginners
- Fixed pricing (no surprise bills)
- Good documentation and community
- Managed databases available

**Cons:**
- Limited global regions vs AWS
- Fewer advanced services

**Cost Estimate:**
- Basic Droplet (2 vCPU, 4 GB): $42/month
- Storage (50 GB): Included
- Data Transfer (4 TB): Included
- **Total**: ~$42/month

### Option 3: AWS Lightsail

**Pros:**
- Simplified AWS experience
- Fixed monthly pricing
- Bundled data transfer
- Easy to use

**Cons:**
- Less flexible than EC2
- Limited instance types

**Cost Estimate:**
- 2 vCPU, 4 GB RAM plan: $40/month
- Includes 4 TB transfer
- **Total**: ~$40/month

**Recommendation**: AWS EC2 for flexibility and growth potential.

---

## Architecture Diagram

### Single Instance Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     AWS EC2 Instance                        │
│                  (Ubuntu 22.04 LTS)                         │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Nginx (Port 80/443)                                 │  │
│  │  - Reverse proxy                                     │  │
│  │  - SSL termination (Let's Encrypt)                   │  │
│  │  - Static file serving (/var/www/uploads/)          │  │
│  │  - Gzip compression                                  │  │
│  └───────────────────┬──────────────────────────────────┘  │
│                      │                                      │
│                      ↓                                      │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  PM2 Process Manager                                 │  │
│  │  ┌────────────────────────────────────────────────┐  │  │
│  │  │  Next.js App (Port 3001)                       │  │  │
│  │  │  - React 19 frontend (SSR)                     │  │  │
│  │  │  - API routes (posts, comments, likes)         │  │  │
│  │  │  - Better Auth (session management)            │  │  │
│  │  │  - Image upload handling                       │  │  │
│  │  └───────────────────┬────────────────────────────┘  │  │
│  └────────────────────── │ ─────────────────────────────┘  │
│                      │                                      │
│                      ↓                                      │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  PostgreSQL 16 (Port 5432 - localhost only)         │  │
│  │  - Users, posts, comments, likes tables             │  │
│  │  - Session storage                                   │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  EBS Volume (gp3)                                    │  │
│  │  - /var/www/uploads/ (user uploaded images)         │  │
│  │  - Auto-snapshot daily                               │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  CloudWatch Agent                                    │  │
│  │  - CPU, Memory, Disk metrics                         │  │
│  │  - Application logs                                  │  │
│  │  - Alarms for high resource usage                    │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘

           ↓                          ↑
      (HTTPS via                 (Backups to
   Let's Encrypt SSL)             AWS S3)
           ↓                          ↑
   ┌───────────────┐         ┌──────────────┐
   │   Users via   │         │   S3 Bucket  │
   │   Browser     │         │   Backups    │
   └───────────────┘         └──────────────┘
```

### Data Flow

1. **User Request**:
   - Browser → HTTPS (port 443) → Nginx
   - Nginx terminates SSL → proxies to localhost:3001

2. **Application Processing**:
   - Next.js handles request
   - Better Auth validates session
   - API routes process business logic
   - Drizzle ORM queries PostgreSQL

3. **Image Upload**:
   - Multipart form data → API route
   - Validate size (max 5MB) and type
   - Save to `/var/www/uploads/`
   - Store file path in database

4. **Image Serving**:
   - Nginx directly serves from `/var/www/uploads/`
   - Cache-Control headers for browser caching
   - No application processing needed

---

## EC2 Instance Configuration

### Step 1: Launch EC2 Instance

1. **Go to AWS EC2 Console**
   - Region: Choose closest to your users (e.g., us-east-1)

2. **Click "Launch Instance"**

3. **Configuration:**
   ```
   Name: socialplatform-production
   
   AMI: Ubuntu Server 22.04 LTS (HVM), SSD Volume Type
   
   Instance Type: t3.medium
     - 2 vCPU
     - 4 GB RAM
     - Up to 5 Gigabit network
   
   Key Pair: Create new or use existing
     - Download .pem file (keep secure!)
   
   Network Settings:
     - VPC: Default VPC
     - Subnet: No preference
     - Auto-assign Public IP: Enable
   
   Firewall (Security Group):
     - SSH (22): Your IP only
     - HTTP (80): 0.0.0.0/0 (anywhere)
     - HTTPS (443): 0.0.0.0/0 (anywhere)
   
   Storage:
     - 50 GB gp3
     - IOPS: 3000
     - Throughput: 125 MB/s
     - Encryption: Enabled (AWS managed key)
   ```

4. **Launch Instance**

### Step 2: Elastic IP Allocation

```bash
# In AWS Console: EC2 → Elastic IPs → Allocate Elastic IP
# Then: Actions → Associate Elastic IP Address → Select your instance
```

**Why?** Prevents IP change on instance restart.

### Step 3: Security Group Configuration

Edit your security group:

| Type  | Protocol | Port Range | Source      | Description           |
|-------|----------|------------|-------------|-----------------------|
| SSH   | TCP      | 22         | My IP       | SSH access            |
| HTTP  | TCP      | 80         | 0.0.0.0/0   | Web traffic           |
| HTTPS | TCP      | 443        | 0.0.0.0/0   | Secure web traffic    |

**Note**: PostgreSQL (5432) should NOT be exposed publicly.

### Step 4: Connect to Instance

```bash
# Set permissions on key file
chmod 400 ~/path/to/your-key.pem

# Connect via SSH
ssh -i ~/path/to/your-key.pem ubuntu@<your-elastic-ip>

# Once connected, update system
sudo apt update && sudo apt upgrade -y
```

---

## Server Setup Guide

### 1. Install Node.js 20.x

```bash
# Install Node.js 20.x from NodeSource repository
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Verify installation
node --version  # Should show v20.x.x
npm --version   # Should show 10.x.x
```

### 2. Install PostgreSQL 16

```bash
# Add PostgreSQL repository
sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
wget -qO- https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo tee /etc/apt/trusted.gpg.d/pgdg.asc &>/dev/null

# Install PostgreSQL 16
sudo apt update
sudo apt install -y postgresql-16 postgresql-contrib-16

# Verify installation
sudo systemctl status postgresql
psql --version  # Should show 16.x
```

### 3. Install Nginx

```bash
# Install Nginx
sudo apt install -y nginx

# Start and enable Nginx
sudo systemctl start nginx
sudo systemctl enable nginx

# Verify
sudo systemctl status nginx
curl http://localhost  # Should see Nginx welcome page
```

### 4. Install PM2 (Process Manager)

```bash
# Install PM2 globally
sudo npm install -g pm2

# Verify installation
pm2 --version

# Configure PM2 to start on boot
pm2 startup systemd
# Run the command PM2 outputs
sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u ubuntu --hp /home/ubuntu
```

### 5. Install Certbot (SSL Certificates)

```bash
# Install Certbot and Nginx plugin
sudo apt install -y certbot python3-certbot-nginx
```

### 6. Create Directory for Uploads

```bash
# Create uploads directory
sudo mkdir -p /var/www/uploads

# Set ownership to ubuntu user
sudo chown -R ubuntu:ubuntu /var/www/uploads

# Set permissions (755 for directories, 644 for files)
sudo chmod 755 /var/www/uploads
```

---

## Application Deployment

### 1. Clone Repository

```bash
# Navigate to home directory
cd ~

# Clone your repository
git clone https://github.com/yourusername/MCA_projects.git
cd MCA_projects/prismberry-assessment-directus/social

# Or if using SSH keys:
# git clone git@github.com:yourusername/MCA_projects.git
```

### 2. Install Dependencies

```bash
# Install Node.js dependencies
npm install

# This will install:
# - Next.js 16.0.1
# - React 19
# - Better Auth 1.3.33
# - Drizzle ORM 0.36.4
# - All other dependencies
```

### 3. Environment Configuration

```bash
# Create production environment file
nano .env.production
```

```bash
# Database
DATABASE_URL="postgresql://social_user:your_secure_password@localhost:5432/social_db?sslmode=disable"

# Better Auth
BETTER_AUTH_SECRET="generate-a-long-random-secret-here"
BETTER_AUTH_URL="https://yourdomain.com"

# File Upload
UPLOAD_DIR="/var/www/uploads"
MAX_FILE_SIZE="5242880"  # 5MB in bytes

# Node Environment
NODE_ENV="production"
```

**Generate secure secret:**
```bash
openssl rand -base64 32
```

### 4. Build Application

```bash
# Build Next.js for production
npm run build

# This creates optimized production build in .next/ directory
```

### 5. Database Migration

```bash
# Run database migrations
npm run db:push

# Or if using migration files:
# npm run db:migrate
```

### 6. PM2 Configuration

Create PM2 ecosystem file:

```bash
nano ecosystem.config.js
```

```javascript
module.exports = {
  apps: [{
    name: 'socialplatform',
    script: 'npm',
    args: 'start',
    cwd: '/home/ubuntu/MCA_projects/prismberry-assessment-directus/social',
    instances: 1,
    exec_mode: 'fork',
    env: {
      NODE_ENV: 'production',
      PORT: 3001
    },
    error_file: '/home/ubuntu/.pm2/logs/socialplatform-error.log',
    out_file: '/home/ubuntu/.pm2/logs/socialplatform-out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env_production: {
      NODE_ENV: 'production'
    }
  }]
};
```

### 7. Start Application

```bash
# Start with PM2
pm2 start ecosystem.config.js --env production

# Save PM2 configuration
pm2 save

# Check status
pm2 status
pm2 logs socialplatform

# Test locally
curl http://localhost:3001
```

---

## Database Configuration

### 1. Create Database and User

```bash
# Switch to postgres user
sudo -u postgres psql

# In PostgreSQL prompt:
```

```sql
-- Create user
CREATE USER social_user WITH PASSWORD 'your_secure_password_here';

-- Create database
CREATE DATABASE social_db OWNER social_user;

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE social_db TO social_user;

-- Connect to database
\c social_db

-- Grant schema privileges
GRANT ALL ON SCHEMA public TO social_user;

-- Exit
\q
```

### 2. Configure PostgreSQL

```bash
# Edit PostgreSQL configuration
sudo nano /etc/postgresql/16/main/postgresql.conf
```

```ini
# Connection settings
listen_addresses = 'localhost'
port = 5432
max_connections = 100

# Memory settings
shared_buffers = 1GB               # 25% of RAM for t3.medium
effective_cache_size = 3GB         # 75% of RAM
work_mem = 10MB
maintenance_work_mem = 256MB

# Write-Ahead Log
wal_buffers = 16MB
checkpoint_completion_target = 0.9

# Query Planning
random_page_cost = 1.1
effective_io_concurrency = 200

# Logging
logging_collector = on
log_directory = 'log'
log_filename = 'postgresql-%Y-%m-%d_%H%M%S.log'
log_rotation_age = 1d
log_rotation_size = 100MB
log_line_prefix = '%m [%p] %u@%d '
log_min_duration_statement = 1000  # Log slow queries (>1s)
```

```bash
# Edit client authentication
sudo nano /etc/postgresql/16/main/pg_hba.conf
```

```ini
# Allow local connections
local   all             postgres                                peer
local   all             all                                     peer
host    social_db       social_user     127.0.0.1/32            md5
host    social_db       social_user     ::1/128                 md5
```

```bash
# Restart PostgreSQL
sudo systemctl restart postgresql

# Verify connection
PGPASSWORD='your_secure_password_here' psql -U social_user -d social_db -h localhost -c "SELECT version();"
```

### 3. Run Migrations

```bash
# From application directory
cd ~/MCA_projects/prismberry-assessment-directus/social

# Push schema to database
npm run db:push

# Verify tables created
PGPASSWORD='your_secure_password_here' psql -U social_user -d social_db -h localhost -c "\dt"
```

---

## Nginx Configuration

### 1. Create Nginx Configuration

```bash
# Create configuration file
sudo nano /etc/nginx/sites-available/socialplatform
```

```nginx
# Redirect HTTP to HTTPS
server {
    listen 80;
    listen [::]:80;
    server_name yourdomain.com www.yourdomain.com;
    
    return 301 https://$server_name$request_uri;
}

# HTTPS Server
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;

    # SSL certificates (managed by Certbot later)
    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;
    
    # SSL configuration
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;

    # Security headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/json application/javascript;

    # Max upload size (5MB for images)
    client_max_body_size 5M;
    client_body_timeout 60s;

    # Serve user uploaded files
    location /uploads/ {
        alias /var/www/uploads/;
        expires 30d;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    # Proxy to Next.js application
    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # Optimize Next.js static assets
    location /_next/static/ {
        proxy_pass http://localhost:3001;
        proxy_cache_valid 200 365d;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    # Health check endpoint
    location /health {
        access_log off;
        return 200 "healthy\n";
        add_header Content-Type text/plain;
    }
}
```

### 2. Enable Configuration

```bash
# Create symbolic link to enable site
sudo ln -s /etc/nginx/sites-available/socialplatform /etc/nginx/sites-enabled/

# Remove default site
sudo rm /etc/nginx/sites-enabled/default

# Test configuration
sudo nginx -t

# If test passes, restart Nginx
sudo systemctl restart nginx
```

## File Upload Configuration

### 1. Directory Structure

```bash
# Create organized upload structure
sudo mkdir -p /var/www/uploads/{avatars,posts,temp}

# Set ownership
sudo chown -R ubuntu:ubuntu /var/www/uploads

# Set permissions
sudo chmod -R 755 /var/www/uploads
```

### 2. Upload Validation (in Next.js API route)

```typescript
// app/api/posts/route.ts (example)
import { writeFile } from 'fs/promises';
import { join } from 'path';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get('image') as File;

  // Validate file exists
  if (!file) {
    return Response.json({ error: 'No file uploaded' }, { status: 400 });
  }

  // Validate file size
  if (file.size > MAX_FILE_SIZE) {
    return Response.json({ error: 'File too large (max 5MB)' }, { status: 400 });
  }

  // Validate file type
  if (!ALLOWED_TYPES.includes(file.type)) {
    return Response.json({ error: 'Invalid file type' }, { status: 400 });
  }

  // Generate unique filename
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(7);
  const extension = file.name.split('.').pop();
  const filename = `${timestamp}-${randomString}.${extension}`;
  
  // Save file
  const uploadDir = process.env.UPLOAD_DIR || '/var/www/uploads';
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const filepath = join(uploadDir, 'posts', filename);
  
  await writeFile(filepath, buffer);
  
  // Return public URL path
  const publicPath = `/uploads/posts/${filename}`;
  
  return Response.json({ 
    success: true, 
    path: publicPath 
  });
}
```

### 3. Disk Space Monitoring

```bash
# Create monitoring script
nano ~/monitor-uploads.sh
```

```bash
#!/bin/bash
# Monitor /var/www/uploads disk usage

THRESHOLD=80
USAGE=$(df /var/www/uploads | tail -1 | awk '{print $5}' | sed 's/%//')

if [ "$USAGE" -gt "$THRESHOLD" ]; then
  echo "WARNING: Upload directory is ${USAGE}% full"
  # Send alert (optional)
  # aws sns publish --topic-arn arn:aws:sns:... --message "Disk usage: ${USAGE}%"
fi

# List largest files
echo "Largest uploaded files:"
du -ah /var/www/uploads | sort -rh | head -20
```

```bash
chmod +x ~/monitor-uploads.sh

# Run daily
crontab -e
# Add: 0 8 * * * /home/ubuntu/monitor-uploads.sh >> /var/log/upload-monitor.log
```

### 4. Cleanup Old Files (optional)

```bash
# Create cleanup script for temp files
nano ~/cleanup-temp-uploads.sh
```

```bash
#!/bin/bash
# Clean up temporary upload files older than 24 hours

TEMP_DIR="/var/www/uploads/temp"

# Delete files older than 1 day
find "$TEMP_DIR" -type f -mtime +1 -delete

echo "$(date): Cleaned up temp uploads" >> /var/log/upload-cleanup.log
```

```bash
chmod +x ~/cleanup-temp-uploads.sh

# Run daily at 3 AM
crontab -e
# Add: 0 3 * * * /home/ubuntu/cleanup-temp-uploads.sh
```

---

## SSL Certificate Setup

### 1. Obtain SSL Certificate

**Prerequisites:**
- Domain pointed to your Elastic IP
- DNS propagated (check with `nslookup yourdomain.com`)
- Nginx configured and running

```bash
# Obtain certificate (Certbot will auto-configure Nginx)
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Follow prompts:
# - Enter email address
# - Agree to terms
# - Choose to redirect HTTP to HTTPS (recommended: yes)
```

### 2. Verify Certificate

```bash
# Check certificate details
sudo certbot certificates

# Test HTTPS access
curl -I https://yourdomain.com

# Check SSL Labs rating (external)
# Visit: https://www.ssllabs.com/ssltest/analyze.html?d=yourdomain.com
```

### 3. Auto-Renewal Configuration

```bash
# Certbot installs a cron job automatically, but verify:
sudo systemctl status certbot.timer

# Test renewal (dry run)
sudo certbot renew --dry-run

# Manual renewal (if needed)
sudo certbot renew

# Restart Nginx after renewal
sudo systemctl restart nginx
```

### 4. Renewal Hooks (optional)

```bash
# Create post-renewal hook
sudo nano /etc/letsencrypt/renewal-hooks/post/reload-nginx.sh
```

```bash
#!/bin/bash
systemctl reload nginx
pm2 reload socialplatform
```

```bash
sudo chmod +x /etc/letsencrypt/renewal-hooks/post/reload-nginx.sh
```

---

## Monitoring & Logging

### 1. PM2 Monitoring

```bash
# Real-time monitoring
pm2 monit

# Process status
pm2 status

# View logs
pm2 logs socialplatform

# Log rotation (automatic in PM2)
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 100M
pm2 set pm2-logrotate:retain 7
```

### 2. CloudWatch Agent Setup

```bash
# Install CloudWatch agent
wget https://s3.amazonaws.com/amazoncloudwatch-agent/ubuntu/amd64/latest/amazon-cloudwatch-agent.deb
sudo dpkg -i -E ./amazon-cloudwatch-agent.deb

# Create IAM role for EC2 with CloudWatch permissions
# Attach role in EC2 console: Instance → Actions → Security → Modify IAM role
```

Create configuration:

```bash
sudo nano /opt/aws/amazon-cloudwatch-agent/etc/config.json
```

```json
{
  "metrics": {
    "namespace": "SocialPlatform/EC2",
    "metrics_collected": {
      "cpu": {
        "measurement": [
          {"name": "cpu_usage_idle", "rename": "CPU_IDLE", "unit": "Percent"},
          {"name": "cpu_usage_iowait", "rename": "CPU_IOWAIT", "unit": "Percent"}
        ],
        "metrics_collection_interval": 60,
        "totalcpu": false
      },
      "disk": {
        "measurement": [
          {"name": "used_percent", "rename": "DISK_USED", "unit": "Percent"}
        ],
        "metrics_collection_interval": 60,
        "resources": ["/", "/var/www/uploads"]
      },
      "mem": {
        "measurement": [
          {"name": "mem_used_percent", "rename": "MEM_USED", "unit": "Percent"}
        ],
        "metrics_collection_interval": 60
      }
    }
  },
  "logs": {
    "logs_collected": {
      "files": {
        "collect_list": [
          {
            "file_path": "/home/ubuntu/.pm2/logs/socialplatform-error.log",
            "log_group_name": "/social/application/errors",
            "log_stream_name": "{instance_id}"
          },
          {
            "file_path": "/var/log/nginx/socialplatform-access.log",
            "log_group_name": "/social/nginx/access",
            "log_stream_name": "{instance_id}"
          },
          {
            "file_path": "/var/log/nginx/socialplatform-error.log",
            "log_group_name": "/social/nginx/errors",
            "log_stream_name": "{instance_id}"
          }
        ]
      }
    }
  }
}
```

```bash
# Start CloudWatch agent
sudo /opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-ctl \
  -a fetch-config \
  -m ec2 \
  -s \
  -c file:/opt/aws/amazon-cloudwatch-agent/etc/config.json

# Enable on startup
sudo systemctl enable amazon-cloudwatch-agent
```

### 3. Log Rotation

```bash
# Configure logrotate for Nginx
sudo nano /etc/logrotate.d/nginx-socialplatform
```

```
/var/log/nginx/socialplatform-*.log {
    daily
    missingok
    rotate 14
    compress
    delaycompress
    notifempty
    create 0640 www-data adm
    sharedscripts
    postrotate
        [ -f /var/run/nginx.pid ] && kill -USR1 `cat /var/run/nginx.pid`
    endscript
}
```

---

## Backup Strategy

### 1. EBS Snapshot Automation

**Using AWS Data Lifecycle Manager:**

1. Go to: EC2 → Elastic Block Store → Lifecycle Manager
2. Create Lifecycle Policy:
   ```
   Resource Type: Volume
   Target with: Tag (Key: Name, Value: socialplatform-production)
   Schedule: Daily at 02:00 UTC
   Retention: 7 days
   ```

**Or using AWS CLI:**

```bash
# Manual snapshot
aws ec2 create-snapshot \
  --volume-id vol-xxxxxxxxx \
  --description "Manual backup $(date +%Y-%m-%d)"

# Automated with cron
crontab -e
# Add: 0 2 * * * aws ec2 create-snapshot --volume-id vol-xxxxxxxxx --description "Auto backup $(date +\%Y-\%m-\%d)"
```

### 2. Database Backup

```bash
# Create backup script
nano ~/backup-database.sh
```

```bash
#!/bin/bash
# PostgreSQL backup script for Social Platform

# Configuration
DB_NAME="social_db"
DB_USER="social_user"
DB_PASSWORD="your_secure_password_here"
BACKUP_DIR="/var/backups/postgresql"
S3_BUCKET="s3://socialplatform-backups/database"
RETENTION_DAYS=30

# Create backup directory
mkdir -p "$BACKUP_DIR"

# Backup filename with timestamp
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="$BACKUP_DIR/social_db_$TIMESTAMP.sql.gz"

# Perform backup
export PGPASSWORD="$DB_PASSWORD"
pg_dump -U "$DB_USER" -h localhost "$DB_NAME" | gzip > "$BACKUP_FILE"

# Check if backup was successful
if [ $? -eq 0 ]; then
  echo "$(date): Database backup successful: $BACKUP_FILE" | tee -a /var/log/db-backup.log
  
  # Upload to S3
  aws s3 cp "$BACKUP_FILE" "$S3_BUCKET/" --storage-class STANDARD_IA
  
  if [ $? -eq 0 ]; then
    echo "$(date): Backup uploaded to S3" | tee -a /var/log/db-backup.log
  else
    echo "$(date): ERROR: Failed to upload to S3" | tee -a /var/log/db-backup.log
  fi
  
  # Delete local backups older than retention period
  find "$BACKUP_DIR" -name "*.sql.gz" -mtime +$RETENTION_DAYS -delete
  
else
  echo "$(date): ERROR: Database backup failed" | tee -a /var/log/db-backup.log
  exit 1
fi

unset PGPASSWORD
```

```bash
# Make executable
chmod +x ~/backup-database.sh

# Test backup
./backup-database.sh

# Schedule daily backups at 2 AM
crontab -e
# Add: 0 2 * * * /home/ubuntu/backup-database.sh
```

### 3. Backup User Uploads

```bash
# Create uploads backup script
nano ~/backup-uploads.sh
```

```bash
#!/bin/bash
# Backup user uploaded files to S3

UPLOAD_DIR="/var/www/uploads"
S3_BUCKET="s3://socialplatform-backups/uploads"
TIMESTAMP=$(date +%Y%m%d)

# Sync to S3 (incremental)
aws s3 sync "$UPLOAD_DIR" "$S3_BUCKET/$TIMESTAMP/" \
  --storage-class STANDARD_IA \
  --exclude "temp/*"

if [ $? -eq 0 ]; then
  echo "$(date): Upload backup successful" | tee -a /var/log/upload-backup.log
else
  echo "$(date): ERROR: Upload backup failed" | tee -a /var/log/upload-backup.log
fi
```

```bash
chmod +x ~/backup-uploads.sh

# Run weekly (Sundays at 3 AM)
crontab -e
# Add: 0 3 * * 0 /home/ubuntu/backup-uploads.sh
```

### 4. Backup Verification

```bash
# Create verification script
nano ~/verify-backups.sh
```

```bash
#!/bin/bash
# Verify backups exist and are recent

echo "=== Backup Verification $(date) ===" | tee -a /var/log/backup-verification.log

# Check local database backups
LATEST_DB_BACKUP=$(ls -t /var/backups/postgresql/*.sql.gz 2>/dev/null | head -1)
if [ -n "$LATEST_DB_BACKUP" ]; then
  AGE=$(find "$LATEST_DB_BACKUP" -mtime -1)
  if [ -n "$AGE" ]; then
    echo "✓ Database backup is recent: $LATEST_DB_BACKUP" | tee -a /var/log/backup-verification.log
  else
    echo "✗ WARNING: Database backup is old" | tee -a /var/log/backup-verification.log
  fi
else
  echo "✗ ERROR: No database backups found" | tee -a /var/log/backup-verification.log
fi

# Check S3 backups
S3_DB_COUNT=$(aws s3 ls s3://socialplatform-backups/database/ | wc -l)
echo "Database backups in S3: $S3_DB_COUNT" | tee -a /var/log/backup-verification.log

S3_UPLOAD_SIZE=$(aws s3 ls s3://socialplatform-backups/uploads/ --recursive --summarize | grep "Total Size" | awk '{print $3}')
echo "Upload backups in S3: $S3_UPLOAD_SIZE bytes" | tee -a /var/log/backup-verification.log

# Check EBS snapshots
SNAPSHOT_COUNT=$(aws ec2 describe-snapshots --owner-ids self --filters "Name=description,Values=*socialplatform*" --query 'Snapshots[*].SnapshotId' --output text | wc -w)
echo "EBS snapshots: $SNAPSHOT_COUNT" | tee -a /var/log/backup-verification.log
```

```bash
chmod +x ~/verify-backups.sh

# Run daily at 9 AM
crontab -e
# Add: 0 9 * * * /home/ubuntu/verify-backups.sh
```

---

## Disaster Recovery

### Scenario 1: Application Crash

**Symptoms**: PM2 shows app as "errored", website returns 502 Bad Gateway

**Recovery Steps:**

```bash
# 1. Check PM2 status
pm2 status

# 2. View error logs
pm2 logs socialplatform --err --lines 100

# 3. Restart application
pm2 restart socialplatform

# 4. If restart fails, check for issues
cd ~/MCA_projects/prismberry-assessment-directus/social

# Check if build is valid
ls -la .next/

# Rebuild if necessary
npm run build

# Restart
pm2 restart socialplatform

# 5. Monitor logs
pm2 logs socialplatform --lines 50
```

**Recovery Time**: 2-5 minutes

### Scenario 2: Database Corruption

**Symptoms**: Database errors in logs, data inconsistencies

**Recovery Steps:**

```bash
# 1. Stop application
pm2 stop socialplatform

# 2. Check PostgreSQL status
sudo systemctl status postgresql

# 3. Connect to database
sudo -u postgres psql social_db

# Run integrity checks
VACUUM FULL;
REINDEX DATABASE social_db;
\q

# 4. If corruption detected, restore from backup
# Find latest backup
ls -lt /var/backups/postgresql/

# Or download from S3
aws s3 cp s3://socialplatform-backups/database/social_db_latest.sql.gz /tmp/

# Drop existing database (CAUTION!)
sudo -u postgres psql -c "DROP DATABASE social_db;"
sudo -u postgres psql -c "CREATE DATABASE social_db OWNER social_user;"

# Restore backup
gunzip < /tmp/social_db_latest.sql.gz | PGPASSWORD='your_password' psql -U social_user -h localhost social_db

# 5. Restart application
pm2 restart socialplatform

# 6. Verify functionality
curl http://localhost:3001/health
```

**Recovery Time**: 15-30 minutes

### Scenario 3: Complete Instance Failure

**Symptoms**: Cannot SSH, instance unreachable

**Recovery Steps:**

**Option A: Restore from EBS Snapshot**

```bash
# 1. In AWS Console: EC2 → Snapshots
# Find latest snapshot

# 2. Actions → Create Volume from Snapshot
# Select same availability zone as original instance

# 3. Stop old instance (if possible) or terminate

# 4. Launch new instance
# Same configuration as original

# 5. Detach old EBS volume from new instance

# 6. Attach restored volume as /dev/sda1

# 7. Start instance

# 8. Update Elastic IP association
# Disassociate from old instance → Associate with new instance

# 9. SSH to new instance and verify
ssh ubuntu@<elastic-ip>
pm2 status
sudo systemctl status postgresql
sudo systemctl status nginx
```

**Option B: Fresh Install with Backup Restore**

```bash
# 1. Launch new EC2 instance (same configuration)

# 2. Follow "Server Setup Guide" section

# 3. Restore database from S3
aws s3 cp s3://socialplatform-backups/database/social_db_latest.sql.gz /tmp/
gunzip < /tmp/social_db_latest.sql.gz | PGPASSWORD='your_password' psql -U social_user -h localhost social_db

# 4. Restore uploads from S3
aws s3 sync s3://socialplatform-backups/uploads/latest/ /var/www/uploads/

# 5. Deploy application (follow "Application Deployment" section)

# 6. Update Elastic IP

# 7. Test thoroughly
```

**Recovery Time**: 20-60 minutes (depending on method)

### Scenario 4: Disk Space Full

**Symptoms**: Application errors, database write failures

**Recovery Steps:**

```bash
# 1. Check disk usage
df -h
du -sh /var/* /home/ubuntu/* | sort -hr | head -20

# 2. Clear PM2 logs
pm2 flush

# 3. Clear old logs
sudo find /var/log -name "*.gz" -mtime +7 -delete
sudo journalctl --vacuum-time=3d

# 4. Clear old uploads (if applicable)
# CAUTION: Only delete if you have backups!
sudo find /var/www/uploads/temp -type f -mtime +7 -delete

# 5. If still full, expand EBS volume
# In AWS Console: EC2 → Volumes → Select volume → Actions → Modify Volume
# Increase size (e.g., 50 GB → 100 GB)

# 6. Extend filesystem on instance
sudo growpart /dev/xvda 1
sudo resize2fs /dev/xvda1

# 7. Verify new size
df -h
```

**Recovery Time**: 10-30 minutes

---

## Security Configuration

### SSH Hardening

```bash
# Edit SSH configuration
sudo nano /etc/ssh/sshd_config
```

```ini
# Disable root login
PermitRootLogin no

# Use SSH keys only
PasswordAuthentication no
PubkeyAuthentication yes

# Limit users
AllowUsers ubuntu

# Change default port (optional)
Port 2222

# Disable X11 forwarding
X11Forwarding no

# Set strict modes
StrictModes yes

# Login grace time
LoginGraceTime 60

# Max auth attempts
MaxAuthTries 3
```

```bash
# Restart SSH
sudo systemctl restart sshd
```

### Firewall Configuration (UFW)

```bash
# Default policies
sudo ufw default deny incoming
sudo ufw default allow outgoing

# Allow SSH
sudo ufw allow 22/tcp
# Or custom port: sudo ufw allow 2222/tcp

# Allow HTTP and HTTPS
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Enable firewall
sudo ufw enable

# Check status
sudo ufw status verbose
```

### Fail2Ban Setup

```bash
# Install Fail2Ban
sudo apt install -y fail2ban

# Configure
sudo nano /etc/fail2ban/jail.local
```

```ini
[DEFAULT]
bantime = 3600
findtime = 600
maxretry = 5

[sshd]
enabled = true
port = 22
maxretry = 3

[nginx-http-auth]
enabled = true
port = http,https
filter = nginx-http-auth
logpath = /var/log/nginx/socialplatform-error.log

[nginx-botsearch]
enabled = true
port = http,https
filter = nginx-botsearch
logpath = /var/log/nginx/socialplatform-access.log
maxretry = 2
```

```bash
# Start Fail2Ban
sudo systemctl start fail2ban
sudo systemctl enable fail2ban

# Check status
sudo fail2ban-client status
```

### Environment Variables Security

```bash
# Secure .env files
chmod 600 /home/ubuntu/MCA_projects/prismberry-assessment-directus/social/.env.production

# Add to .gitignore
echo ".env.production" >> .gitignore
echo ".env.local" >> .gitignore
```

### Database Security

```bash
# Edit PostgreSQL config
sudo nano /etc/postgresql/16/main/postgresql.conf
```

```ini
# Listen only on localhost
listen_addresses = 'localhost'

# Enable SSL
ssl = on
ssl_cert_file = '/etc/ssl/certs/ssl-cert-snakeoil.pem'
ssl_key_file = '/etc/ssl/private/ssl-cert-snakeoil.key'
```

```bash
# Restart PostgreSQL
sudo systemctl restart postgresql
```

### Regular Security Updates

```bash
# Create update script
sudo nano /usr/local/bin/security-updates.sh
```

```bash
#!/bin/bash
echo "$(date): Running security updates" >> /var/log/security-updates.log

apt update
apt upgrade -y --with-new-pkgs
apt autoremove -y
apt autoclean

echo "$(date): Security updates completed" >> /var/log/security-updates.log
```

```bash
chmod +x /usr/local/bin/security-updates.sh

# Schedule weekly (Sundays at 3 AM)
sudo crontab -e
# Add: 0 3 * * 0 /usr/local/bin/security-updates.sh
```

---

## Cost Analysis

### Monthly Cost Breakdown

#### Scenario 1: Testing/Development (t3.small)

```
┌────────────────────────────────────────────┐
│ AWS EC2 t3.small (1 vCPU, 2 GB RAM)       │
├────────────────────────────────────────────┤
│ Instance (730 hours)          $15.18      │
│ EBS Storage (30 GB gp3)       $2.40       │
│ Elastic IP (attached)         Free        │
│ Data Transfer (50 GB out)     $4.50       │
│ Snapshots (30 GB × 3)         $2.70       │
│ S3 Storage (10 GB uploads)    $0.23       │
│ CloudWatch (basic)            $0.50       │
├────────────────────────────────────────────┤
│ TOTAL:                        $25.51/mo   │
└────────────────────────────────────────────┘

Suitable for: Development, staging, testing
Users: 10-50 concurrent
```

#### Scenario 2: Production MVP (t3.medium) - RECOMMENDED

```
┌────────────────────────────────────────────┐
│ AWS EC2 t3.medium (2 vCPU, 4 GB RAM)      │
├────────────────────────────────────────────┤
│ Instance (730 hours)          $30.37      │
│ EBS Storage (50 GB gp3)       $4.00       │
│ Elastic IP (attached)         Free        │
│ Data Transfer (200 GB out)    $17.10      │
│ Snapshots (50 GB × 7)         $17.50      │
│ S3 Storage (50 GB uploads)    $1.15       │
│ CloudWatch (basic)            $2.00       │
│ Route 53 (hosted zone)        $0.50       │
├────────────────────────────────────────────┤
│ TOTAL:                        $72.62/mo   │
└────────────────────────────────────────────┘

Suitable for: Production MVP, 100-500 users
Peak: 500+ concurrent users during high traffic
```

#### Scenario 3: Production Growth (t3.large)

```
┌────────────────────────────────────────────┐
│ AWS EC2 t3.large (2 vCPU, 8 GB RAM)       │
├────────────────────────────────────────────┤
│ Instance (730 hours)          $60.74      │
│ EBS Storage (100 GB gp3)      $8.00       │
│ Elastic IP (attached)         Free        │
│ Data Transfer (500 GB out)    $40.50      │
│ Snapshots (100 GB × 7)        $35.00      │
│ S3 Storage (100 GB uploads)   $2.30       │
│ CloudWatch (enhanced)         $5.00       │
│ Route 53 (hosted zone)        $0.50       │
├────────────────────────────────────────────┤
│ TOTAL:                        $152.04/mo  │
└────────────────────────────────────────────┘

Suitable for: Growing production, 500-1000 users
Peak: 1000+ concurrent during viral content
```

### Cost Optimization Strategies

#### Use Reserved Instances
```
1-Year Reserved (t3.medium):
  - On-Demand: $30.37/mo = $364/year
  - Reserved: $23/mo = $276/year
  - Savings: $88/year (24%)

3-Year Reserved (t3.medium):
  - Reserved: $17/mo = $204/year
  - Savings: $160/year (44%)
```

#### Optimize Data Transfer
```
- Enable gzip compression (configured)
- Optimize image sizes before upload
- Implement lazy loading for images
- Use CloudFront CDN for global users (if needed)
```

#### S3 Storage Optimization
```
- Use Intelligent-Tiering for uploads
- Lifecycle policy: Move old uploads to Glacier after 90 days
- Delete temporary files regularly
```

---

## Scaling Strategy

### Vertical Scaling (Simpler, Recommended First)

#### When to Scale Up

Monitor these metrics:
- CPU usage >80% sustained
- Memory usage >80% sustained
- Disk I/O saturation
- Slow upload/download times

#### Scaling Steps

```bash
# 1. Snapshot before scaling
aws ec2 create-snapshot --volume-id vol-xxx --description "Pre-scale snapshot"

# 2. Stop instance
aws ec2 stop-instances --instance-ids i-xxx

# 3. Change instance type
aws ec2 modify-instance-attribute --instance-id i-xxx --instance-type t3.large

# 4. Start instance
aws ec2 start-instances --instance-ids i-xxx

# 5. Verify
ssh ubuntu@your-ip
pm2 status
sudo systemctl status postgresql nginx
```

**Downtime**: 5-10 minutes

### Vertical Scaling Path

```
Stage 1 (0-1k users):     t3.small  (1 vCPU, 2 GB)   ~$26/mo
Stage 2 (1k-5k users):    t3.medium (2 vCPU, 4 GB)   ~$73/mo
Stage 3 (5k-10k users):   t3.large  (2 vCPU, 8 GB)   ~$152/mo
Stage 4 (10k-20k users):  t3.xlarge (4 vCPU, 16 GB)  ~$305/mo
Stage 5 (20k+ users):     Consider horizontal scaling
```

### Horizontal Scaling (When Vertical Maxes Out)

#### Architecture Changes Needed

```
Single Instance → Multi-Instance:

1. Move Database to RDS
   - PostgreSQL RDS Multi-AZ
   - Automated backups
   - Read replicas for queries

2. Move Uploads to S3
   - Change UPLOAD_DIR to S3 bucket
   - Use signed URLs for uploads
   - CloudFront CDN for serving

3. Add Application Load Balancer
   - Distribute traffic
   - Health checks
   - SSL termination

4. Auto Scaling Group
   - 2-10 EC2 instances
   - Scale based on CPU/memory
   - Multi-AZ deployment

5. Session Store (ElastiCache Redis)
   - Shared sessions across instances
   - Better Auth compatibility
```

#### Estimated Cost (Multi-Instance)

```
Load Balancer:            $22/month
EC2 instances (×2):       $61/month
RDS PostgreSQL:           $55/month
ElastiCache Redis:        $15/month
S3 Storage (100 GB):      $2.30/month
CloudFront:               $10/month
Enhanced monitoring:      $10/month
─────────────────────────────────
Total:                    $175/month (base)
```

---

## Maintenance Procedures

### Daily Tasks (5 minutes)

```bash
# Quick health check
nano ~/health-check.sh
```

```bash
#!/bin/bash
echo "=== Social Platform Health Check $(date) ==="

echo "PM2 Status:"
pm2 status | grep socialplatform

echo -e "\nDisk Usage:"
df -h / /var/www/uploads | tail -2

echo -e "\nMemory Usage:"
free -m | grep Mem | awk '{printf "Used: %d MB (%.1f%%)\n", $3, $3/$2*100}'

echo -e "\nPostgreSQL:"
sudo systemctl is-active postgresql

echo -e "\nNginx:"
sudo systemctl is-active nginx

echo -e "\nRecent Errors:"
pm2 logs socialplatform --err --lines 5 --nostream
```

```bash
chmod +x ~/health-check.sh
```

### Weekly Tasks (30 minutes)

1. **System Updates Check**
   ```bash
   apt update && apt list --upgradable
   ```

2. **Review Metrics**
   - Check CloudWatch dashboards
   - Review error rates
   - Monitor upload storage growth

3. **Check Backups**
   ```bash
   ls -lht /var/backups/postgresql/ | head -5
   aws s3 ls s3://socialplatform-backups/database/ | tail -5
   ```

4. **SSL Certificate Status**
   ```bash
   sudo certbot certificates
   ```

### Monthly Tasks (2 hours)

1. **Security Updates**
   ```bash
   sudo apt update && sudo apt upgrade -y
   sudo reboot
   ```

2. **Database Optimization**
   ```sql
   psql -U social_user -d social_db
   VACUUM ANALYZE;
   REINDEX DATABASE social_db;
   ```

3. **Review Upload Storage**
   ```bash
   du -sh /var/www/uploads/*
   # Consider archiving old uploads
   ```

4. **Performance Review**
   - Analyze response times
   - Review slow queries
   - Check for memory leaks

5. **Cost Review**
   - Check AWS billing
   - Optimize if needed

---

## Troubleshooting Guide

### Issue: Image Uploads Failing

**Symptoms**: Upload errors, 413 Request Entity Too Large

```bash
# Check Nginx client_max_body_size
sudo nano /etc/nginx/sites-available/socialplatform
# Ensure: client_max_body_size 5M;

# Restart Nginx
sudo systemctl restart nginx

# Check disk space
df -h /var/www/uploads

# Check permissions
ls -la /var/www/uploads
# Should be: drwxr-xr-x ubuntu ubuntu

# Fix if needed
sudo chown -R ubuntu:ubuntu /var/www/uploads
sudo chmod 755 /var/www/uploads
```

### Issue: Slow Image Loading

**Symptoms**: Images take long to load

```bash
# Check Nginx cache configuration
sudo nano /etc/nginx/sites-available/socialplatform

# Ensure this exists:
location /uploads/ {
    alias /var/www/uploads/;
    expires 30d;
    add_header Cache-Control "public, immutable";
}

# Restart Nginx
sudo systemctl restart nginx

# Consider image optimization
# Install ImageMagick for resizing
sudo apt install imagemagick
```

### Issue: Application Not Responding

```bash
# Check PM2
pm2 status
pm2 logs socialplatform --err --lines 50

# Restart if needed
pm2 restart socialplatform

# Check port availability
sudo netstat -tlnp | grep :3001
```

### Issue: Database Connection Errors

```bash
# Check PostgreSQL
sudo systemctl status postgresql

# Check connections
PGPASSWORD='your_password' psql -U social_user -d social_db -c \
  "SELECT count(*) FROM pg_stat_activity;"

# Restart if needed
sudo systemctl restart postgresql
```

### Issue: High CPU Usage

```bash
# Check processes
htop

# Check application logs
pm2 logs socialplatform

# Consider scaling up
```

### Issue: Disk Space Full

```bash
# Check usage
df -h
du -sh /var/* /var/www/uploads/* | sort -hr | head -20

# Clear logs
pm2 flush
sudo journalctl --vacuum-time=7d

# Clear temp uploads
sudo find /var/www/uploads/temp -type f -mtime +2 -delete

# Expand volume if needed
# (See Disaster Recovery section)
```

---

## Implementation Timeline

### Day 1: Infrastructure Setup (4-6 hours)

**Morning (2-3 hours)**
- [ ] Create AWS account / billing alerts
- [ ] Launch EC2 t3.medium instance
- [ ] Configure security group
- [ ] Allocate Elastic IP
- [ ] SSH key setup and connection

**Afternoon (2-3 hours)**
- [ ] System update
- [ ] Install Node.js 20.x
- [ ] Install PostgreSQL 16
- [ ] Install Nginx
- [ ] Install PM2
- [ ] Configure UFW firewall

### Day 2: Application Deployment (4-6 hours)

**Morning (2-3 hours)**
- [ ] Create PostgreSQL database/user
- [ ] Clone repository
- [ ] Install dependencies
- [ ] Build Next.js app
- [ ] Create `.env.production`
- [ ] Run migrations

**Afternoon (2-3 hours)**
- [ ] Create uploads directory
- [ ] Create PM2 ecosystem config
- [ ] Start app with PM2
- [ ] Test on localhost:3001
- [ ] Configure Nginx
- [ ] Test Nginx

### Day 3: SSL & Monitoring (3-4 hours)

**Morning (1-2 hours)**
- [ ] Point domain to Elastic IP
- [ ] Install Certbot
- [ ] Obtain SSL certificates
- [ ] Test HTTPS access

**Afternoon (2 hours)**
- [ ] Install CloudWatch agent
- [ ] Configure metrics & logs
- [ ] Create dashboards
- [ ] Configure alarms

### Day 4: Backups & Security (3-4 hours)

**Morning (2 hours)**
- [ ] Configure EBS snapshots
- [ ] Create S3 bucket
- [ ] Set up database backup script
- [ ] Set up upload backup script
- [ ] Configure cron jobs

**Afternoon (2 hours)**
- [ ] Harden SSH
- [ ] Install Fail2Ban
- [ ] Review security groups
- [ ] Configure log rotation
- [ ] Security audit

### Day 5: Testing & Launch (2-3 hours)

**Morning (1-2 hours)**
- [ ] Test all user flows
- [ ] Test image uploads
- [ ] Performance testing
- [ ] Create documentation

**Afternoon (1 hour)**
- [ ] Pre-launch checklist
- [ ] Snapshot backup
- [ ] Monitor for 1-2 hours
- [ ] Announce launch

### Total: 3-5 days (16-23 hours)

---

## Conclusion

This specification provides a complete deployment guide for the Social Media Platform on a single EC2 instance. The architecture is:

✅ **Cost-Effective**: ~$26/month testing, ~$73/month production  
✅ **Scalable**: Clear upgrade path to multi-instance architecture  
✅ **Reliable**: Automated backups, monitoring, disaster recovery  
✅ **Secure**: SSH hardening, Fail2Ban, UFW, regular updates  
✅ **Maintainable**: Clear procedures, automation scripts  

### Key Differences from Assessment Platform

- **Port**: Application runs on 3001 (vs 3000)
- **File Storage**: `/var/www/uploads/` for user images
- **Nginx**: Static file serving for uploads
- **Testing**: Vitest framework (vs Jest)
- **Features**: Social networking vs timed assessments

### Next Steps

1. Follow Day 1-5 implementation timeline
2. Monitor closely in first week
3. Establish maintenance routine
4. Plan scaling when needed

---

**Document Version**: 1.0.0  
**Last Updated**: October 29, 2025  
**Status**: Production Ready  
**Platform**: Social Media Platform