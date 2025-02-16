setInterval(() => {
  function1();

  function function1() {
    const foo = "foo";
    function2(foo);
  }

  function function2(foo) {
    let randomNumber = Math.random();
    if (randomNumber > 0.5) {
      function3();
    } else {
      function4();
    }
  }

  function function3() {
    console.log("Hello from function3");
  }

  function function4() {
    console.log("Hello from function 4");
  }
}, 500);
