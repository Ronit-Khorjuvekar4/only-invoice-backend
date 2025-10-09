const Client = require('../models/clientModel');
const Invoice = require('../models/clientModel');

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


        const orgId = await Client.findOne({ _id: clientId }, 'orgId');

        const invoiceCount = await Invoice.countDocuments({ clientId: clientId });

        let newInvoiceId = await creteInvoiceId(orgId.orgId, invoiceCount)




        // const invoice = await Invoice({
        //     startDate,
        //     dueDate,
        //     status,
        //     clientId
        // })

    } catch (err) {
        console.log(err)

    }

}