FROM node:16

WORKDIR /app

COPY package.json yarn.lock ./

COPY ./prisma ./prisma

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn prisma db push

RUN yarn build

CMD ["yarn", "start"]