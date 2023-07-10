FROM node:lts-alpine3.18

USER root

WORKDIR /app/ppserver

RUN npm install -g npm@latest

COPY ./ppserver/package*.json ./

### Installing dependencies - After initializing ###
RUN npm install
RUN npm install nodemon -g
RUN npm install pkg -g
RUN npm i express mongoose jsonwebtoken cors js-yaml fs dotenv bcryptjs helmet morgan swagger-ui-express swagger-jsdoc bcrypt --save

RUN npm pkg set scripts.deploy="npm start ./src/index.js"
RUN npm pkg set scripts.dev="nodemon ./src/index.js"


EXPOSE 3000

CMD ["npm", "run", "dev"]