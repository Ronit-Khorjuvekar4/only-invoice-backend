const mongoose = require('mongoose')

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
    clientEmail: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Please fill a valid email address']
    },
    clientPhone: {
        type: Number,
        length: 10,
        trim: true,
        required: true
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

const Client = mongoose.model('Client', clientSchema)

module.exports = Client;