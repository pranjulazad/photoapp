'use strict';
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const configFile = require(__dirname + '/../config/config.json')
const config = configFile[env];
//config.host = process.env.DB_HOST || "localhost"
const db = {};
let sequelize;

//config.use_env_variable = config.use_env_variable || process.env.DB_URL

if(env == 'production' ){
    // config["username"] = process.env.DB_USERNAME
    // config["password"] = process.env.DB_PASSWORD
    // config["host"] = process.env.DB_HOST
    // config["database"] = process.env.DB_NAME
    // config["dialect"] = process.env.DB_DIALECT
    // config["port"] = process.env.DB_PORT
    config["options"] = {pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
    }
}

if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs.readdirSync(__dirname).filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
}).forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
});

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;