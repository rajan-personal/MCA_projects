# Cloud Hosting Specification Report
## AssessHub - Online Assessment Platform

---

**Document Version:** 1.0.0  
**Date:** October 29, 2025  
**Project:** AssessHub Assessment Platform  
**Organization:** Prismberry  
**Classification:** Infrastructure Documentation

---

## Executive Summary

This document provides comprehensive cloud hosting specifications for **AssessHub**, an online assessment platform built with Next.js 16, Better Auth, Drizzle ORM, and PostgreSQL. The platform enables timed verbal and numerical ability tests with instant scoring and automated submission.

### Deployment Strategy: Single EC2 Instance

**Recommended Configuration:**
- **Application Server**: AWS EC2 t3.small/t3.medium
- **Database**: PostgreSQL 16 (on same instance)
- **Reverse Proxy**: Nginx for routing and SSL termination
- **Process Manager**: PM2 for Node.js process management
- **Estimated Monthly Cost**: $25-45 for MVP (all-in-one instance)

### Architecture Benefits

✅ **Cost-Effective**: Single server starting at ~$25/month  
✅ **Simple Setup**: Deploy in 2-3 hours  
✅ **Easy Maintenance**: One instance to manage  
✅ **Sufficient for MVP**: Supports 1,000-5,000 users  
✅ **Clear Upgrade Path**: Scale vertically when needed

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Technical Requirements](#technical-requirements)
3. [Cloud Provider Selection](#cloud-provider-selection)
4. [Recommended Architecture](#recommended-architecture)
5. [EC2 Instance Configuration](#ec2-instance-configuration)
6. [Server Setup Guide](#server-setup-guide)
7. [Application Deployment](#application-deployment)
8. [Database Configuration](#database-configuration)
9. [Nginx Configuration](#nginx-configuration)
10. [SSL Certificate Setup](#ssl-certificate-setup)
11. [Monitoring & Logging](#monitoring--logging)
12. [Backup Strategy](#backup-strategy)
13. [Disaster Recovery](#disaster-recovery)
14. [Security Configuration](#security-configuration)
15. [Cost Analysis](#cost-analysis)
16. [Scaling Strategy](#scaling-strategy)
17. [Maintenance Procedures](#maintenance-procedures)
18. [Troubleshooting Guide](#troubleshooting-guide)
19. [Implementation Timeline](#implementation-timeline)

---

## Project Overview

### Application Profile

**AssessHub** is a timed assessment platform featuring:

- **Timed Tests**: 10-minute tests with automatic submission
- **Question Types**: Verbal and numerical ability assessments
- **Instant Scoring**: Immediate results with answer review
- **User Management**: Authentication with Better Auth
- **Session Management**: 7-day session expiry

### Technical Stack

```
Frontend: Next.js 16.0.0 (React 19)
Backend: Next.js API Routes
Authentication: Better Auth 1.3.33
Database: PostgreSQL 16
ORM: Drizzle ORM 0.44.7
Testing: Jest 29.x
Styling: Tailwind CSS v4
Runtime: Node.js 20.x
```

### Key Features

1. **Authentication System**
   - Email/password registration and login
   - Secure session management
   - Protected routes

2. **Assessment Module**
   - Pre-seeded verbal and numerical tests
   - 10 questions per assessment
   - 10-minute time limit

3. **Test-Taking Interface**
   - Real-time countdown timer
   - Question navigation
   - Answer tracking
   - Auto-submission at timeout

4. **Scoring System**
   - Instant result calculation
   - Percentage scoring
   - Complete answer review
   - Attempt history

---

## Technical Requirements

### Compute Requirements

```yaml
Development/Staging:
  CPU: 1 vCPU
  Memory: 2 GB RAM
  Concurrent Users: 10-50
  Instance: t3.small

Production MVP:
  CPU: 2 vCPU
  Memory: 4 GB RAM
  Concurrent Users: 100-500
  Instance: t3.medium
  
Production Growth:
  CPU: 2 vCPU
  Memory: 8 GB RAM
  Concurrent Users: 500-1000
  Instance: t3.large
```

### Storage Requirements

```yaml
Database:
  Initial Size: 1-5 GB
  Growth Rate: ~50 MB/month
  Backup Space: 2-3x database size
  Total: 10-20 GB

Application:
  Code & Dependencies: 500 MB
  Logs: 1-2 GB (with rotation)
  System: 5 GB
  Total: 10 GB

Recommended EBS: 30-50 GB SSD (gp3)
```

### Network Requirements

```yaml
Bandwidth:
  Average: 50-100 GB/month
  Peak: 200-300 GB/month (exam periods)
  
Latency:
  Target: <100ms (regional)
  Max Acceptable: <500ms
  
Connections:
  Max Concurrent: 500
  Database Connections: 20-50
```

### Performance Targets

```yaml
Page Load Time: <2 seconds
API Response Time: <500ms (p95)
Test Submission: <1 second
Database Queries: <100ms average
Uptime: 99.5%+ (43 minutes downtime/month max)
```

---

## Cloud Provider Selection

### Option 1: AWS EC2 (Recommended)

#### Advantages
✅ Industry standard, reliable infrastructure  
✅ Extensive documentation and community support  
✅ Easy to scale (vertical and horizontal)  
✅ Good free tier for testing  
✅ Comprehensive monitoring (CloudWatch)  
✅ Flexible pricing options

#### Estimated Monthly Cost
```
t3.small (1 vCPU, 2 GB):   $15/month
t3.medium (2 vCPU, 4 GB):  $30/month
EBS Storage (30 GB):       $2.40/month
Data Transfer (100 GB):    $9/month
Elastic IP:                Free (when attached)
Snapshots (30 GB × 3):     $2.70/month
──────────────────────────────────────
Total (t3.small):          ~$29/month
Total (t3.medium):         ~$44/month
```

#### Best For
- Production deployments
- Need for 99.5%+ uptime
- When scaling is expected
- Integration with other AWS services

---

### Option 2: DigitalOcean Droplet

#### Advantages
✅ Simpler pricing, easier to understand  
✅ User-friendly interface  
✅ Good documentation  
✅ Automatic backups included  
✅ Slightly cheaper than AWS

#### Estimated Monthly Cost
```
Basic Droplet (1 vCPU, 2 GB):    $12/month
Basic Droplet (2 vCPU, 4 GB):    $24/month
Automated Backups (20%):         $2.40-4.80/month
──────────────────────────────────────
Total (2GB):                     ~$14/month
Total (4GB):                     ~$29/month
```

#### Best For
- Simpler management interface
- Predictable pricing
- Smaller scale deployments

---

### Option 3: AWS Lightsail

#### Advantages
✅ Simplified AWS offering  
✅ Fixed pricing  
✅ Easy setup  
✅ Good for beginners

#### Estimated Monthly Cost
```
1 GB RAM:                        $5/month
2 GB RAM:                        $10/month
4 GB RAM:                        $20/month
Includes: 1-2 TB transfer
```

#### Best For
- Quick prototypes
- Fixed budget requirements
- When AWS complexity is overwhelming

---

## Recommended Architecture

### Single EC2 Instance Design

```
┌──────────────────────────────────────────────────────────┐
│                      End Users                           │
│                 (Assessment Takers)                      │
└─────────────────────┬────────────────────────────────────┘
                      │
                      │ HTTPS (Port 443)
                      │
                      ▼
            assessment.yourdomain.com
                      │
                      ▼
┌──────────────────────────────────────────────────────────┐
│         AWS EC2 Instance (t3.medium)                     │
│         Ubuntu 22.04 LTS                                 │
│         Public IP: xx.xx.xx.xx (Elastic IP)              │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  ┌────────────────────────────────────────────────┐    │
│  │      Nginx Reverse Proxy (Port 80/443)         │    │
│  │  - SSL/TLS Termination (Let's Encrypt)         │    │
│  │  - Gzip Compression                            │    │
│  │  - Security Headers                            │    │
│  │  - Request Logging                             │    │
│  └───────────────────┬────────────────────────────┘    │
│                      │                                   │
│                      │ Proxy to localhost:3000           │
│                      ▼                                   │
│  ┌────────────────────────────────────────────────┐    │
│  │      AssessHub Application                     │    │
│  │      Next.js 16 / Node.js 20                   │    │
│  │      PM2 Process Manager                       │    │
│  │      Port: 3000                                │    │
│  └───────────────────┬────────────────────────────┘    │
│                      │                                   │
│                      │ Database Connection               │
│                      │ (localhost:5432)                  │
│                      ▼                                   │
│  ┌────────────────────────────────────────────────┐    │
│  │      PostgreSQL 16                             │    │
│  │      Port: 5432                                │    │
│  │      Database: assessment_db                   │    │
│  │      Tables:                                   │    │
│  │        - user (Better Auth)                    │    │
│  │        - session (Better Auth)                 │    │
│  │        - assessments                           │    │
│  │        - questions                             │    │
│  │        - attempts                              │    │
│  └────────────────────────────────────────────────┘    │
│                                                          │
│  ┌────────────────────────────────────────────────┐    │
│  │      EBS Volume (30-50 GB SSD)                 │    │
│  │      /var/lib/postgresql/  (database files)    │    │
│  │      /var/log/             (application logs)  │    │
│  │      /home/ubuntu/app/     (application code)  │    │
│  └────────────────────────────────────────────────┘    │
│                                                          │
│  ┌────────────────────────────────────────────────┐    │
│  │      Supporting Services                       │    │
│  │      - PM2 (Process Manager & Monitor)         │    │
│  │      - CloudWatch Agent (AWS Monitoring)       │    │
│  │      - Cron Jobs (Backups, Cleanup)            │    │
│  │      - UFW Firewall                            │    │
│  └────────────────────────────────────────────────┘    │
│                                                          │
└──────────────────────────────────────────────────────────┘
                      │
                      │ EBS Snapshots (Daily)
                      ▼
              ┌───────────────────┐
              │  AWS S3 Storage   │
              │  (Backup Archive) │
              │  7-day retention  │
              └───────────────────┘
```

### Component Responsibilities

| Component | Purpose | Port | Management |
|-----------|---------|------|------------|
| Nginx | Reverse proxy, SSL termination | 80, 443 | systemctl |
| Next.js App | Application logic, API routes | 3000 | PM2 |
| PostgreSQL | Data persistence | 5432 | systemctl |
| PM2 | Process management, auto-restart | - | CLI |
| CloudWatch | Monitoring, logging, alerts | - | AWS Console |

---

## EC2 Instance Configuration

### Instance Selection Guide

```yaml
For Testing/Development:
  Type: t3.small
  vCPU: 1
  Memory: 2 GB
  Cost: ~$15/month
  Users: 10-50 concurrent
  Use Case: Development, staging, demos

For Production MVP:
  Type: t3.medium
  vCPU: 2
  Memory: 4 GB
  Cost: ~$30/month
  Users: 100-500 concurrent
  Use Case: Launch, early growth

For Production Growth:
  Type: t3.large
  vCPU: 2
  Memory: 8 GB
  Cost: ~$60/month
  Users: 500-1000 concurrent
  Use Case: Scaling, exam seasons
```

### Launch Configuration

```bash
# AWS CLI command to launch instance
aws ec2 run-instances \
  --image-id ami-0c7217cdde317cfec \
  --instance-type t3.medium \
  --key-name your-keypair-name \
  --security-group-ids sg-xxxxxxxxx \
  --subnet-id subnet-xxxxxxxxx \
  --block-device-mappings '[
    {
      "DeviceName": "/dev/sda1",
      "Ebs": {
        "VolumeSize": 30,
        "VolumeType": "gp3",
        "DeleteOnTermination": false,
        "Encrypted": true
      }
    }
  ]' \
  --tag-specifications '
    ResourceType=instance,Tags=[
      {Key=Name,Value=AssessHub-Production},
      {Key=Environment,Value=production},
      {Key=Application,Value=assessment}
    ]
  '
```

### Security Group Configuration

```yaml
Inbound Rules:
  - Type: SSH
    Protocol: TCP
    Port: 22
    Source: Your IP only (e.g., 1.2.3.4/32)
    Description: SSH access for management
  
  - Type: HTTP
    Protocol: TCP
    Port: 80
    Source: 0.0.0.0/0
    Description: HTTP (redirects to HTTPS)
  
  - Type: HTTPS
    Protocol: TCP
    Port: 443
    Source: 0.0.0.0/0
    Description: HTTPS web traffic

Outbound Rules:
  - All traffic allowed (default)
  - Needed for: apt updates, npm packages, backups
```

### Elastic IP Setup

```bash
# Allocate Elastic IP
aws ec2 allocate-address --domain vpc

# Associate with instance
aws ec2 associate-address \
  --instance-id i-1234567890abcdef0 \
  --allocation-id eipalloc-12345678
```

**Benefits of Elastic IP:**
- Static public IP address
- Survives instance stop/start
- Can be reassigned to new instance
- Free when attached to running instance

---

## Server Setup Guide

### Step 1: Initial Connection

```bash
# SSH into your EC2 instance
ssh -i your-keypair.pem ubuntu@your-elastic-ip

# Update system packages
sudo apt update
sudo apt upgrade -y
```

### Step 2: Install Node.js 20.x

```bash
# Add NodeSource repository
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -

# Install Node.js
sudo apt install -y nodejs

# Verify installation
node --version  # Should show v20.x.x
npm --version   # Should show v10.x.x
```

### Step 3: Install PostgreSQL 16

```bash
# Add PostgreSQL APT repository
sudo apt install -y postgresql-common
sudo /usr/share/postgresql-common/pgdg/apt.postgresql.org.sh

# Install PostgreSQL 16
sudo apt install -y postgresql-16 postgresql-contrib-16

# Verify installation
sudo systemctl status postgresql

# Check version
sudo -u postgres psql --version
```

### Step 4: Install Nginx

```bash
# Install Nginx
sudo apt install -y nginx

# Start and enable Nginx
sudo systemctl start nginx
sudo systemctl enable nginx

# Verify installation
sudo systemctl status nginx
```

### Step 5: Install PM2

```bash
# Install PM2 globally
sudo npm install -g pm2

# Verify installation
pm2 --version
```

### Step 6: Install Additional Tools

```bash
# Install Git (for cloning repository)
sudo apt install -y git

# Install Certbot for SSL certificates
sudo apt install -y certbot python3-certbot-nginx

# Install monitoring tools
sudo apt install -y htop iotop nethogs
```

### Step 7: Configure Firewall

```bash
# Setup UFW (Uncomplicated Firewall)
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable

# Check status
sudo ufw status
```

---

## Application Deployment

### Step 1: Clone Repository

```bash
# Navigate to home directory
cd /home/ubuntu

# Clone your repository
git clone https://github.com/rajan-personal/MCA_projects.git

# Navigate to assessment directory
cd MCA_projects/prismberry-assessment-directus/assessment
```

### Step 2: Install Dependencies

```bash
# Install production dependencies
npm ci --production

# Or if you need dev dependencies for building
npm install
```

### Step 3: Build Application

```bash
# Build Next.js application
npm run build

# Verify build output
ls -la .next/
```

### Step 4: Configure Environment Variables

```bash
# Create production environment file
nano .env.production

# Add the following configuration:
```

```bash
# Database Connection
DATABASE_URL="postgresql://assessment_user:YOUR_PASSWORD@localhost:5432/assessment_db"

# Better Auth Configuration
BETTER_AUTH_SECRET="your-very-long-random-secret-key-min-32-characters"
BETTER_AUTH_URL="https://assessment.yourdomain.com"

# Application URL
NEXT_PUBLIC_APP_URL="https://assessment.yourdomain.com"

# Environment
NODE_ENV="production"

# Port
PORT=3000
```

**Security Note**: Replace all placeholder values with actual secure credentials

### Step 5: PM2 Configuration

Create PM2 ecosystem file:

```bash
nano /home/ubuntu/MCA_projects/prismberry-assessment-directus/ecosystem.config.js
```

```javascript
module.exports = {
  apps: [{
    name: 'assesshub',
    cwd: '/home/ubuntu/MCA_projects/prismberry-assessment-directus/assessment',
    script: 'npm',
    args: 'start',
    instances: 1,
    exec_mode: 'fork',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: '/var/log/pm2/assesshub-error.log',
    out_file: '/var/log/pm2/assesshub-out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true,
    max_memory_restart: '500M',
    autorestart: true,
    max_restarts: 10,
    min_uptime: '10s',
    restart_delay: 4000
  }]
};
```

### Step 6: Start Application with PM2

```bash
# Create log directory
sudo mkdir -p /var/log/pm2
sudo chown ubuntu:ubuntu /var/log/pm2

# Start application
pm2 start ecosystem.config.js

# Save PM2 configuration
pm2 save

# Setup PM2 to start on system boot
pm2 startup systemd
# Copy and run the command it outputs

# Check status
pm2 status
pm2 logs assesshub --lines 50
```

### Step 7: Test Application

```bash
# Test if app is running on localhost
curl http://localhost:3000

# Should return HTML from your Next.js app
```

---

## Database Configuration

### Step 1: Create Database and User

```bash
# Switch to postgres user
sudo -u postgres psql
```

```sql
-- Create database
CREATE DATABASE assessment_db;

-- Create user with password
CREATE USER assessment_user WITH ENCRYPTED PASSWORD 'your-secure-password-here';

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE assessment_db TO assessment_user;

-- Grant schema privileges
\c assessment_db
GRANT ALL ON SCHEMA public TO assessment_user;

-- Exit psql
\q
```

### Step 2: Configure PostgreSQL Access

```bash
# Edit pg_hba.conf to allow local connections
sudo nano /etc/postgresql/16/main/pg_hba.conf
```

Add this line before the default entries:

```
# TYPE  DATABASE        USER            ADDRESS         METHOD
local   assessment_db   assessment_user                 md5
```

Restart PostgreSQL:

```bash
sudo systemctl restart postgresql
```

### Step 3: Test Database Connection

```bash
# Test connection
psql -U assessment_user -d assessment_db -h localhost

# If successful, you'll see:
# assessment_db=>

# Exit with \q
```

### Step 4: Run Database Migrations

```bash
cd /home/ubuntu/MCA_projects/prismberry-assessment-directus/assessment

# Push schema to database
npm run db:push

# Or run migrations
npm run db:migrate

# Seed initial data (assessments and questions)
npm run db:seed
```

### Step 5: Verify Database Tables

```bash
psql -U assessment_user -d assessment_db -h localhost
```

```sql
-- List all tables
\dt

-- Check user table
SELECT COUNT(*) FROM "user";

-- Check assessments
SELECT id, name, "timeLimit" FROM assessments;

-- Check questions count
SELECT assessment_id, COUNT(*) 
FROM questions 
GROUP BY assessment_id;

-- Exit
\q
```

### Step 6: Configure PostgreSQL Performance

```bash
sudo nano /etc/postgresql/16/main/postgresql.conf
```

Recommended settings for t3.medium (4 GB RAM):

```ini
# Memory Settings
shared_buffers = 1GB                    # 25% of RAM
effective_cache_size = 3GB              # 75% of RAM
maintenance_work_mem = 256MB
work_mem = 10MB

# Connection Settings
max_connections = 100

# Performance Settings
random_page_cost = 1.1                  # For SSD
effective_io_concurrency = 200          # For SSD
```

Restart PostgreSQL:

```bash
sudo systemctl restart postgresql
```

---

## Nginx Configuration

### Step 1: Create Nginx Configuration File

```bash
sudo nano /etc/nginx/sites-available/assesshub
```

```nginx
# AssessHub Nginx Configuration

# Redirect HTTP to HTTPS
server {
    listen 80;
    server_name assessment.yourdomain.com;
    return 301 https://$server_name$request_uri;
}

# HTTPS Server
server {
    listen 443 ssl http2;
    server_name assessment.yourdomain.com;
    
    # SSL Certificates (will be configured by Certbot)
    ssl_certificate /etc/letsencrypt/live/assessment.yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/assessment.yourdomain.com/privkey.pem;
    
    # SSL Configuration
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers 'ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256';
    ssl_prefer_server_ciphers off;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;
    
    # Security Headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    
    # Logging
    access_log /var/log/nginx/assesshub-access.log;
    error_log /var/log/nginx/assesshub-error.log;
    
    # Gzip Compression
    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types text/plain text/css text/xml text/javascript application/json application/javascript application/xml+rss;
    
    # Proxy to Next.js application
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
    
    # Cache static assets
    location /_next/static {
        proxy_pass http://localhost:3000;
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

### Step 2: Enable Configuration

```bash
# Create symbolic link
sudo ln -s /etc/nginx/sites-available/assesshub /etc/nginx/sites-enabled/

# Remove default site (optional)
sudo rm /etc/nginx/sites-enabled/default

# Test configuration
sudo nginx -t

# If test passes, reload Nginx
sudo systemctl reload nginx
```

---

## SSL Certificate Setup

### Automatic SSL with Let's Encrypt

```bash
# Ensure your domain points to your Elastic IP first
# Then run Certbot

sudo certbot --nginx -d assessment.yourdomain.com

# Follow the prompts:
# - Enter email address
# - Agree to terms
# - Choose whether to redirect HTTP to HTTPS (recommended: yes)

# Certbot will automatically:
# 1. Obtain SSL certificate from Let's Encrypt
# 2. Configure Nginx with SSL settings
# 3. Set up auto-renewal via cron job

# Test automatic renewal
sudo certbot renew --dry-run
```

### Manual Certificate Renewal

```bash
# Certificates auto-renew, but you can manually renew:
sudo certbot renew

# Force renewal (even if not due)
sudo certbot renew --force-renewal

# Check certificate expiry
sudo certbot certificates
```

### Verify SSL Configuration

```bash
# Test HTTPS access
curl -I https://assessment.yourdomain.com

# Should return:
# HTTP/2 200
# strict-transport-security: max-age=31536000; includeSubDomains
```

---

## Monitoring & Logging

### PM2 Monitoring

```bash
# Real-time monitoring
pm2 monit

# View logs
pm2 logs assesshub

# View only errors
pm2 logs assesshub --err

# View last 100 lines
pm2 logs assesshub --lines 100

# Clear logs
pm2 flush
```

### System Monitoring Tools

```bash
# Install monitoring tools if not already installed
sudo apt install -y htop iotop nethogs

# CPU and Memory usage
htop

# Disk I/O
sudo iotop

# Network usage by process
sudo nethogs

# Disk space
df -h

# Memory usage
free -m
```

### CloudWatch Agent Setup

```bash
# Download CloudWatch agent
wget https://s3.amazonaws.com/amazoncloudwatch-agent/ubuntu/amd64/latest/amazon-cloudwatch-agent.deb

# Install
sudo dpkg -i -E ./amazon-cloudwatch-agent.deb

# Create configuration
sudo nano /opt/aws/amazon-cloudwatch-agent/etc/config.json
```

```json
{
  "metrics": {
    "namespace": "AssessHub/EC2",
    "metrics_collected": {
      "cpu": {
        "measurement": [
          {"name": "cpu_usage_idle", "rename": "CPU_IDLE", "unit": "Percent"},
          {"name": "cpu_usage_iowait", "rename": "CPU_IOWAIT", "unit": "Percent"}
        ],
        "totalcpu": false
      },
      "disk": {
        "measurement": [
          {"name": "used_percent", "rename": "DISK_USED", "unit": "Percent"}
        ],
        "resources": ["*"]
      },
      "mem": {
        "measurement": [
          {"name": "mem_used_percent", "rename": "MEM_USED", "unit": "Percent"}
        ]
      }
    }
  },
  "logs": {
    "logs_collected": {
      "files": {
        "collect_list": [
          {
            "file_path": "/var/log/nginx/assesshub-error.log",
            "log_group_name": "/assesshub/nginx/error",
            "log_stream_name": "{instance_id}"
          },
          {
            "file_path": "/var/log/pm2/assesshub-error.log",
            "log_group_name": "/assesshub/app/error",
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
```

### Log Rotation Configuration

```bash
# Configure logrotate for application logs
sudo nano /etc/logrotate.d/assesshub
```

```
/var/log/pm2/*.log {
    daily
    rotate 7
    compress
    delaycompress
    missingok
    notifempty
    create 0644 ubuntu ubuntu
    postrotate
        pm2 reloadLogs
    endscript
}

/var/log/nginx/assesshub-*.log {
    daily
    rotate 14
    compress
    delaycompress
    missingok
    notifempty
    create 0644 www-data www-data
    sharedscripts
    postrotate
        systemctl reload nginx > /dev/null
    endscript
}
```

---

## Backup Strategy

### EBS Snapshot Backups (Automated)

#### Using AWS Data Lifecycle Manager

1. **AWS Console → EC2 → Lifecycle Manager**
2. **Create Snapshot Lifecycle Policy**

```yaml
Policy Name: assesshub-daily-backups
Description: Daily EBS snapshots with 7-day retention

Target Resource Type: Volume
Target Resources: Tag = Environment:production

Schedule:
  - Frequency: Daily at 02:00 UTC
  - Retention: 7 snapshots
  - Copy tags from volume: Yes
  - Fast snapshot restore: No (cost savings)

Cross-Region Copy: Optional (us-west-2 for DR)
```

#### Using CLI Script

```bash
# Create backup script
sudo nano /usr/local/bin/ebs-backup.sh
```

```bash
#!/bin/bash

INSTANCE_ID=$(ec2-metadata --instance-id | cut -d " " -f 2)
VOLUME_ID=$(aws ec2 describe-instances \
  --instance-ids $INSTANCE_ID \
  --query 'Reservations[0].Instances[0].BlockDeviceMappings[0].Ebs.VolumeId' \
  --output text)

DATE=$(date +%Y-%m-%d-%H%M)

# Create snapshot
aws ec2 create-snapshot \
  --volume-id $VOLUME_ID \
  --description "AssessHub backup $DATE" \
  --tag-specifications 'ResourceType=snapshot,Tags=[{Key=Name,Value=assesshub-backup-'$DATE'},{Key=AutoBackup,Value=true}]'

# Delete snapshots older than 7 days
OLD_SNAPSHOTS=$(aws ec2 describe-snapshots \
  --owner-ids self \
  --filters "Name=tag:AutoBackup,Values=true" \
  --query 'Snapshots[?StartTime<=`'$(date -d '7 days ago' -Iseconds)'`].SnapshotId' \
  --output text)

for snap in $OLD_SNAPSHOTS; do
  aws ec2 delete-snapshot --snapshot-id $snap
  echo "Deleted old snapshot: $snap"
done
```

```bash
# Make executable
sudo chmod +x /usr/local/bin/ebs-backup.sh

# Add to crontab (run daily at 2 AM)
sudo crontab -e
# Add: 0 2 * * * /usr/local/bin/ebs-backup.sh >> /var/log/ebs-backup.log 2>&1
```

### Database Backup Scripts

```bash
# Create database backup script
sudo nano /usr/local/bin/postgres-backup.sh
```

```bash
#!/bin/bash

# Configuration
BACKUP_DIR="/var/backups/postgresql"
DATABASE="assessment_db"
USER="assessment_user"
DATE=$(date +%Y%m%d_%H%M%S)
RETENTION_DAYS=7
S3_BUCKET="s3://assesshub-backups/database/"

# Create backup directory if not exists
mkdir -p $BACKUP_DIR

# Perform backup
PGPASSWORD='your-password' pg_dump -U $USER -h localhost $DATABASE | gzip > "$BACKUP_DIR/assessment_$DATE.sql.gz"

# Upload to S3 (optional but recommended)
aws s3 cp "$BACKUP_DIR/assessment_$DATE.sql.gz" $S3_BUCKET --storage-class STANDARD_IA

# Delete local backups older than retention period
find $BACKUP_DIR -name "assessment_*.sql.gz" -mtime +$RETENTION_DAYS -delete

# Log completion
echo "$(date): Backup completed - assessment_$DATE.sql.gz" >> /var/log/postgres-backup.log
```

```bash
# Make executable
sudo chmod +x /usr/local/bin/postgres-backup.sh

# Add to crontab (run daily at 2 AM, after EBS snapshot)
sudo crontab -e
# Add: 0 2 * * * /usr/local/bin/postgres-backup.sh
```

### Backup Verification Script

```bash
# Create verification script
sudo nano /usr/local/bin/verify-backups.sh
```

```bash
#!/bin/bash

echo "=== Backup Verification Report $(date) ==="

# Check EBS snapshots
echo "EBS Snapshots (last 7 days):"
aws ec2 describe-snapshots \
  --owner-ids self \
  --filters "Name=tag:AutoBackup,Values=true" \
  --query 'Snapshots[?StartTime>=`'$(date -d '7 days ago' -Iseconds)'`].[SnapshotId,StartTime,State]' \
  --output table

# Check database backups
echo -e "\nDatabase Backups (local):"
ls -lh /var/backups/postgresql/ | tail -8

# Check S3 backups
echo -e "\nDatabase Backups (S3):"
aws s3 ls s3://assesshub-backups/database/ --human-readable | tail -8

# Disk space
echo -e "\nDisk Usage:"
df -h | grep -E '^Filesystem|/$'
```

```bash
# Make executable
sudo chmod +x /usr/local/bin/verify-backups.sh

# Run weekly verification
sudo crontab -e
# Add: 0 9 * * 1 /usr/local/bin/verify-backups.sh | mail -s "AssessHub Backup Report" admin@yourdomain.com
```

---

## Disaster Recovery

### Recovery Scenarios

#### Scenario 1: Application Crash

**Symptoms**: PM2 process died, application not responding

```bash
# Check PM2 status
pm2 status

# View error logs
pm2 logs assesshub --err --lines 100

# Restart application
pm2 restart assesshub

# If restart fails, rebuild and restart
cd /home/ubuntu/MCA_projects/prismberry-assessment-directus/assessment
npm run build
pm2 restart assesshub

# Monitor for stability
pm2 monit
```

**Estimated Recovery Time**: 2-5 minutes

#### Scenario 2: Database Corruption

**Symptoms**: Database errors, data inconsistency

```bash
# Stop application
pm2 stop assesshub

# Stop PostgreSQL
sudo systemctl stop postgresql

# Restore from latest backup
cd /var/backups/postgresql
ls -lht | head -5  # Find latest backup

# Restore database
gunzip -c assessment_YYYYMMDD_HHMMSS.sql.gz | \
  PGPASSWORD='your-password' psql -U assessment_user -d assessment_db -h localhost

# Or restore from S3
aws s3 cp s3://assesshub-backups/database/latest.sql.gz .
gunzip -c latest.sql.gz | \
  PGPASSWORD='your-password' psql -U assessment_user -d assessment_db -h localhost

# Start PostgreSQL
sudo systemctl start postgresql

# Verify data
PGPASSWORD='your-password' psql -U assessment_user -d assessment_db -h localhost -c "SELECT COUNT(*) FROM assessments;"

# Start application
pm2 start assesshub
```

**Estimated Recovery Time**: 15-30 minutes

#### Scenario 3: Complete Instance Failure

**Symptoms**: Instance terminated, unreachable, corrupted

```bash
# Option A: Restore from EBS Snapshot
# 1. AWS Console → EC2 → Snapshots
# 2. Select latest snapshot
# 3. Actions → Create Image from Snapshot
# 4. Launch new instance from AMI
# 5. Attach Elastic IP to new instance
# 6. Verify all services running

# Option B: Fresh Instance + Data Restore
# 1. Launch new EC2 instance (same setup as original)
# 2. Follow "Server Setup Guide" section
# 3. Restore database from S3 backup
# 4. Deploy application code from Git
# 5. Configure Nginx and SSL
# 6. Attach Elastic IP
```

**Estimated Recovery Time**: 20-60 minutes (depending on method)

#### Scenario 4: Disk Space Full

**Symptoms**: Disk 100% full, application errors

```bash
# Check disk usage
df -h
du -sh /var/* | sort -hr | head -10

# Clear PM2 logs
pm2 flush

# Clear Nginx logs
sudo truncate -s 0 /var/log/nginx/*.log

# Clear system logs
sudo journalctl --vacuum-time=2d

# Remove old database backups
find /var/backups/postgresql -mtime +7 -delete

# If still full, expand EBS volume
# AWS Console → EC2 → Volumes → Modify Volume
# Then on instance:
sudo growpart /dev/xvda 1
sudo resize2fs /dev/xvda1

# Restart application
pm2 restart assesshub
```

**Estimated Recovery Time**: 10-30 minutes

## Security Configuration

### SSH Hardening

```bash
# Edit SSH configuration
sudo nano /etc/ssh/sshd_config
```

```ini
# Disable root login
PermitRootLogin no

# Use SSH keys only (disable password auth)
PasswordAuthentication no
PubkeyAuthentication yes

# Limit users
AllowUsers ubuntu

# Change default port (optional, reduces bot attacks)
Port 2222

# Disable X11 forwarding
X11Forwarding no

# Set strict modes
StrictModes yes

# Set login grace time
LoginGraceTime 60

# Max authentication attempts
MaxAuthTries 3
```

```bash
# Restart SSH
sudo systemctl restart sshd
```

### Firewall Configuration (UFW)

```bash
# Check current rules
sudo ufw status verbose

# Default policies
sudo ufw default deny incoming
sudo ufw default allow outgoing

# Allow SSH (use custom port if changed)
sudo ufw allow 22/tcp
# Or: sudo ufw allow 2222/tcp

# Allow HTTP and HTTPS
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Enable firewall
sudo ufw enable

# Review rules
sudo ufw status numbered
```

### Fail2Ban Setup (Protect against brute force)

```bash
# Install Fail2Ban
sudo apt install -y fail2ban

# Create local configuration
sudo cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local
sudo nano /etc/fail2ban/jail.local
```

```ini
[DEFAULT]
bantime = 3600
findtime = 600
maxretry = 5
destemail = admin@yourdomain.com
sendername = Fail2Ban

[sshd]
enabled = true
port = 22
filter = sshd
logpath = /var/log/auth.log
maxretry = 3

[nginx-http-auth]
enabled = true
port = http,https
filter = nginx-http-auth
logpath = /var/log/nginx/assesshub-error.log

[nginx-botsearch]
enabled = true
port = http,https
filter = nginx-botsearch
logpath = /var/log/nginx/assesshub-access.log
maxretry = 2
```

```bash
# Start and enable Fail2Ban
sudo systemctl start fail2ban
sudo systemctl enable fail2ban

# Check status
sudo fail2ban-client status
sudo fail2ban-client status sshd
```

### Environment Variables Security

```bash
# Ensure .env files are not world-readable
chmod 600 /home/ubuntu/MCA_projects/prismberry-assessment-directus/assessment/.env.production

# Add to .gitignore (if not already)
echo ".env.production" >> .gitignore
echo ".env.local" >> .gitignore
```

### Database Security

```bash
# Edit PostgreSQL configuration
sudo nano /etc/postgresql/16/main/postgresql.conf
```

```ini
# Listen only on localhost (not 0.0.0.0)
listen_addresses = 'localhost'

# Enable SSL (optional but recommended)
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
# Automatic security updates

echo "$(date): Running security updates" >> /var/log/security-updates.log

# Update package lists
apt update

# Upgrade security packages
apt upgrade -y --with-new-pkgs -o Dpkg::Options::="--force-confdef" -o Dpkg::Options::="--force-confold"

# Auto-remove unnecessary packages
apt autoremove -y

# Clean up
apt autoclean

echo "$(date): Security updates completed" >> /var/log/security-updates.log
```

```bash
# Make executable
sudo chmod +x /usr/local/bin/security-updates.sh

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
│ CloudWatch (basic)            $0.50       │
├────────────────────────────────────────────┤
│ TOTAL:                        $25.28/mo   │
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
│ CloudWatch (basic)            $2.00       │
│ Route 53 (hosted zone)        $0.50       │
├────────────────────────────────────────────┤
│ TOTAL:                        $71.47/mo   │
└────────────────────────────────────────────┘

Suitable for: Production MVP, 100-500 users
Peak: Exam periods with 500+ concurrent users
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
│ CloudWatch (enhanced)         $5.00       │
│ Route 53 (hosted zone)        $0.50       │
├────────────────────────────────────────────┤
│ TOTAL:                        $149.74/mo  │
└────────────────────────────────────────────┘

Suitable for: Growing production, 500-1000 users
Peak: 1000+ concurrent during exam periods
```

### Cost Optimization Strategies

#### Use Reserved Instances
```
1-Year Reserved Instance (t3.medium):
  - On-Demand: $30.37/month = $364.44/year
  - Reserved (No Upfront): $23/month = $276/year
  - Savings: $88.44/year (24% discount)

3-Year Reserved Instance (t3.medium):
  - Reserved (No Upfront): $17/month = $204/year
  - Savings: $160.44/year (44% discount)
```

#### Use Savings Plans
```
EC2 Instance Savings Plan (1-year):
  - Commitment: $20/month
  - Discount: Up to 40%
  - Flexibility: Can change instance types
```

#### Optimize Data Transfer
```
Reduce Bandwidth Costs:
  - Enable gzip compression (already configured)
  - Minimize unnecessary API calls
  - Optimize image assets
  - Use CloudFront CDN for static assets (if needed)
```

---

## Scaling Strategy

### Vertical Scaling (Simpler, Recommended First)

#### When to Scale Up

Monitor these metrics:
- CPU usage consistently >80% for extended periods
- Memory usage consistently >80%
- Slow response times during normal traffic
- Database connections near limit

#### Scaling Steps

```bash
# 1. Create snapshot before scaling
aws ec2 create-snapshot \
  --volume-id vol-xxxxxxxxx \
  --description "Pre-scaling snapshot"

# 2. Stop instance
aws ec2 stop-instances --instance-ids i-xxxxxxxxx

# 3. Wait for instance to stop
aws ec2 wait instance-stopped --instance-ids i-xxxxxxxxx

# 4. Change instance type
aws ec2 modify-instance-attribute \
  --instance-id i-xxxxxxxxx \
  --instance-type t3.large

# 5. Start instance
aws ec2 start-instances --instance-ids i-xxxxxxxxx

# 6. Verify services
ssh ubuntu@your-ip
pm2 status
sudo systemctl status postgresql
sudo systemctl status nginx
```

**Downtime**: 5-10 minutes

### Vertical Scaling Path

```
Stage 1 (0-1k users):     t3.small  (1 vCPU, 2 GB)  ~$25/mo
Stage 2 (1k-5k users):    t3.medium (2 vCPU, 4 GB)  ~$71/mo
Stage 3 (5k-10k users):   t3.large  (2 vCPU, 8 GB)  ~$150/mo
Stage 4 (10k-20k users):  t3.xlarge (4 vCPU, 16 GB) ~$300/mo
Stage 5 (20k+ users):     Consider horizontal scaling
```

### Horizontal Scaling (When Vertical Maxes Out)

#### Architecture Changes Needed

```
Single Instance → Multi-Instance Architecture:

1. Move Database to RDS
   - Migrate PostgreSQL to AWS RDS
   - Multi-AZ for high availability
   - Automated backups and maintenance

2. Add Application Load Balancer (ALB)
   - Distribute traffic across instances
   - Health checks and auto-routing
   - SSL termination at load balancer

3. Launch Multiple EC2 Instances
   - Auto Scaling Group (2-10 instances)
   - Scale based on CPU/memory metrics
   - Spread across multiple AZs

4. Implement Session Store
   - Use ElastiCache Redis for sessions
   - Shared session state across instances
   - Better Auth session persistence

5. Centralized Logging
   - All logs to CloudWatch
   - Unified monitoring and alerts
```

#### Estimated Cost (Multi-Instance)

```
Application Load Balancer:    $22/month
EC2 instances (t3.medium × 2): $61/month
RDS PostgreSQL (db.t4g.medium): $55/month
ElastiCache Redis (small):    $15/month
Enhanced monitoring:          $10/month
─────────────────────────────────────
Total:                        $163/month (base)
```

---

## Maintenance Procedures

### Daily Tasks (5 minutes)

```bash
# Quick health check script
nano ~/health-check.sh
```

```bash
#!/bin/bash
echo "=== AssessHub Health Check $(date) ==="

# Check PM2 status
echo "PM2 Status:"
pm2 status | grep assesshub

# Check disk space
echo -e "\nDisk Usage:"
df -h / | tail -1

# Check memory
echo -e "\nMemory Usage:"
free -m | grep Mem | awk '{printf "Used: %d MB (%.1f%%)\n", $3, $3/$2*100}'

# Check PostgreSQL
echo -e "\nPostgreSQL Status:"
sudo systemctl is-active postgresql

# Check Nginx
echo -e "\nNginx Status:"
sudo systemctl is-active nginx

# Recent errors
echo -e "\nRecent Errors (last hour):"
pm2 logs assesshub --err --lines 5 --nostream
```

```bash
chmod +x ~/health-check.sh
```

### Weekly Tasks (30 minutes)

```bash
# Weekly maintenance script
sudo nano /usr/local/bin/weekly-maintenance.sh
```

```bash
#!/bin/bash
echo "=== Weekly Maintenance $(date) ===" | tee -a /var/log/maintenance.log

# Update system packages
apt update && apt list --upgradable

# Check disk space trends
echo "Disk usage trend:"
df -h / | tail -1

# Review CloudWatch metrics
# (manual check in AWS Console)

# Check backup status
echo "Recent backups:"
ls -lht /var/backups/postgresql/ | head -5
aws s3 ls s3://assesshub-backups/database/ --human-readable | tail -5

# Check SSL certificate expiry
echo "SSL certificate expiry:"
sudo certbot certificates

# Review Nginx logs for errors
echo "Nginx errors (last 7 days):"
sudo grep -i error /var/log/nginx/assesshub-error.log | wc -l

# Database connection count
echo "Database connections:"
PGPASSWORD='your-password' psql -U assessment_user -d assessment_db -h localhost \
  -c "SELECT count(*) as connections FROM pg_stat_activity WHERE datname='assessment_db';"

# PM2 process uptime
pm2 list
```

### Monthly Tasks (2 hours)

1. **Security Updates**
   ```bash
   sudo apt update
   sudo apt upgrade -y
   sudo reboot  # Schedule during low-traffic period
   ```

2. **Database Optimization**
   ```sql
   -- Connect to database
   psql -U assessment_user -d assessment_db
   
   -- Vacuum and analyze
   VACUUM ANALYZE;
   
   -- Check table sizes
   SELECT schemaname, tablename, 
          pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size
   FROM pg_tables
   WHERE schemaname NOT IN ('pg_catalog', 'information_schema')
   ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;
   
   -- Check slow queries (if logging enabled)
   SELECT query, calls, total_time, mean_time
   FROM pg_stat_statements
   ORDER BY mean_time DESC
   LIMIT 10;
   ```

3. **Review and Archive Logs**
   ```bash
   # Compress old logs
   sudo find /var/log/nginx/ -name "*.log.1" -exec gzip {} \;
   
   # Archive logs older than 30 days to S3
   sudo find /var/log/nginx/ -name "*.gz" -mtime +30 \
     -exec aws s3 cp {} s3://assesshub-backups/logs/ \;
   
   # Delete after upload
   sudo find /var/log/nginx/ -name "*.gz" -mtime +30 -delete
   ```

4. **Performance Review**
   - Review CloudWatch dashboards
   - Analyze response time trends
   - Check database query performance
   - Review error rates

5. **Cost Review**
   - Check AWS billing dashboard
   - Review data transfer usage
   - Optimize if needed

---

## Troubleshooting Guide

### Issue: Application Not Responding

**Symptoms**: Website times out, 502 Bad Gateway

```bash
# Check if PM2 process is running
pm2 status

# If stopped, check logs and restart
pm2 logs assesshub --err --lines 50
pm2 restart assesshub

# Check if Node.js port is listening
sudo netstat -tlnp | grep :3000

# Check system resources
htop
df -h
```

### Issue: Database Connection Errors

**Symptoms**: "Connection refused" or "Too many connections"

```bash
# Check PostgreSQL status
sudo systemctl status postgresql

# Check active connections
PGPASSWORD='your-password' psql -U assessment_user -d assessment_db -c \
  "SELECT count(*) FROM pg_stat_activity;"

# Check max connections setting
PGPASSWORD='your-password' psql -U assessment_user -d assessment_db -c \
  "SHOW max_connections;"

# Restart PostgreSQL if needed
sudo systemctl restart postgresql
```

### Issue: High CPU Usage

**Symptoms**: Slow response times, CPU at 100%

```bash
# Check what's consuming CPU
htop  # Press F5 for tree view, F6 to sort by CPU

# Check Node.js processes
ps aux | grep node

# Review application logs for issues
pm2 logs assesshub

# Consider vertical scaling if persistent
```

### Issue: Disk Space Full

**Symptoms**: Application errors, "No space left on device"

```bash
# Check disk usage
df -h
du -sh /var/* | sort -hr | head -10

# Clear PM2 logs
pm2 flush

# Clear old logs
sudo journalctl --vacuum-time=7d
sudo find /var/log -name "*.gz" -mtime +14 -delete

# Expand volume if needed (see Disaster Recovery section)
```

### Issue: SSL Certificate Expired

**Symptoms**: HTTPS warnings, certificate errors

```bash
# Check certificate status
sudo certbot certificates

# Renew certificate
sudo certbot renew

# If auto-renewal failed, force renewal
sudo certbot renew --force-renewal

# Restart Nginx
sudo systemctl restart nginx
```

---

## Implementation Timeline

### Day 1: Infrastructure Setup (4-6 hours)

**Morning (2-3 hours)**
- [ ] Create AWS account / Set up billing alerts
- [ ] Launch EC2 t3.medium instance
- [ ] Configure security group
- [ ] Allocate and attach Elastic IP
- [ ] SSH key setup and initial connection

**Afternoon (2-3 hours)**
- [ ] System update (`apt update && apt upgrade`)
- [ ] Install Node.js 20.x
- [ ] Install PostgreSQL 16
- [ ] Install Nginx
- [ ] Install PM2 globally
- [ ] Configure UFW firewall

### Day 2: Application Deployment (4-6 hours)

**Morning (2-3 hours)**
- [ ] Create PostgreSQL database and user
- [ ] Clone Git repository
- [ ] Install dependencies (`npm install`)
- [ ] Build Next.js app (`npm run build`)
- [ ] Create `.env.production` file
- [ ] Run database migrations
- [ ] Seed initial data

**Afternoon (2-3 hours)**
- [ ] Create PM2 ecosystem config
- [ ] Start application with PM2
- [ ] Configure PM2 startup script
- [ ] Test app on localhost:3000
- [ ] Configure Nginx reverse proxy
- [ ] Test Nginx configuration
- [ ] Restart Nginx

### Day 3: SSL & Monitoring (3-4 hours)

**Morning (1-2 hours)**
- [ ] Point domain to Elastic IP
- [ ] Wait for DNS propagation
- [ ] Install Certbot
- [ ] Obtain SSL certificates
- [ ] Test HTTPS access

**Afternoon (2 hours)**
- [ ] Install CloudWatch agent
- [ ] Configure system metrics
- [ ] Set up log streaming
- [ ] Create CloudWatch dashboards
- [ ] Configure critical alarms

### Day 4: Backups & Security (3-4 hours)

**Morning (2 hours)**
- [ ] Configure EBS snapshot lifecycle
- [ ] Create S3 bucket for backups
- [ ] Set up PostgreSQL backup script
- [ ] Configure cron jobs
- [ ] Test backup scripts

**Afternoon (2 hours)**
- [ ] Harden SSH configuration
- [ ] Install and configure Fail2Ban
- [ ] Review security group rules
- [ ] Configure log rotation
- [ ] Security audit checklist

### Day 5: Testing & Launch (2-3 hours)

**Morning (1-2 hours)**
- [ ] Run complete test suite
- [ ] Test all user flows
- [ ] Load testing (basic)
- [ ] Performance baseline
- [ ] Create runbook documentation

**Afternoon (1 hour)**
- [ ] Final pre-launch checklist
- [ ] Take manual snapshot
- [ ] Monitor for 1-2 hours
- [ ] Announce launch
- [ ] Post-launch monitoring

### Total Implementation Time: 3-5 days (16-23 hours)

---

## Conclusion

This cloud hosting specification provides a complete, production-ready deployment guide for the AssessHub assessment platform on a single EC2 instance. The architecture is:

✅ **Cost-Effective**: Starting at ~$25/month for testing, ~$71/month for production  
✅ **Scalable**: Clear upgrade path from t3.small → t3.medium → t3.large → multi-instance  
✅ **Reliable**: Automated backups, monitoring, and disaster recovery procedures  
✅ **Secure**: SSH hardening, Fail2Ban, UFW firewall, regular updates  
✅ **Maintainable**: Automated scripts, clear procedures, comprehensive documentation  

### Next Steps

1. **Immediate**: Follow Day 1-5 implementation timeline
2. **Week 1**: Monitor closely, optimize as needed
3. **Month 1**: Establish maintenance routine
4. **Month 3+**: Review metrics, plan scaling if needed

### Support Resources

- AWS Documentation: https://docs.aws.amazon.com
- Next.js Documentation: https://nextjs.org/docs
- PostgreSQL Documentation: https://www.postgresql.org/docs/
- PM2 Documentation: https://pm2.keymetrics.io/docs/

---

**Document Version**: 1.0.0  
**Last Updated**: October 29, 2025  
**Status**: Production Ready  
**Platform**: AssessHub Assessment Platform
