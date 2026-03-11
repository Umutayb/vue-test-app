FROM node:latest

# make the 'app' folder the current working directory
WORKDIR /usr/src/app

# copy 'package.json' and 'package-lock.json'
COPY package*.json ./

# install simple http server for serving static content
RUN npm install -g http-server

# install dependencies
RUN npm ci

# ensure dev dependency is present for the build
RUN npm install html-webpack-plugin --save-dev

# copy the rest of the files
COPY . .

# build app for production
RUN npm run build

EXPOSE 8080

# The '--proxy' flag fixes the 404 on refresh by redirecting 
# non-file requests back to index.html
CMD ["http-server", "dist", "-p", "8080", "--proxy", "http://localhost:8080?"]