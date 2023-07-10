FROM node:lts-alpine3.18

USER root

WORKDIR /app/ppfront

RUN npm install -g npm@latest

COPY ./ppfront/package*.json ./

### Installing dependencies - After initializing ###
RUN npm install
RUN npm install nodemon -g
RUN npm install pkg -g
# RUN npm i express mongoose jsonwebtoken cors js-yaml fs

RUN npm pkg set scripts.deploy="npm start"
RUN npm pkg set scripts.dev="nodemon"

EXPOSE 3000

CMD ["npm", "run", "dev"]