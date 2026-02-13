console.log("🔥 main.js loaded");

/* ===============================
   NAVBAR TAB SWITCH
=============================== */
document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const target = link.getAttribute("href").substring(1);
    document.querySelectorAll(".page-section").forEach(sec =>
      sec.classList.remove("active")
    );
    document.getElementById(target)?.classList.add("active");

    // close sidebar on mobile
    if (window.innerWidth < 900) {
      document.querySelector(".left-panel")?.classList.remove("open");
    }
  });
});


/* ===============================
   PROFILE IMAGE TOGGLE
=============================== */
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


/* ===============================
   SCROLL REVEAL
=============================== */
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


/* ===============================
   EMAILJS INIT
=============================== */
(function () {
  emailjs.init("KdLduq0by6Ktl2S_f");
})();


/* ===============================
   GUESTBOOK
=============================== */

const guestForm = document.getElementById("guestForm");
const guestNameInput = document.getElementById("guestName");
const guestEmailInput = document.getElementById("guestEmail");
const guestMessageInput = document.getElementById("guestMessage");
const commentsList = document.getElementById("commentsList");
const sendMailBtn = document.getElementById("sendMail");
const addCommentBtn = document.getElementById("addComment");

if (guestForm) {
  guestForm.addEventListener("submit", e => e.preventDefault());
}

function loadComments() {
  if (!commentsList) return;

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

if (addCommentBtn) {
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
}

function deleteComment(index) {
  const comments = JSON.parse(localStorage.getItem("comments")) || [];
  comments.splice(index, 1);
  localStorage.setItem("comments", JSON.stringify(comments));
  loadComments();
}

if (sendMailBtn) {
  sendMailBtn.addEventListener("click", e => {
    e.preventDefault();

    const name = guestNameInput.value.trim();
    const email = guestEmailInput.value.trim();
    const message = guestMessageInput.value.trim();

    if (!name || !email || !message) {
      alert("Please fill all fields");
      return;
    }

    emailjs.send("service_zt1xy2q", "template_bn8gldk", { name, email, message })
      .then(() => {
        alert("✅ Message sent successfully!");
        guestMessageInput.value = "";
      })
      .catch(err => {
        console.error(err);
        alert("❌ Email failed.");
      });
  });
}

loadComments();

/* ===============================
   FINAL SIDEBAR + DARK MODE (FIXED)
=============================== */

// elements
const menuToggle = document.getElementById("menuToggle");
const leftPanel = document.querySelector(".left-panel");
const themeToggle = document.getElementById("themeToggle");


/* ---------- SIDEBAR TOGGLE ---------- */
if(menuToggle && leftPanel){

  menuToggle.addEventListener("click", () => {

    // mobile drawer
    if(window.innerWidth < 900){
      leftPanel.classList.toggle("open");
    }

    // desktop collapse
  else{

  // if sidebar already closed → open it
  if(leftPanel.classList.contains("closed")){
    leftPanel.classList.remove("closed");
    document.body.classList.remove("sidebar-closed");
  }

  // else close it
  else{
    leftPanel.classList.add("closed");
    document.body.classList.add("sidebar-closed");
  }

}

  });
}


/* ---------- CLOSE AFTER NAV CLICK (MOBILE ONLY) ---------- */
document.querySelectorAll("nav a").forEach(link=>{
  link.addEventListener("click", ()=>{
    if(window.innerWidth < 900 && leftPanel){
      leftPanel.classList.remove("open");
    }
  });
});


/* ---------- DARK MODE ---------- */
if(themeToggle){
  themeToggle.addEventListener("click", ()=>{
    document.body.classList.toggle("dark");
  });
}

/* ===== DESKTOP REOPEN SIDEBAR ===== */

/* ===== FORCE REOPEN FIX ===== */

const reopenSidebarBtn = document.getElementById("reopenSidebar");

if(reopenSidebarBtn){
  reopenSidebarBtn.addEventListener("click",()=>{
    document.body.classList.remove("sidebar-closed");
    leftPanel.classList.remove("closed");
  });
}


/* ===== WINDOW RESIZE FIX ===== */

window.addEventListener("resize", () => {

  // mobile वर गेल्यावर desktop classes remove
  if(window.innerWidth < 900){
    leftPanel.classList.remove("closed");
    document.body.classList.remove("sidebar-closed");
  }

});

/* force browser reflow (important) */
function reflow(){
  document.body.offsetHeight;
}


/* ===== LIVE VISITOR COUNTER ===== */

async function loadVisitorCount() {
  try {

    const res = await fetch(
      "https://rupeshportfolio.goatcounter.com/counter/TOTAL.json"
    );

    const data = await res.json();

    const count = data.count;

    const counterElement = document.getElementById("viewCount");

    if (counterElement) {
      counterElement.textContent = count;
    }

  } catch (err) {
    console.log("Counter not ready yet");
  }
}

loadVisitorCount();
