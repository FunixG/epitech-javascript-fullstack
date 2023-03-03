FROM node:18.14.2

ADD src src
ADD .eslintrc.js .
ADD .prettierrc .
ADD nest-cli.json .
ADD package.json .
ADD package-lock.json .
ADD tsconfig.build.json .
ADD tsconfig.json .

RUN npm ci

CMD ["npm", "start"]
