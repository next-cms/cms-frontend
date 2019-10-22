# production environment
FROM node:12.8.1-alpine

# replace shell with bash so we can source files
#RUN rm /bin/sh && ln -s /bin/bash /bin/sh

# set working directory
WORKDIR /usr/src/app

RUN npm install yarn -g --silent
RUN npm install cross-env -g --silent

# Copy application files
COPY . /usr/src/app
RUN touch .env

RUN apk --no-cache add --virtual native-deps \
  g++ gcc libgcc libstdc++ linux-headers make python && \
  yarn install --quiet node-gyp -g &&\
  yarn install --quiet && \
  apk del native-deps

RUN yarn build

EXPOSE $SERVER_PORT
CMD ["yarn", "start"]
