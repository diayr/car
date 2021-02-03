var Engine = Matter.Engine,
World = Matter.World,
Bodies = Matter.Bodies;
Constraint = Matter.Constraint;
Body = Matter.Body;
Vertices = Matter.Vertices;

var engine;
var world;
let p = [];
let car = [];
var road;
var pen;

function gene_to_car (gene) {
    let car_here = [[],[]];
    for (let i = 0; i < 16; i+=2) {
      car_here[0][i/2] = {x : (gene[i]-0.5)*300, y : 150*(gene[i+1]-0.5)};
    }
    for (let i = 16; i < 32; i+=4) {
      car_here[1][(i-16)/4] = [floor(gene[i]+0.5), floor(gene[i+1]*8), (gene[i+2]+0.2)*40, (gene[i+3]*0.04)+0.01];
      // ['is there a wheel?', 'is of the vertix', 'radius',  'torque']
    }
    return car_here;
}

function new_random_gene () {
  let gene = [];
  for (let i = 0; i < 32; i+=1) {
    gene.push (random(1));
  }
  return gene;
}

var number_or_cars = 1;

function setup() {
  let density = displayDensity();
  pixelDensity(density);
  createCanvas(600, 400);

  engine = Engine.create({enableSleeping:true});
  world = engine.world;
  //p.push (new Bound (width/2, height, width, 40));
  // ['is there a wheel?', 'is of the vertix', 'radius',  'torque']
  road = new road ();

  for (let i = 0; i < number_or_cars; i++) {
    gene_car = gene_to_car (new_random_gene ());
    car.push ( new car_2 (200, 100, gene_car[0], gene_car[1]));
  }
  //noLoop();
  //var star = Matter.Vertices.create(vert);
  //pen = Bodies.fromVertices(300, 150, star, {isStatic: true});
  //World.add(world, pen);
//  Engine.run(engine);
frameRate (60);
}

var pos_x;
var pos_history = [];

function draw() {
  Engine.update(engine, [delta=16.666], [correction=1]);
//  Engine.update(engine, [delta=16.666], [correction=1]);
//  scale (1, 1);

  background(240);
//  console.log (Matter.Vertices.centre(vert));
  pos_x = car[0].object.position;
  for (let i = 0; i < car.length; i++) {
    if (pos_x.x < car[i].object.position.x) pos_x = car[i].object.position;
  }
  translate(-pos_x.x + 200, -pos_x.y + 200);
  for (let i = 0; i < car.length; i++) {
    car[i].show();
  }
  road.show();
  road.update (pos_x.x);

  for (let i = 0; i < p.length; i++) {
    p[i].show ();
  }

  if (pos_history.length > 100) pos_history.shift();
  pos_history.push (pos_x.x);
  let sum = pos_history.reduce((previous, current) => current += previous);
  let avg = sum / pos_history.length;
  if (((abs (pos_x.x - avg))/avg < 0.01 && frameCount > 180) || frameCount >60*15  ) {
    console.log("distance:", pos_x.x - 200);
    console.log("time:", frameCount/60);
    noLoop ();
  }
}


function mouseDragged() {
  p.push ( new Box (mouseX + pos_x.x - 200, mouseY + pos_x.y - 200, 10, 10));
//  p.push ( new Box (mouseX, mouseY , 10, 10));
}

function mouseClicked() {
//  p.push ( new car (200, 300, 100, 50));
}
