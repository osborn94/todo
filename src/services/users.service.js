const userModel = require('../models/users.model');

const createUser = async ({username, password, role}) => {

    return await userModel.create({username, password, role});
}

const loginUser = async ({username, password}) => {
    return await userModel.findOne({ username, password });
}


module.exports = {
    createUser,
    loginUser
};
