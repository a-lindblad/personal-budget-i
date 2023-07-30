const { error } = require('console');
const {readFileSync, writeFileSync} = require('fs');

const path = "data/envelopes.json";

const readStoredEnvelopes = () => {
    const content = readFileSync(path);
    return JSON.parse(content);  
};

const updateStoredEnvelopes = (updatedEnvelopesArray) => {
    const newContent = {
        "envelopes" : updatedEnvelopesArray
    };
    
    const contentAsString = JSON.stringify(newContent, null ,2);
    console.log(contentAsString);
    try {
        writeFileSync(path, contentAsString, "UTF-8");
    } catch (error) {
        console.log('An error has occurred ', error);
    }    
}

module.exports = {
    readStoredEnvelopes: readStoredEnvelopes,
    updateStoredEnvelopes: updateStoredEnvelopes
}