FROM node:21.4.0

WORKDIR /app

COPY package.json ./

COPY package-lock.json* ./

RUN npm install

COPY . .

EXPOSE 30001

CMD [ "npm", "run", "start" ]
