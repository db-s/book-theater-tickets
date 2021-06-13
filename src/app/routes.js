const express = require('express');
const router = express.Router();
const { ping, tickets, analytics } = require('./route-handlers');
const { authenticate } = require('./middlewares');
const swaggerUI = require('swagger-ui-express');
const swaggerDocs = require('./swagger.json');

router.use('/api-docs', swaggerUI.serve);
router.get('/api-docs', swaggerUI.setup(swaggerDocs));
router.use('/api/ping', ping);
router.use('/api/tickets', authenticate, tickets);
router.use('/api/analytics', authenticate, analytics);

module.exports = router;
