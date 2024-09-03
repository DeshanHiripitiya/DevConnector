const express = require('express')
const connectDatabase = require('./config/db');
const cors = require('cors');

require('dotenv').config();


const  app = express()//creates a new Express application instance and assigns it to the constant variable app. This app variable can then be used to configure routes, middleware, and other settings for the web application.

app.use(cors());

//connect db
connectDatabase();

// Init Middleware
app.use(express.json({extended:false}));

// test
// app.get("/", (req,res)=>res.send('API Running'))

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

const PORT = process.env.PORT || 5000   //search environment variable called port when deploy in horoku..in local uses port 5000

app.listen(PORT, ()=> console.log(`server started on port ${PORT}`))