FROM postgres:15

ENV POSTGRES_USER=myuser
ENV POSTGRES_PASSWORD=mypassword
ENV POSTGRES_DB=myapp_db

COPY init.sql /docker-entrypoint-initdb.d/init.sql
