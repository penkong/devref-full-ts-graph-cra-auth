FROM node:15.13.0-alpine

RUN apk add --no-cache bash

ENV NODE_ENV=development
ENV PUBLIC_ROUTE=http://localhost:5002

RUN mkdir -p /app
WORKDIR "/app"


COPY package*.json ./


RUN npm config set unsafe-perm true
# we use npm ci here so only the package-lock.json file is used
RUN npm config list \
    && npm ci \
    && npm cache clean --force

COPY . .


EXPOSE 3000

CMD ["npm", "run", "dev"]














