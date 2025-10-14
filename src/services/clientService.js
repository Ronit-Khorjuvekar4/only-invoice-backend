const Client = require('../models/clientModel');
const Invoice = require('../models/invoideModel');
const InvoiceDetails = require('../models/invoiceDetails');
const mongoose = require('mongoose')
const { createOrgId, creteInvoiceId } = require('../utils/common');

exports.getClientService = async () => {
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

exports.createClientService = async (clientData) => {

    try {
        console.log(clientData)
        const newClient = new Client(clientData)
        await newClient.save()
        return newClient;

    } catch (error) {
        console.error('Error creating client:', error);

        if (error.code === 11000) {
            throw new Error('Client already exists or unique ID collision occurred.');
        }

        throw new Error('Failed to create client');
    }

}

exports.createInvoiceService = async (body, clientId) => {

    let session = null;

    try {
        session = await mongoose.startSession();
        session.startTransaction();

        const {
            startDate,
            dueDate,
            status,
            discount,
            advanceAmount,
            items,
            subTotal,
            finalTotal,
            remainingBalance
        } = body;

        const [invoice] = await Invoice.create([{
            startDate,
            dueDate,
            status,
            clientId
        }], { session });

        const invoice_id = invoice._id;

        const [invoiceDetails] = await InvoiceDetails.create([{
            discount,
            advanceAmount,
            items,
            subTotal,
            finalTotal,
            remainingBalance,
            invoice_id,
            clientId
        }], { session });

        await session.commitTransaction();
        session.endSession();

        return { invoiceDetails };

    } catch (err) {
        if (session) await session.abortTransaction();
        if (session) session.endSession();
        console.error('Error creating invoice:', err);
        throw new Error(err.message || 'Failed to create invoice');
    }

}

exports.getAllInvoiceService = async (clientId) => {
    try {
        const invoiceDetailsData = 'discount advanceAmount subTotal finalTotal remainingBalance';
        const invoiceData = 'invoiceNumber status dueDate';
        const clientData = 'orgName';

        const invoices = await InvoiceDetails.find({ clientId }, invoiceDetailsData)
            .populate('invoice_id', invoiceData)
            .populate('clientId', clientData)
            .exec();

        return invoices;
    } catch (err) {
        console.error('Error fetching invoices:', err);
        throw new Error('Failed to fetch invoices');
    }
};

exports.getSingleInvoiceService = async (invoiceId) => {
    try {
        const invoiceDetailsData = 'discount advanceAmount subTotal finalTotal remainingBalance items';
        const invoiceData = 'invoiceNumber status dueDate startDate';
        const clientData = 'clientName orgName clientEmail clientPhone clientAddress1 clientAddress2 orgId';

        const invoice = await InvoiceDetails.findOne({ invoice_id: invoiceId }, invoiceDetailsData)
            .populate('invoice_id', invoiceData)
            .populate('clientId', clientData)
            .exec();

        if (!invoice) {
            throw new Error('Invoice not found');
        }

        return invoice;

    } catch (err) {
        console.error('Error fetching single invoice:', err);
        throw new Error(err.message || 'Failed to fetch invoice');
    }
};

exports.deleteInvoiceService = async (invoiceId) => {
    try {
        const detailsResult = await InvoiceDetails.deleteOne({ invoice_id: invoiceId });

        if (detailsResult.deletedCount === 0) {
            throw new Error('Invoice details not found.');
        }

        const invoiceResult = await Invoice.deleteOne({ _id: invoiceId });

        if (invoiceResult.deletedCount === 0) {
            throw new Error('Invoice not found or deletion failed.');
        }

        return { success: true, message: 'Invoice and details successfully deleted.' };

    } catch (err) {
        console.error('Error deleting invoice:', err);
        throw new Error(err.message || 'Failed to delete invoice.');
    }
};

exports.editInvoiceService = async (body, invoiceId) => {
    let session = null;

    try {
        session = await mongoose.startSession();
        session.startTransaction();

        const {
            startDate,
            dueDate,
            status,
            discount,
            advanceAmount,
            items,
            subTotal,
            finalTotal,
            remainingBalance
        } = body;

        await Invoice.updateOne(
            { _id: invoiceId },
            { $set: { startDate, dueDate, status } },
            { session }
        );

        await InvoiceDetails.updateOne(
            { invoice_id: invoiceId },
            { $set: { discount, advanceAmount, items, subTotal, finalTotal, remainingBalance } },
            { session }
        );

        await session.commitTransaction();
        session.endSession();

        const updatedInvoice = await InvoiceDetails.findOne({ invoice_id: invoiceId })
            .populate('invoice_id')
            .populate('clientId');

        return updatedInvoice;

    } catch (err) {
        if (session) await session.abortTransaction();
        if (session) session.endSession();
        console.error('Error editing invoice:', err);
        throw new Error(err.message || 'Failed to edit invoice');
    }
};
