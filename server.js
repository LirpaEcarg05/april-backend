const express = require('express');
const cors = require ('cors');
const mongoose = require ('mongoose');

const UserRouter = require('./routes/user');

require ('dotenv').config();

const app = express();
const port = process.env.PORT|| 5000;

//middleware
app.use(cors());
app.use(express.json()); //default

const uri = process.env.ATLAS_URI; //.env file connect to database
mongoose.connect(uri, {useNewUrlParser : true, useCreateIndex: true, useUnifiedTopology: true});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB connection establish.')
})

app.use('/user', UserRouter);

//connection string from mongodb
app.listen(port, () => {
    console.log('Server is running at port: ' + port);
}); //run 

