// THE STOCK ROOM — Interactive Website

const nav = document.querySelector(".nav");
const menu = document.querySelector(".menu");

if (menu && nav) {
  menu.addEventListener("click", () => {
    nav.classList.toggle("mobile");
  });
}

document.querySelectorAll(".nav a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("mobile");
  });
});

// Course modal
const modal = document.getElementById("modal");
const closeBtn = document.querySelector(".close");

document.querySelectorAll(".course-btn").forEach(button => {
  button.addEventListener("click", () => {
    if (modal) {
      modal.classList.add("open");
      modal.setAttribute("aria-hidden", "false");
    }
  });
});

if (closeBtn) {
  closeBtn.addEventListener("click", () => {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
  });
}

if (modal) {
  modal.addEventListener("click", event => {
    if (event.target === modal) {
      modal.classList.remove("open");
      modal.setAttribute("aria-hidden", "true");
    }
  });
}

// FAQ accordion
document.querySelectorAll(".faq-q").forEach(question => {
  question.addEventListener("click", () => {
    const answer = question.nextElementSibling;
    const icon = question.querySelector("span");

    answer.classList.toggle("open");

    if (icon) {
      icon.textContent = answer.classList.contains("open") ? "−" : "+";
    }
  });
});

// Footer year
const year = document.getElementById("year");

if (year) {
  year.textContent = new Date().getFullYear();
}

// Smooth reveal animation
const revealElements = document.querySelectorAll(
  ".section, .course, .steps div, .leader-card, .affiliate-card, .portrait"
);

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealElements.forEach(element => {
  element.classList.add("reveal");
  observer.observe(element);
});
