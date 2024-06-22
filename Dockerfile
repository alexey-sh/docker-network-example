FROM node:22.3.0-bookworm-slim

RUN mkdir -p /app
WORKDIR /app

COPY ./base/index.js ./
COPY ./base/requests.js ./
COPY ./base/server.js ./
COPY ./base/entrypoint.sh ./

ENTRYPOINT ["/bin/bash", "./entrypoint.sh"]