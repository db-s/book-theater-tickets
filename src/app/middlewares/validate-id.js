const { Types } = require('mongoose');
const { Util } = require('../lib');

module.exports = (req, res, next) => {
    const id = req.params.id || req.query.id;

    if (Types.ObjectId.isValid(id)) {
        next();
    } else {
        res.status(400).json(Util.getErrorApiResponse(400, 'Invalid ID'));
    }
};
