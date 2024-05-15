const express = require('express')
const connectDatabase = require('./config/db');


const  app = express()//creates a new Express application instance and assigns it to the constant variable app. This app variable can then be used to configure routes, middleware, and other settings for the web application.

//connect db
connectDatabase()

app.get("/", (req,res)=>res.send('API Running'))

const PORT = process.env.PORT || 5000   //search environment variable called port when deploy in horoku..in local uses port 5000

app.listen(PORT, ()=> console.log(`server started on port ${PORT}`))