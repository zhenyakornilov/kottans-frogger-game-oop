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
  axisX: 101,
  axisY: 81,
};

const GAME_BOARD_WIDTH = 505;
const GAME_BOARD_HEIGHT = 530;
const OUTBOARD_INDENT = 10;
const SAFE_DISTANCE = 60;

class Character {
  constructor(axisX, axisY, sprite) {
    this.axisX = axisX;
    this.axisY = axisY;
    this.sprite = sprite;
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.axisX, this.axisY);
  }
}

class Enemy extends Character {
  constructor(axisX, axisY, speed, direction, sprite, player) {
    super(axisX, axisY, sprite);
    this.speed = speed;
    this.direction = direction;
    this.player = player;
  }

  update(dt) {
    if (this.direction === "left") {
      this.axisX -= dt * this.speed;
      if (this.axisX < 0) {
        this.axisX = GAME_BOARD_WIDTH + OUTBOARD_INDENT;
      }
    } else {
      this.axisX += dt * this.speed;
      if (this.axisX > GAME_BOARD_WIDTH) {
        this.axisX = -OUTBOARD_INDENT;
      }
    }
    this.checkOverlap();
  }

  checkOverlap() {
    if (
      this.player.axisX < this.axisX + SAFE_DISTANCE &&
      this.player.axisX + SAFE_DISTANCE > this.axisX &&
      this.player.axisY < this.axisY + SAFE_DISTANCE &&
      this.player.axisY + SAFE_DISTANCE > this.axisY
    ) {
      this.player.axisX = PLAYER_START_POSITION.x;
      this.player.axisY = PLAYER_START_POSITION.y;
    }
  }
}

class Player extends Character {
  constructor(axisX, axisY, sprite) {
    super(axisX, axisY, sprite);
    this.sprite = "images/char-boy.png";
  }

  update() {
    if (this.axisY === EDGE_POSITION.topY) {
      setTimeout(() => {
        this.axisX = PLAYER_START_POSITION.x;
        this.axisY = PLAYER_START_POSITION.y;
      }, 1000);
    }
  }

  handleInput(btn) {
    console.log("handleInput method");
    if (btn === "up" && this.axisY !== EDGE_POSITION.topY) {
      this.axisY -= MOVE_STEP.axisY;
    } else if (btn === "down" && this.axisY !== EDGE_POSITION.bottomY) {
      this.axisY += MOVE_STEP.axisY;
    } else if (btn === "left" && this.axisX !== EDGE_POSITION.leftX) {
      this.axisX -= MOVE_STEP.axisX;
    } else if (btn === "right" && this.axisX !== EDGE_POSITION.rightX) {
      this.axisX += MOVE_STEP.axisX;
    }
  }
}

const enemiesSettings = [
  {
    posX: -OUTBOARD_INDENT,
    posY: GAME_BOARD_HEIGHT - 470,
    speed: generateSpeed(200, 300),
    direction: "right",
    img: "images/enemy-bug.png",
  },
  {
    posX: GAME_BOARD_WIDTH + OUTBOARD_INDENT,
    posY: GAME_BOARD_HEIGHT - 386,
    speed: generateSpeed(100, 300),
    direction: "left",
    img: "images/enemy-bug-reverse.png",
  },
  {
    posX: -OUTBOARD_INDENT,
    posY: GAME_BOARD_HEIGHT - 304,
    speed: generateSpeed(100, 300),
    direction: "right",
    img: "images/enemy-bug.png",
  },
];

const player = new Player(PLAYER_START_POSITION.x, PLAYER_START_POSITION.y);

const allEnemies = enemiesSettings.map(
  ({ posX, posY, speed, direction, img }) => {
    return new Enemy(posX, posY, speed, direction, img, player);
  }
);

document.addEventListener("keyup", function (e) {
  var allowedKeys = {
    37: "left",
    38: "up",
    39: "right",
    40: "down",
  };

  player.handleInput(allowedKeys[e.keyCode]);
});

function generateSpeed(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
