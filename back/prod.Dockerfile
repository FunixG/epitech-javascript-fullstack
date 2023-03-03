FROM node:18.14.2 AS BUILD_TS_BACKEND

ENV HOME /srv/build/container
WORKDIR $HOME

ADD src src
ADD .eslintrc.js .
ADD .prettierrc .
ADD nest-cli.json .
ADD package.json .
ADD package-lock.json .
ADD tsconfig.build.json .
ADD tsconfig.json .
ADD ormconfig.json .
ADD docker-back-js-fullstack/entrypoint.sh /entrypoint.sh

RUN npm ci
RUN npm run build

CMD ["bash", "/entrypoint.sh"]
