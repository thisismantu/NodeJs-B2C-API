const express = require('express');
const router = express.Router();

// Controllers
const UserController = require('../app/Controllers/UserController');
const ItemController = require('../app/Controllers/ItemController');
const BannerController = require('../app/Controllers/BannerController');

// Group routes for users
router.route('/users')
    .get(UserController.getAllUsers)          
    .post(UserController.createUser);        

router.route('/users/:id')
    .get(UserController.getUserById)         
    .put(UserController.updateUser)         
    .delete(UserController.deleteUser);    

//Group routes for items
router.get('/items', ItemController.getItems); // Get all items

router.get('/banners/hero', BannerController.getHomeBanner);  // Hero banner for homepage
router.get('/banners/m/hero', BannerController.getHomeBanner); // Hero banner for mobile view

module.exports = router;
