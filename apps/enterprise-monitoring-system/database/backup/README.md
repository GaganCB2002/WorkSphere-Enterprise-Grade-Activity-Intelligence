# 💾 Enterprise PostgreSQL Backup & Disaster Recovery Architecture

This directory defines the automated backup strategies, cron schedules, and Point-in-Time Recovery (PITR) configurations for the WorkSphere enterprise database.

## Automated Backup Script (`pg_dump`)

To execute a full, compressed schema and data backup:
```bash
#!/bin/bash
BACKUP_DIR="/var/backups/postgresql/worksphere"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
DB_NAME="worksphere_enterprise"

mkdir -p ${BACKUP_DIR}
pg_dump -U postgres -F c -b -v -f "${BACKUP_DIR}/${DB_NAME}_${TIMESTAMP}.backup" ${DB_NAME}
```

## Production Cron Schedule
Add the following entry to `/etc/crontab` for automated daily backups at 02:00 AM:
```bash
0 2 * * * postgres /usr/local/bin/worksphere_backup.sh >> /var/log/worksphere_backup.log 2>&1
```
