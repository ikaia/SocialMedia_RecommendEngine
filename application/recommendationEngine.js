//Capstone CSCI-5530-A
//Recommendation Engine
//Group Members: Crystal Byrd, Tim McCarty, Ikaia Melton, Michael Minnick
//Engine works by checking similarity between users and creating a recommendation score based on the similarity level to other users
const fs = require('fs');
//let userData = require('./data/mockUserData.json');
let userData
const movies = require('./data/movieData.json');

class RecommendationEngine {
    constructor() {
        userData = JSON.parse(fs.readFileSync('./application/data/mockUserData.json'))
        this.userRatings = new Map();
    }

    reloadUsers(){
        userData = JSON.parse(fs.readFileSync('./application/data/mockUserData.json'))
        console.log(this.userData)
    }

    addRating(user, movieId, rating) {
        if (!this.userRatings.has(user)) {
            this.userRatings.set(user, new Map());
        }
        this.userRatings.get(user).set(movieId, rating);
    
        
        const userIndex = userData.findIndex(userData => userData.username === user);
        if (userIndex !== -1) {
           let found = userData[userIndex].ratings.find(e => e.movie_id === movieId);
           if(found && found.rating != rating){
            found.rating = rating;
            fs.writeFileSync('./application/data/mockUserData.json', JSON.stringify(userData, null, 2));
           }
           if (!found){
            userData[userIndex].ratings.push({ "movie_id": movieId, "rating": rating });
            fs.writeFileSync('./application/data/mockUserData.json', JSON.stringify(userData, null, 2));
           }
        } else {
            console.log(`User ${user} not found in mockUserData.json.`);
        }
    }
    
    getRecommendations(user) {
        const currentUserData = userData.find(userData => userData.username === user);

        if (!currentUserData) {
            console.log(`User ${user} not found in mockUserData.json.`);
            return new Map(); 
        }

        const currentUserRatings = new Map(currentUserData.ratings.map(({ movie_id, rating }) => [movie_id, rating]));
        const recommendations = new Map(); 
    
        for (const otherUserData of userData) {
            if (otherUserData.username !== user) {
                const otherUserRatings = new Map(otherUserData.ratings.map(({ movie_id, rating }) => [movie_id, rating]));
                const similarity = this.calculateSimilarity(currentUserRatings, otherUserRatings);
    
                for (const { movie_id, rating: movieRating } of otherUserData.ratings) {
                    if (!currentUserRatings.has(movie_id) || currentUserRatings.get(movie_id) === 0) {
                        let score = Math.floor(movieRating * similarity); 
                        score = Math.min(5.0, score); 
                        if (recommendations.has(movie_id)) {
                            recommendations.set(movie_id, Math.min(5.0, recommendations.get(movie_id) + score));
                        } else {
                            recommendations.set(movie_id, score);
                        }
                    }
                }
            }
        }
    
        return recommendations;
    }
    
    getAllRecommendations(user) {
        console.log(`${user} recommendations:`);
        const allRecommendations = new Map();
        const userRecommendations = this.getRecommendations(user);
        for (const [movie, score] of userRecommendations.entries()) {
            allRecommendations.set(movie, score);
        }
        return allRecommendations;
    }

    calculateSimilarity(ratings1, ratings2) {
        let similarity = 0.0;
        let count = 0;

        for (const [movie, rating1] of ratings1.entries()) {
            if (ratings2.has(movie)) {
                const rating2 = ratings2.get(movie);
                const diff = Math.abs(rating1 - rating2);

                if (diff === 0) {
                    similarity += 1.0;
                } else if (diff === 1) {
                    similarity += 0.5;
                }
                count++;
            }
        }

        if (count > 0) {
            similarity /= count;
        }

        return similarity;
    }
}

// This is just a scanning tool used to determine if the rating system is working once the Engine is initilized 
/* const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function getAndPrintRecommendations(user) {
    const userRecommendations = capStoneEngine.getAllRecommendations(user);
    console.log(`Recommendations for ${user}:`);
    userRecommendations.forEach((score, item) => console.log(`${item}: ${score}`));
    console.log();
}

function getUserInput() {
    rl.question('Enter the name of a user (type "stop" to exit): ', (user) => {
        if (user.toLowerCase() === 'stop') {
            rl.close();
        } else {
            getAndPrintRecommendations(user);
            getUserInput(); 
        }
    });
}
*/

const capStoneEngine = new RecommendationEngine();

for (const user of capStoneEngine.userRatings.keys()) {
    const userRecommendations = capStoneEngine.getRecommendations(user);
    
    console.log(`Recommendations for ${user}:`);
    userRecommendations.forEach((score, item) => console.log(`${item}: ${score}`));
    console.log();
}

capStoneEngine.addRating("FakeUser_comedy", 5, 5.0); 
capStoneEngine.addRating("FakeUser_drama", 17, 5.0);  
capStoneEngine.addRating("FakeUser_history", 156, 5.0);
capStoneEngine.addRating("FakeUser_romance", 31, 5.0); 
capStoneEngine.addRating("FakeUser_crime", 208, 5.0); 
capStoneEngine.addRating("FakeUser_thriller", 201, 5.0); 
capStoneEngine.addRating("FakeUser_music", 651, 5.0); 
capStoneEngine.addRating("FakeUser_documentation", 30, 5.0); 
capStoneEngine.addRating("FakeUser_action", 424, 5.0); 
capStoneEngine.addRating("FakeUser_family", 689, 5.0); 
capStoneEngine.addRating("FakeUser_horror", 37, 5.0); 
capStoneEngine.addRating("FakeUser_sport", 2395, 5.0); 
capStoneEngine.addRating("FakeUser_fantasy", 2399, 5.0); 
capStoneEngine.addRating("FakeUser_animation", 403, 5.0); 
capStoneEngine.addRating("FakeUser_scifi", 1557, 5.0); 
capStoneEngine.addRating("FakeUser_war", 338, 5.0); 
capStoneEngine.addRating("FakeUser_european", 41, 5.0); 


for (const user of capStoneEngine.userRatings.keys()) {
    const userGenre = user.split('_')[1]; 
    const userRatings = capStoneEngine.userRatings.get(user);
    for (const movie of movies) {
        if (!userRatings || !userRatings.has(movie.movie_id)) {
            const genres = movie.genre.split(',').map(genre => genre.trim());
            if (genres.includes(userGenre)) {
                capStoneEngine.addRating(user, movie.movie_id, 5.0);
            }
        }
    }
}

console.log("This is an example of how to call for all of the recommendations and their associated scores for one user: ");
console.log(capStoneEngine.getAllRecommendations("FakeUser_comedy"));


//getUserInput();

module.exports = { RecommendationEngine };