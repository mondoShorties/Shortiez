var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');  // require bodyparser for POST calls
var Story = require('../../models/addStory.js');  // requiring the addStory model
var mongoose = require('mongoose');  // require mongoose for mongo db
var router = express.Router();


router.post('/rate', function(req, res) {

// router.route("/rate")
// .put(function(req, res) {
  console.log('HELLO FROM PUT ON rating/rate');
  console.log('INSIDE /rate on server req.body:', req.body);
  console.log('INSIDE /rate on server req.body.rating.rating::', req.body.rating.rating);
  console.log('INSIDE /rate on server req.body.story[0].id::', req.body.story[0].id);
  console.log('req.user._id', req.user._id);
  Story.findById(req.body.story[0].id, function(err, story){
    console.log('INSIDE rate story ::', story);
    if(err){
      console.log(err);
    }
    var rating = '';
    if (!story.story_ratings) {
      console.log('inside if (!story.story_ratings):::');
      story.story_ratings = {};
      story.story_ratings.love = 0;
      story.story_ratings.like = 0;
      story.story_ratings.dislike = 0;
    }
    if (req.body.rating.rating == 'like') {
      console.log("inside if (req.body.rating == 'like'):::");
      story.story_ratings.like += 1;
    } else if (req.body.rating.rating == 'love') {
      console.log("inside if (req.body.rating == 'love'):::");
      story.story_ratings.love += 1;
    } else if (req.body.rating.rating == 'dislike') {
      console.log("inside if (req.body.rating == 'dislike'), story.story_ratings.love:::", story.story_ratings.love);
      story.story_ratings.love = story.story_ratings.dislike += 1;
    }
    console.log("before story.save, story.story_ratings:::", story.story_ratings);
    story.markModified('story_ratings');
    // save the story
    story.save(function(err) {
      if (err){
        res.send(err);
      } else {
        console.log('2nd INSIDE accept after save on server story:', story);
      }
      res.json({ message: 'story updated with rating!' });
    });
  });
});

router.post('/charRemove', function(req, res) {
  var charId = req.body.id;
  var charactersToReplace = {
    character_name: req.body.character_name,
    character_traits: req.body.character_traits,
    character_bio: req.body.character_bio,
    character_photo: req.body.character_photo,
  };
  addStory.findOneAndUpdate({_id: charId}, {'story_characters': charactersToReplace}, function(err){
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
    console.log('character removed');
    res.sendStatus(200);
    } // end else
  }); // end findOneAndUpdate
}); // end charRemove

module.exports = router;
