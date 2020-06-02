// Utilities
var _			= require('underscore');
var pstack		= require('pstack');
var path		= require('path');

// Nervous System
var brainstem	= require(path.normalize(__dirname+'/brainstem/brainstem'));
var cerebellum	= require(path.normalize(__dirname+'/cerebellum/cerebellum'));
var cerebrum	= require(path.normalize(__dirname+'/cerebrum/cerebrum'));
var glands		= require(path.normalize(__dirname+'/glands/glands'));
var senses		= require(path.normalize(__dirname+'/senses/senses'));
var memory		= require(path.normalize(__dirname+'/memory/memory'));

var Brain = function() {
	this.brainstem	= brainstem(this);
	this.cerebellum	= cerebellum(this);
	this.cerebrum	= cerebrum(this);
	this.glands		= glands(this);
	this.senses		= senses(this);
	this.memory		= memory(this);
}

Brain.prototype.init = function(identityName) {
	//this.memory.load_identity(identityName);
}

var brain = new Brain();
brain.init();