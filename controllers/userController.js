const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

// Create a new user
exports.createUser = async (req, res) => {
    try {
        const { username, email, phoneNo, password, amount, bankname } = req.body;

        // Check if email or username already exists
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ message: 'Username or Email already taken' });
        }

        const user = new User({ username, email, phoneNo, password, amount, bankname });
        await user.save();
        res.status(201).json(user);

    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
};

// Get all users
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a user by ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a user by ID
exports.updateUserById = async (req, res) => {
    try {
        const { username, email, bankname } = req.body;

        // Check if new email or username is already in use by another user
        const existingUser = await User.findOne({ $or: [{ email }, { username }], _id: { $ne: req.params.id } });
        if (existingUser) {
            return res.status(400).json({ message: 'Username or Email already taken' });
        }

        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a user by ID
exports.deleteUserById = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Login a user
exports.loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({ message: 'User not found. Please check your username.' });
        }

        if (user.password !== password) {
            return res.status(401).json({ message: 'Incorrect password. Please try again.' });
        }

        const token = jwt.sign({ _id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });

        res.status(200).json({ token, user });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong. Please try again later.' });
    }
};