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

        const invoiceNumber = invoice._id

        const invoiceDetails = await InvoiceDetails({
            discount,
            advanceAmount,
            items,
            subTotal,
            finalTotal,
            remainingBalance,
            invoiceNumber,
            clientId
        })

        await invoiceDetails.save()


        return { 'msg': "Saved" }

    } catch (err) {
        console.log(err)

    }

}

exports.getInvoiceService = async(clientId) => {
    try {
        const ok = await InvoiceDetails.find({ clientId: clientId }, 'discount advanceAmount subTotal finalTotal remainingBalance')
            .populate('invoiceNumber', 'invoiceNumber status dueDate')
            .exec();

        return ok

    } catch (err) {
        console.log(err)
    }
}