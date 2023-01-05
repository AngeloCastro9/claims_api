FROM node:19

WORKDIR /usr/app

COPY package.json ./

COPY yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

RUN npx prisma generate

EXPOSE 8080

CMD [ "yarn", "start:prod" ]