// Import the express library here
const express = require('express');
// Instantiate the app here
const transferRouter = express.Router();

const {validateEnvelope,
    transferBudgets} = require('./utils/envelopeUtils');

transferRouter.param(['from', 'to', 'amount'], (req, res, next) => {
    const source = req.params.from;
    const dest = req.params.to;
    if (isNaN(source)) {
        res.status(400).send();
        return;
    }
    req.source = Number(source);

    if (isNaN(dest)) {
        res.status(400).send();
        return;
    }
    req.dest = Number(dest);

    next();
});

transferRouter.post('/:from/:to', (req, res, next) => {
    const envelopes = transferBudgets(req.source, req.dest, 'all');
    if (validateEnvelope(envelopes[0]) && validateEnvelope(envelopes[1])) {
        res.status(200).send(envelopes);
        return;
    } else if (envelopes === 400) {
        res.status(envelopes).send('Not enough funds in budget');
        return;
    } else if (envelopes === 404) {
        res.status(envelopes).send('Unable to find envelope');
        return;
    }
    res.status(400).send();
});

module.exports = transferRouter;