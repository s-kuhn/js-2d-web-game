export class UI {
  constructor(game){
    this.game = game;
    this.fontSize = 30;
    this.fontFamily = 'Papyrus'
  }
  draw(context) {
    context.font = this.fontSize + 'px ' + this.fontFamily;
    context.textAlign = 'left';
    context.fillStyle = this.game.fontColor; // move fontColor in this file? why main?

    // score
    context.fillText('Score: ' + this.game.score, 20, 50);
  }
}
