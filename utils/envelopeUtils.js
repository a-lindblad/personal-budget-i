const {readStoredEnvelopes, updateStoredEnvelopes} = require('../data/envelopes.js');
// const storedEnvelopes = [
//     {
//         "id": 1,
//         "title": "test",
//         "budget": 100
//     }
// ];
const fetchStoredEvelopes = () => {
    let storedEnvelopes = readStoredEnvelopes();
    return storedEnvelopes;
}    

const validateEnvelope = (envelope) => {
    let result = true;
    let envelopeTitle = envelope.title;
    let envelopeBudget = envelope.budget;
    
    if (typeof(envelopeTitle) !== "string" || envelopeTitle === '') {
        result = false;
    }
    
    if (typeof(envelopeBudget) !== "number") {
        result = false;
    }
        
    return result;
};

const storeNewEnvelope = (newEnvelope) => {
    const storedEnvelopes = fetchStoredEvelopes().envelopes;
    const addedEnvelope = createArrrayOfNewEnvelope(newEnvelope);
    storedEnvelopes.push(addedEnvelope);
    console.log(storedEnvelopes);
    //TODO: Save storedEnelopes to file
    updateStoredEnvelopes(storedEnvelopes);
    return addedEnvelope;
}


const createArrrayOfNewEnvelope = (newEnvelope) => {
    const storedEnvelopes = fetchStoredEvelopes().envelopes;
    const envelopeWithHighestId = storedEnvelopes.reduce((prev, current) => (prev.id > current.id) ? prev : current, 0);
    let highestUsedId = envelopeWithHighestId.id;
    let addEnvelope = {};
    
    addEnvelope.id = highestUsedId +1;
    addEnvelope.title = newEnvelope.title;
    addEnvelope.budget = newEnvelope.budget;

    return addEnvelope;
};

const fetchEnvelopeById = (id) => {
    if (typeof(id) !== "number") {
        return 0;
    }
    const allEnvelopesOject = readStoredEnvelopes();
    const allEnvelopesArray = allEnvelopesOject.envelopes;
    const envelope = allEnvelopesArray.find( item => item.id === id);
    if (typeof(envelope) === "undefined") {
        return 0;
    }
    return envelope;
};

module.exports = {
    validateEnvelope: validateEnvelope,
    storeNewEnvelope: storeNewEnvelope,
    fetchStoredEvelopes: fetchStoredEvelopes,
    fetchEnvelopeById: fetchEnvelopeById
};