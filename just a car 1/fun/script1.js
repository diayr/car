var Engine = Matter.Engine,
World = Matter.World,
Bodies = Matter.Bodies;
Constraint = Matter.Constraint;
Body = Matter.Body;
Vertices = Matter.Vertices;
var engine;
var world;
let p = [];

var vert = [
    {x : 50,y : 0},
    {x : 63,y : 38},
    {x : 100,y : 38},
    {x : 69,y : 59},
    {x : 82 ,y : 100},
    {x : 50,y : 75},
    {x : 18,y : 100},
    {x : 31,y : 59},
    {x : 0,y : 38},
    {x : 37,y : 38}
];

let ob = [];
function setup() {
  let density = displayDensity();
  pixelDensity(density);
  createCanvas(600, 400);
  engine = Engine.create();
  world = engine.world;
  Engine.run(engine);
  p.push (new Bound (width/2, height, width, 40));

//  vert = Vertices.clockwiseSort(vert);
  console.log (vert);

  var options = {
  //  isStatic: true,
    autoHull: false,
//    torque: 8,
//    position: {x: 200, y:200},
//    vertices: vert,
    friction: 0,
    collisionFilter: {group: -1},
    flagInternal: false
  }
  //ob.push (Body.create (options));
  ob.push (Bodies.fromVertices(200, 200, vert, options));

  var optionsc = {
    collisionFilter: {group: -1},
    friction: 1,
    torque: 1
  }

  ob.push( Bodies.circle(200, 200, 20, optionsc));
  ob.push (Constraint.create({
    bodyA: ob[0],
    pointA: { x:35, y: 35},
    bodyB: ob[1],
    stiffness: 0.51, damping: 1, length: 0}));
  ob.push( Bodies.circle(200, 200, 20, optionsc));
  ob.push (Constraint.create({
    bodyA: ob[0],
    pointA: { x:-35, y: 35},
    bodyB: ob[3],
    stiffness: 1, damping: 1, length: 0.0}));

  World.add(world, ob);
ob[0].angle = 0;

//  ob[0].torque = 0;

//  ob[1].torque = 0;
//  ob[3].torque = 0;


//  ob[0].force = {x:0, y:0};
//  ob[1].force = {x:0, y:0};
//  ob[3].force = {x:0, y:0};

//noLoop();
//body.parts

}

function mouseDragged() {
  p.push ( new Box (mouseX, mouseY , 5, 5));
  ob[0].angle = 0;

//  Body.setAngularVelocity (ob[0], 0);  Body.setAngularVelocity (ob[1], 0);  Body.setAngularVelocity (ob[3], 0);  Body.setVelocity (ob[0], {x:0, y:0});  Body.setVelocity (ob[1], {x:0, y:0});  Body.setVelocity (ob[3], {x:0, y:0});
}

var vert1;
let vert_ful = [];

function draw() {
  background(240);
  //  ob[0].angle = 0;

  vert1 = ob[0].parts;
  vert_ful.push (vert1[1].vertices[0]);
  for (let i = 1; i < vert1.length; i++) {
    for (let j = 0; j < vert1[i].vertices.length; j++) {
        vert_ful.push (vert1[i].vertices[j]);
    }
  }
  vert_ful.push (vert_ful[0]);

  beginShape();
  for (let i = 1; i < vert_ful.length; i++) {
    vertex (vert_ful[i].x,  vert_ful[i].y);
  }
  endShape(CLOSE);
  var pos = [ob[1].position, ob[3].position];
  fill (255, 0, 255);
  ellipse (pos[0].x, pos[0].y, 20*2, 20*2);
  ellipse (pos[1].x, pos[1].y, 20*2, 20*2);

  for (let i = 0; i < p.length; i++) {
    p[i].show ();
  }
}
