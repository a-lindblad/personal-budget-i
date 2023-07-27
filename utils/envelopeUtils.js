const validateNewEnvelopes = (newEnvelopes) => {
    let result = true;
    
    const envelopes = newEnvelopes.envelopes;
    console.log(envelopes);
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

module.exports = {
    validateNewEnvelopes: validateNewEnvelopes
};