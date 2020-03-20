FROM node:7
WORKDIR /app
COPY ./src/API/src/package.json /app
RUN npm install
COPY . /app
CMD node ./src/API/src/server.js
EXPOSE 4000
