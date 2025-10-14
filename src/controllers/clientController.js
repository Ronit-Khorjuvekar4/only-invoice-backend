const clientService = require('../services/clientService')

exports.getClientController = async (req, res) => {

    try {
        const result = await clientService.getClientService()
        res.status(200).json({
            success: true,
            message: 'Clients fetched successfully',
            data: result
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Something went wrong while fetching clients',
            data: []
        });
    }

}

exports.createClientController = async (req, res) => {
    try {

        const result = await clientService.createClientService(req.body)
        res.status(201).json({
            success: true,
            message: 'Client created successfully',
            data: result,
        });

    } catch (error) {
        res.status(error.message.includes('already exists') ? 409 : 500).json({
            success: false,
            message: error.message || 'Something went wrong while creating client',
            data: null,
        });
    }
}

exports.createInvoiceController = async (req, res) => {
    try {
        const result = await clientService.createInvoiceService(req.body, req.query.clientId)
        res.status(201).json({
            success: true,
            message: 'Invoice created successfully',
            data: result,
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'Failed to create invoice',
            data: null,
        });

    }
}

exports.getAllInvoiceController = async (req, res) => {
    try {
        const clientId = req.query.clientId;
        const result = await clientService.getAllInvoiceService(clientId);

        res.status(200).json({
            success: true,
            message: 'Invoices fetched successfully',
            data: result
        });

    } catch (err) {
        console.error('Error in getAllInvoiceController:', err);

        res.status(500).json({
            success: false,
            message: err.message || 'Something went wrong while fetching invoices',
            data: []
        });
    }
};


exports.getSingleInvoiceController = async (req, res) => {
    try {
        const invoiceId = req.query.invoiceId;
        const invoice = await clientService.getSingleInvoiceService(invoiceId);

        res.status(200).json({
            success: true,
            message: 'Invoice fetched successfully',
            data: invoice,
        });

    } catch (err) {
        console.error('Error in getSingleInvoiceController:', err);

        res.status(err.message === 'Invoice not found' ? 404 : 500).json({
            success: false,
            message: err.message || 'Something went wrong while fetching the invoice',
            data: null,
        });
    }
};


exports.deleteInvoiceController = async (req, res) => {
    try {
        const invoiceId = req.query.invoiceId;
        const result = await clientService.deleteInvoiceService(invoiceId);

        res.status(200).json({
            success: true,
            message: result.message,
            data: null,
        });

    } catch (err) {
        res.status(err.message.includes('not found') ? 404 : 500).json({
            success: false,
            message: err.message || 'Something went wrong while deleting the invoice',
            data: null,
        });
    }
};

exports.editInvoiceController = async (req, res) => {
    try {
        const invoiceId = req.query.invoiceId;
        const result = await clientService.editInvoiceService(req.body, invoiceId);

        res.status(200).json({
            success: true,
            message: 'Invoice updated successfully',
            data: result,
        });

    } catch (err) {
        console.error('Error in editInvoiceController:', err);

        res.status(500).json({
            success: false,
            message: err.message || 'Something went wrong while editing invoice',
            data: null,
        });
    }
};
