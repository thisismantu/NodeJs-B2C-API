const db = require("../../config/db");

const homeBanners = async () => {
    try {
        const [queryResponse] = await db.query("select * from `media` where `banner_layouts`='HOME_BANNER' AND `is_active`=1 and `uploads` IS NOT NULL order By position Asc LIMIT 10");
        return queryResponse;
    } catch (err) {

        throw new Error(err.message);
    }
};

const getBannersByTypeAndCategory = async (category) => {
    try {
        const [banners] = await db.query(
            'SELECT * FROM `media` WHERE `banner_layouts` = ?  AND `is_active`=1 and `uploads` IS NOT NULL  order By `position` Asc LIMIT 10',
            [category]
        );
        return banners;
    } catch (err) {
        throw new Error(err.message);
    }
};

module.exports = { homeBanners, getBannersByTypeAndCategory };