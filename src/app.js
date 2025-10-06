const express = require('express');
const connectDB = require('./config/db'); // Import the connectDB function
const clientRoutes = require('./routes/clientRoutes')
const cors = require('cors');

const app = express();

app.use(cors());

app.use(express.json());

app.use('/api', clientRoutes)

connectDB()

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
});

module.exports = app;