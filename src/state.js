import { Dust } from './particles.js';

// TODO add left and right states
export const states = {
  SITTING: 0,
  RUNNING: 1,
  JUMPING: 2,
  FALLING: 3,
  ROLLING: 4,
  DIVING: 5,
  HIT: 6,
  STANDING: 7,
};

class State {
  constructor(state, game) {
    this.state = state;
    this.game = game;
  }
}

export class Sitting extends State {
  constructor(game) {
    super('SITTING', game);
  }
  enter() {
    this.game.player.frameX = 0;
    this.game.player.frameY = 5;
    this.game.player.maxFrameX = 4;
    this.game.player.veloX = 0;
  }
  handleInput(input) {
    if (input.includes('ArrowLeft') || input.includes('ArrowRight'))
      this.game.player.setState(states.RUNNING, 1);
    else if (input.includes('ArrowUp'))
      this.game.player.setState(states.JUMPING, 1);
    else if (input.includes(' ')) this.game.player.setState(states.ROLLING, 2);
  }
}

export class Running extends State {
  constructor(game) {
    super('RUNNING', game);
  }
  enter() {
    this.game.player.frameX = 0;
    this.game.player.frameY = 3;
    this.game.player.veloX = this.game.player.maxSpeed;
    this.game.player.maxFrameX = 8;
  }
  handleInput(input) {
    this.game.particles.push(
      new Dust(
        this.game,
        this.game.player.x + this.game.player.width * 0.5,
        this.game.player.y + this.game.player.height,
      ),
    );
    if (input.includes('ArrowDown'))
      this.game.player.setState(states.SITTING, 0);
    else if (input.includes('ArrowUp'))
      this.game.player.setState(states.JUMPING, 1);
    else if (input.includes(' ')) this.game.player.setState(states.ROLLING, 2);
  }
}

export class Jumping extends State {
  constructor(game) {
    super('JUMPING', game);
  }
  enter() {
    this.game.player.frameX = 0;
    this.game.player.frameY = 1;
    if (this.game.player.onGround()) this.game.player.veloY -= 27;
    //this.player.veloX = this.player.maxSpeed * 0.5;
    this.game.player.maxFrameX = 6;
  }
  handleInput(input) {
    if (this.game.player.veloY > this.game.player.weight)
      this.game.player.setState(states.FALLING, 1);
    else if (input.includes(' ')) this.game.player.setState(states.ROLLING, 2);
  }
}

export class Falling extends State {
  constructor(game) {
    super('FALLING', game);
  }
  enter() {
    this.game.player.frameX = 0;
    this.game.player.frameY = 2;
    this.game.player.maxFrameX = 6;
  }
  handleInput(input) {
    if (this.game.player.onGround())
      this.game.player.setState(states.RUNNING, 1);
    else if (input.includes(' ')) this.game.player.setState(states.ROLLING, 2);
  }
}

export class Rolling extends State {
  constructor(game) {
    super('ROLLING', game);
  }
  enter() {
    this.game.player.frameX = 0;
    this.game.player.frameY = 6;
    this.game.player.maxFrameX = 6;
  }
  handleInput(input) {
    if (!input.includes(' ') && this.game.player.onGround())
      this.game.player.setState(states.RUNNING, 1);
    else if (!input.includes(' ') && !this.game.player.onGround())
      this.game.player.setState(states.FALLING, 1);
    else if (
      input.includes(' ') &&
      input.includes('ArrowUp') &&
      this.game.player.onGround()
    )
      this.game.player.veloY -= 27; // TODO refactor so no constant
  }
}
