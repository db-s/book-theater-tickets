const mongoose = require('mongoose');
const { DbHelper } = require('../lib');

module.exports = async () => {
    try {
        console.log(`Connecting db...`);
        console.log(`URI: ${DbHelper.getConnectionURI()}`);
        await mongoose.connect(DbHelper.getConnectionURI(), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        });
        console.info('DB connected.');
    } catch (err) {
        console.error('DB Connection ERROR', err);
    }
};
