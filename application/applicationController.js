const fs = require('fs');
const path = require('path');
const { RecommendationEngine } = require('./recommendationEngine.js');


class application {
    //test = false;
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

    getUserRecommendations(username){
       
        
       
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
    //    if(test){
    //         this.recommendationEngine.addTestData();
    //     }
       const test1 = this.recommendationEngine.getRecommendations(username)

        const test2 = Array.from(test1);

        const test3 = JSON.stringify(test2);

        return test3;

    }

    addRating(username, movie, rating){
        

        // if(test){
        //     this.recommendationEngine.addTestData();
        // }

        this.recommendationEngine.addRating(username, movie, rating)

        return true

    }

    addTestData(){
        this.recommendationEngine.addTestData();
    }

}


module.exports = application;