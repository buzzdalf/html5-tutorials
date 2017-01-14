
Game.Preload = function () {
	// this.background = null;
 //  	this.preloadBar = null;
	this.ready = false;
};

Game.Preload.prototype = {
	preload: function() {
		this.load.image('rocket', 'assets/images/rocket.png');

		this.load.onLoadComplete.add(this.onLoadComplete, this);
	},
	create: function() {

	},
	update: function() {
		if (this.ready === true) {
			this.state.start('MainMenu');
		}
	},
	onLoadComplete: function() {
		this.ready = true;
	}
};