// Thumbstop Studio: small enhancements. The site still works if this file fails to load.
document.documentElement.classList.add("js");

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Sticky nav border after scrolling
const nav = document.querySelector(".nav");
const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 10);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// Mobile menu
const toggle = document.querySelector(".nav__toggle");
const links = document.getElementById("nav-links");
const setMenu = (open) => {
  links.classList.toggle("is-open", open);
  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
};
toggle.addEventListener("click", () => setMenu(!links.classList.contains("is-open")));
links.addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });

// Fade sections in as they scroll into view
const revealed = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-in");
        io.unobserve(entry.target);
      }
    });
  }, { rootMargin: "0px 0px -8% 0px" });
  revealed.forEach((el) => io.observe(el));
} else {
  revealed.forEach((el) => el.classList.add("is-in"));
}

// Work reels: poster images and the video popup
const player = document.getElementById("player");
const body = player.querySelector(".modal__body");

document.querySelectorAll(".reel").forEach((reel) => {
  const { drive } = reel.dataset;
  // Public Google Drive files get their thumbnail automatically
  const poster = reel.dataset.poster || (drive ? `https://drive.google.com/thumbnail?id=${encodeURIComponent(drive)}&sz=w720` : "");
  if (poster) {
    reel.style.backgroundImage = `linear-gradient(180deg, transparent 45%, rgba(0,0,0,0.75)), url("${poster}")`;
  }

  reel.addEventListener("click", () => {
    const { video, youtube } = reel.dataset;
    body.replaceChildren();

    if (drive) {
      const frame = document.createElement("iframe");
      frame.src = `https://drive.google.com/file/d/${encodeURIComponent(drive)}/preview`;
      frame.title = reel.querySelector(".reel__title").textContent;
      frame.allow = "autoplay; fullscreen";
      frame.allowFullscreen = true;
      body.append(frame);
    } else if (youtube) {
      const frame = document.createElement("iframe");
      frame.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(youtube)}?autoplay=1&playsinline=1`;
      frame.title = reel.querySelector(".reel__title").textContent;
      frame.allow = "autoplay; encrypted-media; picture-in-picture";
      frame.allowFullscreen = true;
      body.append(frame);
    } else if (video) {
      const el = document.createElement("video");
      el.src = video;
      el.controls = true;
      el.autoplay = true;
      el.playsInline = true;
      if (poster) el.poster = poster;
      body.append(el);
    } else {
      const p = document.createElement("p");
      p.className = "modal__empty";
      p.textContent = "Video coming soon.";
      body.append(p);
    }
    player.showModal();
  });
});

const closePlayer = () => player.close();
player.querySelector(".modal__close").addEventListener("click", closePlayer);
player.addEventListener("click", (e) => { if (e.target === player) closePlayer(); });
player.addEventListener("close", () => body.replaceChildren()); // stops playback
