const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

const userRoutes = require('./api/routes/user');
const yapRoutes = require('./api/routes/yap');
const statisticRoutes = require('./api/routes/statistics');

mongoose.connect('mongodb+srv://oleksiikovtun:' + process.env.MONGO_ATLAS_PW + '@oleksii.uu1swdn.mongodb.net/yapper?retryWrites=true&w=majority&appName=Oleksii');

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/users', userRoutes);
app.use('/yaps', yapRoutes);
app.use('/stats', statisticRoutes);

app.use((err, res) => {
    res.status(err.status || 500).json({
        error: {
            status: false,
            message: err.message
        }
    });
});

module.exports = app;