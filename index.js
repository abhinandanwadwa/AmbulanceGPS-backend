const express = require('express');
const connectToMongo = require('./db');
const cors = require('cors');

connectToMongo();

const app = express();
const PORT = process.env.PORT || 8181;

app.use(express.json());
app.use(cors());

// Available Routes
// app.use('/api/auth', require('./routes/auth'));
app.use('/api/user', require('./routes/user'));
app.use('/api/vehicle', require('./routes/vehicle'));
app.use('/api/driver', require('./routes/driver'));

app.get('/', (req, res) => {
    res.send('Hi!');
});

app.listen(PORT, () => {
    console.log(`The App is running at http://localhost:${PORT}`);
});