
var friendsData     = require('../data/friends.js');
// var path      = require('path');


// ROUTING


module.exports = function(app){

  app.get('/api/friends', function(req, res){
    res.json(friendsData);
  });


  app.post('/api/friends', function(req, res){
  

    var bestMatch = 0;
    var bestDiff = 1000; 

    // since friendsData is an array you can just use the native `.forEach` method here
    // this creates a functional closure/scope that won't leak variables.
    for (var i = friendsData.length - 1; i >= 0; i--) {

      console.log("comparing with " + friendsData[i].name);

      var totalDifference = 0;

      // you can also use forEach to loop over the scores array
      for (var k = 0; k < 2; k++ ){

        // using the `+=` shorthand saves you a few key strokes here
        totalDifference += Math.abs(friendsData[i].scores[k] - req.body.scores[k]);

      }

      if (totalDifference < bestDiff){
        bestDiff = totalDifference;
        bestMatch = i;
      }

      console.log("total difference for " + friendsData[i].name + " is " + totalDifference);

    }

    console.log("**************");
    console.log("best person is " + friendsData[bestMatch].name + " and best score is " + bestDiff);
    console.log("**************");

    // push in the user input into the friendArray
    friendsData.push(req.body);

    // respond back with the best match
    res.json({name: friendsData[bestMatch].name, photo: friendsData[bestMatch].photo}); // KEY LINE
    
  });

}