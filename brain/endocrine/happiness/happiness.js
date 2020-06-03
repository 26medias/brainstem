var happiness = function(brain) {
	var scope		= this;
	this.brain		= brain;
	this.decay		= 0.001;
	this.value		= 5;
	this.accDelta	= 0;
	
	// Pain signal
	scope.brain.brainstem.messaging.subscribe('endocrine.pain', function(payload) {
		if (payload>0) {
			// Pain increasing, decrease happiness
			scope.decrease(payload.delta);
		} else {
			// Pain decreasing, increase happiness
			scope.increase(Math.abs(payload.delta*0.01));
		}
	});
	
	// Anger signal
	scope.brain.brainstem.messaging.subscribe('endocrine.anger', function(payload) {
		if (payload>0) {
			// Anger increasing, decrease happiness
			scope.decrease(payload.delta*0.6);
		} else {
			// Anger decreasing, no effect
		}
	});
	
	// Focus signal
	scope.brain.brainstem.messaging.subscribe('endocrine.focus', function(payload) {
		if (payload>0) {
			// Focus increasing, increase happiness
			scope.decrease(payload.delta*0.2);
		} else {
			// Focus decreasing, no effect
		}
	});
	
	// Curiosity signal
	scope.brain.brainstem.messaging.subscribe('endocrine.curiosity', function(payload) {
		if (payload>0) {
			// Curiosity increasing, increase happiness
			scope.decrease(payload.delta*0.2);
		} else {
			// Curiosity decreasing, no effect
		}
	});
};
happiness.prototype.pulse = function() {
	var scope		= this;
	var newValue	= Math.max(Math.min((this.value+this.accDelta) * (1-this.decay), 10), 0);
	var delta		= newValue-this.value;
	this.value		= newValue;
	if (delta!==0) {
		scope.brain.brainstem.messaging.inform('endocrine.happiness', {
			value:	newValue,
			delta:	delta
		});
	}
}
happiness.prototype.increase = function(v) {
	this.accDelta	+= v;
}
happiness.prototype.decrease = function(v) {
	this.accDelta	-= v;
}

module.exports = happiness;