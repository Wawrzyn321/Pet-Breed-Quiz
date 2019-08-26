FROM node:lts-alpine

RUN npm i -g http-server

# setup folder
WORKDIR /vue-app

ENV PATH /vue-app/node_modules/.bin:$PATH

# setup files
COPY package*.json ./

RUN npm i

COPY . .

# create build
RUN npm run build

# run it
EXPOSE 8080
CMD ["http-server", "docs", "-p", "8080"]