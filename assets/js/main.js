/* Rajarshi Ray — portfolio interactions */
(() => {
  "use strict";

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  /* ------------------------------------------------------------------
     Navigation: scroll state, progress bar, mobile menu, active links
     ------------------------------------------------------------------ */
  const nav = document.querySelector(".nav");
  const progress = document.querySelector(".nav-progress");
  const burger = document.querySelector(".nav-burger");
  const mobileMenu = document.querySelector(".mobile-menu");

  const onScroll = () => {
    if (nav) nav.classList.toggle("is-scrolled", window.scrollY > 24);
    if (progress) {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = max > 0 ? `${(window.scrollY / max) * 100}%` : "0%";
    }
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (burger && mobileMenu) {
    burger.addEventListener("click", () => mobileMenu.classList.toggle("is-open"));
    mobileMenu.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => mobileMenu.classList.remove("is-open"))
    );
  }

  // highlight nav link of section in view
  const sections = [...document.querySelectorAll("section[id]")];
  const navLinks = [...document.querySelectorAll('.nav-links a[href^="#"]')];
  if (sections.length && navLinks.length) {
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          navLinks.forEach((a) =>
            a.classList.toggle("is-active", a.getAttribute("href") === `#${entry.target.id}`)
          );
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((s) => spy.observe(s));
  }

  /* ------------------------------------------------------------------
     Scroll reveals (staggered via data-delay)
     ------------------------------------------------------------------ */
  const revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // reveal when entering the viewport, or if already scrolled past
          if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
            entry.target.classList.add("is-inview");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((el) => {
      const d = el.dataset.delay;
      if (d) el.style.setProperty("--reveal-delay", d);
      io.observe(el);
    });
  }

  /* ------------------------------------------------------------------
     Timeline progress line
     ------------------------------------------------------------------ */
  const timeline = document.querySelector(".timeline");
  const timelineProgress = document.querySelector(".timeline-progress");
  if (timeline && timelineProgress) {
    const drawTimeline = () => {
      const rect = timeline.getBoundingClientRect();
      const viewportMid = window.innerHeight * 0.6;
      const covered = Math.min(Math.max(viewportMid - rect.top, 0), rect.height - 12);
      timelineProgress.style.height = `${covered}px`;
    };
    window.addEventListener("scroll", drawTimeline, { passive: true });
    drawTimeline();
  }

  /* ------------------------------------------------------------------
     Counters
     ------------------------------------------------------------------ */
  const counters = document.querySelectorAll("[data-count]");
  if (counters.length) {
    const fmt = (n) => n.toLocaleString("en-US");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting && entry.boundingClientRect.top >= 0) return;
          const el = entry.target;
          io.unobserve(el);
          const target = parseFloat(el.dataset.count);
          const suffix = el.dataset.suffix || "";
          const prefix = el.dataset.prefix || "";
          if (reducedMotion) {
            el.textContent = prefix + fmt(target) + suffix;
            return;
          }
          const dur = 1800;
          const start = performance.now();
          const tick = (now) => {
            const t = Math.min((now - start) / dur, 1);
            const eased = 1 - Math.pow(1 - t, 4);
            el.textContent = prefix + fmt(Math.round(target * eased)) + suffix;
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        });
      },
      { threshold: [0, 0.35] }
    );
    counters.forEach((c) => io.observe(c));
  }

  /* ------------------------------------------------------------------
     Role typewriter
     ------------------------------------------------------------------ */
  const rolesEl = document.querySelector("[data-roles]");
  if (rolesEl) {
    const roles = JSON.parse(rolesEl.dataset.roles);
    const textEl = rolesEl.querySelector(".role-text");
    if (reducedMotion) {
      textEl.textContent = roles[0];
    } else {
      let ri = 0, ci = 0, deleting = false;
      const step = () => {
        const word = roles[ri];
        if (!deleting) {
          ci++;
          textEl.textContent = word.slice(0, ci);
          if (ci === word.length) {
            deleting = true;
            setTimeout(step, 2100);
            return;
          }
          setTimeout(step, 55 + Math.random() * 45);
        } else {
          ci--;
          textEl.textContent = word.slice(0, ci);
          if (ci === 0) {
            deleting = false;
            ri = (ri + 1) % roles.length;
            setTimeout(step, 350);
            return;
          }
          setTimeout(step, 28);
        }
      };
      setTimeout(step, 900);
    }
  }

  /* ------------------------------------------------------------------
     Particle network canvas (hero)
     ------------------------------------------------------------------ */
  const canvas = document.getElementById("particles");
  if (canvas && !reducedMotion) {
    const ctx = canvas.getContext("2d");
    const parent = canvas.parentElement;
    let W, H, particles;
    const mouse = { x: -9999, y: -9999 };
    const COLORS = ["139,92,246", "34,211,238", "244,114,182"];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = parent.offsetWidth;
      H = parent.offsetHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = W + "px";
      canvas.style.height = H + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(Math.floor((W * H) / 16000), 110);
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.8 + 0.6,
        c: COLORS[(Math.random() * COLORS.length) | 0],
      }));
    };
    resize();
    window.addEventListener("resize", resize);

    parent.addEventListener("pointermove", (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });
    parent.addEventListener("pointerleave", () => { mouse.x = -9999; mouse.y = -9999; });

    const LINK_DIST = 130;
    let rafId;
    const frame = () => {
      ctx.clearRect(0, 0, W, H);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        // gentle attraction to mouse
        const dxm = mouse.x - p.x, dym = mouse.y - p.y;
        const dm = Math.hypot(dxm, dym);
        if (dm < 180 && dm > 0.01) {
          p.x += (dxm / dm) * 0.35;
          p.y += (dym / dm) * 0.35;
        }
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
        p.x = Math.max(0, Math.min(W, p.x));
        p.y = Math.max(0, Math.min(H, p.y));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.c},0.75)`;
        ctx.fill();
      }
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < LINK_DIST * LINK_DIST) {
            const alpha = (1 - Math.sqrt(d2) / LINK_DIST) * 0.34;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(${a.c},${alpha})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }
      rafId = requestAnimationFrame(frame);
    };

    // pause when hero not visible
    const heroIO = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!rafId) rafId = requestAnimationFrame(frame);
        } else {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
      },
      { threshold: 0 }
    );
    heroIO.observe(parent);
  }

  /* ------------------------------------------------------------------
     Custom cursor
     ------------------------------------------------------------------ */
  if (finePointer && !reducedMotion) {
    const dot = document.querySelector(".cursor-dot");
    const ring = document.querySelector(".cursor-ring");
    if (dot && ring) {
      let mx = -100, my = -100, rx = -100, ry = -100;
      window.addEventListener("pointermove", (e) => {
        mx = e.clientX;
        my = e.clientY;
        dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%,-50%)`;
      });
      const follow = () => {
        rx += (mx - rx) * 0.16;
        ry += (my - ry) * 0.16;
        ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%)`;
        requestAnimationFrame(follow);
      };
      follow();
      document.querySelectorAll("a, button, .r-card, .ts-chip").forEach((el) => {
        el.addEventListener("pointerenter", () => ring.classList.add("is-hovering"));
        el.addEventListener("pointerleave", () => ring.classList.remove("is-hovering"));
      });
    }
  }

  /* ------------------------------------------------------------------
     3D tilt + spotlight cards
     ------------------------------------------------------------------ */
  if (finePointer && !reducedMotion) {
    document.querySelectorAll("[data-tilt]").forEach((card) => {
      const strength = 7;
      card.addEventListener("pointermove", (e) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        card.style.setProperty("--mx", `${px * 100}%`);
        card.style.setProperty("--my", `${py * 100}%`);
        card.style.transform = `perspective(800px) rotateY(${(px - 0.5) * strength}deg) rotateX(${(0.5 - py) * strength}deg) translateY(-4px)`;
      });
      card.addEventListener("pointerleave", () => {
        card.style.transform = "";
      });
    });
    // spotlight only (no tilt)
    document.querySelectorAll("[data-spotlight]").forEach((card) => {
      card.addEventListener("pointermove", (e) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
        card.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
      });
    });
  }

  /* ------------------------------------------------------------------
     Magnetic buttons
     ------------------------------------------------------------------ */
  if (finePointer && !reducedMotion) {
    document.querySelectorAll("[data-magnetic]").forEach((el) => {
      el.addEventListener("pointermove", (e) => {
        const r = el.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        el.style.transform = `translate(${dx * 0.18}px, ${dy * 0.18}px)`;
      });
      el.addEventListener("pointerleave", () => {
        el.style.transform = "";
      });
    });
  }

  /* ------------------------------------------------------------------
     Marquee: duplicate content for seamless loop
     ------------------------------------------------------------------ */
  document.querySelectorAll(".marquee").forEach((m) => {
    m.innerHTML += m.innerHTML;
  });

  /* ------------------------------------------------------------------
     SceneSense chat demo loop
     ------------------------------------------------------------------ */
  const chat = document.querySelector("[data-chat-demo]");
  if (chat) {
    const convos = [
      {
        q: "Where do you explain how to price a cohort launch?",
        a: "You cover launch pricing in <strong>Module 4 — Offer Design</strong>. The tier breakdown starts at the first timestamp, and the objection-handling part is in the Q&amp;A replay:",
        chips: ["Session 6 · 47:12", "Q&A Replay 3 · 12:40"],
      },
      {
        q: "What did you mean by \"anchor pricing\" in the pricing lecture?",
        a: "Anchoring is introduced with the <strong>3-tier example</strong> — you show how the premium tier makes the middle tier feel obvious. Watch it here:",
        chips: ["Module 4 · 18:05", "Live Call 2 · 31:22"],
      },
      {
        q: "Which video shows the full setup, start to finish?",
        a: "The complete walkthrough is in <strong>Module 1 — Setup</strong>. There's also a shorter recap from the last cohort:",
        chips: ["Module 1 · 03:58", "Cohort 5 Recap · 08:15"],
      },
    ];
    const body = chat.querySelector(".chat-body");
    const clockIcon =
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>';

    const wait = (ms) => new Promise((r) => setTimeout(r, ms));

    const show = (el) =>
      requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add("is-visible")));

    const runConvo = async (convo) => {
      body.innerHTML = "";

      const user = document.createElement("div");
      user.className = "msg msg-user";
      body.appendChild(user);
      show(user);

      if (reducedMotion) {
        user.textContent = convo.q;
      } else {
        for (let i = 1; i <= convo.q.length; i++) {
          user.textContent = convo.q.slice(0, i);
          await wait(26);
        }
      }
      await wait(500);

      const typing = document.createElement("div");
      typing.className = "msg msg-ai msg-typing is-visible";
      typing.innerHTML = "<i></i><i></i><i></i>";
      body.appendChild(typing);
      await wait(reducedMotion ? 200 : 1400);
      typing.remove();

      const ai = document.createElement("div");
      ai.className = "msg msg-ai";
      ai.innerHTML =
        convo.a +
        '<div class="ts-chips">' +
        convo.chips
          .map((c) => `<span class="ts-chip">${clockIcon}${c}</span>`)
          .join("") +
        "</div>";
      body.appendChild(ai);
      show(ai);

      await wait(5200);
    };

    let started = false;
    const startLoop = async () => {
      if (started) return;
      started = true;
      let i = 0;
      // eslint-disable-next-line no-constant-condition
      while (true) {
        await runConvo(convos[i % convos.length]);
        i++;
      }
    };
    new IntersectionObserver(
      ([entry], obs) => {
        if (entry.isIntersecting) {
          startLoop();
          obs.disconnect();
        }
      },
      { threshold: 0.35 }
    ).observe(chat);
  }

  /* ------------------------------------------------------------------
     YouTube click-to-load facades
     ------------------------------------------------------------------ */
  document.querySelectorAll(".yt-facade[data-yt]").forEach((el) => {
    el.addEventListener("click", () => {
      const id = el.dataset.yt;
      const iframe = document.createElement("iframe");
      iframe.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;
      iframe.title = el.dataset.title || "YouTube video";
      iframe.allow =
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      iframe.allowFullscreen = true;
      el.replaceChildren(iframe);
      el.style.cursor = "default";
    }, { once: true });
  });

  /* ------------------------------------------------------------------
     Footer year
     ------------------------------------------------------------------ */
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
})();
