// Import the express library here
const express = require('express');
// Instantiate the app here
const envelopeRouter = express.Router();

const {validateEnvelope, 
    storeNewEnvelope,
    fetchStoredEvelopes,
    fetchEnvelopeById,
    updateEnvelope,
    deleteEnvelope} = require('./utils/envelopeUtils');

envelopeRouter.param('id', (req, res, next) => {
    const id = req.params.id;
    if (isNaN(id)) {
        res.status(400).send();
        return;
    }
    req.id = Number(id);
    next();
});

envelopeRouter.get('/', (req, res, next) => {
    const storedEnvelopes = fetchStoredEvelopes();
    res.send(storedEnvelopes);
});

envelopeRouter.post('/', (req, res, next) => {
    const newEnvelope = req.body;
    if (validateEnvelope(newEnvelope)) {
        const addedEnvelope = storeNewEnvelope(newEnvelope);
        res.status(201).send(addedEnvelope);
    } else {
        res.status(400).send('Could not add Envelope');
    }
});

envelopeRouter.get('/:id', (req, res, next) => {
    const envelope = fetchEnvelopeById(req.id);
    if (envelope === 0 || ! validateEnvelope(envelope)) {
        res.status(404).send('Unable to find any data by given id');
    } else {
        res.status(200).send(envelope);
    }
});

envelopeRouter.put('/:id', (req, res, next) => {
    const data = req.body;
    const envelope = updateEnvelope(req.id, data);
    if (! validateEnvelope(envelope)) {
        res.status(envelope).send();
    } else {
        res.send(envelope);
    }
});

envelopeRouter.delete('/:id', (req, res, next) => {
    const statusCode = deleteEnvelope(req.id);
    res.status(statusCode).send();
});

module.exports = envelopeRouter;