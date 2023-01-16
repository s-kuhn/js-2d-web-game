/** @type {HTMLCanvasElement} */
window.addEventListener('load', (event) => {
  const canvas = document.getElementById('canvas1');
  const ctx = canvas.getContext('2d');
  canvas.width = 800;
  canvas.height = 720;
  let enemies = [];

  class InputHandler {
    constructor() {
      this.keys = [];
      // lexical scoping
      window.addEventListener('keydown', (e) => {
        if (
          (e.key === 'ArrowDown' ||
            e.key === 'ArrowUp' ||
            e.key === 'ArrowLeft' ||
            e.key === 'ArrowRight') &&
          this.keys.indexOf(e.key) === -1
        ) {
          this.keys.push(e.key);
        }
      });

      window.addEventListener('keyup', (e) => {
        if (
          e.key === 'ArrowDown' ||
          e.key === 'ArrowUp' ||
          e.key === 'ArrowLeft' ||
          e.key === 'ArrowRight'
        ) {
          this.keys.splice(this.keys.indexOf(e.key), 1);
        }
      });
    }
  }

  class Player {
    constructor(gameWidth, gameHeight) {
      this.gameWidth = gameWidth;
      this.gameHeight = gameHeight;
      this.width = 200;
      this.height = 200;
      this.x = 0;
      this.y = this.gameHeight - this.height;
      this.image = playerImage;
      this.frameX = 0;
      this.frameY = 0;
      this.maxFrameX = 0;
      this.veloX = 0;
      this.veloY = 0;
      this.weight = 1;
    }
    draw(context) {
      context.fillStyle = 'white';
      context.fillRect(this.x, this.y, this.width, this.height);
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
    update(input) {
      // TODO jump while run
      if (input.keys.indexOf('ArrowRight') > -1) {
        this.veloX = 5;
      } else if (input.keys.indexOf('ArrowLeft') > -1) {
        this.veloX = -5;
      } else if (input.keys.indexOf('ArrowUp') > -1 && this.onGround()) {
        this.veloY = -32;
      } else {
        this.veloX = 0;
      }
      // TODO add more animation frames
      // horizontal movement
      this.x += this.veloX;
      if (this.x < 0) this.x = 0;
      else if (this.x > this.gameWidth - this.width)
        this.x = this.gameWidth - this.width;

      // vertical movement
      this.y += this.veloY;
      if (!this.onGround()) {
        this.veloY += this.weight;
        this.frameY = 1;
      } else {
        this.veloY = 0;
        this.frameY = 0;
      }
      if (this.y > this.gameHeight - this.height)
        this.y = this.gameHeight - this.height;
    }
    onGround() {
      return this.y >= this.gameHeight - this.height;
    }
  }

  class Background {
    constructor(gameWidth, gameHeight) {
      this.gameWidth = gameWidth;
      this.gameHeight = gameHeight;
      this.image = backgroundImage;
      this.x = 0;
      this.y = 0;
      this.width = 2400;
      this.height = 720;
      this.veloX = 4;
    }
    draw(context) {
      context.drawImage(this.image, this.x, this.y, this.width, this.height);
      context.drawImage(
        this.image,
        this.x + this.width - this.veloX,
        this.y,
        this.width,
        this.height,
      );
    }
    update(input) {
      // TODO stop if not moving
      this.x -= this.veloX;
      if (this.x < 0 - this.width) {
        this.x = 0;
      }
    }
  }

  class Enemy {
    constructor(gameWidth, gameHeight) {
      this.gameWidth = gameWidth;
      this.gameHeight = gameHeight;
      this.weight = 160;
      this.height = 119;
      this.image = enemyImage;

      //this.markedForDeletion = false;
      this.frameX = 0;
      /*this.maxFrame = 5;
      this.frameInterval = 100;
      this.frameTimer = 0;*/
      this.x = this.gameWidth;
      this.y = this.gameHeight - this.height;
    }

    draw(context) {
      context.fillStyle = 'white';
      context.fillRect(this.x, this.y, this.width, this.height);
      context.drawImage(
        this.image,
        this.frameX * this.width,
        0,
        this.width,
        this.height,
        this.x,
        this.y,
        this.width,
        this.height,
      );
    }

    update() {
      this.x--;
    }
  }

  function handleEnemies(deltaTime) {
    if (enemyTimer > enemyInterval) {
      enemies.push(new Enemy(canvas.width, canvas.height));
      enemyTimer = 0;
    } else {
      enemyTimer += deltaTime;
    }
    enemies.forEach((enemy) => {
      enemy.draw(ctx);
      console.log(enemy.x);
      enemy.update();
    });
  }

  function displayStatusText() {}

  const input = new InputHandler();
  const player = new Player(canvas.width, canvas.height);
  const background = new Background(canvas.width, canvas.height);

  // TODO fix framerate
  let lastTime = 0;
  let enemyTimer = 0;
  let enemyInterval = 1000;
  function animate(timeStamp) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    //background.draw(ctx);
    //background.update(input);
    //player.draw(ctx);
    player.update(input);
    handleEnemies(deltaTime);
    requestAnimationFrame(animate);
  }
  animate(0);
});
