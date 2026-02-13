const roles = document.querySelectorAll(".role");
let current = 0;

setInterval(() => {
  roles.forEach(role => role.classList.remove("active"));
  roles[current].classList.add("active");

  current = (current + 1) % roles.length;
}, 2000);
