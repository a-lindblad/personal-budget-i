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
    updateStoredEnvelopes(storedEnvelopes);
    return addedEnvelope;
}


const createArrrayOfNewEnvelope = (newEnvelope) => {
    const storedEnvelopes = fetchStoredEvelopes().envelopes;
    const envelopeWithHighestId = storedEnvelopes.reduce((prev, current) => (prev.id > current.id) ? prev : current, 0);
    let highestUsedId = envelopeWithHighestId.id;
    let addEnvelope = {};
    
    addEnvelope.id = highestUsedId +1;
    addDataToEnvelope(addEnvelope, newEnvelope);

    return addEnvelope;
};

const fetchEnvelopeById = (id) => {
    if (typeof(id) !== "number") {
        return 0;
    }
    const allEnvelopesArray = fetchStoredEvelopes().envelopes;
    const envelope = allEnvelopesArray.find( item => item.id === id);
    if (typeof(envelope) === "undefined") {
        return 0;
    }
    return envelope;
};

const fetchEnvelopeIndexById = (id) => {
    const allEnvelopesArray = fetchStoredEvelopes().envelopes;
    const index = allEnvelopesArray.findIndex( item => item.id === id);
    return index;
};

const updateEnvelope = (id, data) => {
    const envelope = fetchEnvelopeById(id);
    const index = fetchEnvelopeIndexById(id);
    const allEnvelopesArray = fetchStoredEvelopes().envelopes;
    if (envelope === 0) {
        return 404;
    }
    if (index === -1 ) {
        return 418;
    }
    if (! validateEnvelope(data)) {
        return 400;
    }
    addDataToEnvelope(envelope, data);
    allEnvelopesArray[index] = envelope;
    updateStoredEnvelopes(allEnvelopesArray);
    return envelope;
};

const addDataToEnvelope = (addEnvelope, newEnvelope) => {
    addEnvelope.title = newEnvelope.title;
    addEnvelope.budget = newEnvelope.budget;
}

const deleteEnvelope = (id) => {
    const allEnvelopesArray = fetchStoredEvelopes().envelopes;
    const updatedEnvelopesArray = allEnvelopesArray.filter(item => item.id !== id);
    if (updatedEnvelopesArray.length === allEnvelopesArray.length) {
        return 404;
    }
    updateStoredEnvelopes(updatedEnvelopesArray);
    return 200;
};

const transferBudgets = (source, dest, amount) => {
    const sourceIndex = fetchEnvelopeIndexById(source);
    const destIndex = fetchEnvelopeIndexById(dest);
    const allEnvelopesArray = fetchStoredEvelopes().envelopes;
    if (sourceIndex === -1 || destIndex === -1){
        return 404;
    }

    let sourceBudget = allEnvelopesArray[sourceIndex].budget;
    let destBudget = allEnvelopesArray[destIndex].budget;
    let newBudgets = {};
    if (amount === 'all') {
        newBudgets = calculateNewBudgets(sourceBudget, destBudget, sourceBudget);
    } else {
        newBudgets = calculateNewBudgets(sourceBudget, destBudget, amount);
    }
    if (newBudgets.status === false) {
        return 400;
    }
    allEnvelopesArray[sourceIndex].budget = newBudgets.source;
    allEnvelopesArray[destIndex].budget = newBudgets.dest;

    updateStoredEnvelopes(allEnvelopesArray);
    return [allEnvelopesArray[sourceIndex], allEnvelopesArray[destIndex]];
};

const calculateNewBudgets = (sourceBudget, destBudget, amount) => {
    const newBudgets = {
        "source": sourceBudget,
        "dest": destBudget,
        "status": true
    }
    if (! isBudgetOKforTransfer(newBudgets.source, amount)) {
        return {"status": false};
    }
    newBudgets.source -= amount;
    newBudgets.dest += amount;

    return newBudgets;
};

const isBudgetOKforTransfer = (budget, amount) => {
    if (amount > budget) {
        return false;
    }
    return true;
}

module.exports = {
    validateEnvelope: validateEnvelope,
    storeNewEnvelope: storeNewEnvelope,
    fetchStoredEvelopes: fetchStoredEvelopes,
    fetchEnvelopeById: fetchEnvelopeById,
    updateEnvelope: updateEnvelope,
    deleteEnvelope: deleteEnvelope,
    transferBudgets: transferBudgets
};


