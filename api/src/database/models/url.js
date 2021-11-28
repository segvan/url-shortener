const Sequelize = require('sequelize');
const db = require('../db');

const Url = db.define('url').init({
    id: {
        type: Sequelize.STRING(21),
        allowNull: false,
        primaryKey: true,
    },
    url: {
        type: Sequelize.STRING(2000),
        allowNull: false
    }
}, {
    sequelize: db,
    timestamps: true,
    updatedAt: false
});

module.exports = Url;