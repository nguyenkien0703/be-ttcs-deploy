# Docker Setup Guide

This guide will help you run MySQL using Docker Compose without installing MySQL directly on your machine.

## Prerequisites

- Docker installed on your machine ([Download Docker](https://www.docker.com/products/docker-desktop))
- Docker Compose (comes with Docker Desktop)

## Quick Start

### 1. Start MySQL Database

Run the following command to start MySQL in a Docker container:

```bash
docker-compose up -d
```

This will:
- Start a MySQL 8.0 container
- Start a PhpMyAdmin container (optional, for database management UI)
- Create a persistent volume for your database data
- Expose MySQL on port `3306` (as configured in your `.env`)
- Expose PhpMyAdmin on port `8080`

### 2. Verify MySQL is Running

Check if the containers are running:

```bash
docker-compose ps
```

You should see both `be-ttcs-mysql` and `be-ttcs-phpmyadmin` containers running.

### 3. Access Your Database

**Option A: Using PhpMyAdmin (Web UI)**
- Open your browser and go to: http://localhost:8080
- Login with:
  - Username: `root`
  - Password: `19091978chinh` (from your `.env` file)

**Option B: Using MySQL Client (if installed)**
```bash
mysql -h 127.0.0.1 -P 3306 -u root -p
# Enter password: 19091978chinh
```

**Option C: Using Docker Exec**
```bash
docker exec -it be-ttcs-mysql mysql -u root -p
# Enter password: 19091978chinh
```

### 4. Run Your NestJS Application

Make sure your `.env` file has `DB_HOST=localhost` (already configured), then run:

```bash
# Install dependencies (if not already done)
npm install

# Run in development mode
npm run start:dev

# Or run the seed script to populate initial data
npm run seed
```

## Docker Compose Commands

### Start containers (in background)
```bash
docker-compose up -d
```

### Stop containers
```bash
docker-compose stop
```

### Stop and remove containers
```bash
docker-compose down
```

### Stop and remove containers + volumes (⚠️ WARNING: This deletes all database data!)
```bash
docker-compose down -v
```

### View container logs
```bash
# All containers
docker-compose logs

# MySQL only
docker-compose logs mysql

# Follow logs in real-time
docker-compose logs -f mysql
```

### Restart containers
```bash
docker-compose restart
```

## Configuration Details

### Environment Variables Used

The Docker Compose file uses these variables from your `.env` file:
- `DB_HOST` - Database host (use `localhost` when running app locally)
- `DB_PORT` - MySQL port (default: 3306)
- `DB_NAME` - Database name (default: laptop)
- `DB_USER` - Database username (default: root)
- `DB_PASS` - Database password

### Services Included

1. **MySQL 8.0**
   - Container name: `be-ttcs-mysql`
   - Port: `3306` (configurable via `.env`)
   - Data persistence: Volume `mysql_data`
   - Healthcheck: Enabled (checks every 10s)

2. **PhpMyAdmin**
   - Container name: `be-ttcs-phpmyadmin`
   - Port: `8080`
   - Access: http://localhost:8080
   - Purpose: Web-based database management tool

### Data Persistence

Your database data is stored in a Docker volume named `mysql_data`. This means:
- ✅ Data persists even when you stop containers
- ✅ Data survives container restarts
- ⚠️ Data is deleted only if you run `docker-compose down -v`

### Custom Initialization Scripts

If you need to run SQL scripts on database initialization (first startup only):
1. Create a directory: `mkdir mysql-init`
2. Place your `.sql` files in `mysql-init/`
3. Files will be executed in alphabetical order when MySQL starts for the first time

Example:
```bash
mkdir mysql-init
echo "CREATE TABLE IF NOT EXISTS test (id INT);" > mysql-init/001-init.sql
docker-compose up -d
```

## Troubleshooting

### Port Already in Use

If port 3306 is already in use:
1. Stop any local MySQL service: `sudo service mysql stop` (Linux) or via System Preferences (Mac)
2. Or change the port in `.env`: `DB_PORT=3307`
3. Update docker-compose.yml ports mapping if needed

### Connection Refused

If your app can't connect to MySQL:
1. Wait for MySQL to fully start (check healthcheck): `docker-compose ps`
2. Verify MySQL is healthy: `docker-compose logs mysql`
3. Ensure `.env` has `DB_HOST=localhost`

### Reset Database

To completely reset the database:
```bash
docker-compose down -v
docker-compose up -d
npm run seed  # If you have seed scripts
```

### View MySQL Logs

```bash
docker-compose logs -f mysql
```

## Running App in Docker (Optional)

If you want to run your NestJS app inside Docker as well, change `DB_HOST`:

In `.env`:
```
DB_HOST=mysql  # Use the service name from docker-compose.yml
```

This is useful if you later add a service for your NestJS app to the docker-compose.yml file.

## Backup and Restore

### Backup Database
```bash
docker exec be-ttcs-mysql mysqldump -u root -p19091978chinh laptop > backup.sql
```

### Restore Database
```bash
docker exec -i be-ttcs-mysql mysql -u root -p19091978chinh laptop < backup.sql
```

## Production Notes

For production deployments:
1. Change default passwords in `.env`
2. Remove PhpMyAdmin service from `docker-compose.yml` (security)
3. Use secrets management instead of `.env` files
4. Configure proper MySQL resource limits
5. Set up regular database backups
6. Use external volumes for better data management

## Useful Links

- [Docker Documentation](https://docs.docker.com/)
- [MySQL Docker Image](https://hub.docker.com/_/mysql)
- [PhpMyAdmin Documentation](https://docs.phpmyadmin.net/)
