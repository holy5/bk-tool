FROM node:18-alpine

WORKDIR /app

COPY package.json yarn.lock ./

COPY ./prisma /app/prisma

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

CMD ["yarn", "start"]