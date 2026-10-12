/* ==========================================================================
   stryXplain — APP LOGIC
   --------------------------------------------------------------------------
   You normally do NOT need to edit this file.
   - Contact details, services, prices  -> js/config.js
   - Portfolio projects                 -> js/portfolio-config.js
   - All website text (EN + Hinglish)   -> js/translations.js
   ========================================================================== */
(function () {
  "use strict";

  var SITE = window.STRYX_SITE;
  var SERVICES = window.STRYX_SERVICES;
  var PRICING = window.STRYX_PRICING;
  var PORTFOLIO = window.STRYX_PORTFOLIO || [];
  var I18N = window.STRYX_I18N;

  /* ---------- Small helpers ---------- */
  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  function esc(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  /* ---------- Language ---------- */
  var lang = "en";
  try {
    var saved = sessionStorage.getItem("stryx-lang");
    if (saved && I18N[saved]) lang = saved;
  } catch (e) { /* storage unavailable: stay on English */ }

  function t(key) {
    if (I18N[lang] && I18N[lang][key] !== undefined) return I18N[lang][key];
    if (I18N.en[key] !== undefined) return I18N.en[key];
    return key;
  }

  /* ---------- WhatsApp link generator ----------
     Builds https://wa.me/<number>?text=<url-encoded message>.
     The number is reduced to digits only; the message is URL-encoded. */
  function waLink(message) {
    var number = String(SITE.whatsappNumber).replace(/\D/g, "");
    return "https://wa.me/" + number + "?text=" + encodeURIComponent(message);
  }

  /* ---------- Icons (inline SVG, no external library) ---------- */
  var ICONS = {
    whatsapp: '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/><path d="M9 9.5c.3 2.2 2.3 4.2 4.5 4.5l1.3-1.3c.2-.2.5-.3.8-.2l1.6.6c.3.1.5.4.4.7-.2 1-1 1.7-2.1 1.7-3.6 0-6.5-2.9-6.5-6.5 0-1.1.7-1.9 1.7-2.1.3-.1.6.1.7.4l.6 1.6c.1.3 0 .6-.2.8Z"/>',
    instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".6" fill="currentColor"/>',
    mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>',
    menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
    x: '<path d="M18 6 6 18M6 6l12 12"/>',
    "arrow-right": '<path d="M5 12h14M13 6l6 6-6 6"/>',
    "arrow-up": '<path d="M12 19V5M6 11l6-6 6 6"/>',
    "chevron-down": '<path d="m6 9 6 6 6-6"/>',
    play: '<path d="M7 4.5v15l13-7.5z" fill="currentColor"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    external: '<path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',
    "clock-info": '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    clapperboard: '<path d="M3 11h18v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z"/><path d="m3 11 1.4-5.2 15.5-3.2L21 7.2"/><path d="m8.4 7.6 2.6 3.4M14 6.4l2.6 3.4"/>',
    book: '<path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>',
    layers: '<path d="m12 2 10 5-10 5L2 7z"/><path d="m2 12 10 5 10-5"/><path d="m2 17 10 5 10-5"/>',
    captions: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M7 15h4M15 15h2M7 11h2M13 11h4"/>',
    image: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.1-3.1a2 2 0 0 0-2.8 0L6 21"/>',
    sparkles: '<path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z"/><path d="M19 3v4M17 5h4"/>',
  };

  function icon(name) {
    return (
      '<svg class="ic" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" ' +
      'stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' +
      (ICONS[name] || "") +
      "</svg>"
    );
  }

  var CATEGORY_ICON = { anime: "clapperboard", manga: "book", manhwa: "layers", english: "captions", thumbnails: "image" };
  var CATEGORY_SERVICE = {
    anime: "Anime Recap Editing",
    manga: "Manga Recap Editing",
    manhwa: "Manhwa Recap Editing",
    english: "English Videos with Subtitles",
    thumbnails: "YouTube Thumbnail Design",
  };
  var CATEGORY_LABEL_EN = I18N.en;

  /* Fill every <span data-icon="..."> / [data-icon] placeholder once at start-up */
  function injectStaticIcons() {
    $$("[data-icon]").forEach(function (node) {
      node.innerHTML = icon(node.getAttribute("data-icon"));
    });
  }

  /* ---------- Static text translation ---------- */
  function applyStaticText() {
    $$("[data-i18n]").forEach(function (node) { node.textContent = t(node.getAttribute("data-i18n")); });
    $$("[data-i18n-placeholder]").forEach(function (node) { node.setAttribute("placeholder", t(node.getAttribute("data-i18n-placeholder"))); });
    $$("[data-i18n-aria]").forEach(function (node) { node.setAttribute("aria-label", t(node.getAttribute("data-i18n-aria"))); });
    document.documentElement.lang = lang === "hi" ? "hi-Latn" : "en";
    $$(".lang-btn").forEach(function (btn) {
      btn.setAttribute("aria-pressed", String(btn.getAttribute("data-lang") === lang));
    });
    var menuBtn = $("#nav-toggle");
    var open = menuBtn.getAttribute("aria-expanded") === "true";
    menuBtn.setAttribute("aria-label", t(open ? "nav.closeMenu" : "nav.menu"));
  }

  /* Contact links + WhatsApp buttons that use the default message */
  function setupContactLinks() {
    $$('[data-wa="default"]').forEach(function (node) { node.setAttribute("href", waLink(SITE.defaultMessage)); });
    $("#contact-wa").setAttribute("href", waLink(SITE.defaultMessage));
    $("#contact-ig").setAttribute("href", SITE.instagramUrl);
    $("#contact-mail").setAttribute("href", "mailto:" + SITE.email);
    $("#cc-wa-value").textContent = SITE.whatsappDisplay;
    $("#cc-ig-value").textContent = SITE.instagramHandle;
    $("#cc-mail-value").textContent = SITE.email;
  }

  /* ---------- Reveal-on-scroll (subtle entrance animation) ---------- */
  var revealObserver = null;
  if ("IntersectionObserver" in window) {
    revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
  }
  function reveal(root, animate) {
    $$(".reveal", root).forEach(function (node) {
      if (node.classList.contains("in")) return;
      if (!animate || !revealObserver) node.classList.add("in");
      else revealObserver.observe(node);
    });
  }

  /* ---------- Services ---------- */
  function renderServices(animate) {
    var grid = $("#services-grid");
    grid.innerHTML = SERVICES.map(function (s) {
      return (
        '<article class="card service-card reveal">' +
        '<span class="icon-wrap">' + icon(s.icon) + "</span>" +
        "<h3>" + esc(t("svc." + s.id + ".title")) + "</h3>" +
        "<p>" + esc(t("svc." + s.id + ".desc")) + "</p>" +
        '<a class="btn btn-ghost" target="_blank" rel="noopener noreferrer" href="' + esc(waLink(SITE.serviceMessage(s.name))) + '">' +
        icon("whatsapp") + "<span>" + esc(t("services.cta")) + "</span></a>" +
        "</article>"
      );
    }).join("");
    reveal(grid, animate);
  }

  /* ---------- Portfolio ---------- */
  var FILTERS = ["all", "anime", "manga", "manhwa", "english", "thumbnails"];
  var activeFilter = "all";
  var mediaBackup = {}; // project id -> original card media HTML (used to stop a playing video)

  function safeUrl(value) {
    // Allow relative asset paths and http(s) links only.
    var v = String(value || "").trim();
    if (!v) return "";
    if (/^(javascript|data|vbscript):/i.test(v)) return "";
    return v;
  }
  function validYoutubeId(id) { return /^[A-Za-z0-9_-]{11}$/.test(String(id || "")); }

  function normalizeProject(p) {
    var ytId = validYoutubeId(p.youtubeId) ? p.youtubeId : "";
    if (p.youtubeId && !ytId && window.console) console.warn("stryXplain: invalid youtubeId for project", p.id);
    var ytUrl = safeUrl(p.youtubeUrl);
    if (!ytUrl && ytId) ytUrl = "https://www.youtube.com/watch?v=" + ytId;
    var thumb = safeUrl(p.thumbnail);
    if (!thumb && ytId) thumb = "https://i.ytimg.com/vi/" + ytId + "/hqdefault.jpg";
    return {
      id: String(p.id),
      title: String(p.title || ""),
      category: p.category,
      ytId: ytId,
      ytUrl: ytUrl,
      videoSrc: safeUrl(p.videoSrc),
      thumb: thumb,
      thumbAlt: p.thumbAlt || "",
      placeholder: !!p.placeholder,
    };
  }

  function renderFilters() {
    var box = $("#portfolio-filters");
    box.innerHTML = FILTERS.map(function (key) {
      return '<button type="button" class="filter-btn" data-filter="' + key + '" aria-pressed="' + (key === activeFilter) + '">' +
        esc(t("f." + key)) + "</button>";
    }).join("");
  }

  function mediaHtml(p) {
    var playable = p.ytId || p.videoSrc;
    var inner;
    if (p.thumb) {
      inner = '<img src="' + esc(p.thumb) + '" alt="' + esc(p.thumbAlt || p.title + " — " + t("f." + p.category)) +
        '" loading="lazy" decoding="async" width="1280" height="720" />';
    } else {
      inner =
        '<div class="ph-art ph-' + esc(p.category) + '">' + icon(CATEGORY_ICON[p.category] || "clapperboard") + "</div>";
    }
    var play = playable
      ? '<button type="button" class="play-btn" data-play="' + esc(p.id) + '" aria-label="' + esc(t("portfolio.play") + ": " + p.title) + '">' + icon("play") + "</button>"
      : "";
    return inner + play;
  }

  function renderPortfolio(animate) {
    var grid = $("#portfolio-grid");
    var projects = PORTFOLIO.map(normalizeProject).filter(function (p) { return CATEGORY_SERVICE[p.category]; });

    // Notice appears only while demo placeholders exist
    $("#portfolio-notice").hidden = !projects.some(function (p) { return p.placeholder; });

    var list = projects.filter(function (p) { return activeFilter === "all" || p.category === activeFilter; });
    mediaBackup = {};

    if (!list.length) {
      var msg = "Hello stryXplain! I would like to ask about " +
        (activeFilter === "all" ? "your editing work" : CATEGORY_LABEL_EN["f." + activeFilter] + " projects") +
        ". Please share more details about pricing and the project requirements.";
      grid.innerHTML =
        '<div class="empty reveal">' +
        '<span class="icon-wrap">' + icon("clapperboard") + "</span>" +
        "<h3>" + esc(t("portfolio.empty.title")) + "</h3>" +
        "<p>" + esc(t("portfolio.empty.text")) + "</p>" +
        '<a class="btn btn-primary" target="_blank" rel="noopener noreferrer" href="' + esc(waLink(msg)) + '">' +
        icon("whatsapp") + "<span>" + esc(t("portfolio.empty.cta")) + "</span></a></div>";
      reveal(grid, animate);
      return;
    }

    grid.innerHTML = list.map(function (p) {
      var msg = p.placeholder
        ? SITE.serviceMessage(CATEGORY_SERVICE[p.category])
        : 'Hello stryXplain! I would like to discuss a project similar to "' + p.title + '" (' +
          CATEGORY_LABEL_EN["f." + p.category] + "). Please share more details about pricing and the project requirements.";
      var html = mediaHtml(p);
      mediaBackup[p.id] = html;
      return (
        '<article class="card project-card reveal">' +
        '<div class="media" data-media="' + esc(p.id) + '">' + html +
        (p.placeholder ? '<span class="badge badge-demo">' + esc(t("portfolio.placeholder")) + "</span>" : "") +
        "</div>" +
        '<div class="project-body">' +
        '<span class="tag">' + esc(t("f." + p.category)) + "</span>" +
        "<h3>" + esc(p.title) + "</h3>" +
        (p.placeholder ? '<p class="ph-note">' + esc(t("portfolio.placeholderNote")) + "</p>" : "") +
        '<div class="project-actions">' +
        '<a class="btn btn-ghost btn-sm" target="_blank" rel="noopener noreferrer" href="' + esc(waLink(msg)) + '">' +
        icon("whatsapp") + "<span>" + esc(t("portfolio.similar")) + "</span></a>" +
        (p.ytUrl
          ? '<a class="link-sm" target="_blank" rel="noopener noreferrer" href="' + esc(p.ytUrl) + '"><span>' +
            esc(t("portfolio.watch")) + "</span>" + icon("external") + "</a>"
          : "") +
        "</div></div></article>"
      );
    }).join("");

    // Keep a lookup so the play button can find the project
    grid._projects = {};
    list.forEach(function (p) { grid._projects[p.id] = p; });
    reveal(grid, animate);
  }

  // Only one video is loaded at a time; videos load only after a click.
  function resetPlayers(exceptId) {
    $$("#portfolio-grid .media.playing").forEach(function (m) {
      var id = m.getAttribute("data-media");
      if (id === exceptId) return;
      m.classList.remove("playing");
      var badge = $(".badge-demo", m);
      m.innerHTML = mediaBackup[id] || "";
      if (badge) m.appendChild(badge);
    });
  }

  function startPlayer(id) {
    var grid = $("#portfolio-grid");
    var p = grid._projects && grid._projects[id];
    if (!p) return;
    resetPlayers(id);
    var media = $('[data-media="' + id.replace(/"/g, "") + '"]', grid);
    if (!media) return;
    var inner;
    if (p.ytId) {
      inner = '<iframe src="https://www.youtube-nocookie.com/embed/' + p.ytId +
        '?autoplay=1&rel=0" title="' + esc(p.title) +
        '" loading="lazy" allow="accelerometer; autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe>';
    } else {
      inner = '<video controls autoplay playsinline preload="metadata"' +
        (p.thumb ? ' poster="' + esc(p.thumb) + '"' : "") + ' src="' + esc(p.videoSrc) + '">' +
        "</video>";
    }
    media.classList.add("playing");
    media.innerHTML = inner;
    var frame = $("iframe, video", media);
    if (frame && frame.focus) frame.focus();
  }

  /* ---------- Pricing ---------- */
  function renderPricing(animate) {
    var root = $("#pricing-groups");
    var cur = PRICING.currency;
    root.innerHTML = PRICING.groups.map(function (g) {
      var cards = g.items.map(function (it) {
        var msg = "Hello stryXplain! I would like a quote for " + it.waName + " (starting rate: " + cur + it.price + " " +
          PRICING.unitEnglish[it.unit] + "). Please share more details about pricing and the project requirements.";
        return (
          '<article class="card price-card reveal">' +
          "<h4>" + esc(t("pricing.i." + it.id)) + "</h4>" +
          '<p class="from">' + esc(t("pricing.from")) + "</p>" +
          '<p class="price"><span class="amount">' + esc(cur + it.price) + "</span></p>" +
          '<p class="unit">' + esc(t("pricing.unit." + it.unit)) + "</p>" +
          '<a class="btn btn-primary" target="_blank" rel="noopener noreferrer" href="' + esc(waLink(msg)) + '">' +
          icon("whatsapp") + "<span>" + esc(t("pricing.cta")) + "</span></a></article>"
        );
      }).join("");

      // The custom quote card sits beside the thumbnail card (last group)
      var isLast = g.id === PRICING.groups[PRICING.groups.length - 1].id;
      var custom = isLast
        ? '<article class="card price-card price-custom reveal">' +
          "<h4>" + esc(t("pricing.customTitle")) + "</h4>" +
          '<p class="custom-text">' + esc(t("pricing.customText")) + "</p>" +
          '<a class="btn btn-ghost" target="_blank" rel="noopener noreferrer" href="' + esc(waLink(PRICING.customQuoteMessage)) + '">' +
          icon("whatsapp") + "<span>" + esc(t("pricing.cta")) + "</span></a></article>"
        : "";

      var cols = g.items.length + (isLast ? 1 : 0);
      return (
        '<div class="price-group">' +
        "<h3>" + esc(t("pricing.g." + g.id)) + "</h3>" +
        '<div class="grid price-grid cols-' + cols + '">' + cards + custom + "</div></div>"
      );
    }).join("");
    reveal(root, animate);
  }

  /* ---------- FAQ accordion ---------- */
  var FAQ_COUNT = 8;
  var openFaq = {};

  function renderFaq() {
    var list = $("#faq-list");
    var html = "";
    for (var i = 1; i <= FAQ_COUNT; i++) {
      var open = !!openFaq[i];
      html +=
        '<div class="faq-item' + (open ? " open" : "") + '">' +
        '<h3><button type="button" class="faq-q" id="faq-q-' + i + '" aria-expanded="' + open + '" aria-controls="faq-a-' + i + '" data-faq="' + i + '">' +
        "<span>" + esc(t("faq.q" + i)) + "</span>" + icon("chevron-down") + "</button></h3>" +
        '<div class="faq-a" id="faq-a-' + i + '" role="region" aria-labelledby="faq-q-' + i + '"' + (open ? "" : " hidden") + ">" +
        "<p>" + esc(t("faq.a" + i)) + "</p></div></div>";
    }
    list.innerHTML = html;
  }

  function toggleFaq(i) {
    openFaq[i] = !openFaq[i];
    var btn = $("#faq-q-" + i);
    var panel = $("#faq-a-" + i);
    btn.setAttribute("aria-expanded", String(openFaq[i]));
    panel.hidden = !openFaq[i];
    btn.closest(".faq-item").classList.toggle("open", openFaq[i]);
  }

  /* ---------- Navigation ---------- */
  function closeMenu() {
    var btn = $("#nav-toggle");
    document.body.classList.remove("menu-open");
    btn.setAttribute("aria-expanded", "false");
    btn.setAttribute("aria-label", t("nav.menu"));
    btn.firstElementChild.innerHTML = icon("menu");
  }
  function openMenu() {
    var btn = $("#nav-toggle");
    document.body.classList.add("menu-open");
    btn.setAttribute("aria-expanded", "true");
    btn.setAttribute("aria-label", t("nav.closeMenu"));
    btn.firstElementChild.innerHTML = icon("x");
  }

  function setupNav() {
    $("#nav-toggle").addEventListener("click", function () {
      if (document.body.classList.contains("menu-open")) closeMenu(); else openMenu();
    });
    $$("#primary-nav a").forEach(function (a) { a.addEventListener("click", closeMenu); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && document.body.classList.contains("menu-open")) {
        closeMenu();
        $("#nav-toggle").focus();
      }
    });
    window.addEventListener("resize", function () { if (window.innerWidth > 900) closeMenu(); });

    // Highlight the link of the section currently in view
    if ("IntersectionObserver" in window) {
      var links = {};
      $$('#primary-nav a[href^="#"]').forEach(function (a) { links[a.getAttribute("href").slice(1)] = a; });
      var spy = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            Object.keys(links).forEach(function (id) { links[id].classList.remove("active"); links[id].removeAttribute("aria-current"); });
            var active = links[entry.target.id];
            if (active) { active.classList.add("active"); active.setAttribute("aria-current", "true"); }
          });
        },
        { rootMargin: "-45% 0px -50% 0px" }
      );
      $$("main section[id]").forEach(function (s) { spy.observe(s); });
    }

    // Header gets a background once the page scrolls; back-to-top button appears
    var header = $(".site-header");
    var toTop = $("#to-top");
    function onScroll() {
      var y = window.scrollY || document.documentElement.scrollTop;
      header.classList.toggle("scrolled", y > 8);
      toTop.hidden = y < 700;
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0 });
      var skip = $(".wordmark");
      if (skip) skip.focus({ preventScroll: true });
    });
  }

  /* ---------- Language switch ---------- */
  function setLang(next) {
    if (!I18N[next] || next === lang) return;
    lang = next;
    try { sessionStorage.setItem("stryx-lang", lang); } catch (e) { /* ignore */ }
    renderAll(false);
  }

  function renderAll(animate) {
    applyStaticText();
    renderServices(animate);
    renderFilters();
    renderPortfolio(animate);
    renderPricing(animate);
    renderFaq();
  }

  /* ---------- Start ---------- */
  function init() {
    injectStaticIcons();
    setupContactLinks();
    setupNav();
    $("#year").textContent = String(new Date().getFullYear());

    $$(".section-head, .explain, .about-grid > *, .contact-grid > *").forEach(function (n) { n.classList.add("reveal"); });
    renderAll(true);
    reveal(document, true);

    $$(".lang-btn").forEach(function (btn) {
      btn.addEventListener("click", function () { setLang(btn.getAttribute("data-lang")); });
    });

    $("#portfolio-filters").addEventListener("click", function (e) {
      var btn = e.target.closest(".filter-btn");
      if (!btn) return;
      activeFilter = btn.getAttribute("data-filter");
      renderFilters();
      renderPortfolio(false);
      var again = $('.filter-btn[data-filter="' + activeFilter + '"]');
      if (again) again.focus();
    });

    $("#portfolio-grid").addEventListener("click", function (e) {
      var btn = e.target.closest(".play-btn");
      if (btn) startPlayer(btn.getAttribute("data-play"));
    });

    $("#faq-list").addEventListener("click", function (e) {
      var btn = e.target.closest(".faq-q");
      if (btn) toggleFaq(Number(btn.getAttribute("data-faq")));
    });
    // Arrow keys / Home / End move between questions
    $("#faq-list").addEventListener("keydown", function (e) {
      var btn = e.target.closest(".faq-q");
      if (!btn) return;
      var buttons = $$(".faq-q");
      var idx = buttons.indexOf(btn);
      var next = null;
      if (e.key === "ArrowDown") next = buttons[(idx + 1) % buttons.length];
      else if (e.key === "ArrowUp") next = buttons[(idx - 1 + buttons.length) % buttons.length];
      else if (e.key === "Home") next = buttons[0];
      else if (e.key === "End") next = buttons[buttons.length - 1];
      if (next) { e.preventDefault(); next.focus(); }
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
