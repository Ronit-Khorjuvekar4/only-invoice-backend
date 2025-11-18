const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');
const { authMiddleware } = require('../middleware/authMiddleware');

// GET route to fetch all clients
router.get('/clients', clientController.getClientController);

router.post('/clients',authMiddleware, clientController.createClientController);

router.post('/create-invoice',authMiddleware, clientController.createInvoiceController);

router.get('/get-invoice',authMiddleware, clientController.getAllInvoiceController);

router.get('/single-invoice',authMiddleware, clientController.getSingleInvoiceController);

router.delete('/delete-invoice',authMiddleware,clientController.deleteInvoiceController)

router.put('/edit-invoice',authMiddleware,clientController.editInvoiceController)

module.exports = router;