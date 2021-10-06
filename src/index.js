const express = require('express');
const app = express();

app.set('port', process.env.PORT || 3000);
require('./app')
app.listen(app.get('port'), ()=>{
    console.log('Server started')
})
