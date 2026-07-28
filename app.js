// ============================================
// JPARAISO DIGITAL SOLUTIONS - MAIN APPLICATION
// ============================================
// Assembly Sequence hero + existing sections
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // --- helper ---
  const createEl = (tag, className, text) => {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (text) el.textContent = text;
    return el;
  };

  // --- navigation ---
const renderNav = () => {

  const navLinks = document.getElementById('nav-links');
  const toggle = document.getElementById('nav-toggle');

  // Build main links
  config.nav.forEach(item => {
      const a = createEl('a', '', item.label);
      a.href = item.href;
      a.addEventListener('click', () => {
          closeMenu();
      });
      navLinks.appendChild(a);
  });

    // Lower zone: email + location (mobile only via CSS)
    const footer = createEl('div', 'nav-menu-footer');
    const rule = createEl('div', 'nav-menu-rule');
    const email = createEl('a', 'nav-menu-email', config.site.email);
    email.href = `mailto:${config.site.email}`;
    const location = createEl('p', 'nav-menu-location', config.site.location);

    footer.appendChild(rule);
    footer.appendChild(email);
    footer.appendChild(location);
    navLinks.appendChild(footer);

    // Open / close helpers
    const openMenu = () => {
      navLinks.classList.add('active');
      toggle.classList.add('active');
      document.body.style.overflow = 'hidden';
    };

    const closeMenu = () => {
      navLinks.classList.remove('active');
      toggle.classList.remove('active');
      document.body.style.overflow = '';
    };

    toggle.addEventListener('click', () => {
      if (navLinks.classList.contains('active')) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        closeMenu();
      }
    });

    // Close on resize to desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
        closeMenu();
      }
    });
  };

  // --- hero text (prepared for letter assembly) ---
  const renderHero = () => {
    const titleEl = document.querySelector('.hero-title');
    const tagline = config.site.tagline;
    titleEl.innerHTML = '';

    // Split by spaces so each word stays together (no mid-word wrap)
    // Force two clean centered lines on desktop
// Line 1: "Properly built."
// Line 2: "Easily used."
const lines = [
  'Properly built.',
  'Easily used.'
];

lines.forEach((line, lineIndex) => {
  const lineSpan = createEl('span', 'hero-line');
  lineSpan.style.display = 'block';          // each line becomes its own block
  lineSpan.style.textAlign = 'center';

  const words = line.split(' ');

  words.forEach((word, wordIndex) => {
    const wordSpan = createEl('span', 'word');
    wordSpan.style.display = 'inline-block';
    wordSpan.style.whiteSpace = 'nowrap';

    word.split('').forEach((char) => {
      const letterSpan = createEl('span', 'letter');
      letterSpan.textContent = char;
      wordSpan.appendChild(letterSpan);
    });

    lineSpan.appendChild(wordSpan);

    // space between words (except last word of the line)
    if (wordIndex < words.length - 1) {
      const space = createEl('span', 'word-space');
      space.innerHTML = '&nbsp;';
      space.style.display = 'inline-block';
      lineSpan.appendChild(space);
    }
  });

  titleEl.appendChild(lineSpan);

  // small gap between the two lines
  if (lineIndex < lines.length - 1) {
    const br = createEl('span', 'hero-line-gap');
    br.style.display = 'block';
    br.style.height = '0.15em';
    titleEl.appendChild(br);
  }
});

    document.querySelector('.hero-subtitle').textContent = config.site.title;
  };

  // --- floating tools + assembly ---
  const renderTools = () => {
    const container = document.getElementById('tools-container');
    // Preserve or create the wireframe SVG
    let svg = document.getElementById('wireframe');
    if (!svg) {
      svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('class', 'wireframe');
      svg.setAttribute('id', 'wireframe');
    }
    // Clear tools only
    Array.from(container.children).forEach(child => {
      if (child.id !== 'wireframe') child.remove();
    });
    if (!container.contains(svg)) {
      container.appendChild(svg);
    }

    const screenWidth = window.innerWidth;
    let device = 'desktop';
    if (screenWidth <= 768) device = 'mobile';
    else if (screenWidth <= 1024) device = 'tablet';

    config.tools.forEach((tool, index) => {
      const item = createEl('div', 'tool-item');
      item.dataset.index = index;

      // Parallax + orbit CSS vars
      item.style.setProperty('--parallax-x', '0px');
      item.style.setProperty('--parallax-y', '0px');
      item.style.setProperty('--orbit-x', '0px');
      item.style.setProperty('--orbit-y', '0px');

      const pos = tool.position[device];
      const size = tool.size[device];

      item.style.left = `${pos.x}%`;
      item.style.top = `${pos.y}%`;
      item.style.width = `${size}px`;
      item.style.height = `${size}px`;

      // Calculate start offset (from edges, outward)
      const startX = (pos.x < 50 ? -120 : 120) + (Math.random() * 40 - 20);
      const startY = (pos.y < 50 ? -80 : 80) + (Math.random() * 30 - 15);
      item.style.setProperty('--start-x', `${startX}px`);
      item.style.setProperty('--start-y', `${startY}px`);

      item.style.setProperty('--float-duration', `${tool.float.duration}s`);
      item.style.setProperty('--float-delay', `${tool.float.delay}s`);
      item.style.setProperty('--float-amplitude', `${tool.float.amplitude}px`);
      item.style.setProperty('--float-drift-x', `${tool.float.driftX}px`);

      const inner = createEl('div', 'tool-inner');
      inner.style.setProperty('--tool-color', tool.color);

      const img = createEl('img');
      img.src = tool.src;
      img.alt = tool.name;
      img.loading = 'lazy';

      const label = createEl('span', 'tool-label', tool.name);

      inner.appendChild(img);
      item.appendChild(inner);
      item.appendChild(label);
      container.appendChild(item);
    });
  };

  // --- Assembly Sequence Controller ---
  const runAssemblySequence = () => {
    const tools = document.querySelectorAll('.tool-item');
    const letters = document.querySelectorAll('.hero-title .letter');
    const svg = document.getElementById('wireframe');

    // 1. Sequential tool entrance
    tools.forEach((tool, i) => {
      setTimeout(() => {
        tool.classList.add('is-assembled');
      }, 180 + i * 160); // deliberate stagger
    });

    // 2. After tools are mostly in → draw wireframe connections
    const toolsInTime = 180 + tools.length * 160 + 200;
    setTimeout(() => {
      drawWireframe(tools, svg);
    }, toolsInTime);

    // 3. Letter reveal (slightly overlapping the end of tool entrance)
    setTimeout(() => {
      letters.forEach((letter, i) => {
        setTimeout(() => {
          letter.classList.add('is-in');
        }, i * 38); // crisp letter-by-letter
      });
    }, toolsInTime - 400);

    // 4. Start subtle orbit + enable full magnetic after everything settles
    setTimeout(() => {
      tools.forEach(t => t.classList.add('is-orbiting'));
      document.body.classList.add('assembly-complete');
    }, toolsInTime + 900);
  };

  // --- Wireframe lines between tools ---
  const drawWireframe = (tools, svg) => {
    if (!svg || tools.length < 2) return;

    // Match viewport so absolute coords from getBoundingClientRect work
    svg.setAttribute('width', window.innerWidth);
    svg.setAttribute('height', window.innerHeight);
    svg.style.width = '100%';
    svg.style.height = '100%';

    // Clear previous
    while (svg.firstChild) svg.removeChild(svg.firstChild);

    // Simple logical pairs (not every-to-every, keep clean)
    // Connect in a loose constellation based on index
    const pairs = [
      [0, 4], [4, 1], [1, 7], [7, 2],
      [0, 5], [5, 3], [3, 9], [9, 6],
      [6, 2], [4, 8], [8, 1]
    ];

    const getCenter = (el) => {
      const r = el.getBoundingClientRect();
      return {
        x: r.left + r.width / 2,
        y: r.top + r.height / 2
      };
    };

    pairs.forEach(([a, b], idx) => {
      if (!tools[a] || !tools[b]) return;

      const p1 = getCenter(tools[a]);
      const p2 = getCenter(tools[b]);

      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', p1.x);
      line.setAttribute('y1', p1.y);
      line.setAttribute('x2', p2.x);
      line.setAttribute('y2', p2.y);
      line.style.strokeDasharray = '4 6';
      line.style.strokeDashoffset = '200';
      line.style.transition = `stroke-dashoffset 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 0.07}s, stroke-opacity 0.6s ease`;

      svg.appendChild(line);

      // Force reflow then animate
      requestAnimationFrame(() => {
        line.style.strokeDashoffset = '0';
        line.classList.add('is-drawn');
      });
    });

    // Keep lines roughly updated on resize (lightweight)
    window.addEventListener('resize', () => {
      // simple: redraw once after resize settles
      clearTimeout(window._wireResize);
      window._wireResize = setTimeout(() => {
        drawWireframe(document.querySelectorAll('.tool-item'), svg);
      }, 250);
    }, { once: false });
  };

 // --- services ---
