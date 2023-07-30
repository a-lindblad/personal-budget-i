// Import the express library here
const express = require('express');
// Instantiate the app here
const app = express();
const envelopeRouter = require('./envelope');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const PORT = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(bodyParser.json());

app.use('/envelope', envelopeRouter);


app.get('/', (req, res, next) => {
    res.send('Hello, World');
});

// Invoke the app's `.listen()` method below:
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});