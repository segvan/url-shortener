const express = require('express');
require('express-async-errors');
const router = require('./router');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
app.use(express.json({ extended: false }));
app.use(router);

app.all('*', async (req, res) => {
    return res.sendStatus(404);
});

app.use(errorHandler);

module.exports = app;