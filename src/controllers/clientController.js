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
        res.status(201).json({ "msg": "Client Added" });

    } catch (err) {
        console.log(err)
    }
}