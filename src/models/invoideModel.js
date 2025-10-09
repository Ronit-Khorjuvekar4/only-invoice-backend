const mongoose = require('mongoose')
const Client = require('./clientModel')
const { createOrgId } = require('../utils/common')

const invoiceSchema = new mongoose.Schema({
    clientId: {
        type: String,
        required: true,
        trim: true,
        ref: Client
    },
    invoiceNumber: {
        type: String,
        required: true,
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

clientSchema.pre('save', async function(next) {
    if (this.isNew) {
        try {
            const nextSeq = await getNextSequence('clientId');
            this.orgSequenceNumber = nextSeq;

            const currentYear = new Date().getFullYear();
            this.orgId = `${await createOrgId(this.orgName.toUpperCase())}-${currentYear}-${this.orgSequenceNumber}`;

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