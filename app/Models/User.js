const db = require('../../config/db');
const { getPrefixedTableName } = require('../../config/dbUtils');
// const paginate  = require('../../config/pagination');


const getAllUsers = async () => {
    try {

        const tableName = getPrefixedTableName('users');
        const [queryResponse] = await db.query(`SELECT * FROM \`${tableName}\` LIMIT 10`);
        return queryResponse;
    } catch (err) {
        throw new Error(err.message);
    }
};

const getUserById = async (id) => {
    try {
        const tableName = getPrefixedTableName('users');
        const [queryResponse] = await db.query(`SELECT * FROM \`${tableName}\` WHERE id = ?`, [id]);
        return queryResponse[0];
    } catch (err) {
        throw new Error(err.message);
    }
};

const createUser = async (userData) => {
    try {
        const { first_name, last_name, mobile, email, password, access_password } = userData;

        // Check if the mobile number already exists
        const [existingUser] = await db.query(
            'SELECT `id` FROM `users` WHERE `mobile` = ? OR `email` = ?',
            [mobile, email]
        );

        if (existingUser.length > 0) {
            throw new Error('A user with this mobile or email already exists.');
        }

        // Insert the new user into the database
        const [queryResponse] = await db.query(
            'INSERT INTO `users` (`first_name`, `last_name`, `mobile`, `email`, `password`, `access_password`) VALUES (?, ?, ?, ?, ?, ?)',
            [first_name, last_name, mobile, email, password, access_password]
        );

        return queryResponse.insertId;
    } catch (err) {
        throw new Error(err.message);
    }

};

const updateUser = async (id, userData) => {
    try {
        const { name, email, password } = userData;
        const [queryResponse] = await db.query(
            'UPDATE `users` SET name = ?, email = ?, password = ? WHERE id = ?',
            [name, email, password, id]
        );
        return queryResponse.affectedRows > 0;
    } catch (err) {
        throw new Error(err.message);
    }
};

const deleteUser = async (id) => {
    try {
        const [queryResponse] = await db.query('DELETE FROM `users` WHERE id = ?', [id]);
        return queryResponse.affectedRows > 0;
    } catch (err) {
        throw new Error(err.message);
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};
