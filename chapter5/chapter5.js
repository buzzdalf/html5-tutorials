//set main namespace
goog.provide('chapter5');


//get requirements
goog.require('lime.Director');
goog.require('lime.Scene');
goog.require('lime.Sprite');
goog.require('lime.fill.LinearGradient');
goog.require('lime.Label');
goog.require('goog.math');

// entrypoint
chapter5.start = function(){

    var director = new lime.Director(document.body,480,320);
    director.makeMobileWebAppCapable();
    director.setDisplayFPS(false);
    
    var scene1 = new lime.Scene().setRenderer(lime.Renderer.CANVAS);
    
    //grass
    var grass_gradient = new lime.fill.LinearGradient().setDirection(0,0,1,-1)
        .addColorStop(0,'#7CCD7C').addColorStop(0.5, '#00FF00');

    var num_bugs_catched = 0;
    var bug_count = new lime.Label().setText('Bug Count: '+num_bugs_catched).
        setFontFamily('Arial').setFontColor('#000000').setFontSize(20).
        setPosition(100,300);



    var box = new lime.Sprite().setAnchorPoint(0,0).setPosition(390,230).setFill('img/box.png');
    
    var grass = new lime.Sprite().setSize(480,320).setPosition(0,0).
        setAnchorPoint(0,0).setFill(grass_gradient);
    
   
    var num_bugs = goog.math.randomInt(10)+1;
    var bugsArray = [];

    for (i=0;i<=num_bugs;i++) {
        var x = goog.math.uniformRandom(20,440);
        var y = goog.math.uniformRandom(50,200);

        bug = new lime.Sprite().setAnchorPoint(0,0).setFill('img/bug.png').setPosition(x,y).setSize(40,37);
        bugsArray.push(bug);

        goog.events.listen(bug,['mousedown','touchstart'], function(e) {
            var drag = e.startDrag();

            e.event.stopPropagation();

            drag.addDropTarget(box);

            current_bug = this;
            goog.events.listen(drag, lime.events.Drag.Event.DROP, function(e) {
                current_bug.setFill('');
                delete current_bug;

                num_bugs_catched++;
                bug_count.setText('Bug Count: '+num_bugs_catched);
            });
        });
    }

    scene1.appendChild(grass);
    scene1.appendChild(box);
    scene1.appendChild(bug_count);

    for (i in bugsArray) {
        scene1.appendChild(bugsArray[i]);
    }
    
    director.replaceScene(scene1);
        
}
