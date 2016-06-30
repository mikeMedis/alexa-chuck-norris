/**
* App ID for the skill
*/
var APP_ID = 'amzn1.echo-sdk-ams.app.ce54ed71-7820-4406-86e9-161fc918ab52';

/**
* The AlexaSkill prototype and helper functions
*/
var AlexaSkill = require('./AlexaSkill');

var https = require('https');

/**
* ChuckNorrisJoke is a child of AlexaSkill.
* To read more about inheritance in JavaScript, see the link below.
*
* @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
*/
var ChuckNorrisJoke = function () {
	AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
ChuckNorrisJoke.prototype = Object.create(AlexaSkill.prototype);
ChuckNorrisJoke.prototype.constructor = ChuckNorrisJoke;

ChuckNorrisJoke.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
	console.log("ChuckNorrisJoke onSessionStarted requestId: " + sessionStartedRequest.requestId
	+ ", sessionId: " + session.sessionId);
	// any initialization logic goes here
};

ChuckNorrisJoke.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
	console.log("ChuckNorrisJoke onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
	var speechOutput = "Would you like to hear a Chuck Norris joke?";
	var repromptText = "You can say an yes";
	response.ask(speechOutput, repromptText);
};

ChuckNorrisJoke.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
	console.log("ChuckNorrisJoke onSessionEnded requestId: " + sessionEndedRequest.requestId
	+ ", sessionId: " + session.sessionId);
	// any cleanup logic goes here
};

ChuckNorrisJoke.prototype.intentHandlers = {
	// register custom intent handlers
	"ChuckNorrisJokeIntent": function (intent, session, response) {
		http.get('https://api.icndb.com/jokes/random', function(res) {
			var body = '';

			res.on('data', function (chunk) {
				body += chunk;
			});

			res.on('end', function () {
				var stringResult = parseJson(body);
				eventCallback(stringResult);
			});
		}).on('error', function (e) {
			console.log("Got error: ", e);
		});
	}

	"AMAZON.HelpIntent": function (intent, session, response) {
		response.ask("You can ask for a joke", "Chuck Norris wants you to ask for a joke");
	},
	"AMAZON.StopIntent": function (intent, session, response) {
		var speechOutput = {
			speech: "Goodbye",
			type: AlexaSkill.speechOutputType.PLAIN_TEXT
		};
		response.tell(speechOutput);
	},

	"AMAZON.CancelIntent": function (intent, session, response) {
		var speechOutput = {
			speech: "Goodbye",
			type: AlexaSkill.speechOutputType.PLAIN_TEXT
		};
		response.tell(speechOutput);
	}
};

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the ChuckNorrisJoke skill.
    var chuckNorrisJoke = new ChuckNorrisJoke();
    chuckNorrisJoke.execute(event, context);
};
