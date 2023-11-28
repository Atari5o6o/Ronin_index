const mongoose = require('mongoose');

// Define the Transaction schema
const transactionSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  transactionAmount: {
    type: Number,
    required: true,
  },
  transactionType: {
    type: String,
    enum: ['Staking', 'Unstaking', 'Reward'],
    required: true,
  },
});

// Create the Transaction model
const Transaction = mongoose.model('Transaction', transactionSchema);

// Export the model for use in other files
module.exports = Transaction;