const renderServices = () => {

  const grid = document.getElementById("services-grid");

  config.services.forEach((service, index) => {

    const item = createEl("div", "service-item");

    const num = createEl("span", "service-number", `0${index + 1}`);

    const title = createEl("h3", "service-title", service.title);

    const desc = createEl("p", "service-desc", service.desc);

    // Content wrapper
    const content = createEl("div", "service-content");

    content.appendChild(num);

    content.appendChild(title);

    content.appendChild(desc);

    item.appendChild(content);

    // Web Development glyph (Service #1 only)
    const glyph = createEl("div", "service-glyph");

    if (index === 0) {
      glyph.innerHTML = `<span class="glyph-code"></span>`;
    }
    
    else if (index === 1) {
      glyph.innerHTML = `<span class="glyph-ui"></span>`;
    }
    
    else if (index === 2) {
      glyph.innerHTML = `<span class="glyph-network"></span>`;
    }
    
    else if (index === 3) {
      glyph.innerHTML = `<span class="glyph-stack"></span>`;
    }

item.appendChild(glyph);

    grid.appendChild(item);

  });

};

  // --- work ---
  const renderWork = () => {
      const grid = document.getElementById('work-grid');
      config.projects.forEach(project => {
      const hasLink = project.link && project.link !== '#';
      const item = createEl(hasLink ? 'a' : 'div', 'work-item');
      if (hasLink) {
      item.href = project.link;
      item.target = '_blank';
      item.rel = 'noopener noreferrer';
      }
      const imgContainer = createEl('div', 'work-image');
      const img = createEl('img', '', '');
      img.src = project.image;
      img.alt = project.title;
      img.loading = 'lazy';
      img.onerror = () => {
        img.style.display = 'none';
        imgContainer.textContent = '[ Image Placeholder ]';
      };
      imgContainer.appendChild(img);

      const info = createEl('div', 'work-info');
      const titleRow = createEl('div', 'work-title-row');

const title = createEl('h3', 'work-title', project.title);

titleRow.appendChild(title);

if (project.status) {

    const status = createEl(
        'span',
        `project-status project-status--${project.status}`
    );

    status.innerHTML =
        project.status === "live"
            ? '<span class="status-dot"></span>LIVE'
            : '<span class="status-dot"></span>COMING SOON';

    titleRow.appendChild(status);

}

const meta = createEl(
    'p',
    'work-meta',
    `${project.category} / ${project.year}`
);

info.appendChild(titleRow);
info.appendChild(meta);

      item.appendChild(imgContainer);
      item.appendChild(info);
      grid.appendChild(item);
    });
  };

  // --- about ---
