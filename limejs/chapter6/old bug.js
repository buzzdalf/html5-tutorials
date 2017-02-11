goog.provide('chapter6.Bug');

goog.require('lime.Sprite')
goog.require('goog.math');

chapter6.Bug = function() {

    //call the parent contructor
    goog.base(this);
    
    this.setAnchorPoint(0,0).setFill('img/bug.png').setSize(80,70)
    
    var x = goog.math.uniformRandom(20,440);
    var y = goog.math.uniformRandom(50,200);
    
    this.setPosition(x,y);
    
    this.is_moving = false;
    
    lime.scheduleManager.schedule(function(dt) {
        if(this.is_moving) {
            //update position
            current_x = this.getPosition().x;
            current_y = this.getPosition().y;
            
            this.setPosition(current_x+this.speed_x*dt,current_y+this.speed_y*dt);
        }
    }, this);
}

//chapter6.Bug inherits from lime.Sprite
goog.inherits(chapter6.Bug,lime.Sprite);

chapter6.Bug.prototype.crawl = function() {
    
    this.is_moving = true;
    this.speed_x = goog.math.uniformRandom(-0.05,0.05);
    this.speed_y = goog.math.uniformRandom(-0.05,0.05);
}