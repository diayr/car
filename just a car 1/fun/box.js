function Box (x, y, w, h) {
  var options = {
    friction: 1
  }
  this.body = Bodies.rectangle(x, y, w, h, options);
  this.w = w;
  this.h = h;
  World.add(world, this.body);

  this.show = function () {
    var pos = this.body.position;
    var angle = this.body.angle;
    stroke (60);
    fill (0);
    push ();
    translate(pos.x, pos.y);
    rectMode(CENTER);
    rotate (angle);
    rect (0, 0, this.w, this.h);
    pop();
  }
}
