const { nanoid } = require('nanoid');
const { body } = require('express-validator');
const Url = require('../database/models/url');

const shortUrlLength = 7;
const baseUrl = process.env.SHORT_URL_DOMAIN || 'http://localhost:5000';

const postUrl = async (req, res) => {
    const { url } = req.body;

    let id = await nanoid(shortUrlLength);

    try {
        await Url.create({ url, id });
    } catch (err) {
        // retry to save with new id
        console.error(err);
        id = await nanoid(shortUrlLength);
        await Url.create({ url, id });
    }

    const shortUrl = new URL(id, baseUrl).href;

    return res.status(201).json({ url, shortUrl });
};

const postUrlValidators = [body('url').notEmpty().withMessage('Url is required.')
    .isURL({ require_protocol: true }).withMessage('Url is invalid.')];

module.exports = { postUrl, postUrlValidators };