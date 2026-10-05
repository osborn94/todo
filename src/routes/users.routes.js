const express = require('express');
// const validateQuery = require('../middleware/validateQuery');
// const { getAllTasksQuerySchema } = require('../utils/taskValidators');
const UserController = require('../controllers/users.controller');
const UserMiddleware = require('../middleware/users.middleware');

const router = express.Router();


router.post('/signup', UserMiddleware.validateUser, UserController.createUserController);
router.post('/login', UserMiddleware.validateUser, UserController.loginUserController);
router.post('/logout', UserController.logoutUserController);

module.exports = router;