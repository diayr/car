//class wheel_gene {
//  constructor (is_there, id, rad) {
//    this.is_there = is_there;
//    this.id = id;
//    this.rad = rad; }}

function create_wheel (x, y, vert, wheel, main_body) {
  this.vert = vert;
  this.body = [];
  this.main_body = main_body;
  this.x = x;
  this.y = y;
  this.wheel = wheel;
  this.rad = wheel[2];
  this.pos = this.vert[wheel[1]];
  this.x_wheel = this.x + this.pos.x;
  this.y_wheel = this.y + this.pos.y;
  var optionsc = {
    collisionFilter: {group: -1},
    friction: 1,
    torque: 0
  }

  this.body[0] = Bodies.circle(this.x_wheel, this.y_wheel, this.rad, optionsc);
  this.body[1] = Constraint.create({    bodyA: main_body,    //this. ?
    pointA: { x:this.pos.x, y: this.pos.y},
    bodyB: this.body[0],
    stiffness: 0.51, damping: 1, length: 0});

    World.add(world, this.body);
    this.show = function () {
      var pos = this.body[0].position;
      var angle = this.body[0].angle;
      stroke (127, 155, 0);
      fill (127, 155, 0);
      push ();
      translate(pos.x, pos.y);
      rotate (angle);
      ellipseMode(CENTER);
      ellipse(0, 0, this.rad*2, this.rad*2);
      stroke (255,120, 155);
      for (let i = 0; i < 6; i++) {
        rotate (2*PI/6);
        strokeWeight (4);
        line(0,0, this.rad, 0);
      }
      pop();
    }
}


function car_gene (x, y, vert, wheels) {
  this.vert = vert;
  this.body = [];
  this.x = x;
  this.y = y;
  this.wheels = wheels;
  var options = {
    collisionFilter: {group: -1},
    friction: 0.5
  }
  this.body[0] = Bodies.fromVertices(this.x, this.y, this.vert, options);
  this.pos_new = {x: 2*this.x+ 2*this.vert[0].x - this.body[0].vertices[0].x, y: 2*this.y+ 2*this.vert[0].y - this.body[0].vertices[0].y} ;

  Body.setPosition (this.body[0], this.pos_new);

  this.wheels_created = [];

  for (let i = 0; i < this.wheels.length; i++) {
    if (this.wheels[i][0] == 1) {
      this.wheels_created.push( new create_wheel (this.x, this.y, this.vert, this.wheels[i], this.body[0]));
      console.log("Wheels");
    }
  }
  World.add(world, this.body[0]);

  this.show = function ()  {
    for (let i = 0; i < this.wheels_created.length; i++) {
      this.wheels_created[i].show();
    }
  }

}
