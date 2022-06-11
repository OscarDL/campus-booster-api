FROM node:latest as production

# Install api dependencies
COPY package.json ./

# Post install has auto-build
RUN npm i

# Bundle app source
COPY . .

EXPOSE 1337

CMD [ "npm", "start" ]
