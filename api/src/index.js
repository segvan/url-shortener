const app = require('./app');
const db = require('./database/db');

const port = process.env.PORT || 5000;

(async () => {
    try {
        await db.authenticate();
        await db.sync();
        console.log('Successfully connected to the database.');

        app.listen(port, () => {
            console.log('Service is running on port ', port);
        });

    } catch (error) {
        console.error(error);
    }
})();