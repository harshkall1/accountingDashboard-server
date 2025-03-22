const Transection = require('../models/transectionsModel');

// Create a new transaction
exports.createTransection = async (req, res) => {
    try {
        const { amount, userId } = req.body;

        // Validate required fields
        if (!amount || !userId) {
            return res.status(400).json({ 
                message: 'Amount are required',
                devMessage : "Amound & UserID required"
            });
        }

        const newTransection = new Transection({
            amount,
            userId
        });

        const savedTransection = await newTransection.save();
        console.log('New transaction created:', savedTransection);
        
        res.status(201).json(savedTransection);
    } catch (error) {
        console.error('Error creating transaction:', error);
        res.status(500).json({ 
            message: 'Error creating transaction',
            error: error.message 
        });
    }
};

// Get transactions for a user
exports.getTransections = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({ 
                message: 'userId is required' 
            });
        }

        const transections = await Transection.find({ userId });
        res.status(200).json(transections);
    } catch (error) {
        console.error('Error fetching transactions:', error);
        res.status(500).json({ 
            message: 'Error fetching transactions',
            error: error.message 
        });
    }
};

// Update a transaction
exports.updateTransection = async (req, res) => {
    try {
        const { id } = req.params;
        const { amount, userId } = req.body;

        if (!id) {
            return res.status(400).json({ 
                message: 'Transaction ID is required' 
            });
        }

        const updatedTransection = await Transection.findByIdAndUpdate(
            id,
            { amount, userId },
            { 
                new: true,
                runValidators: true 
            }
        );

        if (!updatedTransection) {
            return res.status(404).json({ 
                message: 'Transaction not found' 
            });
        }

        res.status(200).json(updatedTransection);
    } catch (error) {
        console.error('Error updating transaction:', error);
        res.status(500).json({ 
            message: 'Error updating transaction',
            error: error.message 
        });
    }
};

// Delete a transaction
exports.deleteTransection = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ 
                message: 'Transaction ID is required' 
            });
        }

        const deletedTransection = await Transection.findByIdAndDelete(id);

        if (!deletedTransection) {
            return res.status(404).json({ 
                message: 'Transaction not found' 
            });
        }

        res.status(200).json({ 
            message: 'Transaction deleted successfully',
            deletedTransection 
        });
    } catch (error) {
        console.error('Error deleting transaction:', error);
        res.status(500).json({ 
            message: 'Error deleting transaction',
            error: error.message 
        });
    }
};
