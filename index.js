
require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

const app = express();

app.use(cors());

// Mean_user
// IByIJX4ou0NLQMbj

// body reading and parseo 
app.use(express.json());

// database
dbConnection();


// Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/hospitals', require('./routes/hospitals'));
app.use('/api/doctors', require('./routes/doctors'));
app.use('/api/all', require('./routes/searches'));
app.use('/api/upload', require('./routes/uploads'));



app.listen(process.env.PORT, () => {

    console.log(`server running on port ${process.env.PORT}`);
});