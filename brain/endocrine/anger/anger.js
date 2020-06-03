var anger = function(brain) {
	var scope		= this;
	this.brain		= brain;
	this.decay		= 0.01;
	this.value		= 5;
	this.accDelta	= 0;
	
	// Focus signal
	scope.brain.brainstem.messaging.subscribe('endocrine.focus', function(payload) {
		if (payload>0) {
			// Focus increasing, decrease the anger
			scope.decrease(Math.abs(payload.delta*0.2));
		} else {
			// Focus decreasing, no effect
		}
	});
};
anger.prototype.pulse = function() {
	var scope		= this;
	var newValue	= Math.max(Math.min((this.value+this.accDelta) * (1-this.decay), 10), 0);
	var delta		= newValue-this.value;
	this.value		= newValue;
		if (delta!==0) {
		scope.brain.brainstem.messaging.inform('endocrine.anger', {
			value:	newValue,
			delta:	delta
		});
	}
}
anger.prototype.increase = function(v) {
	this.accDelta	+= v;
}
anger.prototype.decrease = function(v) {
	this.accDelta	-= v;
}

module.exports = anger;