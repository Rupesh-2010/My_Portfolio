// NAVBAR TAB SWITCH
const navLinks = document.querySelectorAll("nav a");
const sections = document.querySelectorAll(".page-section");

navLinks.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const target = link.getAttribute("href").substring(1);

    sections.forEach(sec => sec.classList.remove("active"));
    document.getElementById(target).classList.add("active");
  });
});

// PROFILE IMAGE TOGGLE
const profile = document.getElementById("profileImg");
const bitmoji = document.getElementById("bitmojiImg");

profile.onclick = () => {
  profile.classList.remove("active");
  bitmoji.classList.add("active");
};

bitmoji.onclick = () => {
  bitmoji.classList.remove("active");
  profile.classList.add("active");
};


// ASHUTOSH STYLE SCROLL ANIMATION
const animatedItems = document.querySelectorAll('.ash-animate');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, { threshold: 0.15 });

animatedItems.forEach(item => observer.observe(item));
