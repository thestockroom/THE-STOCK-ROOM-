// THE STOCK ROOM — Site-wide JavaScript

document.addEventListener("DOMContentLoaded", () => {

  // =========================
  // MOBILE MENU
  // =========================
  const menu = document.getElementById("menu");
  const nav = document.querySelector("nav");

  if (menu && nav) {
    menu.addEventListener("click", () => {
      nav.classList.toggle("open");
    });

    document.querySelectorAll("nav a").forEach(link => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
      });
    });
  }


  // =========================
  // FOOTER YEAR
  // =========================
  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }


  // =========================
  // SCROLL REVEAL ANIMATION
  // =========================
  const elements = document.querySelectorAll(
    ".cards article, .content, .profile, details, .topic-grid div"
  );

  if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            entry.target.classList.add("show");

            observer.unobserve(entry.target);

          }

        });

      },
      {
        threshold: 0.08
      }
    );

    elements.forEach(element => {

      element.classList.add("reveal");

      observer.observe(element);

    });

  } else {

    elements.forEach(element => {
      element.classList.add("show");
    });

  }


  // =========================
  // 3D CARD EFFECT
  // =========================
  document.querySelectorAll(".cards article").forEach(card => {

    card.addEventListener("pointermove", event => {

      const rect = card.getBoundingClientRect();

      const x =
        (event.clientX - rect.left) / rect.width - 0.5;

      const y =
        (event.clientY - rect.top) / rect.height - 0.5;

      card.style.transform =
        `perspective(700px)
         rotateX(${-y * 4}deg)
         rotateY(${x * 4}deg)
         translateY(-3px)`;

    });


    card.addEventListener("pointerleave", () => {

      card.style.transform = "";

    });

  });


  // =========================
  // FAQ
  // =========================
  document.querySelectorAll("details").forEach(item => {

    item.addEventListener("toggle", () => {

      if (item.open) {

        document.querySelectorAll("details").forEach(other => {

          if (other !== item) {
            other.removeAttribute("open");
          }

        });

      }

    });

  });

});
