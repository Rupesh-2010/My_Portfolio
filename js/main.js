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

// Education section internal scroll fix
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', () => {
    document.body.style.overflow = 'hidden';
  });
});


/* =========================
   SCROLL REVEAL
========================= */

const revealElements = document.querySelectorAll(".reveal");

const revealOnScroll = () => {
  const windowHeight = window.innerHeight;

  revealElements.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;

    if (elementTop < windowHeight - 80) {
      el.classList.add("show");
    }
  });
};

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

// ===============================
// GUEST BOOK – COMMENTS
// ===============================

const commentsList = document.getElementById("commentsList");
const addCommentBtn = document.getElementById("addComment");
const sendMailBtn = document.getElementById("sendMail");
const guestNameInput = document.getElementById("guestName");
const guestMessageInput = document.getElementById("guestMessage");

// Load comments on page load
function loadComments() {
  const comments = JSON.parse(localStorage.getItem("comments")) || [];
  commentsList.innerHTML = "";

  // newest first
  [...comments].reverse().forEach((c, index) => {
    const div = document.createElement("div");
    div.className = "comment";

    div.innerHTML = `
      <strong>${c.name}</strong>
      <small> • ${c.time}</small>
      <p>${c.message}</p>
      ${
        c.admin
          ? `<button class="delete-btn" onclick="deleteComment(${comments.length - 1 - index})">Delete</button>`
          : ""
      }
    `;

    commentsList.appendChild(div);
  });
}

// Add comment (Submit Comment)
addCommentBtn.addEventListener("click", () => {
  const name = guestNameInput.value.trim();
  const message = guestMessageInput.value.trim();

  if (!name || !message) return;

  const comments = JSON.parse(localStorage.getItem("comments")) || [];

  comments.push({
    name,
    message,
    time: new Date().toLocaleString(),
    admin: name === "Rupesh Desai" // 🔐 only you can delete
  });

  localStorage.setItem("comments", JSON.stringify(comments));

  guestMessageInput.value = "";
  loadComments();
});

// Delete comment (Admin only)
function deleteComment(index) {
  const comments = JSON.parse(localStorage.getItem("comments")) || [];
  comments.splice(index, 1);
  localStorage.setItem("comments", JSON.stringify(comments));
  loadComments();
}

// ===============================
// SEND MESSAGE – EMAILJS ONLY
// ===============================

sendMailBtn.addEventListener("click", () => {
  const name = guestNameInput.value.trim();
  const message = guestMessageInput.value.trim();

  if (!name || !message) return;

  emailjs.send("service_id", "template_id", {
    from_name: name,
    message: message,
  });

  alert("Message sent successfully 🚀");
  guestMessageInput.value = "";
});

// Initial load
loadComments();
