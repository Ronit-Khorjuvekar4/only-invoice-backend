const mongoose = require('mongoose')
const Client = require('./clientModel')
const { getNextSequence } = require('./invoiceCounter')
const { creteInvoiceId } = require('../utils/common')


const invoiceSchema = new mongoose.Schema({
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        trim: true,
        ref: Client
    },
    invoiceNumber: {
        type: String,
        required: false,
        unique: true,
        trim: true
    },
    startDate: {
        type: Date,
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['Paid', 'Pending', 'Overdue', 'Advanced Paid'],
        default: 'Pending',
        required: true,
        trin: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})


invoiceSchema.pre('save', async function(next) {

    if (this.isNew) {
        try {

            const nextSeq = await getNextSequence('invoiceId');
            this.orgSequenceNumber = nextSeq;

            const orgId = await Client.findOne({ _id: this.clientId }, 'orgId')

            const currentYear = new Date().getFullYear();
            this.invoiceNumber = `INV-${await creteInvoiceId(orgId.orgId)}-${this.orgSequenceNumber}-${currentYear}`;

            next();
        } catch (error) {
            console.error('Error generating sequence/orgId:', error);
            next(error);
        }
    } else {
        next();
    }
});

const Invoice = mongoose.model('Invoice', invoiceSchema)
module.exports = Invoice