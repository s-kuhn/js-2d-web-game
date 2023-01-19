import {
  StandingRight,
  StandingLeft,
  SittingLeft,
  SittingRight,
  RunningLeft,
  RunningRight,
  JumpingLeft,
  JumpingRight,
  FallingLeft,
  FallingRight,
} from './state.js';

export class Player {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.states = [
      new StandingLeft(this),
      new StandingRight(this),
      new SittingLeft(this),
      new SittingRight(this),
      new RunningLeft(this),
      new RunningRight(this),
      new JumpingLeft(this),
      new JumpingRight(this),
      new FallingLeft(this),
      new FallingRight(this),
    ];
    this.currentState = this.states[1];
    this.image = dogImage;
    this.width = 200;
    this.height = 181.83;
    this.x = this.gameWidth / 2 - this.width / 2;
    this.y = this.gameHeight - this.height;
    this.frameX = 0;
    this.maxFrameX = 6;
    this.frameY = 0;
    this.veloX = 0;
    this.maxSpeed = 10;
    this.veloY = 0;
    this.weight = 0.5; // gravity
    this.fps = 60;
    this.frameTimer = 0;
    this.frameInterval = 1000 / this.fps;
  }

  draw(context) {
    

    context.drawImage(
      this.image,
      this.width * this.frameX,
      this.height * this.frameY,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height,
    );
  }
  update(input, deltaTime) {
    this.currentState.handleInput(input);
    // horizontal movement
    this.x += this.veloX;
    // boundry
    if (this.x <= 0) this.x = 0;
    else if (this.x >= this.gameWidth - this.width)
      this.x = this.gameWidth - this.width;

    // vertical movement
    this.y += this.veloY;
    if (!this.onGround()) {
      this.veloY += this.weight;
    } else {
      this.veloY = 0;
    }
    // boundry
    if (this.y > this.gameHeight - this.height)
      this.y = this.gameHeight - this.height;

      // sprite animations
    if (this.frameTimer > this.frameInterval) {
      if (this.frameX >= this.maxFrameX) this.frameX = 0;
      else this.frameX++;
      this.frameTimer = 0;
    } else {
      this.frameTimer += deltaTime;
    }
  }

  setState(state) {
    this.currentState = this.states[state];
    this.currentState.enter();
  }

  onGround() {
    return this.y >= this.gameHeight - this.height;
  }
}
