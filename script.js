// THE STOCK ROOM - Website interactions

document.addEventListener("DOMContentLoaded", () => {
  // Smooth scrolling for internal links
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });

  // Course modal
  const modal = document.getElementById("courseModal");
  const closeButtons = document.querySelectorAll(
    ".close-modal, .modal-close, [data-close-modal]"
  );

  document.querySelectorAll("[data-course]").forEach(button => {
    button.addEventListener("click", () => {
      if (modal) modal.classList.add("active");
    });
  });

  closeButtons.forEach(button => {
    button.addEventListener("click", () => {
      if (modal) modal.classList.remove("active");
    });
  });

  if (modal) {
    modal.addEventListener("click", e => {
      if (e.target === modal) {
        modal.class
