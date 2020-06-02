var shortMemory		= require('short/shortMemory');
var longMemory		= require('long/longMemory');

var memory = function(brain) {
	this.brain			= brain;
	this.shortMemory	= shortMemory(brain);
	this.longMemory		= longMemory(brain);
};
memory.prototype.init = function() {
	
}

module.exports = memory;