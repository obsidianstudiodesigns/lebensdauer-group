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
     Project categories — tiles behave as tabs over the galleries below.
     With JS off every panel stays visible, so nothing is lost.
     ------------------------------------------------------------------ */
  var cats = Array.prototype.slice.call(document.querySelectorAll("[data-cat]"));
  var panels = Array.prototype.slice.call(document.querySelectorAll("[data-panel]"));

  if (cats.length && panels.length) {
    var names = panels.map(function (p) { return p.getAttribute("data-panel"); });

    var selectCat = function (name, moveFocus, writeHash) {
      cats.forEach(function (c) {
        var on = c.getAttribute("data-cat") === name;
        c.setAttribute("aria-selected", on ? "true" : "false");
        c.setAttribute("tabindex", on ? "0" : "-1");
        if (on && moveFocus) c.focus();
      });
      panels.forEach(function (p) {
        if (p.getAttribute("data-panel") === name) p.removeAttribute("hidden");
        else p.setAttribute("hidden", "");
      });
      /* Only once the visitor has chosen — no need to dirty the URL on load */
      if (writeHash !== false && window.history && window.history.replaceState) {
        window.history.replaceState(null, "", "#" + name);
      }
    };

    cats.forEach(function (c) {
      c.addEventListener("click", function () {
        selectCat(c.getAttribute("data-cat"));
      });

      c.addEventListener("keydown", function (event) {
        var i = cats.indexOf(c);
        if (event.key === "ArrowRight" || event.key === "ArrowDown") {
          event.preventDefault();
          selectCat(cats[(i + 1) % cats.length].getAttribute("data-cat"), true);
        } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
          event.preventDefault();
          selectCat(cats[(i - 1 + cats.length) % cats.length].getAttribute("data-cat"), true);
        } else if (event.key === "Home") {
          event.preventDefault();
          selectCat(names[0], true);
        } else if (event.key === "End") {
          event.preventDefault();
          selectCat(names[names.length - 1], true);
        }
      });
    });

    /* A link to #commercial from elsewhere on the site changes only the fragment,
       so the page never reloads — listen for it. */
    window.addEventListener("hashchange", function () {
      var h = (window.location.hash || "").replace("#", "");
      if (names.indexOf(h) > -1) selectCat(h, false, false);
    });

    var wanted = (window.location.hash || "").replace("#", "");
    selectCat(names.indexOf(wanted) > -1 ? wanted : names[0], false, false);
  }

  /* ------------------------------------------------------------------
     Project lightbox
     ------------------------------------------------------------------ */
  var lightbox = document.querySelector("[data-lightbox]");
  var allTiles = Array.prototype.slice.call(document.querySelectorAll("[data-lb]"));

  /* Only the tiles in the category currently on screen. Without JS every panel is
     visible, so this degrades to "all of them". */
  var tiles = allTiles;
  var visibleTiles = function () {
    var shown = allTiles.filter(function (t) { return t.offsetParent !== null; });
    return shown.length ? shown : allTiles;
  };

  if (lightbox && allTiles.length) {
    var lbImg = lightbox.querySelector("[data-lb-img]");
    var lbSector = lightbox.querySelector("[data-lb-sector]");
    var lbTitle = lightbox.querySelector("[data-lb-title]");
    var lbCount = lightbox.querySelector("[data-lb-count]");
    var lbPrev = lightbox.querySelector("[data-lb-prev]");
    var lbNext = lightbox.querySelector("[data-lb-next]");
    var lbClose = lightbox.querySelector("[data-lb-close]");

    var index = -1;
    var opener = null;

    var preload = function (i) {
      var tile = tiles[(i + tiles.length) % tiles.length];
      if (!tile) return;
      var img = new Image();
      img.src = tile.getAttribute("data-full");
    };

    var render = function (i) {
      index = (i + tiles.length) % tiles.length;
      var tile = tiles[index];

      lbImg.classList.remove("is-ready");
      lbImg.alt = tile.getAttribute("data-alt") || "";
      lbSector.textContent = tile.getAttribute("data-sector") || "";
      lbTitle.textContent = tile.getAttribute("data-title") || "";
      lbCount.textContent = index + 1 + " / " + tiles.length;

      var src = tile.getAttribute("data-full");
      var loader = new Image();
      loader.onload = function () {
        lbImg.src = src;
        lbImg.classList.add("is-ready");
      };
      loader.onerror = function () {
        /* fall back to the thumbnail rather than showing an empty frame */
        var thumb = tile.querySelector("img");
        if (thumb) lbImg.src = thumb.currentSrc || thumb.src;
        lbImg.classList.add("is-ready");
      };
      loader.src = src;

      preload(index + 1);
      preload(index - 1);
    };

    var openLightbox = function (i, trigger) {
      opener = trigger || null;
      render(i);
      lightbox.classList.add("is-open");
      lightbox.removeAttribute("inert");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.classList.add("is-locked");
      window.setTimeout(function () {
        lbClose.focus();
      }, 80);
    };

    var closeLightbox = function () {
      lightbox.classList.remove("is-open");
      lightbox.setAttribute("aria-hidden", "true");
      document.body.classList.remove("is-locked");
      window.setTimeout(function () {
        if (!lightbox.classList.contains("is-open")) {
          lightbox.setAttribute("inert", "");
          lbImg.removeAttribute("src");
        }
      }, 320);
      if (opener) opener.focus();
    };

    var isOpen = function () {
      return lightbox.classList.contains("is-open");
    };

    lightbox.setAttribute("inert", "");
    lightbox.setAttribute("aria-hidden", "true");

    allTiles.forEach(function (tile) {
      tile.addEventListener("click", function () {
        tiles = visibleTiles();
        var i = tiles.indexOf(tile);
        openLightbox(i < 0 ? 0 : i, tile);
      });
    });

    lbClose.addEventListener("click", closeLightbox);
    lbPrev.addEventListener("click", function () { render(index - 1); });
    lbNext.addEventListener("click", function () { render(index + 1); });

    /* Backdrop click — but not clicks on the image or the controls */
    lightbox.addEventListener("click", function (event) {
      if (event.target === lightbox || event.target.hasAttribute("data-lb-stage")) {
        closeLightbox();
      }
    });

    document.addEventListener("keydown", function (event) {
      if (!isOpen()) return;

      if (event.key === "Escape") {
        event.preventDefault();
        closeLightbox();
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        render(index - 1);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        render(index + 1);
      } else if (event.key === "Tab") {
        /* Keep focus inside the overlay */
        var items = Array.prototype.filter.call(
          lightbox.querySelectorAll("button"),
          function (el) { return el.offsetParent !== null; }
        );
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
      }
    });

    /* Swipe between images on touch */
    var touchX = null;
    lightbox.addEventListener("touchstart", function (event) {
      touchX = event.changedTouches[0].clientX;
    }, { passive: true });

    lightbox.addEventListener("touchend", function (event) {
      if (touchX === null) return;
      var delta = event.changedTouches[0].clientX - touchX;
      touchX = null;
      if (Math.abs(delta) < 45) return;
      render(delta < 0 ? index + 1 : index - 1);
    }, { passive: true });
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
