const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const circles = require('./api/circles');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());


app.use('/api/circles', circles);

app.listen(4101, ()=> {
    console.log('Server is running');
})