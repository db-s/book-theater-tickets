const mongoose = require('mongoose');
const dbConn = require('../db/conn');
const { Ticket } = require('../models/schemas');
const { TicketsService, AnalyticsService } = require('../services');
const ticketsSeed = require('./seed/tickets.seed');
const getRandomTicket = () => {
    return ticketsSeed[Math.floor(Math.random() * ticketsSeed.length)];
};
const dateRange = {
    start: '2021-08-01',
    end: '2021-10-31',
};

beforeAll(async () => {
    await dbConn();
    const createList = ticketsSeed.map(t => TicketsService.createTicket(t));
    await Promise.allSettled(createList);
}, 20000);

afterAll(async () => {
    await Ticket.collection.drop();
    await mongoose.disconnect();
    console.log('DB disconnected.');
});

describe('Analytics Service', () => {
    test('basic test', () => {
        expect(1+1).toEqual(2);
    });

    test('get visitors between date range by month - db aggregation', async () => {
        const { visitorCount } = await AnalyticsService.getVisitorCountByDbAggregation(dateRange.start, dateRange.end);

        expect(Array.isArray(visitorCount)).toBeTruthy();
        expect(visitorCount).toHaveLength(3);
        expect(visitorCount[2]?.month).toEqual('October');
        expect(visitorCount[2]?.summaryVisits).toEqual(3);
    });

    test('get visitors between date range by month - js algorithm', async () => {
        const { visitorCount } = await AnalyticsService.getVisitorCountByJSAlgo(dateRange.start, dateRange.end);

        expect(Array.isArray(visitorCount)).toBeTruthy();
        expect(visitorCount).toHaveLength(3);
        expect(visitorCount[2]?.month).toEqual('October');
        expect(visitorCount[2]?.summaryVisits).toEqual(3);
    });

    test('get total earning between date range by month - db aggregation', async () => {
        const { earning } = await AnalyticsService.getEarningByDbAggregation(dateRange.start, dateRange.end);

        expect(Array.isArray(earning)).toBeTruthy();
        expect(earning).toHaveLength(3);
        expect(earning[2]?.month).toEqual('October');
        expect(earning[2]?.summaryProfit).toEqual(340 + 550 + 550);
    });

    test('get total earning between date range by month - js algorithm', async () => {
        const { earning } = await AnalyticsService.getEarningByJSAlgo(dateRange.start, dateRange.end);

        expect(Array.isArray(earning)).toBeTruthy();
        expect(earning).toHaveLength(3);
        expect(earning[2]?.month).toEqual('October');
        expect(earning[2]?.summaryProfit).toEqual(340 + 550 + 550);
    });
});
