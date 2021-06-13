const { Ticket } = require('../models/schemas');
const { DbHelper } = require('../lib');

class TicketsService {
    static async createTicket(ticketData) {
        try {
            const ticket = new Ticket(ticketData);
            await ticket.save();
            return { ticket };
        } catch (e) {
            return DbHelper.handleDBError(e);
        }
    }

    static async getTickets(filters) {
        try {
            const tickets = await Ticket.find({});
            return { tickets };
        } catch (e) {
            return DbHelper.handleDBError(e);
        }
    }

    static async getTicket(id) {
        try {
            const ticket = await Ticket.findById(id);
            return { ticket };
        } catch (e) {
            return DbHelper.handleDBError(e);
        }
    }

    static async getTicketByAttribute(attr) {
        try {
            const ticket = await Ticket.findOne(attr);
            return { ticket };
        } catch (e) {
            return DbHelper.handleDBError(e);
        }
    }

    static async updateTicket(id, ticketData) {
        try {
            await Ticket.findByIdAndUpdate(id, ticketData);
            const ticket = await Ticket.findById(id);
            return { ticket };
        } catch (e) {
            return DbHelper.handleDBError(e);
        }
    }

    static async deleteTicket(id) {
        try {
            await Ticket.findByIdAndRemove(id);
            return {
                success: true,
            };
        } catch (e) {
            return DbHelper.handleDBError(e);
        }
    }
}

module.exports = TicketsService;
