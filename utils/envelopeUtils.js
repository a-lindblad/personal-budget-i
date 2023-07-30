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

const validateNewEnvelope = (envelope) => {
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


module.exports = {
    validateNewEnvelope: validateNewEnvelope,
    storeNewEnvelope: storeNewEnvelope,
    fetchStoredEvelopes: fetchStoredEvelopes
};