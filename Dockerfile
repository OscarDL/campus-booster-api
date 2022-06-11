FROM node:latest as production

# Create api directory
WORKDIR /usr/src/app

# Install api dependencies
COPY package.json ./

# Run scripts
RUN npm i
RUN npm run build

# Bundle app source
COPY . .

EXPOSE 1337

CMD [ "npm", "start" ]
