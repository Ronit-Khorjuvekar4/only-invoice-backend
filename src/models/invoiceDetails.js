const mongoose = require('mongoose')
const Invoice = require('./invoideModel')
const Client = require('./clientModel')


const invoiceDetailSchema = new mongoose.Schema({
    invoiceNumber: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Invoice,
        required: true
    },
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Client,
        required: true
    },
    discount: {
        type: Number,
        required: true
    },
    advanceAmount: {
        type: Number,
        required: false
    },
    subTotal: {
        type: Number,
        required: false
    },
    finalTotal: {
        type: Number,
        required: false
    },
    remainingBalance: {
        type: Number,
        required: false
    },
    items: [{
        id: {
            type: Number,
            required: false
        },
        serviceId: { type: String, required: false, trim: true },
        amount: {
            type: Number,
            required: false,
        },
        details: {
            type: String,
            required: false,
            trim: true
        }

    }]
})

const InvoiceDetails = mongoose.model('InvoiceDetails', invoiceDetailSchema)
module.exports = InvoiceDetails