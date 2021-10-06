const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();

// settings
app.set("views", path.join(__dirname, "./views"));
app.set('view engine', 'ejs');


// middleware
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// static
app.use("/public", express.static(path.join(__dirname, "./public")));

// routes
app.use('/', require('./routes/routes'));

export default app;