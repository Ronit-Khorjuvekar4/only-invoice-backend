const authSerice = require('../services/authService')


exports.registerController = async (req, res) => {
    try {
        const result = await authSerice.registerService(req.body)
        res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: null,
        });

    } catch (error) {
        res.status(error.message.includes('already exists') ? 409 : 500).json({
            success: false,
            message: error.message || 'Something went wrong while creating user',
            data: null,
        });
    }
}

exports.loginController = async (req, res) => {
    try {
        
        const result = await authSerice.loginService(req.body)
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