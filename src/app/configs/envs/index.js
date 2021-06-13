const envConfigs = require(`./${process.env.NODE_ENV}`);
module.exports = envConfigs;
