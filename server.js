const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();

// Bodyparser
app.use(express.json());
//app.use(bodyParser.json());

// MongoDB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose.connect(db, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

// Routes
app.use('/api/submissions', require('./routes/api/submissions'));
app.use('/api/users', require('./routes/api/users'));

// Serve static assets if in production
if(process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on Port:${port}`));