const renderAbout = () => {
  const content = document.getElementById('about-content');

  const textCol = createEl('div', 'about-text');

  const p1 = createEl(
    'p',
    '',
    `I'm the developer behind ${config.site.name}, based in the Philippines.`
  );

  const p2 = createEl(
    'p',
    '',
    `I build modern websites and business systems designed to help businesses establish a strong online presence and operate more efficiently.`
  );

  const p3 = createEl(
    'p',
    '',
    `With a background in IT support, systems administration, and full-stack web development, I focus on performance, reliability, and user experience in every project I build.`
  );

  textCol.appendChild(p1);
  textCol.appendChild(p2);
  textCol.appendChild(p3);

  content.appendChild(textCol);

  const stackCol = createEl('div', 'about-stack');

  const stackTitle = createEl('h3', 'stack-title', 'Tech Stack');
  stackTitle.style.marginBottom = '16px';
  stackTitle.style.fontSize = '20px';

  const stackList = createEl('ul', '', '');
  stackList.style.listStyle = 'none';
  stackList.style.fontFamily = 'var(--font-heading)';
  stackList.style.fontSize = '14px';
  stackList.style.color = 'var(--text-muted)';

  config.tools.forEach(tool => {
    const li = createEl('li', '', tool.name);
    li.style.padding = '8px 0';
    li.style.borderBottom = '1px solid var(--border)';
    stackList.appendChild(li);
  });

  stackCol.appendChild(stackTitle);
  stackCol.appendChild(stackList);

  content.appendChild(stackCol);
};


