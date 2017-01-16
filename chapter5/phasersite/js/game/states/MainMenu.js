Game.MainMenu = function () {

};
Game.MainMenu.prototype = {
	create: function() {

		var grass = this.game.add.graphics(0,0);

		grass.beginFill(0x7CCD7C);
		grass.drawRect(0, 0, this.game.width, this.game.height);
		grass.endFill();

		this.box = 	this.game.add.sprite(this.game.width-100, this.game.height-100, 'box');	

		this.num_bugs_catched = 0;

		this.bug_count = this.game.add.text(100, this.game.height-50, 'Bug Count: '+this.num_bugs_catched, 
			{ font: "20px Arial", fill: "#000000"});

	    var num_bugs = game.rnd.integerInRange(1,10);

	    this.bugs = this.game.add.group();

		for (i=0;i<num_bugs;i++) {
			var bugX = game.rnd.integerInRange(50, this.game.width-50);
			var bugY = game.rnd.integerInRange(50, this.game.height-50);
			this.bugs.create(bugX, bugY, 'bug');
		}

		this.bugs.forEach(function(item) {
    		item.inputEnabled = true;
			item.input.enableDrag();
			item.events.onDragStop.add(this.stopDrag, this);
		}, this);
	},
	stopDrag: function(droppedBug) {
	    if (this.checkOverlap(this.bugs, this.box)) {
			droppedBug.kill();
	    	this.num_bugs_catched++;
	        this.bug_count.text = 'Bug Count: '+this.num_bugs_catched;
	    }
	},
	checkOverlap: function(spriteA, spriteB) {
	    var boundsA = spriteA.getBounds();
    	var boundsB = spriteB.getBounds();

    	return Phaser.Rectangle.intersects(boundsA, boundsB);
	},
	shutdown: function() {
		this.bugs.destroy();
	}
};
