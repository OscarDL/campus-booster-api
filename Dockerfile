FROM node:latest

# Create api directory
WORKDIR /usr/src/api

# Install api dependencies
COPY package.json ./

# Post install has auto-build
RUN npm run migration

# Bundle app source
COPY . .

EXPOSE 8080

CMD [ "npm start" ]
