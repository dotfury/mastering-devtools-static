// Global array holding references to divs
const leakyArray = [];

document.getElementById("add").addEventListener("click", () => {
  // Add 100 new divs
  for (let i = 0; i < 100; i++) {
    const div = document.createElement("div");
    div.className = "leaky-div";
    div.textContent = "I am div number " + i;

    // Attach an event listener
    div.addEventListener("click", function () {
      console.log("Clicked div number " + i);
    });

    // Append to container
    document.getElementById("container").appendChild(div);

    // Store reference in global array (causes memory leak)
    leakyArray.push(div);
  }
});

document.getElementById("remove").addEventListener("click", () => {
  const container = document.getElementById("container");
  // Remove all divs from container
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
  // We can clear the leakyArray to release references
  //   leakyArray.length = 0;
});
