// Import the express library here
const express = require('express');
// Instantiate the app here
const envelopeRouter = express.Router();



envelopeRouter.get('/', (req, res, next) => {
    res.send('Hello, World - Envelope');
});

module.exports = envelopeRouter;