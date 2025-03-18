const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/add', userController.createUser);

router.get('/', userController.getUsers);

router.get('/:id', userController.getUserById);

router.put('/:id', userController.updateUserById);

router.delete('/:id', userController.deleteUserById);

router.post('/login', userController.loginUser);

module.exports = router;