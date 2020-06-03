// Utilities
var _			= require('underscore');
var pstack		= require('pstack');
var path		= require('path');

// Nervous System
var brainstem	= require(path.normalize(__dirname+'/brainstem/brainstem'));
var cerebellum	= require(path.normalize(__dirname+'/cerebellum/cerebellum'));
var cerebrum	= require(path.normalize(__dirname+'/cerebrum/cerebrum'));
var endocrine	= require(path.normalize(__dirname+'/endocrine/endocrine'));
var senses		= require(path.normalize(__dirname+'/senses/senses'));
var memory		= require(path.normalize(__dirname+'/memory/memory'));

var Brain = function() {
	var scope		= this;
	this.brainstem	= new brainstem(this);
	this.cerebellum	= new cerebellum(this);
	this.cerebrum	= new cerebrum(this);
	this.endocrine	= new endocrine(this);
	this.senses		= new senses(this);
	this.memory		= new memory(this);
	
	this.brainstem.messaging.subscribe('pulse', function(payload) {
		scope.onPulse(payload);
	});
	/*
	// Happiness signal
	this.brainstem.messaging.subscribe('endocrine.happiness', function(payload) {
		console.log("[happiness]",payload);
	});
	
	// Pain signal
	this.brainstem.messaging.subscribe('endocrine.pain', function(payload) {
		console.log("[pain]",payload);
	});
	
	// Anger signal
	this.brainstem.messaging.subscribe('endocrine.anger', function(payload) {
		console.log("[anger]",payload);
	});
	
	// Focus signal
	this.brainstem.messaging.subscribe('endocrine.focus', function(payload) {
		console.log("[focus]",payload);
	});
	
	// Curiosity signal
	this.brainstem.messaging.subscribe('endocrine.curiosity', function(payload) {
		console.log("[curiosity]",payload);
	});*/
}

// Set the pulse frequency
Brain.prototype.setPulse = function(hz) {
	var scope = this;
	this.pulseHz		= hz;
	this.pulseInterval	= Math.round(1000/hz);
	clearInterval(this.pulseITV);
	this.pulseITV = setInterval(function() {
		scope.brainstem.messaging.inform('pulse', scope.endocrine.values());
	}, this.pulseInterval);
}

// On Pulse
Brain.prototype.onPulse = function(emotions) {
	console.log("Pulse", JSON.stringify(emotions, null, 4));
}

Brain.prototype.init = function(identityName) {
	//this.memory.load_identity(identityName);
	this.setPulse(2);
}

var brain = new Brain();
brain.init();