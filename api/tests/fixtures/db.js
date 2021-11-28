const { nanoid } = require('nanoid');
const db = require('../../src/database/db');
const Url = require('../../src/database/models/url');
const UrlVisit = require('../../src/database/models/urlVisit');

const testUrl = {
    id: nanoid(7),
    url: 'http://test.net'
};

const setupDatabase = async () => {
    await db.sync();
}

const disposeDatabase = async () => {
    await db.drop();
    await db.close();
}

const seedData = async () => {
    await UrlVisit.destroy({ where: {}, truncate: true });
    await Url.destroy({ where: {}, truncate: true });
    await Url.create(testUrl);
}

module.exports = {
    testUrl,
    setupDatabase,
    seedData,
    disposeDatabase
}