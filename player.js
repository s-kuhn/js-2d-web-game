import { StandingRight, StandingLeft } from './state.js';

export class Player {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.states = [new StandingLeft(), new StandingRight()];
    this.currentState = this.states[1];
    this.image = dogImage;
    this.width = 200;
    this.height = 181.83;
    this.x = this.gameWidth / 2 - this.width / 2;
    this.y = this.gameHeight - this.height;
    this.frameX = 0;
    this.maxFrameX = 6;
    this.frameY = 0;
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
  update(input) {
    this.currentState.handleInput(input);
  }
  setState(state) {
    this.currentState = this.states[state];
    this.currentState.enter();
  }
}
