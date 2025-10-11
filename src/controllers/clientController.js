const clientService = require('../services/clientService')

exports.getClientController = async(req, res) => {

    try {
        const result = await clientService.getClientService()
        res.status(201).json(result);

    } catch (err) {
        console.log(err)
    }

}

exports.createClientController = async(req, res) => {
    try {

        const result = await clientService.createClientService(req.body)
        res.status(201).json({ result, "msg": "Client Added" });

    } catch (err) {
        console.log(err)
    }
}

exports.createInvoiceController = async(req, res) => {
    try {
        const result = await clientService.createInvoiceService(req.body, req.query.clientId)
        res.status(201).json({ result, "msg": "Invoice Added" });

    } catch (err) {
        console.log(err)

    }
}

exports.getInvoiceController = async(req, res) => {
    try {
        const result = await clientService.getInvoiceService(req.query.clientId)
        res.status(201).json(result);

    } catch (err) {
        console.log(err)
    }
}