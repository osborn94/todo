const userService = require('../services/users.service');
const AppError = require('../utils/AppError');

const createUserController = async (req, res, next) => {
    try {
        const { username, password, password2, role } = req.body;
        if (password !== password2) {
            throw new AppError('Passwords do not match', 400);
        }

        const user = await userService.createUser({ username, password, role });
        res.status(201).json({
            code: 201,
            message: 'User created successfully',
            data: user
        });

    } catch (error) {
        next(error);
    }

}

const loginUserController = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            throw new AppError('Username and password are required', 400);
        }
        const user = await userService.loginUser({ username, password });
        if (!user) {
            throw new AppError('Invalid username or password', 401);
        }
        if (user.code === 200) {
            req.session.userId = user.data.user._id;
        }
        res.status(200).json({
            code: 200,
            message: 'User logged in successfully',
            data: user
        });
    } catch (error) {
        next(error);
    }
} 

const logoutUserController = async (req, res, next) => {
    try {
        res.clearCookie('token');
        res.status(200).json({
            code: 200,
            message: 'User logged out successfully'
        });

    } catch (error) {
        next(error);
    }
}

module.exports = {
    createUserController,
    loginUserController,
    logoutUserController
};