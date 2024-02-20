//Capstone CSCI-5530-A
//Recommendation Engine
//Group Members: Crystal Byrd, Tim McCarty, Ikaia Melton, Michael Minnick
//Engine works by checking similarity between users and creating a recommendation score based on the similarity level to other users
//Similarity is checked by how close ratings were to the same items. Same ratings gives very similar and a rating one point away is just similar. Anything further is valued as not similar.
package application;
import java.util.*;

public class recommendationEngine {
    Map<String, Map<String, Double>> userRatings;

    public recommendationEngine() {
        userRatings = new HashMap<>();
    }

    public void addRating(String user, String movie, double rating) {
        userRatings.putIfAbsent(user, new HashMap<>());
        userRatings.get(user).put(movie, rating);
    }

    public Map<String, Double> getRecommendations(String user) {
        Map<String, Double> recommendations = new HashMap<>();
        Map<String, Double> currentUserRatings = userRatings.get(user);

        for (String otherUser : userRatings.keySet()) {
            if (!otherUser.equals(user)) {
                double similarity = calculateSimilarity(currentUserRatings, userRatings.get(otherUser));
                for (String movie : userRatings.get(otherUser).keySet()) {
                    if (!currentUserRatings.containsKey(movie) || currentUserRatings.get(movie) == 0) {
                        double score = Math.floor(userRatings.get(otherUser).get(movie) * similarity); // Rounded down to nearest whole number
                        score = Math.min(5.0, score); // Ensure score doesn't exceed 5
                        if (recommendations.containsKey(movie)) {
                            recommendations.put(movie, Math.min(5.0, recommendations.get(movie) + score));
                        } else {
                            recommendations.put(movie, score);
                        }
                    }
                }
            }
        }

        return recommendations;
    }

    public Map<String, Double> getAllRecommendations(String user) {
        System.out.println(user + " recommendations:");
        Map<String, Double> allRecommendations = new HashMap<>();
        Map<String, Double> userRecommendations = getRecommendations(user);
        for (Map.Entry<String, Double> entry : userRecommendations.entrySet()) {
            allRecommendations.put(entry.getKey(), entry.getValue());
        }
        return allRecommendations;
    }

    private double calculateSimilarity(Map<String, Double> ratings1, Map<String, Double> ratings2) {
        double similarity = 0.0;
        int count = 0;

        for (String movie : ratings1.keySet()) {
            if (ratings2.containsKey(movie)) {
                double rating1 = ratings1.get(movie);
                double rating2 = ratings2.get(movie);
                double diff = Math.abs(rating1 - rating2);

                if (diff == 0) {
                    similarity += 1.0; 
                } else if (diff == 1) {
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

    public static void main(String[] args) {
        recommendationEngine capStoneEngine = new recommendationEngine();

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

        for (String user : capStoneEngine.userRatings.keySet()) {
            Map<String, Double> userRecommendations = capStoneEngine.getRecommendations(user);

            System.out.println("Recommendations for " + user + ":");
            userRecommendations.forEach((item, score) -> System.out.println(item + ": " + score));
            System.out.println();
        }

        System.out.println("This is an example of how to call for all of the recommendations and their associated scores for one user: ");
        System.out.println(capStoneEngine.getAllRecommendations("User5"));
        
    }
}
