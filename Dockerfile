FROM node:18-alpine

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3002

COPY package.json .

RUN npm install --omit=dev

COPY . .

EXPOSE 3002

ENTRYPOINT ["./config/init.sh"]

CMD [ "production" ]