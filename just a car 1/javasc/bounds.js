function Bound (x, y, w, h) {
  var options = {
    isStatic: true
  }

  this.body = Bodies.rectangle(x, y, w, h, options);
  this.w = w;
  this.h = h;
  World.add(world, this.body);

  this.show = function () {
    var pos = this.body.position;
    var angle = this.body.angle;
    stroke (127);
    fill (127);
    push ();
    translate(pos.x, pos.y);
    rectMode(CENTER);
    rect (0, 0, this.w, this.h);
    pop();
  }
}
