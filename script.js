/* =========================================================
   SOLARIS — script.js
   Three small features:
   1. Click a planet in the hero orbit → scroll to its card
   2. Scroll-reveal animation for cards and facts
   3. "Your weight on other planets" calculator
   ========================================================= */

/* ---------- 1. Orbit click navigation ---------- */
document.querySelectorAll(".orbit .planet").forEach(function (planet) {
  planet.addEventListener("click", function () {
    var target = document.getElementById(planet.dataset.target);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "center" });

      // brief golden highlight so the user sees which card they landed on
      target.style.borderColor = "#FFC94D";
      setTimeout(function () {
        target.style.borderColor = "";
      }, 1500);
    }
  });
});

/* ---------- 2. Scroll reveal ---------- */
/* IntersectionObserver watches each .reveal element and adds the
   .visible class the first time it enters the screen. */
var observer = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target); // animate only once
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".reveal").forEach(function (el) {
  observer.observe(el);
});

/* ---------- 3. Weight calculator ---------- */
/* Surface gravity of each planet relative to Earth (Earth = 1) */
var GRAVITY = [
  { name: "Mercury", factor: 0.38 },
  { name: "Venus",   factor: 0.91 },
  { name: "Earth",   factor: 1.0  },
  { name: "Mars",    factor: 0.38 },
  { name: "Jupiter", factor: 2.34 },
  { name: "Saturn",  factor: 1.06 },
  { name: "Uranus",  factor: 0.92 },
  { name: "Neptune", factor: 1.19 }
];

var input   = document.getElementById("weightInput");
var button  = document.getElementById("calcBtn");
var results = document.getElementById("calcResults");

function calculateWeights() {
  var weight = parseFloat(input.value);

  // simple validation
  if (isNaN(weight) || weight <= 0) {
    results.innerHTML =
      '<div class="result"><small>Please enter a valid weight first 🙂</small></div>';
    return;
  }

  // build one result box per planet
  results.innerHTML = GRAVITY.map(function (p) {
    var value = (weight * p.factor).toFixed(1);
    return (
      '<div class="result">' +
      "<strong>" + value + " kg</strong>" +
      "<small>on " + p.name + "</small>" +
      "</div>"
    );
  }).join("");
}

button.addEventListener("click", calculateWeights);

/* also allow pressing Enter inside the input field */
input.addEventListener("keydown", function (event) {
  if (event.key === "Enter") calculateWeights();
});
