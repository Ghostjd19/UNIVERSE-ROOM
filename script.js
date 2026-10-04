// ---- Edit these before launch ----
const CONFIG = {
  whatsapp: "21600000000",              // international format, no "+" (placeholder)
  address: "Azur City, Tunisie",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Azur+City+Tunisie",
  hours: "Tous les jours · 14h – 02h",
  events: ["À confirmer", "À confirmer", "À confirmer"]
};

const waBase = "https://wa.me/" + CONFIG.whatsapp;
document.querySelectorAll("[data-wa]").forEach(a => {
  a.href = waBase + "?text=" + encodeURIComponent("Bonjour Universe Room, je voudrais des infos.");
  a.target = "_blank"; a.rel = "noopener";
});
document.querySelectorAll("[data-map]").forEach(a => a.href = CONFIG.mapsUrl);
const addr = document.querySelector("[data-addr]"); if (addr) addr.textContent = CONFIG.address;
const hrs = document.querySelector("[data-hours]"); if (hrs) hrs.textContent = CONFIG.hours;
document.querySelectorAll("[data-event]").forEach(el => { el.textContent = CONFIG.events[el.dataset.event - 1] || el.textContent; });
document.getElementById("yr").textContent = new Date().getFullYear();

// Preselect the offer when a card CTA is tapped
const what = document.getElementById("what");
document.querySelectorAll("[data-pick]").forEach(a => a.addEventListener("click", () => { what.value = a.dataset.pick; }));

// Booking form -> WhatsApp message
const form = document.getElementById("bookForm");
form.addEventListener("submit", e => {
  e.preventDefault();
  const f = new FormData(form), name = (f.get("name") || "").trim();
  form.elements.name.classList.toggle("err", !name);
  if (!name) { form.elements.name.focus(); return; }
  const lines = [
    "Bonjour Universe Room 👋",
    "Prénom : " + name,
    "Je veux : " + f.get("what"),
    f.get("date") ? "Date : " + f.get("date") : "Date : à discuter",
    "Joueurs : " + (f.get("players") || 1)
  ];
  window.open(waBase + "?text=" + encodeURIComponent(lines.join("\n")), "_blank", "noopener");
});

// Hide the sticky dock while the booking form is on screen
const dock = document.getElementById("dock"), book = document.getElementById("book");
if ("IntersectionObserver" in window) {
  new IntersectionObserver(([en]) => dock.classList.toggle("hide", en.isIntersecting), { threshold: .25 }).observe(book);
}
