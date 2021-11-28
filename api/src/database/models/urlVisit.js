const Sequelize = require('sequelize');
const db = require('../db');
const Url = require('./url');

const UrlVisit = db
    .define('urlVisit')
    .init({
        id: {
            type: Sequelize.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        urlId: {
            type: Sequelize.STRING(21),
            references: {
                model: Url,
                key: 'id'
            }
        },
    }, {
        sequelize: db,
        timestamps: true,
        updatedAt: false
    });
 

module.exports = UrlVisit;