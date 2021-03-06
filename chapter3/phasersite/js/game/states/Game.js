ZenvaRunner.Game = function() {
	this.playerMinAngle = -20;
	this.playerMaxAngle = 20;
	this.coinRate = 1000;
	this.coinTimer = 0;
	this.enemyRate = 500;
	this.enemyTimer = 0;
	this.score = 0;
	this.previousCoinType = null;

	this.spawnX = null;
	this.coinSpacingX = 10;
	this.coinSpacingY = 10;

	this.dead = false;
};

ZenvaRunner.Game.prototype = {
	create: function() {

		this.game.world.bounds = new Phaser.Rectangle(0,0, this.game.width + 300, this.game.height);
		this.background = this.game.add.tileSprite(0, 0, this.game.width, 512, 'background');
		this.background.autoScroll(-100, 0);

		this.foreground = this.game.add.tileSprite(0, 470, this.game.width, this.game.height - 533, 'foreground');
		this.foreground.autoScroll(-100, 0);

		this.ground = this.game.add.tileSprite(0, this.game.height - 73, this.game.width, 73, 'ground');
		this.ground.autoScroll(-400,0);

		this.player = this.game.add.sprite(200, this.game.height/2, 'player');
		this.player.anchor.setTo(0.5);
		this.player.scale.setTo(0.3);

		this.shadow = this.game.add.sprite(this.player.x, this.game.height - 73, 'shadow');
		//this.shadow.anchor.setTo(0.5);
		this.shadow.scale.setTo(1.0);

		this.player.animations.add('fly', [0,1,2,3,2,1]);
		this.player.animations.play('fly', 8, true);

		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		this.game.physics.arcade.gravity.y = 400;

		this.game.physics.arcade.enableBody(this.ground);
		this.ground.body.allowGravity = false;
		this.ground.body.immovable = true;

		this.game.physics.arcade.enableBody(this.player);
		this.player.body.collideWorldBounds = true;
		this.player.body.bounce.set(0.25);

		this.coins = this.game.add.group();
		this.enemies = this.game.add.group();

		this.scoreText = this.game.add.bitmapText(10,10, 'minecraftia', 'Score 0', 24);

		this.jetSound = this.game.add.audio('rocket');
		this.coinSound = this.game.add.audio('coin');
		this.deathSound = this.game.add.audio('death');
		this.gameMusic = this.game.add.audio('gameMusic');
		this.gameMusic.play('', 0, true, 0.5);

		this.spawnX = this.game.width + 64;
		this.dead = false;
	},
	update: function() {
		var shadowScale = ((this.game.height - 73) - (this.player.y))/((this.game.height - 73)/2);
		this.shadow.scale.setTo(shadowScale);

		if(!this.dead) {
			if(this.game.input.activePointer.isDown) {
				this.player.body.velocity.y -= 25;
				if(!this.jetSound.isPlaying) {
					this.jetSound.play('', 0, true, 0.5);
				}
			} else {
				this.jetSound.stop();
			}

			if(this.player.body.velocity.y < 0 || this.game.input.activePointer.isDown) {
				if(this.player.angle > 0) {
					this.player.angle = 0;
				}
				if(this.player.angle > this.playerMinAngle) {
					this.player.angle -= 0.5;
				}
			} else if(this.player.body.velocity.y >=0 && !this.game.input.activePointer.isDown) {
				if(this.player.angle < this.playerMaxAngle) {
					this.player.angle += 0.5;
				}
			}

			if(this.coinTimer < this.game.time.now) {
				this.generateCoins();
				this.coinTimer = this.game.time.now + this.coinRate;
			}

			if(this.enemyTimer < this.game.time.now ) {
				this.createEnemy();
				this.enemyTimer = this.game.time.now + this.enemyRate;
			}
		} else {
			this.jetSound.stop();
			this.player.angle += 10;
		}
		this.game.physics.arcade.collide(this.player, this.ground, this.groundHit, null, this);
		this.game.physics.arcade.overlap(this.player, this.coins, this.coinHit, null, this);
		this.game.physics.arcade.overlap(this.player, this.enemies, this.enemyHit, null, this);


	},
	shutdown: function() {
		this.coins.destroy();
		this.enemies.destroy();
		this.score = 0;
		this.coinTimer = 0;
		this.enemyTimer = 0;
	},
	createCoin: function(x,y) {
	    x = x || this.spawnX;
    	y = y || this.game.rnd.integerInRange(50, this.game.world.height - 192);

		var coin = this.coins.getFirstExists(false);
		if(!coin) {
			coin = new Coin(this.game, 0, 0, 'coin');
			this.coins.add(coin);
		}

		coin.reset(x, y);
		coin.revive();
		return coin;
	},
	generateCoins: function() {
		if(!this.previousCoinType || this.previousCoinType < 3) {
			var coinType = this.game.rnd.integer() % 5;
			switch(coinType) {
				case 0: //do nothing, no coins generated
					break;
				case 1:
				case 2: //if 1 or 2 create a single coin
					this.createCoin();
					break;
				case 3: //create small group of coins
					this.createCoinGroup(2, 2);
					break;
				case 4: //create large group of coins
					this.createCoinGroup(6, 2);
					break;
				default: //if error, set previous to 0 and do nothing
					this.previousCoinType = 0;
					break;
			}
			this.previousCoinType = coinType;
		} else {
			if (this.previousCoinType === 4) {
				this.previousCoinType = 3;
			} else {
				this.previousCoinType = 0;
			}
		}
	},
	createCoinGroup: function(columns, rows) {
		var coinSpawnY = this.game.rnd.integerInRange(50, this.game.world.height - 192);
		var coinRowCounter = 0;
		var coinColumnCounter = 0;
		var coin;
		for(var i=0; i<(columns*rows); i++) {
			coin = this.createCoin(this.spawnX, coinSpawnY);
			coin.x = coin.x + (coinColumnCounter * coin.width) + (coinColumnCounter * this.coinSpacingX);
			coin.y = coinSpawnY + (coinRowCounter * coin.height) + (coinRowCounter * this.coinSpacingY);
			coinColumnCounter++;
			if((i+1) >= columns && ((i+1) % columns === 0)) {
				coinRowCounter++;
				coinColumnCounter = 0;
			}
		}
	},
	createEnemy: function() {
		var x = this.spawnX;
		var y = this.game.rnd.integerInRange(50, this.game.world.height - 192);

		var enemy = this.enemies.getFirstExists(false);
		if(!enemy) {
			enemy = new Enemy(this.game, 0, 0, 'missile');
			this.enemies.add(enemy);
		}

		enemy.reset(x, y);
		enemy.revive();
	},
	groundHit: function(player, ground) {
		if(!this.dead) {
			player.body.velocity.y = -200;
		} else {
			this.death(player);
		}
	},
	coinHit: function(player, coin) {
		if(!this.dead) {
			this.score++;
			this.coinSound.play();
			coin.kill();

			var dummyCoin = new Coin(this.game, coin.x, coin.y);
			this.game.add.existing(dummyCoin);

			dummyCoin.animations.play('spin', 40, true);

			var scoreTween = this.game.add.tween(dummyCoin).to({x: 50, y: 50}, 300, Phaser.Easing.Linear.NONE, true);

			scoreTween.onComplete.add(function() {
				dummyCoin.destroy();
				this.scoreText.text = 'Score: ' + this.score;
			}, this);
	}
	},
	enemyHit: function(player, enemy) {
		if(!this.dead) {
			enemy.kill();
			this.deathSound.play();
			this.gameMusic.stop();

			this.dead = true;
		}

		//this.death(player, enemy);
	},
	death: function(player) {
		player.kill();
		//enemy.kill();
		// this.deathSound.play();
		// this.gameMusic.stop();

		this.ground.stopScroll();
		this.background.stopScroll();
		this.foreground.stopScroll();

		this.enemies.setAll('body.velocity.x', 0);
		this.coins.setAll('body.velocity.x', 0);

		this.enemyTimer = Number.MAX_VALUE;
		this.coinTimer = Number.MAX_VALUE;

		var scoreboard = new Scoreboard(this.game);
		scoreboard.show(this.score);
	}
}