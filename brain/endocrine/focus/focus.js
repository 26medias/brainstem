var focus = function(brain) {
	var scope		= this;
	this.brain		= brain;
	this.decay		= 0.01;
	this.value		= 5;
	this.accDelta	= 0;
};
focus.prototype.pulse = function() {
	var scope		= this;
	var newValue	= Math.max(Math.min((this.value+this.accDelta) * (1-this.decay), 10), 0);
	var delta		= newValue-this.value;
	this.value		= newValue;
	if (delta!==0) {
		scope.brain.brainstem.messaging.inform('endocrine.focus', {
			value:	newValue,
			delta:	delta
		});
	}
}
focus.prototype.increase = function(v) {
	this.accDelta	+= v;
}
focus.prototype.decrease = function(v) {
	this.accDelta	-= v;
}

module.exports = focus;