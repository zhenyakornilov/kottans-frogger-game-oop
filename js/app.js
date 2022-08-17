const EDGE_POSITION = {
  rightX: 404,
  leftX: 0,
  topY: -15,
  bottomY: 390,
};
// Place the player object in a variable called player
const PLAYER_START_POSITION = {
  x: 202,
  y: 390,
};

const MOVE_STEP = {
  x: 101,
  y: 81,
};

// Enemies our player must avoid
class Enemy {
  constructor(x, y, speed) {
    this.sprite = "images/enemy-bug.png";
    this.x = x;
    this.y = y;
    this.speed = speed;
  }
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images;

  // Update the enemy's position, required method for game
  // Parameter: dt, a time delta between ticks
  update(dt) {
    console.log(dt);
    this.x += dt * this.speed;
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
  }

  // Draw the enemy on the screen, required method for game
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

// Now write your own player class
class Player {
  constructor(x, y) {
    this.sprite = "images/char-boy.png";
    this.x = x;
    this.y = y;
  }

  update() {
    if (this.y === EDGE_POSITION.topY) {
        setTimeout(() => {
            this.x = PLAYER_START_POSITION.x
            this.y = PLAYER_START_POSITION.y
        }, 1000);
    }
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
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
// This class requires an update(), render() and
// a handleInput() method.

// Now instantiate your objects.
const enemyFirst = new Enemy(0, 55, 5);
// Place all enemy objects in an array called allEnemies
const allEnemies = [enemyFirst];

// Water end value is -15
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
