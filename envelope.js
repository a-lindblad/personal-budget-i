// Import the express library here
const express = require('express');
// Instantiate the app here
const envelopeRouter = express.Router();

const {validateNewEnvelopes} = require('./utils/envelopeUtils');

const envelopes = [
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
    console.log(`Server reached post`);
    const newEnvelopes = req.body;
    console.log( req.body);
    if (validateNewEnvelopes(newEnvelopes)) {
        res.status(201).send('Success! Envelope added.');
    } else {
        res.status(400).send('Could not add Envelope');
    }
});

module.exports = envelopeRouter;