const EDGE_POSITION = {
  rightX: 404,
  leftX: 0,
  topY: -15,
  bottomY: 390,
};

const PLAYER_START_POSITION = {
  x: 202,
  y: 390,
};

const MOVE_STEP = {
  x: 101,
  y: 81,
};

class Character {
  constructor(x, y, sprite) {
    this.x = x;
    this.y = y;
    this.sprite = sprite;
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}
class Enemy extends Character {
  constructor(x, y, speed, direction, sprite) {
    super(x, y, sprite);
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.direction = direction;
  }
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images;

  // Update the enemy's position, required method for game
  // Parameter: dt, a time delta between ticks
  update(dt) {
    if (this.direction === "left") {
      this.x -= dt * this.speed;
    } else {
      this.x += dt * this.speed;
    }
  }
}

class Player extends Character {
  constructor(x, y, sprite) {
    super(x, y, sprite);
    this.sprite = "images/char-boy.png";
  }

  update(dt) {
    if (this.y === EDGE_POSITION.topY) {
      setTimeout(() => {
        this.x = PLAYER_START_POSITION.x;
        this.y = PLAYER_START_POSITION.y;
      }, 1000);
    }
  }

  handleInput(btn) {
    console.log("handleInput method");
    if (btn === "up" && this.y !== EDGE_POSITION.topY) {
      this.y -= MOVE_STEP.y;
    } else if (btn === "down" && this.y !== EDGE_POSITION.bottomY) {
      this.y += MOVE_STEP.y;
    } else if (btn === "left" && this.x !== EDGE_POSITION.leftX) {
      this.x -= MOVE_STEP.x;
    } else if (btn === "right" && this.x !== EDGE_POSITION.rightX) {
      this.x += MOVE_STEP.x;
    }
  }
}

// Now instantiate your objects.
const enemyFirst = new Enemy(0, 55, 90, "right", "images/enemy-bug.png");
const enemyReverse = new Enemy(
  600,
  136,
  50,
  "left",
  "images/enemy-bug-reverse.png"
);
const enemySecond = new Enemy(0, 217, 90, "right", "images/enemy-bug.png");
// Place all enemy objects in an array called allEnemies
const allEnemies = [enemyFirst, enemyReverse, enemySecond];

const player = new Player(PLAYER_START_POSITION.x, PLAYER_START_POSITION.y);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener("keyup", function (e) {
  var allowedKeys = {
    37: "left",
    38: "up",
    39: "right",
    40: "down",
  };

  player.handleInput(allowedKeys[e.keyCode]);
});

function getRandomNumInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
