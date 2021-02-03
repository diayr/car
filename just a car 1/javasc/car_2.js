function sortNoRep (vert) {
this.vert = vert;
  for (let i = 0; i < this.vert.length; i++) {
    for (let j = 0; j < this.vert.length; j++) {
      if (this.vert[i].x == this.vert[j].x && j!==i) {
        this.vert.splice(j, 1);
      }
    }
  }
return this.vert;
}

//class wheel_gene {
//  constructor (is_there, id, rad) {
//    this.is_there = is_there; 0/1
//    this.id = id;
//    this.rad = rad; }}

function car_2 (x, y, vert, wheels) {
  var options = {
    autoHull: false,
    friction: 0.7,
    collisionFilter: {group: -1},
    flagInternal: false,
    airFriction: 0.5
//    isStatic: true
  }
  this.vert = vert;
  this.x = x;
  this.y = y;
  this.wheels = wheels;
  let object;
  this.vert = Vertices.clockwiseSort(this.vert);
  this.object = Bodies.fromVertices(this.x, this.y, vert, options);
  this.vertex_wheel = [];
  World.add(world, this.object);
//  console.log (this.object);

  this.vertex_wheel.push (this.object.parts[1].vertices[0]);
  for (let i = 0; i < this.object.parts.length; i++) {
    for (let j = 0; j < this.object.parts[i].vertices.length; j++) {
    //  console.log ("shit");
        this.vertex_wheel.push (this.object.parts[i].vertices[j]);
    }
  }


  //this.vertex_wheel = sortNoRep (this.vertex_wheel);

  this.wheels_created = [];
  for (let i = 0; i < this.wheels.length; i++) {
    if (wheels[i][0] == 1) {
          this.wheels_created.push (new create_wheel_2 (this.vertex_wheel, this.wheels[i], this.object));
    }
  }

  this.show = function () {
    let vert_ful = [];
    var vert1;
    vert1 = this.object.parts;
    vert_ful.push (vert1[1].vertices[0]);
    for (let i = 1; i < vert1.length; i++) {
      for (let j = 0; j < vert1[i].vertices.length; j++) {
          vert_ful.push (vert1[i].vertices[j]);
      }
    }
    this.vertex_wheel = vert_ful;
    vert_ful.push (vert_ful[0]);
    fill (0, 155, 127);
    beginShape();
    for (let i = 1; i < vert_ful.length; i++) {
      vertex (vert_ful[i].x,  vert_ful[i].y);
    }
    endShape(CLOSE);

    for (let i = 0; i < this.wheels_created.length; i++) {
      this.wheels_created[i].show ();
    }
  }
}


function create_wheel_2 (verts, wheel, body) {
  this.vert = verts;
  this.id = wheel[1];
  this.rad = wheel[2];
  this.pos = this.vert[this.id];
  this.force = wheel[3];
  //console.log(this.pos.x);
  var optionsc = {
    collisionFilter: {group: -1},
    torque: 0,
    friction: 0.7
  }
  this.ob = [];
  this.ob.push( Bodies.circle(this.pos.x, this.pos.y, this.rad, optionsc));
  this.cen = Vertices.centre(this.vert);
//  console.log(this.cen.x);
  var x = this.pos.x -  this.cen.x;
  var y = this.pos.y - this.cen.y;

  this.ob.push (Constraint.create({
    bodyA: body,
    pointA: { x: x , y: y},
    bodyB: this.ob[0],
    stiffness: 0.55, damping: 1, length: 0.5}));

  World.add(world, this.ob);

  this.show = function () {

    Body.applyForce(this.ob[0], {x:0, y:2}, {x:-this.force, y:0});
    Body.applyForce(this.ob[0], {x:0, y:-2}, {x:this.force, y:0});

    var pos = this.ob[0].position;
    var angle = this.ob[0].angle;
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
