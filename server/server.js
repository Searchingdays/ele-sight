const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const sightingsRoutes = require('./routes/sightings.js');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Elesight is a cluster not a database. It has several databases which have multiple collections, which store multiple instances of data.

const uri = process.env.MONGO_URI;

mongoose.connect(uri)
 .then(response => console.log("connected"))
 .catch(e => console.log("not connected"))

app.use('/api/sightings', sightingsRoutes); // first add /api/sightings and then will add /xyz whatever is defined in routes/sightings.js file


app.use(express.static(path.join(__dirname,'..', 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'..', 'public', 'index.html'));
});


app.listen(3000, () => console.log('Server running on http://localhost:3000'));
