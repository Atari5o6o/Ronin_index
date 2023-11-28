// index.js
const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config();


const app = express();
const PORT = process.env.PORT || 3000;

const Transaction = require("./models/Transactions.js")
const  transactionData = require('./data/index.js');


// MongoDB connection
mongoose.connect(process.env.MONGO_URL, {
})
.then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
    // Transaction.insertMany(transactionData);
})
.catch((error) => console.log(`Did not connect, Reason ${error}`));



// Ronin API endpoint for transactions
const RONIN_API_URL = 'https://api.roninchain.com/v2';

// Example: Index staking transactions
app.get('/transactions/staking', async (req, res) => {
  try {
    const response = await axios.get(`${RONIN_API_URL}/addresses/ronin:6aaabf51c5f6d2d93212cf7dad73d67afa0148d0/transactions`);
    const stakingTransactions = response.data.transactions.filter(transaction => transaction.type === 'Staking');

    console.log(response)
    // Save transactions to MongoDB
    await Transaction.insertMany(stakingTransactions);

    res.json(stakingTransactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// // Similar endpoints for unstaking and reward transactions...