// --- contact ---
const renderContact = () => {
  const container = document.getElementById('contact-content');

  container.innerHTML = `
    <div class="contact-info">

      <h3>Let's build something together.</h3>

      <a
        class="contact-email"
        href="mailto:${config.site.email}"
      >
        ${config.site.email}
      </a>

      <a
        class="contact-phone"
        href="tel:+639241135071"
        aria-label="Call +63 924 113 5071"
        title="Tap to call"
      >
        +63 924 113 5071
      </a>

      <p class="contact-location">
        ${config.site.location}
      </p>

      <div class="contact-socials">

        <a
          href="https://github.com/jparaisodigital"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
        >
          <img src="assets/images/socials/github.svg" alt="GitHub">
        </a>

        <a
          href="https://www.instagram.com/jparaiso___/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
        >
          <img src="assets/images/socials/instagram.svg" alt="Instagram">
        </a>

        <a
          href="https://www.facebook.com/jommel.paraisotumbokon"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
        >
          <img src="assets/images/socials/facebook.svg" alt="Facebook">
        </a>

      </div>

    </div>

    <div class="contact-form">

      <h3>Tell me about your project.</h3>

      <form
        id="contact-form"
        action="https://formspree.io/f/xjgnjrqb"
        method="POST"
      >

        <input
          type="text"
          name="name"
          placeholder="Your name"
          required
        >

        <input
          type="email"
          name="email"
          placeholder="Email address"
          required
        >

        <select
          name="project"
          required
        >

          <option value="">Select project type</option>

          <option value="Web Development">
            Web Development
          </option>

          <option value="UI / UX Design">
            UI / UX Design
          </option>

          <option value="Backend Development">
            Backend Development
          </option>

          <option value="Full Stack Solution">
            Full Stack Solution
          </option>

          <option value="Other">
            Other
          </option>

        </select>

        <textarea
          name="message"
          rows="5"
          placeholder="Tell me about your project..."
          required
        ></textarea>

        <button
          id="contact-submit"
          type="submit"
        >
          START A PROJECT +
        </button>

        <p id="contact-status"></p>

      </form>

    </div>
  `;
};

  // --- footer ---
  const renderFooter = () => {
    const year = new Date().getFullYear();
    document.querySelector('.footer-text').textContent = `© ${year} ${config.site.name}. All rights reserved.`;
  };

  // --- scroll reveal (kept) ---
  const initScrollReveal = () => {
    const labels = document.querySelectorAll('.section-label');
    labels.forEach(label => {
      label.style.opacity = '0';
      label.style.transform = 'translateX(-30px)';
      label.style.transition = 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateX(0)';
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.8 });
      observer.observe(label);
    });

    const services = document.querySelectorAll('.service-item');
    services.forEach((item, index) => {
      const randomDelay = (index * 0.1) + (Math.random() * 0.1);
      item.style.transitionDelay = `${randomDelay}s`;
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2 });
      observer.observe(item);
    });

    const works = document.querySelectorAll('.work-item');
    works.forEach((item, index) => {
      const randomDelay = (index * 0.15) + (Math.random() * 0.1);
      item.style.transitionDelay = `${randomDelay}s`;
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2 });
      observer.observe(item);
    });
  };

  // --- Scramble once only (first hover after assembly) ---
  const initScrambleEffect = () => {
    const el = document.querySelector('.hero-title');
    if (!el) return;

    const originalText = config.site.tagline;
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
    let iteration = 0;
    let interval = null;
    let hasScrambled = false; // once lang

    el.addEventListener('mouseenter', () => {
      if (!document.body.classList.contains('assembly-complete')) return;
      if (hasScrambled) return; // hindi na uulit

      hasScrambled = true;
      clearInterval(interval);
      iteration = 0;

      interval = setInterval(() => {
        const letters = el.querySelectorAll('.letter');
        const cleanText = originalText.replace(/\s/g, '');

        letters.forEach((span, index) => {
          if (index < iteration) {
            span.textContent = cleanText[index] || span.textContent;
            span.classList.remove('scramble-char');
          } else {
            span.textContent = chars[Math.floor(Math.random() * chars.length)];
            span.classList.add('scramble-char');
          }
        });

        if (iteration >= cleanText.length) {
          clearInterval(interval);
          // restore clean
          letters.forEach((span, index) => {
            span.textContent = cleanText[index] || '';
            span.classList.remove('scramble-char');
          });
        }
        iteration += 1 / 4;
      }, 28);
    });
  };

  // --- View Work button interaction ---
  const initViewWorkButton = () => {
    const btn = document.getElementById('view-work-btn');
    if (!btn) return;

    let isAnimating = false;

    const resetButton = () => {
      btn.classList.remove('is-pressed', 'is-filled', 'is-arrow-visible');
      isAnimating = false;
    };

    const handlePressStart = () => {
      if (isAnimating) return;
      btn.classList.add('is-pressed');
    };

    const handlePressEnd = (e) => {
      if (isAnimating) return;
      e.preventDefault();
      isAnimating = true;

      // release scale but keep filled
      btn.classList.remove('is-pressed');
      btn.classList.add('is-filled');

      // show down arrow
      requestAnimationFrame(() => {
        btn.classList.add('is-arrow-visible');
      });

      // small delay so press + arrow feel complete, then scroll
      setTimeout(() => {
        const workSection = document.getElementById('work');
        if (workSection) {
          workSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        // return to default after scroll has time to start
        setTimeout(resetButton, 700);
      }, 220);
    };

    // pointer events cover mouse + touch cleanly
    btn.addEventListener('pointerdown', handlePressStart);
    btn.addEventListener('pointerup', handlePressEnd);
    btn.addEventListener('pointerleave', () => {
      if (!isAnimating) {
        btn.classList.remove('is-pressed');
      }
    });

    // keyboard support
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handlePressStart();
        handlePressEnd(e);
      }
    });
  };

    // --- init all ---
    renderNav();
    renderHero();
    renderTools();
    renderServices();
    renderWork();
    renderAbout();
    renderContact();
    renderFooter();
    initScrollReveal();
    initScrambleEffect();
  
    // Kick off assembly after a short settle
    setTimeout(runAssemblySequence, 120);

    // --- Hide / show nav on scroll direction ---
