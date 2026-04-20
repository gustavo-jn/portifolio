const themeToggle = document.getElementById("themeToggle");
const themeIcon = themeToggle ? themeToggle.querySelector("i") : null;
const menuToggle = document.getElementById("menuToggle");
const primaryMenu = document.getElementById("primaryMenu");
const yearEl = document.getElementById("year");
const THEME_KEY = "luis-gustavo-theme";

function applyTheme(theme) {
  document.body.setAttribute("data-theme", theme);

  if (!themeIcon) {
    return;
  }

  themeIcon.className = theme === "dark" ? "fa-regular fa-sun" : "fa-regular fa-moon";
}

function getInitialTheme() {
  const savedTheme = localStorage.getItem(THEME_KEY);

  if (savedTheme === "light" || savedTheme === "dark") {
    return savedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

if (themeToggle) {
  applyTheme(getInitialTheme());

  themeToggle.addEventListener("click", () => {
    const isDark = document.body.getAttribute("data-theme") === "dark";
    const nextTheme = isDark ? "light" : "dark";

    applyTheme(nextTheme);
    localStorage.setItem(THEME_KEY, nextTheme);
  });
}

function closeMenu() {
  if (!menuToggle || !primaryMenu) {
    return;
  }

  primaryMenu.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");

  const menuIcon = menuToggle.querySelector("i");

  if (menuIcon) {
    menuIcon.className = "fa-solid fa-bars";
  }
}

if (menuToggle && primaryMenu) {
  menuToggle.addEventListener("click", () => {
    const isOpen = primaryMenu.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));

    const menuIcon = menuToggle.querySelector("i");

    if (menuIcon) {
      menuIcon.className = isOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars";
    }
  });

  primaryMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("click", (event) => {
    if (!primaryMenu.contains(event.target) && !menuToggle.contains(event.target)) {
      closeMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 720) {
      closeMenu();
    }
  });
}

if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      });
    },
    {
      threshold: 0.14,
      rootMargin: "0px 0px -8% 0px"
    }
  );

  revealElements.forEach((element) => {
    observer.observe(element);
  });
} else {
  revealElements.forEach((element) => {
    element.classList.add("is-visible");
  });
}
