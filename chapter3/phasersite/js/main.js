var game = new Phaser.Game ( window.innerWidth, window.innerHeight, Phaser.AUTO, '');

game.state.add('Boot', Game.Boot);
game.state.add('Preloader', Game.Preload);
game.state.add('MainMenu', Game.MainMenu);

game.state.start('Boot');
