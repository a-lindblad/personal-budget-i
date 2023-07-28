const validateNewEnvelopes = (envelopes) => {
    let result = true;
    envelopes.forEach(envelope => {
        let envelopeTitle = envelope.title;
        let envelopeBudget = envelope.budget;
        if (typeof(envelopeTitle) !== "string" || envelopeTitle === '') {
            result = false;
        }
        if (typeof(envelopeBudget) !== "number") {
            result = false;
        }
    }); 
        
    return result;
};

const createArrrayOfNewEnvelopes = (newEnvelopes, existingEnvelopes) => {
    const envelopeWithHighestId = existingEnvelopes.reduce((prev, current) => (prev.id > current.id) ? prev : current, 0);
    let highestUsedId = envelopeWithHighestId.id;
    let addEnvelope = {};
    const envelopesToAdd = [];
    newEnvelopes.forEach(envelope => {
        highestUsedId++;
        addEnvelope.id = highestUsedId;
        addEnvelope.title = envelope.title;
        addEnvelope.budget = envelope.budget;
        envelopesToAdd.push(addEnvelope);
        addEnvelope = {};
    });
    return envelopesToAdd;
};

const storeNewEnvelopes = (addEnvelopes, storedEnvelopes) => {
    const updatedStoredEnvelopes = storedEnvelopes.concat(addEnvelopes);
    return updatedStoredEnvelopes;
}

module.exports = {
    validateNewEnvelopes: validateNewEnvelopes,
    createArrrayOfNewEnvelopes: createArrrayOfNewEnvelopes,
    storeNewEnvelopes: storeNewEnvelopes
};