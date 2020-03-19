if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const express = require('express');
const morgan = require('morgan');

//Initializations
const app = express();
require('./database');

//Settings
app.set('port', process.env.PORT || 3000);

//Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended : false}));
app.use(express.json());

//routes
app.use('/invapp-api/users', require('./routes/users'));
app.use('/invapp-api/products', require('./routes/products'));

//Start the server
app.listen(app.get('port'), () =>{
    console.log("Server on port", app.get('port'));
});