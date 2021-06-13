const { model, Schema } = require('mongoose');

const TicketSchema = new Schema({
    customerName: {
        type: String,
        required: [true, 'Customer Name can not be blank'],
    },
    performanceTitle: {
        type: String,
        required: [true, 'Performance Title can not be blank'],
    },
    performanceTime: {
        type: Date,
        required: [true, 'Performance Time can not be blank'],
    },
    ticketPrice: {
        type: Number,
        required: [true, 'Ticket Price can not be blank'],
        validate: {
            validator: tp => tp >= 0,
            message: 'Ticket Price can not be negative',
        },
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

const Ticket = model('ticket', TicketSchema);

module.exports = Ticket;
