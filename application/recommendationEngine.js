//Capstone CSCI-5530-A
//Recommendation Engine
//Group Members: Crystal Byrd, Tim McCarty, Ikaia Melton, Michael Minnick
//Engine works by checking similarity between users and creating a recommendation score based on the similarity level to other users
//Similarity is checked by how close ratings were to the same items. Same ratings gives very similar and a rating one point away is just similar. Anything further is valued as not similar.
class RecommendationEngine {
    constructor() {
        this.userRatings = new Map();
    }

    addRating(user, movie, rating) {
        if (!this.userRatings.has(user)) {
            this.userRatings.set(user, new Map());
        }
        this.userRatings.get(user).set(movie, rating);
    }

    getRecommendations(user) {
        const recommendations = new Map();
        const currentUserRatings = this.userRatings.get(user);

        for (const [otherUser, otherUserRatings] of this.userRatings.entries()) {
            if (otherUser !== user) {
                const similarity = this.calculateSimilarity(currentUserRatings, otherUserRatings);
                for (const [movie, movieRating] of otherUserRatings.entries()) {
                    if (!currentUserRatings.has(movie) || currentUserRatings.get(movie) === 0) {
                        let score = Math.floor(movieRating * similarity); // Rounded down to nearest whole number
                        score = Math.min(5.0, score); // Ensure score doesn't exceed 5
                        if (recommendations.has(movie)) {
                            recommendations.set(movie, Math.min(5.0, recommendations.get(movie) + score));
                        } else {
                            recommendations.set(movie, score);
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

    addTestData(){
        this.addRating("User1", "Movie1", 5.0);
        this.addRating("User1", "Movie2", 4.0);
        this.addRating("User1", "Movie3", 3.0);
        this.addRating("User1", "Movie4", 2.0);

        this.addRating("User2", "Movie2", 5.0);
        this.addRating("User2", "Movie3", 4.0);
        this.addRating("User2", "Movie4", 3.0);
        this.addRating("User2", "Movie5", 2.0);

        this.addRating("User3", "Movie3", 5.0);
        this.addRating("User3", "Movie4", 4.0);
        this.addRating("User3", "Movie5", 3.0);
        this.addRating("User3", "Movie8", 5.0);

        this.addRating("User4", "Movie4", 5.0);
        this.addRating("User4", "Movie5", 4.0);
        this.addRating("User4", "Movie6", 3.0);
        this.addRating("User4", "Movie8", 3.0);

        this.addRating("User5", "Movie1", 5.0);
        this.addRating("User5", "Movie5", 5.0);
        this.addRating("User5", "Movie6", 4.0);
        this.addRating("User5", "Movie7", 3.0);
    }
}


const capStoneEngine = new RecommendationEngine();

capStoneEngine.addRating("User1", "Movie1", 5.0);
capStoneEngine.addRating("User1", "Movie2", 4.0);
capStoneEngine.addRating("User1", "Movie3", 3.0);
capStoneEngine.addRating("User1", "Movie4", 2.0);

capStoneEngine.addRating("User2", "Movie2", 5.0);
capStoneEngine.addRating("User2", "Movie3", 4.0);
capStoneEngine.addRating("User2", "Movie4", 3.0);
capStoneEngine.addRating("User2", "Movie5", 2.0);

capStoneEngine.addRating("User3", "Movie3", 5.0);
capStoneEngine.addRating("User3", "Movie4", 4.0);
capStoneEngine.addRating("User3", "Movie5", 3.0);
capStoneEngine.addRating("User3", "Movie8", 5.0);

capStoneEngine.addRating("User4", "Movie4", 5.0);
capStoneEngine.addRating("User4", "Movie5", 4.0);
capStoneEngine.addRating("User4", "Movie6", 3.0);
capStoneEngine.addRating("User4", "Movie8", 3.0);

capStoneEngine.addRating("User5", "Movie1", 5.0);
capStoneEngine.addRating("User5", "Movie5", 5.0);
capStoneEngine.addRating("User5", "Movie6", 4.0);
capStoneEngine.addRating("User5", "Movie7", 3.0);

for (const user of capStoneEngine.userRatings.keys()) {
    const userRecommendations = capStoneEngine.getRecommendations(user);
    
    console.log(`Recommendations for ${user}:`);
    userRecommendations.forEach((score, item) => console.log(`${item}: ${score}`));
    console.log();
}

console.log("This is an example of how to call for all of the recommendations and their associated scores for one user: ");
console.log(capStoneEngine.getAllRecommendations("User5"));


module.exports = { RecommendationEngine };