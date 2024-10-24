const Sequelize = require('sequelize');
const process = require('process');
const path = require('path');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: config.storage,
  });
}

// Rest of your code remains the same...
