FROM node:lts

WORKDIR /code

COPY package.json yarn.lock ./

RUN yarn --pure-filelock

COPY . .

RUN yarn build

CMD ["node", "dist/index.js"]
