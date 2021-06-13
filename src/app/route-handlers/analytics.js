const express = require('express');
const router = express.Router();
const { AnalyticsService } = require('../services');
const { Util } = require('../lib');

router.get('/visited', async (req, res, next) => {
    try {
        const method = req.query.method || 'aggregation';
        let result = {};

        switch (method) {
            case 'aggregation':
            default:
                result = await AnalyticsService.getVisitorCountByDbAggregation(req.query.start, req.query.end);
                break;
            
            case 'jsalgo':
                result = await AnalyticsService.getVisitorCountByJSAlgo(req.query.start, req.query.end);
                break;
        }

        if (result.error) {
            res.status(400).json(Util.getErrorApiResponse(400, result.message));
        } else {
            res.json(Util.getSuccessApiResponse(result));
        }
    } catch (e) {
        next(e);
    }
});

router.get('/earning', async (req, res, next) => {
    try {
        const method = req.query.method || 'aggregation';
        let result = {};

        switch (method) {
            case 'aggregation':
            default:
                result = await AnalyticsService.getEarningByDbAggregation(req.query.start, req.query.end);
                break;
            
            case 'jsalgo':
                result = await AnalyticsService.getEarningByJSAlgo(req.query.start, req.query.end);
                break;
        }

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
