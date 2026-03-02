FROM guacamole/guacamole:1.5.4
COPY init /docker-entrypoint-initdb.d/
