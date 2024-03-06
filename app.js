var express = require('express');
var path = require('path');

var applicationRouter = require('./routes/application');
var publicRouter = require('./routes/public');
const userRoutes = require('./routes/userRoutes.js');

var app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

// Define routes
app.use('/api/', applicationRouter);
app.use('/', publicRouter);
app.use('/user', userRoutes);

const PORT = process.env.PORT || 3050;
app.listen(PORT, () => {
    console.info(`Server has started on ${PORT}`);
});

module.exports = app;
