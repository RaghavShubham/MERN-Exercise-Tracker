const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

const app = express();
const port = process.env.port || 5000;

app.use(cors());
app.use(express.json());

const connection = mongoose.connection;
connection.once('open', () =>  {
    console.log("Connected to database");
});

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));