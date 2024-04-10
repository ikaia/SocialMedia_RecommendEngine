var path = require('path');
var express = require('express');
var router = express.Router();

var applicationController = require('../application/applicationController');


router.get('/character', function(req, res, next) {

    appController = new applicationController();
    html = appController.getAllCharacters();
    res.send(html);
});

router.get('/userRating/:username', function(req, res, next) {

    appController = new applicationController();
    html = appController.getUserRecommendations(req.params.username);
    res.send(html);
});


router.post('/addRating', function(req, res, next) {
    //  /addRating?user=User1&movie=King Kong&rating=4
    const data = req.body;
    appController = new applicationController();
    appController.addRating(data.username, data.movieId, data.rating);
    html = appController.getUserRecommendations(data.username);
    res.send(html);
});


router.get('/test', function(req, res, next) {

    appController = new applicationController();
    html = appController.addTestData();
    res.send(html);
});

router.get('/character/:id', function(req, res, next) {

    appController = new applicationController();
    html = appController.getCharacterById(req.params.id);
    res.send(html);
});














module.exports = router;