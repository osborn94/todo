const joi = require('joi');

const validateUser = async (req, res, next) => {
    const schema = joi.object({
        username: joi.string().trim().min(3).max(30).required(),
        password: joi.string().min(6).required(),
        role: joi.string().valid('user', 'admin').optional()
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ 
            message: error.details[0].message 
        });
    }
    next();
}

module.exports = {
    validateUser
};