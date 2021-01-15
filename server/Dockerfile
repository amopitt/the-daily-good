FROM node:12

# Environment variables
ENV NODE_PORT=8080

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY . ./server 

WORKDIR /usr/src/app/server

RUN npm install --silent

# If you are building your code for production
# RUN npm ci --only=production 

# Build the typescript / server
RUN npm run build

EXPOSE ${NODE_PORT} 

CMD [ "npm", "start" ]
