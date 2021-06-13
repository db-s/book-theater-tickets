const mongoose = require('mongoose');
const { envConfigs } = require('../configs');

class DbHelper {
    static getConnectionURI() {
        return `mongodb://${envConfigs.db.host}/${envConfigs.db.name}`;
    }

    static isDbError(err) {
        return err instanceof mongoose.Error.ValidationError;
    }

    static populateDbErrorMessages(err) {
        return Object.values(err.errors).map(i => i.message).join(', ');
    }

    static handleDBError(err) {
        if (!this.isDbError(err)) {
            throw err;
        }
        
        return {
            error: true,
            message: this.populateDbErrorMessages(err),
        };
    }
};

module.exports = DbHelper;
