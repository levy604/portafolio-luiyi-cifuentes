(function () {
  var root = document.documentElement;
  var $ = function (s, c) {
    return (c || document).querySelector(s);
  };
  var $$ = function (s, c) {
    return Array.prototype.slice.call((c || document).querySelectorAll(s));
  };

  /* Tema claro / oscuro */
  var themeIc = $("#theme-ic");
  function current() {
    return (
      root.getAttribute("data-theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light")
    );
  }
  function paintTheme() {
    themeIc.setAttribute("href", current() === "dark" ? "#i-sun" : "#i-moon");
  }
  try {
    var saved = localStorage.getItem("theme");
    if (saved) root.setAttribute("data-theme", saved);
  } catch (e) {}
  paintTheme();
  $("#theme").addEventListener("click", function () {
    var next = current() === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch (e) {}
    paintTheme();
  });

  /* Menú móvil */
  var links = $("#links"),
    menuBtn = $("#menu"),
    menuIc = $("#menu-ic");
  function closeMenu() {
    links.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
    menuIc.setAttribute("href", "#i-menu");
  }
  menuBtn.addEventListener("click", function () {
    var open = links.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    menuIc.setAttribute("href", open ? "#i-close" : "#i-menu");
  });
  $$("a", links).forEach(function (a) {
    a.addEventListener("click", closeMenu);
  });

  /* Scroll: progreso, encabezado y botón de subir */
  var bar = $("#progress"),
    header = $("header"),
    toTop = $("#toTop");
  function onScroll() {
    var h = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.transform = "scaleX(" + (h > 0 ? window.scrollY / h : 0) + ")";
    header.classList.toggle("scrolled", window.scrollY > 10);
    toTop.classList.toggle("show", window.scrollY > 700);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* Entrada escalonada */
  $$("[data-stagger]").forEach(function (p) {
    Array.prototype.forEach.call(p.children, function (c, i) {
      c.classList.add("reveal");
      c.style.setProperty("--d", i * 90 + "ms");
    });
  });
  var reveals = $$(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    reveals.forEach(function (el) {
      io.observe(el);
    });
  } else {
    reveals.forEach(function (el) {
      el.classList.add("in");
    });
  }

  /* Contadores */
  function count(el) {
    var target = +el.getAttribute("data-count"),
      suffix = el.getAttribute("data-suffix") || "",
      start = null;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / 1100, 1),
        eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if ("IntersectionObserver" in window) {
    var co = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            count(e.target);
            co.unobserve(e.target);
          }
        });
      },
      { threshold: 0.6 },
    );
    $$("[data-count]").forEach(function (el) {
      co.observe(el);
    });
  } else {
    $$("[data-count]").forEach(function (el) {
      el.textContent =
        el.getAttribute("data-count") + (el.getAttribute("data-suffix") || "");
    });
  }

  /* Enlace activo en la navegación */
  var navLinks = $$("a", links);
  if ("IntersectionObserver" in window) {
    var so = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            navLinks.forEach(function (a) {
              a.classList.toggle(
                "active",
                a.getAttribute("href") === "#" + e.target.id,
              );
            });
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    $$("main section[id]").forEach(function (s) {
      so.observe(s);
    });
  }

  $("#year").textContent = new Date().getFullYear();
})();
