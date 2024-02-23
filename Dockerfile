FROM node:latest
# make the 'app' folder the current working directory
WORKDIR /usr/src/app
# copy 'package.json' to install dependencies
COPY package*.json ./
# install simple http server for serving static content
RUN npm install -g http-server
# install dependencies
RUN npm install
# copy files and folders to the current working directory (i.e. 'app' folder)
RUN npm install html-webpack-plugin --save-dev
# copy 'package.json' to install dependencies
COPY . .
# build app for production with minification
RUN npm run build
EXPOSE 8080
CMD ["http-server", "dist" ]