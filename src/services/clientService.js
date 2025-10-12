const Client = require('../models/clientModel');
const Invoice = require('../models/invoideModel');
const InvoiceDetails = require('../models/invoiceDetails');


const { createOrgId, creteInvoiceId } = require('../utils/common');


exports.getClientService = async() => {
    try {
        const ok = await Client.find({},
            '_id orgId clientName clientEmail orgName clientPhone'
        )
        return ok
    } catch (err) {
        console.log('Error in fetching client:', err);
        throw new Error('Error in fetching client');
    }
}

exports.createClientService = async(clientData) => {

    try {
        console.log(clientData)
        const newClient = new Client(clientData)
        await newClient.save()
        return newClient;

    } catch (error) {
        console.log(error)
        if (error.code === 11000) {
            // return res.status(409).json({ message: 'Client already exists or unique ID collision occurred.' });
        }
    }

}

exports.createInvoiceService = async(body, clientId) => {

    try {

        let {
            startDate,
            dueDate,
            status,
            discount,
            advanceAmount,
            items,
            subTotal,
            finalTotal,
            remainingBalance
        } = body


        const invoice = await Invoice({
            startDate,
            dueDate,
            status,
            clientId
        })

        await invoice.save()

        const invoice_id = invoice._id

        const invoiceDetails = await InvoiceDetails({
            discount,
            advanceAmount,
            items,
            subTotal,
            finalTotal,
            remainingBalance,
            invoice_id,
            clientId
        })

        await invoiceDetails.save()


        return { 'msg': "Saved" }

    } catch (err) {
        console.log(err)

    }

}

exports.getAllInvoiceService = async(clientId,invoices) => {
    try {
        let invoiceDetailsData = 'discount advanceAmount subTotal finalTotal remainingBalance'
        let invoideData = 'invoiceNumber status dueDate'
        let clientData = 'orgName'
        
        const ok = await InvoiceDetails.find({ clientId: clientId }, invoiceDetailsData)
            .populate('invoice_id', invoideData)
            .populate('clientId',clientData)
            .exec();

        return ok

    } catch (err) {
        console.log(err)
    }
}


exports.getSingleInvoiceService = async(invoiceId) => {
    try {

        
        let invoiceDetailsData = 'discount advanceAmount subTotal finalTotal remainingBalance items'
        let invoideData = 'invoiceNumber status dueDate'
        let clientData = 'clientName orgName clientEmail clientPhone clientAddress1 clientAddress2 orgId'

        const ok = await InvoiceDetails.findOne({ invoice_id: invoiceId }, invoiceDetailsData)
            .populate('invoice_id', invoideData)
            .populate('clientId',clientData)
            .exec();

        console.log(ok)

        return ok

    } catch (err) {
        console.log(err)
    }
}