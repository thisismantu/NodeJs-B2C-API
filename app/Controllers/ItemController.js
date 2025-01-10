const Item = require('../Models/Item');

const getItems = async (req, res) => {
    try {
        const response = await Item.getItems();
        res.json(response);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getItems };
