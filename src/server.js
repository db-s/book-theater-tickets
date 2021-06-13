process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const app = require('./app');
const { envConfigs } = require('./app/configs');
const PORT = envConfigs.server.port;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
    console.log(`ENV: ${process.env.NODE_ENV}`);
});

process
    .on('uncaughtException', err => {
        console.error(`:: UNCAUGHT EXCEPTION :: ${err.message}`);
        console.error(err.stack);
        process.exit(1);
    })
    .on('unhandledRejection', (reason, p) => {
        console.error(`:: UNHANDLED REJECTION :: ${reason}`);
        console.error(`Promise: ${p}`);
        process.exit(1);
    });
