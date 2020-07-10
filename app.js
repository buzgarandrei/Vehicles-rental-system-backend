const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();
app.use(express.json());
app.use(session({
    secret: 'test session',
    resave: false,
    saveUninitialized: true
}));

const mongoose = require('mongoose');
require('dotenv/config');



const postsRoute = require('./routes/posts');
app.use('/posts', postsRoute);  

const usersRoute = require('./routes/users');
app.use('/users', usersRoute);

const shopsRoute = require('./routes/shops');
app.use('/shop', shopsRoute);

const vehiclesRoute = require('./routes/vehicles');
app.use('/vehicles', vehiclesRoute);

const LoginLogoutRoute = require('./routes/loginlogout');
app.use('', LoginLogoutRoute);

app.get('/', (req, res) => {
    res.send('We are at home');
});


mongoose.connect(
    process.env.DB_CONNECTION,  
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    () => 
    console.log('Connected to DB!!!')
);
app.listen(3000);

