FROM node:22-alpine

RUN apk update && apk upgrade
RUN adduser -D -s /bin/bash -h /app api-prod
RUN chown -R api-prod /app

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Environment variables
ENV NODE_ENV=deployment

# Server settings
ENV PORT=4000

# Database connection settings
ENV DATABASE_HOST=localhost
ENV DATABASE_USERNAME=postgres
ENV DATABASE_PASSWORD=docred_db
ENV DATABASE_SCHEMA=public
ENV DATABASE_NAME=cajasocial
ENV DATABASE_PORT=5433

ENV PATH ./node_modules/.bin:$PATH

RUN npm run build

EXPOSE 8080

USER api-prod

CMD ["npm", "run", "start:prod"]
FROM node:22-alpine

RUN apk update && apk upgrade
RUN adduser -D -s /bin/bash -h /app api-prod
RUN chown -R api-prod /app

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Environment variables
ENV NODE_ENV=deployment

# Server settings
ENV PORT=4000

# Database connection settings
ENV DATABASE_HOST=<CustomNameContainer>
ENV DATABASE_USERNAME=postgres
ENV DATABASE_PASSWORD=custospasword
ENV DATABASE_SCHEMA=public
ENV DATABASE_NAME=cajasocial
ENV DATABASE_PORT=5432

ENV PATH ./node_modules/.bin:$PATH

RUN npm run build

EXPOSE 8080

USER api-prod

CMD ["npm", "run", "start:prod"]
