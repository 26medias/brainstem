// Utilities
var _			= require('underscore');
var pstack		= require('pstack');
var path		= require('path');

// Long & Short memory
var shortMemory		= require(path.normalize(__dirname+'/short/shortMemory'));
var longMemory		= require(path.normalize(__dirname+'/long/longMemory'));

var memory = function(brain) {
	this.brain			= brain;
	this.shortMemory	= shortMemory(brain);
	this.longMemory		= longMemory(brain);
};
memory.prototype.init = function() {
	
}

module.exports = memory;