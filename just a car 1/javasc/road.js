function road () {
  this.max_angle = 0.4;
  this.n = 40;
  this.blocks = [];
  this.blocks.push (new block (-100, height -50, 0));
  for (let i = 1; i < this.n; i++) {
    this.blocks.push (new block ( this.blocks[i-1].x_sec, this.blocks[i-1].y_sec, random (-this.max_angle, this.max_angle)) );
  }

  this.update = function (pos_x) {
    this.pos_x = pos_x;
    if (this.blocks[0].x + width < pos_x) {
      console.log ("YES");
      this.blocks.shift();
      this.blocks.push (new block ( this.blocks[this.n-2].x_sec, this.blocks[this.n-2].y_sec, random (-this.max_angle, this.max_angle)))
    }
  }

  this.show = function () {
    for (let i = 0; i < this.blocks.length; i++) {
      this.blocks[i].show_b();
    }
  }
}

class block {
  constructor (x, y, angle) {
    var options = {
      isStatic: true,
      angle: angle,
      friction: 0.8
    }
    this.leng_block = 100;
    this.wid_block = 15;

    this.x = x;
    this.y = y;
    this.angle = angle;
    this.x_sec = this.x + this.leng_block*cos(this.angle);
    this.y_sec = this.y + this.leng_block*sin(this.angle);
    this.x_cen = (this.x + this.x_sec)/2;
    this.y_cen = (this.y + this.y_sec)/2;
    this.body = Bodies.rectangle (this.x_cen, this.y_cen, this.leng_block, this.wid_block, options);

    World.add(world, this.body);
  }
  show_b() {
    stroke (0);
    fill (255, 248, 220);
    push ();
    translate(this.x_cen, this.y_cen);
    rotate (this.angle);
    rectMode(CENTER);
    rect (0, 0, this.leng_block + 0, this.wid_block);
    pop();
  }
}
