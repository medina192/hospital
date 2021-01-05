


require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

const app = express();

app.use(cors());

// Mean_user
// IByIJX4ou0NLQMbj

// database
dbConnection();



app.get('/', (req, res) => {
    res.json({
        hi: 'hi'
    });
})

app.listen(process.env.PORT, () => {

        console.log(`server running on port ${process.env.PORT}`);
});