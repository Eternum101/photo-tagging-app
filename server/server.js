require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors()); 
const port = process.env.PORT || 5000;

const mongoose = require('mongoose');
const mongoDB = process.env.MONGODB_URL;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(express.json());

app.use('/images', express.static('public/images'));

const characterRoutes = require('./routes/characterRoutes');
const userScoreRoutes = require('./routes/userScoreRoutes');

app.use('/api/character', characterRoutes);
app.use('/api/scores', userScoreRoutes);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
});