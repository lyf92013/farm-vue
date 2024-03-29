FROM node:10.16.0

RUN yarn global add http-server

WORKDIR /app

COPY package*.json ./

RUN yarn

COPY . .

RUN yarn build

EXPOSE 8080
CMD [ "http-server", "dist" ]