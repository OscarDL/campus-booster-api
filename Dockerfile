FROM node:latest as production

# Create api directory
WORKDIR /usr/src/app

# Install api dependencies
COPY package.json ./

# Install dependencies
RUN npm i

# Bundle app source
COPY . .

# Build App source 
RUN npm run build

# Expose PORT 1337
EXPOSE 1337

# START SERVER
CMD [ "npm", "start" ]
