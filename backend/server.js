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

// import UserRoutes
const userRoutes = require('./routes/userRoutes');

// to accept JSON Data
app.use(express.json());

// Routs 
/*
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
*/

app.use('/api/user', userRoutes)


// Error Handler
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

app.use(notFound)
app.use(errorHandler)


// Port mangement
const PORT = process.env.PORT || 5000
// Server 
app.listen(PORT, console.log(`Server Started on PORT  ${PORT}`.green.bold));

