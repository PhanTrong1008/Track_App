require('./models/User.js');
require('./models/Track.js');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const trackRoutes = require('./routes/trackRoutes');
const requireAuth = require('./middlewares/requireAuth');

const app = express();

app.use(bodyParser.json());
app.use(authRoutes);
app.use(trackRoutes);

// change when you change another wifi
const mongoUri = 'mongodb+srv://trong:10082001@cluster0.wvpq1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
mongoose.connect(mongoUri);

mongoose.connection.on('connected', () => {
    console.log('Connected to mongo instance');
})
mongoose.connection.on('error', (err) => {
    console.log('Error connecting to mongo: ', err);
});

app.get('/', requireAuth, (req, res) => {
    res.send(`Your email: ${req.user.email}`);
});

app.listen(3000, () => {
    console.log('Listening on port 3000 🚀');
})