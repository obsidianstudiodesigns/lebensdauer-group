/* Lebensdauer Group — site behaviour */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ------------------------------------------------------------------
     Sticky masthead
     ------------------------------------------------------------------ */
  var masthead = document.querySelector("[data-masthead]");

  if (masthead) {
    var setStuck = function () {
      masthead.classList.toggle("is-stuck", window.scrollY > 24);
    };
    setStuck();
    window.addEventListener("scroll", setStuck, { passive: true });
  }

  /* ------------------------------------------------------------------
     Mobile drawer
     ------------------------------------------------------------------ */
  var burger = document.querySelector("[data-burger]");
  var drawer = document.querySelector("[data-drawer]");

  if (burger && drawer) {
    var focusables =
      'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';
    var lastFocused = null;

    var openDrawer = function () {
      lastFocused = document.activeElement;
      drawer.classList.add("is-open");
      drawer.removeAttribute("inert");
      burger.setAttribute("aria-expanded", "true");
      burger.setAttribute("aria-label", "Close menu");
      document.body.classList.add("is-locked");

      var first = drawer.querySelector(focusables);
      if (first) {
        window.setTimeout(function () {
          first.focus();
        }, 120);
      }
    };

    var closeDrawer = function (returnFocus) {
      drawer.classList.remove("is-open");
      burger.setAttribute("aria-expanded", "false");
      burger.setAttribute("aria-label", "Open menu");
      document.body.classList.remove("is-locked");
      window.setTimeout(function () {
        if (!drawer.classList.contains("is-open")) {
          drawer.setAttribute("inert", "");
        }
      }, 450);
      if (returnFocus !== false) {
        (lastFocused || burger).focus();
      }
    };

    var isOpen = function () {
      return drawer.classList.contains("is-open");
    };

    drawer.setAttribute("inert", "");

    burger.addEventListener("click", function () {
      isOpen() ? closeDrawer() : openDrawer();
    });

    /* Close on navigation — links point at other pages or in-page anchors */
    drawer.addEventListener("click", function (event) {
      if (event.target.closest("a")) {
        closeDrawer(false);
      }
    });

    document.addEventListener("keydown", function (event) {
      if (!isOpen()) return;

      if (event.key === "Escape") {
        event.preventDefault();
        closeDrawer();
        return;
      }

      if (event.key !== "Tab") return;

      /* Keep focus inside the panel while it is open */
      var items = Array.prototype.filter.call(
        drawer.querySelectorAll(focusables),
        function (el) {
          return el.offsetParent !== null;
        }
      );
      items.push(burger);

      if (!items.length) return;

      var first = items[0];
      var last = items[items.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });

    /* Reset if the viewport grows back to the desktop layout */
    var wide = window.matchMedia("(min-width: 1025px)");
    var onWide = function (event) {
      if (event.matches && isOpen()) closeDrawer(false);
    };
    wide.addEventListener ? wide.addEventListener("change", onWide) : wide.addListener(onWide);
  }

  /* ------------------------------------------------------------------
     Hero video — portrait cut on phones, landscape cut everywhere else.
     Sources are injected so a phone never downloads the desktop file.
     ------------------------------------------------------------------ */
  var hero = document.querySelector("[data-hero-video]");

  if (hero) {
    var portrait = window.matchMedia("(max-width: 900px) and (orientation: portrait)");
    var current = null;

    var mount = function () {
      var mode = portrait.matches ? "mobile" : "desktop";
      if (mode === current) return;
      current = mode;

      var webm = hero.getAttribute("data-" + mode + "-webm");
      var mp4 = hero.getAttribute("data-" + mode + "-mp4");
      var poster = hero.getAttribute("data-" + mode + "-poster");

      hero.innerHTML = "";
      if (poster) hero.setAttribute("poster", poster);

      [
        { src: webm, type: "video/webm" },
        { src: mp4, type: "video/mp4" }
      ].forEach(function (item) {
        if (!item.src) return;
        var source = document.createElement("source");
        source.src = item.src;
        source.type = item.type;
        hero.appendChild(source);
      });

      hero.load();
      var attempt = hero.play();
      if (attempt && typeof attempt.catch === "function") {
        attempt.catch(function () {
          /* Autoplay blocked — the poster frame carries the hero. */
        });
      }
    };

    mount();
    portrait.addEventListener
      ? portrait.addEventListener("change", mount)
      : portrait.addListener(mount);

    /* Don't burn battery on a video nobody can see */
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              var attempt = hero.play();
              if (attempt && typeof attempt.catch === "function") attempt.catch(function () {});
            } else {
              hero.pause();
            }
          });
        },
        { threshold: 0.05 }
      ).observe(hero);
    }
  }

  /* ------------------------------------------------------------------
     Scroll reveal
     ------------------------------------------------------------------ */
  var targets = document.querySelectorAll("[data-reveal]");

  if (targets.length) {
    var show = function (el, withDelay) {
      if (el.classList.contains("is-in")) return;
      if (withDelay) {
        el.style.transitionDelay = (el.getAttribute("data-reveal-delay") || 0) + "ms";
      }
      el.classList.add("is-in");
    };

    if (reduceMotion || !("IntersectionObserver" in window)) {
      Array.prototype.forEach.call(targets, function (el) {
        show(el, false);
      });
    } else {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            show(entry.target, true);
            observer.unobserve(entry.target);
          });
        },
        { rootMargin: "0px 0px -40px 0px", threshold: 0 }
      );

      Array.prototype.forEach.call(targets, function (el) {
        observer.observe(el);
      });

      /* Safety net: fast scrolling can outrun the observer, and nothing on this
         site should ever be stuck at opacity 0. Anything the viewport has
         already passed gets shown outright. */
      var sweep = function () {
        Array.prototype.forEach.call(targets, function (el) {
          if (el.classList.contains("is-in")) return;
          if (el.getBoundingClientRect().top < window.innerHeight) {
            show(el, false);
            observer.unobserve(el);
          }
        });
      };

      window.addEventListener("load", sweep);
      window.setInterval(sweep, 1200);
    }
  }

  /* ------------------------------------------------------------------
     Enquiry form
     No backend on this host, so the form hands off to the visitor's mail
     client with everything pre-filled. Swap the action for a Formspree /
     Netlify endpoint to capture submissions server-side — see README.
     ------------------------------------------------------------------ */
  var form = document.querySelector("[data-enquiry]");

  if (form) {
    form.addEventListener("submit", function (event) {
      if (form.getAttribute("action")) return; /* real endpoint wired up */

      event.preventDefault();

      if (!form.reportValidity()) return;

      var data = new FormData(form);
      var get = function (key) {
        return (data.get(key) || "").toString().trim();
      };

      var body = [
        "Name: " + get("name"),
        "Company: " + (get("company") || "—"),
        "Phone: " + get("phone"),
        "Email: " + get("email"),
        "Region: " + get("region"),
        "Service: " + get("service"),
        "",
        "Project details:",
        get("message")
      ].join("\n");

      var subject = "Project enquiry — " + (get("service") || "General") + " — " + get("name");

      window.location.href =
        "mailto:info@lebensdauergroup.co.za?subject=" +
        encodeURIComponent(subject) +
        "&body=" +
        encodeURIComponent(body);

      var status = form.querySelector("[data-status]");
      if (status) status.classList.add("is-shown");
    });
  }

  /* ------------------------------------------------------------------
     Footer year
     ------------------------------------------------------------------ */
  Array.prototype.forEach.call(document.querySelectorAll("[data-year]"), function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
