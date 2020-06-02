// Utilities
var _			= require('underscore');
var pstack		= require('pstack');

// Nervous System
var brainstem	= require('brainstem/brainstem');
var cerebellum	= require('cerebellum/cerebellum');
var cerebrum	= require('cerebrum/cerebrum');
var glands		= require('glands/glands');
var senses		= require('senses/senses');
var memory		= require('memory/memory');

var Brain = function {
	this.brainstem	= brainstem(this);
	this.cerebellum	= cerebellum(this);
	this.cerebrum	= cerebrum(this);
	this.glands		= glands(this);
	this.senses		= senses(this);
	this.memory		= memory(this);
}

Brain.prototype.init = function(identityName) {
	this.memory.load_identity(identityName);
}

Brain.init();