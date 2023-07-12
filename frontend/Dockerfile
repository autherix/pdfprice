FROM node:lts-alpine3.18

USER root

WORKDIR /app/ppfront

# Update OS packages
RUN apk update && \
    apk upgrade

# install apt 
RUN apk add --no-cache yarn

# Install OS packages
RUN apk add --no-cache curl git python3 libffi-dev cargo 

# Update npm
RUN npm install -g npm@latest

# copy package.json and package-lock.json
COPY ./ppfront/package*.json ./

### Installing dependencies - After initializing ###
RUN npm install
RUN npm install nodemon -g
RUN npm install pkg -g
RUN npm install --save-dev @babel/plugin-proposal-private-property-in-object

# Other packages
RUN npm install -g react react-dom react-scripts react-router-dom react-router react-bootstrap bootstrap axios react-bootstrap-icons react-router-bootstrap 

# Setup scripts
RUN npm pkg set scripts.deploy="npm start"
RUN npm pkg set scripts.dev="nodemon"

EXPOSE 3000

CMD ["npm", "run", "dev"]