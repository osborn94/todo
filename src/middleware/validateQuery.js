const AppError = require('../utils/AppError');

const validateQuery = (schema) => (req, res, next) => {
    const parsed = schema.safeParse(req.query);

    if (!parsed.success) {
        return next(new AppError(parsed.error.issues[0].message, 400));
    }

    req.query = parsed.data;
    next();
};

module.exports = validateQuery;