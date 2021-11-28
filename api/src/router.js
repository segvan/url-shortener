const express = require("express");

const validationHandler = require('./middlewares/validationHandler');
const { postUrl, postUrlValidators } = require('./middlewares/postUrl');
const getUrl = require('./middlewares/getUrl');

const router = express.Router();

router.post('/shortUrl', postUrlValidators, validationHandler, postUrl);
router.get('/:id', getUrl);

module.exports = router;