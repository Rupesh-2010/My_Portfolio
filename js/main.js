console.log("🔥 main.js loaded");

// ===============================
// NAVBAR TAB SWITCH
// ===============================
document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const target = link.getAttribute("href").substring(1);
    document.querySelectorAll(".page-section").forEach(sec =>
      sec.classList.remove("active")
    );
    document.getElementById(target)?.classList.add("active");
  });
});

// ===============================
// PROFILE IMAGE TOGGLE (FIXED)
// ===============================
const profileImgEl = document.getElementById("profileImg");
const bitmojiImgEl = document.getElementById("bitmojiImg");

if (profileImgEl && bitmojiImgEl) {
  profileImgEl.onclick = () => {
    profileImgEl.classList.remove("active");
    bitmojiImgEl.classList.add("active");
  };

  bitmojiImgEl.onclick = () => {
    bitmojiImgEl.classList.remove("active");
    profileImgEl.classList.add("active");
  };
}

// ===============================
// SCROLL REVEAL
// ===============================
const revealElements = document.querySelectorAll(".reveal");

function revealOnScroll() {
  const windowHeight = window.innerHeight;
  revealElements.forEach(el => {
    if (el.getBoundingClientRect().top < windowHeight - 80) {
      el.classList.add("show");
    }
  });
}
window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

// ===============================
// EMAILJS INIT
// ===============================
(function () {
  emailjs.init("KdLduq0by6Ktl2S_f");
})();

// ===============================
// GUEST BOOK ELEMENTS
// ===============================
const guestForm = document.getElementById("guestForm");
const guestNameInput = document.getElementById("guestName");
const guestEmailInput = document.getElementById("guestEmail");
const guestMessageInput = document.getElementById("guestMessage");
const commentsList = document.getElementById("commentsList");
const sendMailBtn = document.getElementById("sendMail");
const addCommentBtn = document.getElementById("addComment");

// 🚫 STOP FORM AUTO SUBMIT (SAFE)
if (guestForm) {
  guestForm.addEventListener("submit", e => e.preventDefault());
}

// ===============================
// LOAD COMMENTS
// ===============================
function loadComments() {
  const comments = JSON.parse(localStorage.getItem("comments")) || [];
  commentsList.innerHTML = "";

  comments.slice().reverse().forEach((c, index) => {
    const div = document.createElement("div");
    div.className = "comment fade-in";

    div.innerHTML = `
      <div class="comment-header">
        <strong>${c.name}</strong>
        <span>${c.time}</span>
      </div>
      <p>${c.message}</p>
      ${c.admin ? `<button class="delete-btn" data-index="${comments.length - 1 - index}">Delete</button>` : ""}
    `;

    commentsList.appendChild(div);
  });

  document.querySelectorAll(".delete-btn").forEach(btn => {
    btn.onclick = () => deleteComment(btn.dataset.index);
  });
}

// ===============================
// SUBMIT COMMENT
// ===============================
addCommentBtn.onclick = () => {
  const name = guestNameInput.value.trim();
  const message = guestMessageInput.value.trim();

  if (!name || !message) {
    alert("Name & message required");
    return;
  }

  const comments = JSON.parse(localStorage.getItem("comments")) || [];
  comments.push({
    name,
    message,
    time: new Date().toLocaleString(),
    admin: guestEmailInput.value === "rupeshdesaiwork@gmail.com"
  });

  localStorage.setItem("comments", JSON.stringify(comments));
  guestMessageInput.value = "";
  loadComments();
};

// ===============================
// DELETE COMMENT
// ===============================
function deleteComment(index) {
  const comments = JSON.parse(localStorage.getItem("comments")) || [];
  comments.splice(index, 1);
  localStorage.setItem("comments", JSON.stringify(comments));
  loadComments();
}

// ===============================
// SEND MESSAGE – EMAILJS
// ===============================
sendMailBtn.addEventListener("click", e => {
  e.preventDefault();

  const name = guestNameInput.value.trim();
  const email = guestEmailInput.value.trim();
  const message = guestMessageInput.value.trim();

  if (!name || !email || !message) {
    alert("Please fill all fields");
    return;
  }

  emailjs
    .send(
      "service_zt1xy2q",
      "template_bn8gldk",
      { name, email, message }
    )
    .then(
      () => {
        alert("✅ Message sent successfully!");
        guestMessageInput.value = "";
      },
      error => {
        console.error("❌ EmailJS Error:", error);
        alert("❌ Email failed. Check console.");
      }
    );
});

loadComments();
