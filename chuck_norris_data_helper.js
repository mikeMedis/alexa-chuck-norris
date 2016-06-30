'use strict';
var _ = require('lodash');
var rp = require('request-promise');
var ENDPOINT = 'https://api.chucknorris.io/jokes/random';
function ChuckNorrisDataHelper() {}

ChuckNorrisDataHelper.prototype.requestJokeStatus = function(joke) {
	return this.getJokeStatus(joke).then(
		function(response) {
			console.log('success - recived joke');
			return response.body;
		}
	);
};

ChuckNorrisDataHelper.prototype.getJokeStatus = function(joke) {
	var options = {
		method: 'GET',
		uri: ENDPOINT,
		resolveWithFullResponse: true,
		json: true
	};
	return rp(options);
};

ChuckNorrisDataHelper.prototype.formatJokeStatus = function(jokeStatus) {
	var chuckJoke = _.template('Your Chuck Norris joke is ${value}.')({
		value : jokeStatus.value,
	});
};

module.exports = ChuckNorrisDataHelper;
