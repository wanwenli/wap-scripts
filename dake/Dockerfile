FROM node:6.4.0-slim

COPY . /dake

WORKDIR /dake

RUN ["npm", "install"]

ENTRYPOINT ["node", "dake.js"]

