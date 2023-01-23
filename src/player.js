import {
  Diving,
  Falling,
  Hit,
  Jumping,
  Rolling,
  Running,
  Sitting,
} from './state.js';
import { CollisionAnimation } from './collisionAnimation.js';
import { FloatingMessage } from './floatingMessages.js';

export class Player {
  constructor(game) {
    this.game = game;
    this.width = 100;
    this.height = 91.3;
    this.x = 0;
    this.y = this.game.height - this.height - this.game.groundMargin;
    this.image = playerImage;
    this.states = [
      new Sitting(this.game),
      new Running(this.game),
      new Jumping(this.game),
      new Falling(this.game),
      new Rolling(this.game),
      new Diving(this.game),
      new Hit(this.game),
      //new Standing(this),
    ];
    this.currentState = null;
    this.frameX = 0;
    this.maxFrameX;
    this.frameY = 5;
    this.veloX = 0;
    this.maxSpeed = 5;
    this.veloY = 0;
    this.weight = 1; // gravity
    this.fps = 20;
    this.frameTimer = 0;
    this.frameInterval = 1000 / this.fps;
  }

  update(input, deltaTime) {
    this.checkCollitions();
    this.currentState.handleInput(input);
    // horizontal movement
    this.x += this.veloX;
    if (input.includes('ArrowRight') && this.currentState !== this.states[6])
      this.veloX = this.maxSpeed;
    else if (
      input.includes('ArrowLeft') &&
      this.currentState !== this.states[6]
    )
      this.veloX = -this.maxSpeed;
    else this.veloX = 0;
    // boundry
    if (this.x <= 0) this.x = 0;
    else if (this.x >= this.game.width - this.width)
      this.x = this.game.width - this.width;

    // vertical movement
    this.y += this.veloY;
    if (!this.onGround()) this.veloY += this.weight;
    else this.veloY = 0;
    // boundry
    if (this.y > this.game.height - this.height - this.game.groundMargin)
      this.y = this.game.height - this.height - this.game.groundMargin;

    // sprite animation
    if (this.frameTimer > this.frameInterval) {
      this.frameTimer = 0;
      if (this.frameX < this.maxFrameX) this.frameX++;
      else this.frameX = 0;
    } else {
      this.frameTimer += deltaTime;
    }
  }

  draw(context) {
    if (this.game.debug)
      context.strokeRect(this.x, this.y, this.width, this.height);
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

  setState(state, speed) {
    this.currentState = this.states[state];
    this.game.speed = this.game.maxSpeed * speed;
    this.currentState.enter();
  }

  onGround() {
    return this.y >= this.game.height - this.height - this.game.groundMargin;
  }

  checkCollitions() {
    this.game.enemies.forEach((enemy) => {
      if (
        enemy.x < this.x + this.width &&
        enemy.x + enemy.width > this.x &&
        enemy.y < this.y + this.height &&
        enemy.y + enemy.height > this.y
      ) {
        enemy.markedForDeletion = true;
        this.game.collisions.push(
          new CollisionAnimation(
            this.game,
            enemy.x + enemy.width * 0.5,
            enemy.y + enemy.height * 0.5,
          ),
        );
        if (
          this.currentState === this.states[4] ||
          this.currentState === this.states[5]
        ) {
          this.game.score++;
          this.game.floatingMessages.push(
            new FloatingMessage('+1', enemy.x, enemy.y, 140, 50), // TODO different score per enemy
          );
        } else {
          this.setState(6, 0); // HIT State
          this.game.score--;
          this.game.lives--;
          if (this.game.lives <= 0) this.game.gameOver = true;
        }
      }
    });
  }
}
