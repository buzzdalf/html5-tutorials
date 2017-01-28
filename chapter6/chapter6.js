//set main namespace
goog.provide('chapter6');


//get requirements
goog.require('lime.Director');
goog.require('lime.Scene');
goog.require('lime.Sprite');
goog.require('lime.fill.LinearGradient');
goog.require('lime.Label');
goog.require('goog.math');
goog.require('lime.Layer');
goog.require('lime.GlossyButton');
goog.require('lime.audio.Audio');
goog.require('chapter6.Bug');


// entrypoint
chapter6.start = function(){

    var director = new lime.Director(document.body,480,320);
    director.makeMobileWebAppCapable();
    director.setDisplayFPS(false);
    
    var initialScene = new lime.Scene().setRenderer(lime.Renderer.CANVAS);
    var gameScene = new lime.Scene().setRenderer(lime.Renderer.CANVAS);
    
    // inital scene //////
    var initialLayer = new lime.Layer().setPosition(30,30);
    
    var initialContainer = new lime.Sprite().setPosition(0,0).setSize(420,260).setFill('#EEE0E5').setAnchorPoint(0,0);
    
    var initialTitle = new lime.Label().setText('WELCOME').setFontFamily('Arial').setFontColor('#000000').
        setFontSize(20).setAnchorPoint(0,0).setPosition(150,60);
    
    var startButton = new lime.GlossyButton().setSize(200,60).setPosition(200,150).setText('Start').setColor('#00CD00'); 
    
    initialLayer.appendChild(initialContainer);
    initialLayer.appendChild(initialTitle);
    initialLayer.appendChild(startButton);
    
    initialScene.appendChild(initialLayer);
    
    goog.events.listen(startButton, ['mousedown', 'touchstart'], function(e) {
        director.pushScene(gameScene);
    });
    
    
    // game scene //////////////////////////////////////////////
        
    //grass
    var grass_gradient = new lime.fill.LinearGradient().setDirection(0,0,1,-1)
        .addColorStop(0,'#7CCD7C').addColorStop(0.5, '#00FF00');
    
    var grass = new lime.Sprite().setSize(480,320).setPosition(0,0).
        setAnchorPoint(0,0).setFill(grass_gradient);
    
    //bug count
    var num_bugs_catched = 0;
    var bug_count = new lime.Label().setText('Bug count: '+num_bugs_catched).
        setFontFamily('Arial').setFontColor('#000000').setFontSize(20).
        setPosition(100,300);
    
    //box
    var box = new lime.Sprite().setAnchorPoint(0,0).setPosition(390,230).setFill('img/box.png');
    
    //sound
    var bugSound = new lime.audio.Audio('sound/bug_sound.wav');    
    
    //number of bugs to be created
    var num_bugs = goog.math.randomInt(5)+1;
    
    var bugsArray = [];
    
    for(i=0;i<num_bugs;i++) {
        
        //var x = goog.math.uniformRandom(20,440);
        //var y = goog.math.uniformRandom(50,200);
        
        
        bug = new chapter6.Bug();
        //bug = new lime.Sprite().setAnchorPoint(0,0).setPosition(390,230).setFill('img/bug.png').setPosition(x,y).setSize(80,70);
        
        //bug.crawl();
        
        goog.events.listen(bug,['mousedown','touchstart'], function(e) {
            var drag = e.startDrag();
            
            e.event.stopPropagation();
            
            drag.addDropTarget(box);
            
            current_bug = this;
            goog.events.listen(drag,lime.events.Drag.Event.DROP, function(e) {
                
                bugSound.stop();
                bugSound.play();
                
                current_bug.setHidden(true);
                delete current_bug;
                
                //update the bug count
                num_bugs_catched++;
                bug_count.setText('Bug count: '+num_bugs_catched);
                                
                if(num_bugs_catched == num_bugs) {
                    alert('You have won the game!');
                    chapter6.start();
                }
            });
            
        });
        
        bugsArray.push(bug);
    }
    
    gameScene.appendChild(grass);
    gameScene.appendChild(box);
    gameScene.appendChild(bug_count);
    
    for(i in bugsArray) {
        gameScene.appendChild(bugsArray[i]);
    }
    
    director.replaceScene(initialScene);
        
}
