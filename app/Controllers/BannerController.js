const Banner = require("../Models/Banner");

const getHomeBanner = async (req, res) => {
    try {
        const { type, category } = req.params;
        console.log(`Type: ${type}, Category: ${category}`);
        const response = await Banner.getBannersByTypeAndCategory(type, category);
        res.status(200).json(response);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getHomeBanner };
