const db = require('../../config/db');

const getItems = async () => {

    try {
        const [queryResponse] = await db.query('SELECT * FROM `items` limit 10');
        return queryResponse;
    } catch (err) {
        throw new Error(err.message);
    }

};
module.exports = { getItems };