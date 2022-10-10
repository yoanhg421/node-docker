FROM node:16-alpine

RUN mkdir -p /home/app

WORKDIR /home/app

COPY package.json .

ARG NODE_ENV

RUN if [ $NODE_ENV = "production" ] ; \
    then yarn install --prod; \
    else yarn; \
    fi

COPY ./dist ./dist

CMD ["yarn", "prod"]

