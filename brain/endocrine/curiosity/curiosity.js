var curiosity = function(brain) {
	var scope		= this;
	this.brain		= brain;
	this.decay		= 0.01;
	this.value		= 5;
	this.accDelta	= 0;
	
	// Focus signal
	scope.brain.brainstem.messaging.subscribe('endocrine.focus', function(payload) {
		if (payload>0) {
			// Focus increasing, decrease curiosity
			scope.decrease(Math.abs(payload.delta*0.2));
		} else {
			// Focus decreasing, increase curiosity
			scope.increase(Math.abs(payload.delta*0.1));
		}
	});
};
curiosity.prototype.pulse = function() {
	var scope		= this;
	var newValue	= Math.max(Math.min((this.value+this.accDelta) * (1-this.decay), 10), 0);
	var delta		= newValue-this.value;
	this.value		= newValue;
	if (delta!==0) {
		scope.brain.brainstem.messaging.inform('endocrine.curiosity', {
			value:	newValue,
			delta:	delta
		});
	}
}
curiosity.prototype.increase = function(v) {
	this.accDelta	+= v;
}
curiosity.prototype.decrease = function(v) {
	this.accDelta	-= v;
}

module.exports = curiosity;