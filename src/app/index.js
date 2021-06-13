const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const appRoutes = require('./routes');
const dbConn = require('./db/conn');
const { Util } = require('./lib');

const app = express();

// connect db
dbConn();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(appRoutes);

// invalid route
app.use('*', (req, res, next) => {
    console.log(`ERROR: Invalid route - ${req.originalUrl}`);
    res.sendStatus(404);
});

// global route error handler
app.use((err, req, res, next) => {
    console.log(err.stack);
    if (Util.isDevEnv()) {
        res.status(500).json(Util.getErrorApiResponse(500, err.message || 'Internal Server Error'));
    } else {
        res.sendStatus(500);
    }
});

module.exports = app;
