Game.MainMenu = function () {

};
Game.MainMenu.prototype = {
	create: function() {

		var graphics = this.game.add.graphics(0,0);
		graphics.beginFill(0x76EE00);
		graphics.drawRect(0, 0, this.game.width, this.game.height);
		graphics.endFill();

//		var rectangle2 = new Phaser.Rectangle(100, 200, 50, 140); //this.game.add.Rectangle(0, 0, 800, 640);
		//rectangle2.anchor.setTo(0.0);
		// this.rectangle1 = new Rectangle(0, 0, 800, 640);
		// this.rectangle1.anchor.setTo(0.0);

		var graphics2 = this.game.add.graphics(0,0);
		graphics2.beginFill(0x000088);
		graphics2.drawRect(100,200,50,140);
		graphics2.endFill();

		var graphics3 = this.game.add.graphics(0,0);
		graphics3.beginFill(0x000088);
		graphics3.drawCircle(300,200,40);
		graphics3.endFill();
		

		var monster = this.game.add.sprite(400, 200, 'monster');
		monster.anchor.setTo(0.0);
		monster.scale.setTo(0.1);

	},
	update: function() {
		// if(this.game.input.activePointer.justPressed()) {
		// 	this.game.state.start('Game');
		// }

	}
};