const nav = document.getElementById('nav');
let lastScrollY = window.scrollY;
let ticking = false;

const updateNavVisibility = () => {
  const currentScrollY = window.scrollY;

  // Always show when near top
  if (currentScrollY < 80) {
    nav.classList.remove('is-hidden');
  } else if (currentScrollY > lastScrollY + 4) {
    // scrolling down
    nav.classList.add('is-hidden');
  } else if (currentScrollY < lastScrollY - 4) {
    // scrolling up
    nav.classList.remove('is-hidden');
  }

  lastScrollY = currentScrollY;
  ticking = false;
};

window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(updateNavVisibility);
    ticking = true;
  }
}, { passive: true });

  // ============================================
  // MOUSE PARALLAX + MAGNETIC + ORBIT ENGINE
  // ============================================

  const mouse = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
  };

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  let orbitTime = 0;

  function animateParallax() {
    const tools = document.querySelectorAll('.tool-item');
    const toolsContainer = document.querySelector('.tools-container');
    const scrollY = window.scrollY;

    // Scroll effects (existing + slightly stronger dissolve)
    const blurAmount = Math.min(scrollY / 90, 14);
    const opacityAmount = Math.max(1 - scrollY / 750, 0);
    const scrollFollowY = scrollY * 0.28;

    if (toolsContainer) {
      toolsContainer.style.transform = `translateY(${scrollFollowY}px)`;
      toolsContainer.style.filter = `blur(${blurAmount}px)`;
      toolsContainer.style.opacity = opacityAmount;
    }

    // Soft orbit (only after assembly)
    orbitTime += 0.008;
    const assemblyDone = document.body.classList.contains('assembly-complete');

    tools.forEach((tool, index) => {
      const strength = (index + 1) * 0.18;
      const moveX = (mouse.x - window.innerWidth / 2) * 0.012 * strength;
      const moveY = (mouse.y - window.innerHeight / 2) * 0.012 * strength;

      const currentX = parseFloat(tool.dataset.px || 0);
      const currentY = parseFloat(tool.dataset.py || 0);
      const smoothness = 0.06 + (index * 0.006);

      const nextX = currentX + (moveX - currentX) * smoothness;
      const nextY = currentY + (moveY - currentY) * smoothness;

      tool.dataset.px = nextX;
      tool.dataset.py = nextY;

      tool.style.setProperty('--parallax-x', `${nextX}px`);
      tool.style.setProperty('--parallax-y', `${nextY}px`);

      // Very subtle orbital drift once assembled
      if (assemblyDone) {
        const radius = 4 + (index % 4) * 1.8;
        const speed = 0.35 + (index * 0.04);
        const ox = Math.sin(orbitTime * speed + index) * radius;
        const oy = Math.cos(orbitTime * speed * 0.85 + index * 1.3) * radius * 0.7;
        tool.style.setProperty('--orbit-x', `${ox}px`);
        tool.style.setProperty('--orbit-y', `${oy}px`);
      }
    });

    requestAnimationFrame(animateParallax);
  }

