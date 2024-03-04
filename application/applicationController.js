const fs = require('fs');
const path = require('path');
const { RecommendationEngine } = require('./recommendationEngine.js');


class application {
    test = true;
    recommendationEngine = new RecommendationEngine();
    

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

    getUserRecommendations(userId){
       
        
       
        //Attempted to use the java file unsuccesfully
       // const java = require('java');

        // Add path to your Java class
       // java.classpath.push('recommendationEngine.jar');
        
        // Load Java class
       // const recommendationEngine = java.import('application.java.recommendationEngine');

        // Instantiate Java class
       // const engine = new recommendationEngine();

        // Call a method on the Java object
       // engine.getAllRecommendations("User1");

       //re.getRecommendations(userId)
       if(test){
            this.recommendationEngine.addTestData();
        }
       const test = this.recommendationEngine.getRecommendations(userId)

        const test2 = Array.from(test);

        const test3 = JSON.stringify(test2);

        return test3;

    }

    addRating(userId, movie, rating){
        

        if(test){
            this.recommendationEngine.addTestData();
        }

        this.recommendationEngine.addRating(userId, movie, rating)

        return true

    }

    addTestData(){
        this.recommendationEngine.addTestData();
    }

}


module.exports = application;