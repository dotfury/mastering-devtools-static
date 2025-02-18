function expensiveOperation() {
  performance.mark("expensiveOperation-start");

  // blocking work
  let sum = 0;
  for (let i = 0; i < 50_000_000; i++) {
    sum += Math.sqrt(i) % 1;
  }

  performance.mark("expensiveOperation-end");
  performance.measure(
    "expensiveOperation",
    "expensiveOperation-start",
    "expensiveOperation-end"
  );

  console.log(`blocking work done, sum: ${sum}`);
}

// runs every frame, but blocks
function frameLoop() {
  expensiveOperation();
  requestAnimationFrame(frameLoop);
}

// start the loop
frameLoop();
