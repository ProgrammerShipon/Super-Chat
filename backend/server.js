console.clear();

// Get Express
const express = require('express');
const chats = require('./data/data');

// Express instance 
const app = express ();

// dot env / .env
const dotEnv = require('dotenv');
dotEnv.config();

// MongoDB data base
const connectDB = require('./config/db');
connectDB();

// get colors
const colors = require('colors');

// Routs 
app.get('/', (req, res) => {
   res.send('API is Running Successfully');
})
app.get('/api/chat', (req, res) => {
   res.send(chats);
})
app.get('/api/chat/:id', (req, res) => {
   res.send(req.params.id);
   const singleChat = chats.find((n) => n._id === req.params.id);
   console.log(singleChat);
})


// Port mangement
const PORT = process.env.PORT || 5000
// Server 
app.listen(5000, console.log(`Server Started on PORT  ${PORT}`.green.bold));

