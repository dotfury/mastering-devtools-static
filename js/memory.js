// Global array holding references to divs
let leakyarray = [];

document.getElementById("add").addEventListener("click", () => {
  // each click adds a large object we never remove
  const bigobject = { data: new Array(100000).fill("some data") };
  leakyarray.push(bigobject);
  console.log(`current array length: ${leakyarray.length}`);
});
