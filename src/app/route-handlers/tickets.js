const express = require('express');
const router = express.Router();
const { validateId } = require('../middlewares');
const { TicketsService } = require('../services');
const { Util } = require('../lib');

router.post('/', async (req, res, next) => {
    try {
        const createPayload = req.body;
        const result = await TicketsService.createTicket(createPayload);

        if (result.error) {
            res.status(400).json(Util.getErrorApiResponse(400, result.message));
        } else {
            res.json(Util.getSuccessApiResponse(result));
        }
    } catch (e) {
        next(e);
    }
});

router.get('/', async (req, res, next) => {
    try {
        const result = await TicketsService.getTickets();

        if (result.error) {
            res.status(400).json(Util.getErrorApiResponse(400, result.message));
        } else {
            res.json(Util.getSuccessApiResponse(result));
        }
    } catch (e) {
        next(e);
    }
});

router.get('/:id', validateId, async (req, res, next) => {
    try {
        const ticketId = req.params.id;
        const result = await TicketsService.getTicket(ticketId);

        if (result.error) {
            res.status(400).json(Util.getErrorApiResponse(400, result.message));
        } else {
            res.json(Util.getSuccessApiResponse(result));
        }
    } catch (e) {
        next(e);
    }
});

router.patch('/:id', validateId, async (req, res, next) => {
    try {
        const ticketId = req.params.id;
        const updatePayload = req.body;
        const result = await TicketsService.updateTicket(ticketId, updatePayload);

        if (result.error) {
            res.status(400).json(Util.getErrorApiResponse(400, result.message));
        } else {
            res.json(Util.getSuccessApiResponse(result));
        }
    } catch (e) {
        next(e);
    }
});

router.delete('/:id', validateId, async (req, res, next) => {
    try {
        const ticketId = req.params.id;
        const result = await TicketsService.deleteTicket(ticketId);

        if (result.error) {
            res.status(400).json(Util.getErrorApiResponse(400, result.message));
        } else {
            res.json(Util.getSuccessApiResponse(result));
        }
    } catch (e) {
        next(e);
    }
});

module.exports = router;
