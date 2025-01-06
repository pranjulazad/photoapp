#!/bin/sh

if [ "$1" = "migration" ]; then
    npm install;
    npx sequelize-cli db:create --env production;
    npx sequelize-cli db:migrate --env production;
    npx sequelize-cli db:seed:all --env production;
    exit 0;
else
    npm run prod
fi