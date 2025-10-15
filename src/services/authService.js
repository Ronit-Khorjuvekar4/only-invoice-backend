const User = require("../models/authModel")
const { generateToken } = require('../utils/jwt');

exports.registerService = async (body) => {
    try {

        const name = body.name
        const email = body.email
        const password = body.password

        const existing = await User.findOne({ email });
        if (existing) throw new Error('Email already registered');

        const newUser = new User({ name, email, password })
        await newUser.save()
        return newUser

    } catch (error) {
        console.error('Error creating User:', error);

        if (error.code === 11000) {
            throw new Error('User already exists or unique ID collision occurred.');
        }

        throw new Error('Failed to create User');
    }
}

exports.loginService = async (body) => {
    try {

        const email = body.email
        const password = body.password

        const user = await User.findOne({ email });
        if (!user) throw new Error('Invalid credentials');

        const isMatch = await user.comparePassword(password);
        if (!isMatch) throw new Error('Invalid credentials');

        const token = generateToken({ userId: user._id, email: user.email });

        let ok = {
            '_id':user._id,
            'name':user.name,
            'email':user.email
        }

        return { ok, token }
    } catch (err) {
        console.log('Error in fetching client:', err);
        throw new Error('Error in fetching client');
    }
}