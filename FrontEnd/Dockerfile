FROM node:carbon-alpine
MAINTAINER da13002 <da13002@ues.edu.sv>
RUN mkdir -p /usr/src/app 
WORKDIR /usr/src/app
COPY package.json /usr/src/app
RUN  npm install
COPY server.js /usr/src/app
COPY mantenimientoFront /usr/src/app
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 CMD [ "curl", "-f", "http://paymantenimiento:8080/ping" , "||", "exit 1"]
EXPOSE 80
CMD [ "npm", "start" ]
