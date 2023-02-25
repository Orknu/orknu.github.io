let canvas = document.getElementById("field");
let scoreBoard = document.getElementById("scoreBoard");

let playerWidth = 20;
let playerHeight = 40;

let playerA1 = {
  x: 50,
  y: canvas.height / 2 - playerHeight / 2,
  speed: 1,
  color: "#FFA500",
  team: "A"
};

let playerA2 = {
  x: 80,
  y: canvas.height / 2 - playerHeight / 2,
  speed: 1,
  color: "#FFA500",
  team: "A"
};

let playerB1 = {
  x: canvas.width - 70,
  y: canvas.height / 2 - playerHeight / 2,
  speed: 1,
  color: "#00BFFF",
  team: "B"
};

let playerB2 = {
  x: canvas.width - 100,
  y: canvas.height / 2 - playerHeight / 2,
  speed: 1,
  color: "#00BFFF",
  team: "B"
};

let players = [playerA1, playerA2, playerB1, playerB2];

let ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 8,
  color: "#FFFFFF",
  speed: 2,
  xVelocity: 2,
  yVelocity: 2
};

let scoreA = 0;
let scoreB = 0;

function drawPlayers() {
  let ctx = canvas.getContext("2d");
  
  for (let i = 0; i < players.length; i++) {
    let player = players[i];
    
    // Oyuncuyu çiz.
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, playerWidth, playerHeight);
    
    // Oyuncunun numarasını yazdır.
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "bold 16px Arial";
    ctx.fillText(i + 1, player.x + 6, player.y + 26);
  }
}

function drawBall() {
  let ctx = canvas.getContext("2d");
  
  // Topu çiz.
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = ball.color;
  ctx.fill();
  
  // Topun numarasını yazdır.
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "bold 16px Arial";
  ctx.fillText("O", ball.x - 6, ball.y + 6);
}

function updateBall() {
  ball.x += ball.xVelocity * ball.speed;
  ball.y += ball.yVelocity * ball.speed;
  
  // Topun sahayı terk etmesini önle.
  if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
    ball.yVelocity = -ball.yVelocity;
  }
  
  // Oyuncularla çarpışmayı kontrol et.
  for (let i = 0; i < players.length; i++) {
    let player = players[i];
    
    if (player.team == "A") {
      if (ball.x - ball.radius < player.x + playerWidth && 
          ball.y + ball.radius > player.y && 
          ball.y - ball.radius < player.y + playerHeight) {
        ball.x
        ball.xVelocity = -ball.xVelocity;
      }
    } else if (player.team == "B") {
      if (ball.x + ball.radius > player.x && 
          ball.y + ball.radius > player.y && 
          ball.y - ball.radius < player.y + playerHeight) {
        ball.xVelocity = -ball.xVelocity;
      }
    }
  }
  
  // Gol olup olmadığını kontrol et.
  if (ball.x - ball.radius < 0) {
    scoreB++;
    resetBall();
  } else if (ball.x + ball.radius > canvas.width) {
    scoreA++;
    resetBall();
  }
}

function resetBall() {
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;
  ball.xVelocity = -ball.xVelocity;
}

function updatePlayers() {
  for (let i = 0; i < players.length; i++) {
    let player = players[i];
    
    // Oyuncunun hareket etmesini sağla.
    player.y += player.speed;
    
    // Oyuncunun sahayı terk etmesini önle.
    if (player.y + playerHeight > canvas.height || player.y < 0) {
      player.speed = -player.speed;
    }
  }
}

function updateScoreBoard() {
  scoreBoard.innerHTML = `Team A: ${scoreA} - Team B: ${scoreB}`;
}

function draw() {
  let ctx = canvas.getContext("2d");
  
  // Sahayı çiz.
  ctx.fillStyle = "#008000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Oyuncuları çiz.
  drawPlayers();
  
  // Topu çiz.
  drawBall();
  
  // Topun konumunu güncelle.
  updateBall();
  
  // Oyuncuların konumunu güncelle.
  updatePlayers();
  
  // Skor tablosunu güncelle.
  updateScoreBoard();
}

setInterval(draw, 10);
