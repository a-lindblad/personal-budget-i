// Import the express library here
const express = require('express');
// Instantiate the app here
const transferRouter = express.Router();

transferRouter.param(['from', 'to'], (req, res, next) => {
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

module.exports = transferRouter;