const mongoose = require('mongoose')
const { getNextSequence } = require('./Counter')
const { createOrgId } = require('../utils/common')

const clientSchema = new mongoose.Schema({
    clientName: {
        type: String,
        required: true,
        trim: true,
    },
    orgName: {
        type: String,
        required: true,
        trim: true
    },
    orgId: {
        type: String,
        required: false,
        trim: true,
    },
    clientEmail: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Please fill a valid email address'],
        sparse: true,
    },
    clientPhone: {
        type: Number,
        length: 10,
        trim: true,
        required: true,
        unique: true,
    },
    clientAddress1: {
        type: String,
        required: false,
        trim: true
    },
    clientAddress2: {
        type: String,
        required: false,
        trim: true
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

const Client = mongoose.model('Client', clientSchema)

module.exports = Client;