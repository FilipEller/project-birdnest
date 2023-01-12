FROM node:16

WORKDIR /usr/src/app

COPY . .

ENV WATCHPACK_POLLING=true

RUN npm install

CMD ["npm", "start"]
