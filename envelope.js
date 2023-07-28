// Import the express library here
const express = require('express');
// Instantiate the app here
const envelopeRouter = express.Router();

const {validateNewEnvelopes, 
    createArrrayOfNewEnvelopes,
    storeNewEnvelopes} = require('./utils/envelopeUtils');

let storedEnvelopes = [
                    {
                        'id': 1,
                        'title': 'test',
                        'budget': 100
                    }
                ]

envelopeRouter.get('/', (req, res, next) => {
    res.send('Hello, World - Envelope');
});

envelopeRouter.post('/', (req, res, next) => {
    const newEnvelopes = req.body;
    const envelopes = newEnvelopes.envelopes;
    if (validateNewEnvelopes(envelopes)) {
        const addedEnvelopes = createArrrayOfNewEnvelopes(envelopes, storedEnvelopes);
        storedEnvelopes = storeNewEnvelopes(addedEnvelopes, storedEnvelopes);
        res.status(201).send(addedEnvelopes);
    } else {
        res.status(400).send('Could not add Envelope');
    }
});

module.exports = envelopeRouter;