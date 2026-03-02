#!/bin/bash

# Remove existing container if it exists
docker rm -f guacamole 2>/dev/null

# Start Guacamole
docker run -d --name guacamole \
  --link guacd:guacd \
  --link mysql:mysql \
  -p 8080:8080 \
  -e GUACD_HOSTNAME=guacd \
  -e MYSQL_HOSTNAME=mysql \
  -e MYSQL_DATABASE=guacamole_db \
  -e MYSQL_USERNAME=guacamole_user \
  -e MYSQL_PASSWORD=guacamole_pass \
  guacamole/guacamole

echo "Guacamole container started!"
