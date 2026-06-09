// Dolphens Digital — mobile nav + FAQ accordions. Nothing else.

(function () {
  "use strict";

  // Mobile navigation
  var header = document.querySelector(".site-header");
  var toggle = document.querySelector(".nav-toggle");

  if (header && toggle) {
    toggle.addEventListener("click", function () {
      var open = header.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    // Close the menu after choosing a link (matters for same-page anchors)
    header.querySelectorAll(".site-nav a").forEach(function (link) {
      link.addEventListener("click", function () {
        header.classList.remove("nav-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // FAQ accordions
  document.querySelectorAll(".faq-question").forEach(function (button) {
    button.addEventListener("click", function () {
      var expanded = button.getAttribute("aria-expanded") === "true";
      var answer = document.getElementById(button.getAttribute("aria-controls"));
      button.setAttribute("aria-expanded", expanded ? "false" : "true");
      if (answer) {
        answer.hidden = expanded;
      }
    });
  });
})();
