var path	= require('path');
var Arbiter	= require(path.normalize(__dirname+'/Arbiter'));


var brainstem = function(brain) {
	this.brain		= brain;
	this.messaging	= new Arbiter();
};
brainstem.prototype.init = function(callback) {
	callback();
}

module.exports = brainstem;