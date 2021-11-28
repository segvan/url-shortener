const Url = require('../database/models/url');
const UrlVisit = require('../database/models/urlVisit');

module.exports = async (req, res) => {
    const id = req.params.id;
    const url = await Url.findByPk(id);
    if (url) {
        // don't await saving statistics
        UrlVisit.create({ urlId: id })
            .catch(err => { console.error(err) });

        return res.redirect(url.url);
    }

    return res.sendStatus(404);
};