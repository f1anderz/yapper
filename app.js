const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

const userRoutes = require('./api/routes/user');
const yapRoutes = require('./api/routes/yap');

mongoose.connect('mongodb+srv://f1anderz:' + process.env.MONGO_ATLAS_PW + '@f1anderz.9iuijm1.mongodb.net/yapper?retryWrites=true&w=majority&appName=f1anderz');

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/users', userRoutes);
app.use('/yaps', yapRoutes);

app.use((err, res) => {
    res.status(err.status || 500).json({
        error: {
            status: false,
            message: err.message
        }
    })
});

module.exports = app;