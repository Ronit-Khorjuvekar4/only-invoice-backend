const Client = require('../models/clientModel');

exports.getClientService = async() => {
    try {
        const ok = await Client.find({},
            '_id clientName clientEmail orgName clientPhone'
        )
        return ok
    } catch (err) {
        console.log('Error in fetching client:', err);
        throw new Error('Error in fetching client');
    }
}

exports.createClientService = async(clientData) => {

    try {
        const newClient = new Client(clientData)
        console.log(newClient)
        await newClient.save()
        return newClient;
    } catch (err) {
        console.log('Error in creating client:', err);
        throw new Error('Error in creating client');
    }

}