// ============================================
// HERO SCROLL FADE
// ============================================

const hero = document.querySelector(".hero");

const heroTitle = document.querySelector(".hero-title");

const heroSubtitle = document.querySelector(".hero-subtitle");

const heroLine = document.querySelector(".hero-scroll-line");

function animateHeroScroll() {

  const rect = hero.getBoundingClientRect();

  const progress = Math.min(
    Math.max(-rect.top / rect.height, 0),
    1
  );

  const opacity = 1 - (progress * 1.6);

  heroTitle.style.opacity = opacity;

  heroSubtitle.style.opacity = opacity;

  if (heroLine) {

    heroLine.style.opacity = 0.28 * opacity;

    heroLine.style.width = `${56 * opacity}px`;

  }

  requestAnimationFrame(animateHeroScroll);

}

// ============================================
// SERVICE GLYPH ANIMATION
// ============================================

function animateServiceGlyph() {

  // ------------------------
  // Box 1
  // ------------------------

  const codeGlyph = document.querySelector(".glyph-code");

  if (codeGlyph) {

    const frames = [

      ".",
      "..",
      "...",
      "<",
      "<|",
      "</",
      "</>"

    ];

    let frame = 0;

    function playCode() {

      codeGlyph.textContent = frames[frame];

      if (frame < frames.length - 1) {

        frame++;

        setTimeout(playCode, 300);

      } else {

        frame = 0;

        setTimeout(playCode, 3000);

      }

    }

    playCode();

  }

  // ------------------------
  // Box 2
  // ------------------------

  const networkGlyph = document.querySelector(".glyph-network");

  if (networkGlyph) {

    const frames = [

      `●────●`,

      `●═───●`,

      `●─═──●`,

      `●──═─●`,

      `●───═●`,

      `●────●`

    ];

    let frame = 0;

    function playNetwork() {

      networkGlyph.textContent = frames[frame];

      if (frame < frames.length - 1) {

        frame++;

        setTimeout(playNetwork, 300);

      } else {

        frame = 0;

        setTimeout(playNetwork, 3000);

      }

    }

    playNetwork();

  }

  // ------------------------
  // Box 3
  // ------------------------

  const uiGlyph = document.querySelector(".glyph-ui");

  if (uiGlyph) {

    const frames = [

      `□`,

      `◱`,

      `◰`,

      `▣`

    ];

    let frame = 0;

    function playUI() {

      uiGlyph.textContent = frames[frame];

      if (frame < frames.length - 1) {

        frame++;

        setTimeout(playUI, 300);

      } else {

        frame = 0;

        setTimeout(playUI, 3000);

      }

    }

    playUI();

  }

  // ------------------------
  // Box 4
  // ------------------------

  const stackGlyph = document.querySelector(".glyph-stack");

  if (stackGlyph) {

    const frames = [

      `•`,

      `+`,

      `×`,

      `✦`

    ];

    let frame = 0;

    function playStack() {

      stackGlyph.textContent = frames[frame];

      if (frame < frames.length - 1) {

        frame++;

        setTimeout(playStack, 300);

      } else {

        frame = 0;

        setTimeout(playStack, 3000);

      }

    }

    playStack();

  }

}

animateHeroScroll();

animateServiceGlyph();

animateParallax();

});

// ============================================
// CONTACT FORM (FORMSPREE AJAX)
// ============================================

document.addEventListener("submit", async (e) => {

  if (e.target.id !== "contact-form") return;

  e.preventDefault();

  const form = e.target;
  const button = document.getElementById("contact-submit");
  const status = document.getElementById("contact-status");

  const originalText = button.textContent;

  button.disabled = true;
  button.textContent = "SENDING...";
  status.textContent = "";

  try {

    const response = await fetch(form.action, {

      method: "POST",

      body: new FormData(form),

      headers: {
        Accept: "application/json"
      }

    });

    if (response.ok) {

      form.reset();
    
      button.textContent = "PROJECT SENT";
    
      status.textContent =
        "Project inquiry sent successfully. I'll get back to you within 24 hours.";
    
        setTimeout(() => {

          button.textContent = originalText;
        
          status.textContent = "";
        
          button.disabled = false;
        
        }, 5000);
    
    }

  } catch {

    button.textContent = originalText;

    status.textContent =
      "Unable to send your inquiry. Please try again.";

  }

});