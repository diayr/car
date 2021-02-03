function car_1 (x, y, w, h) {
  this.h = h;
  this.w = w;
  this.body = [];
  var options = {
    collisionFilter: {group: -1},
    friction: 0.5
  }
  var optionsc = {
    collisionFilter: {group: -1},
    friction: 1,
    torque: 0
  }

  this.body[0] = Bodies.rectangle(x, y, w, h, options);
  this.body[1] = Bodies.circle(x+w/2, y+h/2, 20, optionsc);
  this.body[2] = Bodies.circle(x, y+h/2, 20, optionsc);

  this.constraint1 = Constraint.create({
    bodyA: this.body[0],
    pointA: { x: w/2, y: h/2},
    bodyB: this.body[1],
    stiffness: 1, damping: 0, length: 0});

  this.constraint2 = Constraint.create({
    bodyA: this.body[0],
    pointA: { x: -w/2, y: h/2},
    bodyB: this.body[2],
    stiffness: 1, damping: 0, length: 0});


  World.add(world, this.body);
  World.add(world, this.constraint1);
  World.add(world, this.constraint2);


  this.show = function () {
// to move
    Body.applyForce(this.body[1], {x:0, y:2}, {x:-0.01, y:0});
    Body.applyForce(this.body[1], {x:0, y:-2}, {x:0.01, y:0});
    Body.applyForce(this.body[2], {x:0, y:2}, {x:-0.01, y:0});
    Body.applyForce(this.body[2], {x:0, y:-2}, {x:0.01, y:0});


    for (let i = 0; i < 1; i++) {
      var pos = this.body[i].position;
      var angle = this.body[i].angle;
      stroke (127);
      fill (127, 0, 0);
      push ();
      translate(pos.x, pos.y);
      rotate (angle);
      rectMode(CENTER);
      rect (0, 0, this.w, this.h);
      pop();
    }
    for (let i = 1; i < this.body.length; i++) {
      var pos = this.body[i].position;
      var angle = this.body[i].angle;
      stroke (127, 155, 0);
      fill (127, 155, 0);
      push ();
      translate(pos.x, pos.y);
      rotate (angle);
      ellipseMode(CENTER);
      ellipse(0, 0, 20*2, 20*2);
      stroke (255,120, 155);
      for (let i = 0; i < 6; i++) {
        rotate (2*PI/6);
        strokeWeight (4);
        line(0,0, 20, 0);
      }
      pop();
    }
  }
}
