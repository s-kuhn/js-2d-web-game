export class UI {
  constructor(game) {
    this.game = game;
    this.fontSize = 30;
    this.fontFamily = 'Papyrus';
    this.livesImage = livesImage;
  }
  draw(context) {
    context.save();
    context.font = this.fontSize + 'px ' + this.fontFamily;
    context.textAlign = 'left';
    context.fillStyle = this.game.fontColor; // move fontColor in this file? why main?

    // score
    context.fillText('Score: ' + this.game.score, 20, 50);

    // time
    context.font = this.fontSize * 0.8 + 'px ' + this.fontFamily;
    context.fillText('Time: ' + (this.game.time * 0.001).toFixed(1), 20, 80);

    // lives
    for (let i = 0; i < this.game.lives; i++) {
      context.drawImage(this.livesImage, 20 * i + 20, 95, 25, 25);
    }

    // game over message
    if (this.game.gameOver) {
      context.textAlign = 'center';
      context.font = this.fontSize * 2 + 'px ' + this.fontFamily;
      if (this.game.score > this.game.winningScore) {
        context.fillText(
          'gg',
          this.game.width * 0.5,
          this.game.height * 0.5 - 20,
        );
        context.font = this.fontSize * 0.7 + 'px ' + this.fontFamily;
        context.fillText(
          'dfsf',
          this.game.width * 0.5,
          this.game.height * 0.5 + 20,
        );
      } else {
        context.fillText(
          'noob',
          this.game.width * 0.5,
          this.game.height * 0.5 - 20,
        );
        context.font = this.fontSize * 0.7 + 'px ' + this.fontFamily;
        context.fillText(
          'dfsdgfdf',
          this.game.width * 0.5,
          this.game.height * 0.5 + 20,
        );
      }
    }
    context.restore();
  }
}
