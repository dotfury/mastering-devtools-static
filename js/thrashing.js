const NUM_BALLS = 200;
const container = document.getElementById("container");
const balls = [];

// Create balls and initial properties
for (let i = 0; i < NUM_BALLS; i++) {
  const ball = document.createElement("div");
  ball.classList.add("ball");
  container.appendChild(ball);

  // Random initial positions and velocities
  const posX = Math.random() * (container.clientWidth - 20);
  const posY = Math.random() * (container.clientHeight - 20);
  ball.style.left = posX + "px";
  ball.style.top = posY + "px";

  balls.push({
    element: ball,
    vx: (Math.random() - 0.5) * 4,
    vy: (Math.random() - 0.5) * 4,
    // Store initial positions
    x: posX,
    y: posY,
  });
}

// Unoptimized animation loop causing layout thrashing
function moveBalls() {
  balls.forEach((ball) => {
    // Read layout properties (causes reflow)
    let x = ball.element.offsetLeft;
    let y = ball.element.offsetTop;

    // Update positions
    x += ball.vx;
    y += ball.vy;

    // Collision detection with walls
    if (x <= 0 || x >= container.clientWidth - 20) {
      ball.vx = -ball.vx;
    }
    if (y <= 0 || y >= container.clientHeight - 20) {
      ball.vy = -ball.vy;
    }

    // Write layout properties (causes repaint)
    ball.element.style.left = x + "px";
    ball.element.style.top = y + "px";
  });
}

let animationInterval = setInterval(moveBalls, 16); // ~60fps

// Optimize button click handler
document
  .getElementById("optimizeBtn")
  .addEventListener("click", optimizeAnimation);

function optimizeAnimation() {
  performance.mark("optimizeClicked");

  clearInterval(animationInterval); // Stop the unoptimized animation

  // Hide the optimize button
  document.getElementById("optimizeBtn").style.display = "none";
  document.querySelector("h1").innerText = "Bouncing Balls - Optimized Version";

  // Reset 'left' and 'top', and adjust positions
  balls.forEach((ball) => {
    // Reset positioning properties
    ball.element.style.left = "0px";
    ball.element.style.top = "0px";

    // Positions are already stored in ball.x and ball.y
    // No need to adjust them here
  });

  function optimizedMoveBalls() {
    balls.forEach((ball) => {
      // Update positions
      ball.x += ball.vx;
      ball.y += ball.vy;

      // Collision detection with walls
      if (ball.x <= 0) {
        ball.x = 0;
        ball.vx = -ball.vx;
      } else if (ball.x >= container.clientWidth - 20) {
        ball.x = container.clientWidth - 20;
        ball.vx = -ball.vx;
      }

      if (ball.y <= 0) {
        ball.y = 0;
        ball.vy = -ball.vy;
      } else if (ball.y >= container.clientHeight - 20) {
        ball.y = container.clientHeight - 20;
        ball.vy = -ball.vy;
      }

      // Write positions using transform
      ball.element.style.transform = `translate(${ball.x}px, ${ball.y}px)`;
    });

    requestAnimationFrame(optimizedMoveBalls);
  }

  requestAnimationFrame(optimizedMoveBalls);
}
