export class Player {
  constructor(game) {
    this.game = game;
    this.width = 100;
    this.height = 91.3;
    this.x = 0;
    this.y = this.game.height - this.height;
    this.image = document.getElementById('playerImage');
  }

  update() {
    this.x++;
  }

  draw(context) {
    //context.fillRect(this.x, this.y, this.width, this.height)

    //console.log(this.image)
    context.drawImage(
      this.image,
      0,
      0,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height,
    );
  }
}
