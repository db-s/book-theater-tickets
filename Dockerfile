FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i

COPY . .

EXPOSE 3001

ENV NODE_ENV=development_docker

CMD ["npm", "run", "start:docker"]
