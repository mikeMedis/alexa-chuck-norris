'use strict';
module.change_code = 1;
var _ = require('lodash');
var Alexa = require('alexa-app');
var app = new Alexa.app('chucknorris');
var ChuckNorrisDataHelper = require('./chuck_norris_data_helper');

app.launch(function(req, res) {
	var prompt = 'Ask to hear a Chuck Norris joke.';
	res.say(prompt).reprompt(prompt).shouldEndSession(false);
});

app.intent('chucknorrisjokeintent', {
	'slots': {
		'CHUCKNORRIS': 'CHUCKNORRISNAMES'
	},
	'utterances': ['{|tell|say|divulge} {|me|a|myself} {|joke|parody|antic} {|about} {-|CHUCKNORRIS}']
},
	function(req, res) {
		var joke = req.slot('CHUCKNORRIS');
		var reprompt = 'Tell me the name of Chuck Norris or one of his many nicknames.';
if(_.isEmpty(joke)) {
			var prompt = 'I did not hear the correct name. Tell me Chuck Norris or one of his many nicknames.';
			res.say(prompt).reprompt(reprompt).shouldEndSession(false);
			return true;
		} else {
			var chuckHelper = new ChuckNorrisDataHelper();

chuckHelper.requestJokeStatus(joke).then(function(jokeStatus) {
			console.log(jokeStatus);
			var prompt = 'I did not have data for Chuck Norris';
			res.say(chuckHelper.formatJokeStatus(jokeStatus)).send();
			});
			return false;
		}
	}
);

var utterancesMethod = app.utterances;
app.utterances = function() {
	return utterancesMethod().replace(/\{\-\|/g, '{');
};

module.exports = app;
