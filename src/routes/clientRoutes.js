const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');

// GET route to fetch all clients
router.get('/clients', clientController.getClientController);

router.post('/clients', clientController.createClientController);

router.post('/create-invoice', clientController.createInvoiceController);

router.get('/get-invoice', clientController.getAllInvoiceController);

router.get('/single-invoice', clientController.getSingleInvoiceController);

router.delete('/delete-invoice',clientController.deleteInvoiceController)

router.put('/edit-invoice',clientController.editInvoiceController)

module.exports = router;