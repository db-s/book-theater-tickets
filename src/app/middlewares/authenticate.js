const { Util } = require('../lib');
const VALID_TOKEN = 'hello@123';

module.exports = (req, res, next) => {
    const authHeader = req.get('authorization');

    if (!authHeader) {
        return res.sendStatus(401);
    }
    
    const token = Util.parseBearerToken(authHeader);

    if (token === VALID_TOKEN) {
        next();
    } else {
        res.sendStatus(401);
    }
};
