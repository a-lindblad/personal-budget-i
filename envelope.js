// Import the express library here
const express = require('express');
// Instantiate the app here
const envelopeRouter = express.Router();

const {validateNewEnvelope, 
    storeNewEnvelope,
    storedEnvelopes} = require('./utils/envelopeUtils');

envelopeRouter.get('/', (req, res, next) => {
    res.send('Hello, World - Envelope');
});

envelopeRouter.post('/', (req, res, next) => {
    const newEnvelope = req.body;
    if (validateNewEnvelope(newEnvelope)) {
        const addedEnvelope = storeNewEnvelope(newEnvelope);
        res.status(201).send(addedEnvelope);
        console.log(storedEnvelopes);
    } else {
        res.status(400).send('Could not add Envelope');
    }
});

module.exports = envelopeRouter;