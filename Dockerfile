FROM node:18-alpine As development

WORKDIR /usr/src/ecou-nestjs-server

COPY package*.json ./

RUN npm install -g rimraf npm@9.1.2 pm2

# bcrypt사용을 위한 python 설치
#RUN apk add --no-cache --virtual .gyp python make g++ pkgconfig pixman-dev cairo-dev pango-dev
#RUN npm install

COPY . .

RUN npm run build

FROM node:18-alpine As production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/ecou-nestjs-server

COPY package*.json ./

RUN npm install --global rimraf npm@9.1.2 pm2

# bcrypt사용을 위한 python 설치
#RUN apk add --no-cache --virtual .gyp python make g++ pkgconfig pixman-dev cairo-dev pango-dev
#RUN npm install --only=production

COPY . .

COPY --from=development /usr/src/ecou-nestjs-server/dist ./dist

#EXPOSE 8000

# pm2-runtime으로 실행
#CMD ["pm2-runtime", "start", "ecosystem.config.js", "--env", "production"]
