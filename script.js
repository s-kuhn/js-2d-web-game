/** @type {HTMLCanvasElement} */
import { Player } from './player.js';
import { InputHandler } from './input.js';
import { drwaStatusText } from './utils.js';

window.addEventListener('load', function () {
  const loading = this.document.getElementById('loading');
  loading.style.display = 'none';
  const canvas = document.getElementById('canvas1');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const player1 = new Player(canvas.width, canvas.height);
  console.log(player1)
  const input1 = new InputHandler();

  let lastTime = 0;
  let enemyTimer = 0;
  let enemyInterval = 1000;
  let randomEnemyInterval = Math.random() * 1000 + 500;

  function animate(timeStamp) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player1.draw(ctx);
    player1.update(input1.lastKey);
    drwaStatusText(ctx, input1);
    //const deltaTime = timeStamp - lastTime;
    //lastTime = timeStamp;
    requestAnimationFrame(animate);
  }
  animate(0);
});
