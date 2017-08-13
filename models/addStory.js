var mongoose = require('mongoose');  // require mongoose for mongo db
var Schema = mongoose.Schema;

var addStorySchema = new Schema({
  story_title: String,
  story_description: String,
  story_cover: String,
  story_authorF: String,
  story_authorL: String,
  story_class: String,
  story_characters: [],
  story_pages: [{}],
  story_ratings: {},
});

var AddStory = mongoose.model( 'AddStory', addStorySchema );  // sets schema to model var

module.exports = AddStory;
