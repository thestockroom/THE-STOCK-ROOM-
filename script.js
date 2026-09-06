// THE STOCK ROOM — Demo Terminal Script

document.addEventListener("DOMContentLoaded", () => {

  // =========================
  // MOBILE MENU
  // =========================
  const menu = document.querySelector(".menu");
  const nav = document.querySelector(".nav");

  if (menu && nav) {
    menu.addEventListener("click", () => {
      nav.classList.toggle("mobile");
    });
  }

  document.querySelectorAll(".nav a").forEach(link => {
    link.addEventListener("click", () => {
      nav?.classList.remove("mobile");
    });
  });


  // =========================
  // FAQ
  // =========================
  document.querySelectorAll(".faq-q").forEach(question => {
    question.addEventListener("click", () => {
      const answer = question.nextElementSibling;
      const icon = question.querySelector("span");

      if (!answer) return;

      answer.classList.toggle("open");

      if (icon) {
        icon.textContent =
          answer.classList.contains("open") ? "−" : "+";
      }
    });
  });


  // =========================
  // COURSE MODAL
  // =========================
  const modal = document.getElementById("modal");
  const closeBtn = document.querySelector(".close");

  document.querySelectorAll(".course-btn").forEach(button => {
    button.addEventListener("click", () => {
      if (!modal) return;

      modal.classList.add("open");
      modal.setAttribute("aria-hidden", "false");
    });
  });

  closeBtn?.addEventListener("click", () => {
    modal?.classList.remove("open");
    modal?.setAttribute("aria-hidden", "true");
  });

  modal?.addEventListener("click", event => {
    if (event.target === modal) {
      modal.classList.remove("open");
      modal.setAttribute("aria-hidden", "true");
    }
  });


  // =========================
  // DEMO TRADING ONLY
  // =========================
  document.querySelectorAll("[data-demo-order]").forEach(button => {
    button.addEventListener("click", event => {
      event.preventDefault();

      alert(
        "DEMO ONLY\n\n" +
        "This is a virtual order for educational purposes.\n" +
        "No real broker or exchange order is placed."
      );
    });
  });


  // =========================
  // DEMO ACCOUNT
  // =========================
  const initialBalance = 5000;

  if (!localStorage.getItem("stockroom_demo_balance")) {
    localStorage.setItem(
      "stockroom_demo_balance",
      initialBalance.toString()
    );
  }

  const balance = Number(
    localStorage.getItem("stockroom_demo_balance")
  );

  document.querySelectorAll("[data-demo-balance]").forEach(el => {
    el.textContent = "$" + balance.toLocaleString();
  });


  // =========================
  // LIVE BTC PRICE DISPLAY
  // Public Binance WebSocket
  // =========================
  const btcPriceElements =
    document.querySelectorAll("[data-btc-price]");

  const btcStatus =
    document.querySelectorAll("[data-btc-status]");

  function setBTCStatus(text) {
    btcStatus.forEach(el => {
      el.textContent = text;
    });
  }

  function connectBTC() {

    setBTCStatus("LIVE • Connecting...");

    const socket = new WebSocket(
      "wss://stream.binance.com:9443/ws/btcusdt@trade"
    );

    socket.onopen = () => {
      setBTCStatus("● LIVE");
    };

    socket.onmessage = event => {

      try {

        const data = JSON.parse(event.data);
        const price = Number(data.p);

        if (!Number.isFinite(price)) return;

        btcPriceElements.forEach(el => {
          el.textContent =
            "$" +
            price.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            });
        });

      } catch (error) {
        console.log("BTC feed error:", error);
      }
    };

    socket.onerror = () => {
      setBTCStatus("LIVE • Unavailable");
    };

    socket.onclose = () => {
      setBTCStatus("LIVE • Reconnecting...");

      setTimeout(() => {
        connectBTC();
      }, 3000);
    };
  }

  if (btcPriceElements.length > 0) {
    connectBTC();
  }


  // =========================
  // GOLD / SILVER
  // =========================
  // Gold and Silver require a market-data provider/API.
  // Do NOT put a private API key directly in GitHub frontend code.
  //
  // These elements can show the provider status:
  //
  document
    .querySelectorAll("[data-gold-status]")
    .forEach(el => {
      el.textContent = "API FEED REQUIRED";
    });

  document
    .querySelectorAll("[data-silver-status]")
    .forEach(el => {
      el.textContent = "API FEED REQUIRED";
    });


  // =========================
  // FOOTER YEAR
  // =========================
  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }


  // =========================
  // REVEAL ANIMATION
  // =========================
  const revealElements = document.querySelectorAll(
    ".section, .course, .leader-card, .affiliate-card, .portrait"
  );

  if ("IntersectionObserver" in window) {

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

  }

});
