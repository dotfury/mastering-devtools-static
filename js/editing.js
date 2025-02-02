// Check for list to be changed
const intervalId = setInterval(() => {
  const list = document.getElementById("editingList");
  if (list.tagName === "UL") {
    list.style.color = "green";
    clearInterval(intervalId);
  }
}, 1000);

window.onload = function () {
  const repeatPasswordField = document.getElementById("repeat-password");
  const newPasswordField = document.getElementById("new-password");

  // Event delegation listener for paste blockers
  document.addEventListener("paste", function (event) {
    if (event.target.classList.contains("disallow-paste")) {
      event.preventDefault();
      alert("Pasting is not allowed in this field.");
    }
  });

  // Do not allow form submission
  document
    .getElementById("password-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();
    });

  const intervalId = setInterval(() => {
    const targetPassword =
      "!@#4$%^&*()_+1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
    console.log(newPasswordField.value, repeatPasswordField.value);
    if (
      newPasswordField.value === targetPassword &&
      repeatPasswordField.value === targetPassword
    ) {
      alert("we did it!");
      clearInterval(intervalId);
    }
  }, 1000);
};
