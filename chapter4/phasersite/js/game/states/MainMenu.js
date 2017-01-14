Game.MainMenu = function () {

};
Game.MainMenu.prototype = {
	create: function() {

		var grass = this.game.add.graphics(0,0);
		var sky = this.game.add.graphics(0,0);
		var platform = this.game.add.graphics(0,0);

		var topGrass = (this.game.height-40);
		var topPlatform = (topGrass-40);
		var rocketSpacing = this.game.width/4;

		grass.beginFill(0x008000);
		grass.drawRect(0, topGrass, this.game.width, this.game.height);
		grass.endFill();

//		var rectangle2 = new Phaser.Rectangle(100, 200, 50, 140); //this.game.add.Rectangle(0, 0, 800, 640);
		//rectangle2.anchor.setTo(0.0);
		// this.rectangle1 = new Rectangle(0, 0, 800, 640);
		// this.rectangle1.anchor.setTo(0.0);

		// var myBitmap = this.game.add.bitmapData(100, 100);
		// myBitmap.createLinearGradient(0, 20, 0, 120);
		// myBitmap.rect(20, 20, 120, 120);
		// myBitmap.fill();
		// this.game.add.sprite(50, 50, myBitmap);

		sky.beginFill(0x0000CD);
		sky.drawRect(0,0,this.game.width,topGrass);
		sky.endFill();

		platform.beginFill(0x8B8B83);
		platform.drawPolygon(40,topGrass,80,topPlatform,this.game.width-80,topPlatform,this.game.width-40,topGrass,0,topGrass);
		platform.endFill();
		

		this.rocket1 = this.game.add.sprite(rocketSpacing, topPlatform-140, 'rocket');
		this.rocket2 = this.game.add.sprite(rocketSpacing*2, topPlatform, 'rocket');
		this.rocket3 = this.game.add.sprite(rocketSpacing*3, topPlatform, 'rocket');
		
		this.rocket1.anchor.setTo(0.5,0);
		this.rocket2.anchor.setTo(0.5,1);
		this.rocket3.anchor.setTo(0.5,1);
		
		this.rocket1.width = 80;
		this.rocket1.height = 140;
		this.rocket2.width = 80;
		this.rocket2.height = 140;
		this.rocket3.width = 80;
		this.rocket3.height = 140;

		this.rocket1.inputEnabled = true;
		this.rocket2.inputEnabled = true;
		this.rocket3.inputEnabled = true;

		this.rocket1.events.onInputDown.add(function() {    
			game.add.tween(this.rocket1).to( { angle: '-90' }, 1000, Phaser.Easing.Linear.None, true);
			}, this);

		this.rocket2.events.onInputDown.add(this.takeOff, this);
		this.rocket2.events.onInputDown.add(this.fadeAway, {param1: this.rocket2});		

		this.rocket3.events.onInputDown.add(this.fadeAway, {param1: this.rocket3});
		

	},
	takeOff: function() {
		game.add.tween(this.rocket2).to({y: 0}, 1500, Phaser.Easing.Linear.None, true);
	},
	fadeAway: function() {
		// this.param1 equal to rocket3 above  
		game.add.tween(this.param1).to({alpha: 0}, 2000, Phaser.Easing.Linear.None, true);
	}
};
