const mongoose = require('mongoose');
const dbConn = require('../db/conn');
const { Ticket } = require('../models/schemas');
const { TicketsService } = require('../services');
const ticketsSeed = require('./seed/tickets.seed');
const getRandomTicket = () => {
    return ticketsSeed[Math.floor(Math.random() * ticketsSeed.length)];
};

beforeAll(async () => {
    await dbConn();
});

afterAll(async () => {
    await Ticket.collection.drop();
    await mongoose.disconnect();
    console.log('DB disconnected.');
});

describe('Ticket Service', () => {
    test('basic test', () => {
        expect(1+1).toEqual(2);
    });

    test('creates new tickets', async () => {
        const createList = ticketsSeed.map(t => TicketsService.createTicket(t));
        const result = await Promise.allSettled(createList);
        const firstTicket = result[0]?.value?.ticket;
        const firstTicketFromDB = await TicketsService.getTicket(firstTicket?._id);

        expect(result).toBeDefined();
        expect(result).toHaveLength(ticketsSeed.length);
        expect(firstTicket?._id).toBeDefined();
        expect(firstTicket?.performanceTitle).toBeDefined();
        expect(firstTicketFromDB?.ticket?.performanceTitle).toBeDefined();
        expect(firstTicketFromDB?.ticket?.performanceTitle).toEqual(firstTicket?.performanceTitle);
    }, 20000);

    test('get all tickets', async () => {
        const { tickets } = await TicketsService.getTickets();
        const firstTicket = tickets[0];

        expect(tickets).toBeDefined();
        expect(tickets).toHaveLength(ticketsSeed.length);
        expect(firstTicket?._id).toBeDefined();
        expect(firstTicket?.performanceTitle).toBeDefined();
        expect(typeof firstTicket?.performanceTitle).toBe('string');
    });

    test('update a ticket', async () => {
        const randomTicket = getRandomTicket();
        const randomTicketFromDb = await TicketsService.getTicketByAttribute({ performanceTitle: randomTicket.performanceTitle });
        const newTitle = { performanceTitle: 'The Homecoming' };
        await TicketsService.updateTicket(randomTicketFromDb?.ticket?._id, newTitle);
        const { ticket } = await TicketsService.getTicket(randomTicketFromDb?.ticket?._id);

        expect(ticket).toBeDefined();
        expect(ticket?._id).toBeDefined();
        expect(ticket?.performanceTitle).toEqual(newTitle.performanceTitle);
    });

    test('delete a ticket', async () => {
        const randomTicket = getRandomTicket();
        await TicketsService.deleteTicket(randomTicket?._id);
        const { ticket } = await TicketsService.getTicket(randomTicket?._id);

        expect(ticket).toBeNull();
    });
});
