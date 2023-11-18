/* ************************************************************************** */
/* src/models/tickets.js */
/* ************************************************************************** */

const { Schema, model } = require('mongoose');

const ticketSchema = new Schema(
  {
    code: {
      type: String,
      unique: true,
      required: true,
    },
    purchase_datetime: {
      type: Date,
      required: true,
      default: Date.now,
    },
    amount: {
      type: Number,
      required: true,
    },
    purchaser: {
      type: String,
      required: true,
    },
  },
  { collection: 'tickets' }
);

const Ticket = model('Ticket', ticketSchema);

module.exports = {
  Ticket,
};
