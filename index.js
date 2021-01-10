


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



app.listen(process.env.PORT, () => {

    console.log(`server running on port ${process.env.PORT}`);
});