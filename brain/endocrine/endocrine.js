// Utilities
var _			= require('underscore');
var pstack		= require('pstack');
var path		= require('path');

var curiosity	= require(path.normalize(__dirname+'/curiosity/curiosity'));
var focus		= require(path.normalize(__dirname+'/focus/focus'));
var happiness	= require(path.normalize(__dirname+'/happiness/happiness'));
var pain		= require(path.normalize(__dirname+'/pain/pain'));
var anger		= require(path.normalize(__dirname+'/anger/anger'));

var endocrine = function(brain) {
	this.brain		= brain;
	
	// Use those emotions
	this.emotions	= {
		curiosity:	new curiosity(brain),
		focus:		new focus(brain),
		happiness:	new happiness(brain),
		pain:		new pain(brain),
		anger:		new anger(brain)
	}
	
	this.init();
};
endocrine.prototype.init = function() {
	var scope = this;
	this.brain.brainstem.messaging.subscribe('pulse', function() {
		_.each(scope.emotions, function(emSystem, emotion) {
			emSystem.pulse();
		});
	});
};
endocrine.prototype.values = function() {
	var scope	= this;
	var output	= {};
	_.each(scope.emotions, function(emSystem, emotion) {
		output[emotion]	= emSystem.value;
	});
	return output;
};

module.exports = endocrine;