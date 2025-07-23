"use strict";
require('dotenv').config({ path: './.env.local' });
const { Sequelize } = require('sequelize');
/*
Vérification des variables d'environnement
*/
console.log('DATABASE_URL:', process.env.DATABASE_URL);
if (!process.env.DATABASE_URL) {
    throw new Error('La variable DATABASE_URL n\'est pas définie dans le fichier .env');
}
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    logging: false
});
module.exports = sequelize;
