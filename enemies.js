class Enemy {
  constructor() {
    this.frameX = 0;
    this.frameY = 0;
    this.fps = 20;
    this.frameTimer = 0;
    this.frameInterval = 1000 / this.fps;
    this.markedForDeletion = false;
  }

  update(deltaTime) {
    // movement
    this.x -= this.veloX;
    this.y += this.veloY;
    if (this.frameTimer > this.frameInterval) {
      this.frameTimer = 0;
      if (this.frameX < this.maxFrameX) this.frameX++;
      else this.frameX = 0;
    } else {
      this.frameTimer += deltaTime;
    }
    // check if off screen
    if (this.x + this.width < 0) this.markedForDeletion = true;
  }

  draw(context) {
    context.drawImage(
      this.image,
      this.frameX * this.width,
      this.frameY * this.height,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height,
    );
  }
}

export class FlyingEnemy extends Enemy {
  constructor(game) {
    super();
    this.game = game;
    this.width = 60;
    this.height = 44;
    this.x = this.game.width;
    this.y = Math.random() * this.game.height * 0.5;
    this.veloX = 2;
    this.veloY = 0;
    this.maxFrameX = 5;
    this.image = enemy_fly;
  }

  update(deltaTime) {
    super.update(deltaTime);
  }
}
export class GroundEnemy extends Enemy {
  constructor() {
    super();
  }
}
export class ClimbingEnemy extends Enemy {
  constructor() {
    super();
  }
}
