const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();

// settings
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 3000);

// middleware
app.use(morgan('dev'));

// static
app.use('/public', express.static(path.join(__dirname, './public')));

// routes
app.use('/', require('./routes/routes'));

app.listen(app.get('port'), () => {
    console.log('Server started');
});
