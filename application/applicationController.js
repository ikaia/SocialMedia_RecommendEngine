
const fs = require('fs');
const path = require('path');

class application {

    constructor(){
        this.data = JSON.parse(fs.readFileSync('./application/data/applicationData.json').toString());

    }

    getAllCharacters() {
        return JSON.stringify(this.data);


        

    }

    getCharacterById(id) {
        let currentCharacter = this.data.find((item) => item.id == id);
        return JSON.stringify(currentCharacter);




    }

}


module.exports = application;