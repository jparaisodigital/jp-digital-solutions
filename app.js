// ============================================
// JPARAISO DIGITAL SOLUTIONS - MAIN APPLICATION
// ============================================
// Assembly Sequence hero + existing sections
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  
  // --- Chatbot ---
 const initChatbot = () => {
   const btn = document.getElementById('chatbot-btn');
   const windowEl = document.getElementById('chatbot-window');
   const closeBtn = document.getElementById('chatbot-close');
   const messagesEl = document.getElementById('chatbot-messages');
   const input = document.getElementById('chatbot-input');
   const sendBtn = document.getElementById('chatbot-send');
 
   if (!btn || !windowEl) return;
 
   // Show button after 6 seconds
   setTimeout(() => {
     btn.classList.add('is-visible');
   }, 6000);
 
   const openChat = () => {
     // Remove the class first
     windowEl.classList.remove('is-open');
   
     // Force a reflow so the browser forgets the previous animation
     void windowEl.offsetWidth;
   
     // Add it again → animation plays from the start
     windowEl.classList.add('is-open');
     btn.classList.add('is-open');
     input.focus();
   };
   
   const closeChat = () => {
     windowEl.classList.remove('is-open');
     btn.classList.remove('is-open');
   };
 
   btn.addEventListener('click', openChat);
   closeBtn.addEventListener('click', closeChat);
 
   const addMessage = (text, type) => {
     const msg = document.createElement('div');
     msg.className = `chatbot-msg ${type}`;
     msg.innerHTML = text;
     messagesEl.appendChild(msg);
     messagesEl.scrollTop = messagesEl.scrollHeight;
   };
 
   const sendMessage = async () => {
    const text = input.value.trim();
    if (!text) return;
  
    addMessage(text, 'user');
    input.value = '';
    input.disabled = true;
    sendBtn.disabled = true;
  
    try {
      const WEBHOOK_URL = 'https://hook.eu1.make.com/3dd6boaspbizge9nppmg3ov5j42baojg';
  
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ message: text })
      });
  
      if (!response.ok) {
        // Try to get error details
        const errorData = await response.text();
        console.error('Response error:', errorData);
        throw new Error(`HTTP ${response.status}`);
      }
  
      const data = await response.json();
      const reply = data.reply || data.message || data.text || 'Sorry, I could not process that.';
      addMessage(reply, 'bot');
    } catch (err) {
      console.error('Fetch error:', err);
      addMessage('Something went wrong. Please try again or email jparaiso.digital@gmail.com', 'bot');
    }
  
    input.disabled = false;
    sendBtn.disabled = false;
    input.focus();
  };
   
   sendBtn.addEventListener('click', sendMessage);
   input.addEventListener('keydown', (e) => {
     if (e.key === 'Enter') sendMessage();
   });
 };
 
 initChatbot();
  
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
    
    const lines = [
      'Properly built.',
      'Easily used.'
    ];
    
    lines.forEach((line, lineIndex) => {
      const lineSpan = createEl('span', 'hero-line');
      lineSpan.style.display = 'block';          
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
      }, 180 + i * 160);
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
        }, i * 38);
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
    
    svg.setAttribute('width', window.innerWidth);
    svg.setAttribute('height', window.innerHeight);
    svg.style.width = '100%';
    svg.style.height = '100%';
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    
    const pairs = [
      [6, 1], [1, 4], [4, 8], [8, 0],
      [0, 5], [5, 3], [3, 9], [9, 7],
      [7, 10], [10, 2], [2, 6]
    ];
    
    const getCenter = (el) => {
      const r = el.getBoundingClientRect();
      return {
        x: r.left + r.width / 2,
        y: r.top + r.height / 2
      };
    };
    
    pairs.forEach(([a, b]) => {
      if (!tools[a] || !tools[b]) return;
      
      const p1 = getCenter(tools[a]);
      const p2 = getCenter(tools[b]);
      
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', p1.x);
      line.setAttribute('y1', p1.y);
      line.setAttribute('x2', p2.x);
      line.setAttribute('y2', p2.y);
      line.style.strokeDasharray = '4 6';
      line.style.strokeDashoffset = '0';
      line.classList.add('is-drawn');
      
      svg.appendChild(line);
    });
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
      const hasDesc = project.description && project.description.trim() !== '';
      const hasHoverImage = project.imageHover && project.imageHover.trim() !== '';
      
      const item = createEl('div', 'work-item');
      if (hasDesc) item.classList.add('work-item--expandable');
      if (hasHoverImage) item.classList.add('work-item--has-hover');
      
      // --- Image container with crossfade support ---
      const imgContainer = createEl('div', 'work-image');
      
      // Primary image
      const img = createEl('img', 'work-img-primary');
      img.src = project.image;
      img.alt = project.title;
      img.loading = 'lazy';
      img.onerror = () => {
        img.style.display = 'none';
        imgContainer.textContent = '[ Image Placeholder ]';
      };
      imgContainer.appendChild(img);
      
      // Secondary / hover image
      if (hasHoverImage) {
        const imgHover = createEl('img', 'work-img-hover');
        imgHover.src = project.imageHover;
        imgHover.alt = project.title + ' alternate view';
        imgHover.loading = 'lazy';
        imgContainer.appendChild(imgHover);
        
        // Mobile: tap to toggle
        imgContainer.addEventListener('click', (e) => {
          // Only toggle on touch devices / small screens
          if (window.matchMedia('(hover: none)').matches) {
            e.preventDefault();
            item.classList.toggle('is-showing-hover');
          }
        });
      }
      
      // --- DEMO BADGE ---
      if (project.badge === 'demo') {
        const badge = createEl('span', 'work-badge', 'DEMO');
        imgContainer.appendChild(badge);
      }
      
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
        
        item.appendChild(status);  
      }
      
      // --- ACCORDION TOGGLE ---
      let toggleBtn = null;
      if (hasDesc) {
        toggleBtn = createEl('button', 'work-toggle');
        toggleBtn.type = 'button';
        toggleBtn.setAttribute('aria-expanded', 'false');
        toggleBtn.setAttribute('aria-label', 'Show project details');
        toggleBtn.innerHTML = '<span class="work-toggle-icon"></span>';
        titleRow.appendChild(toggleBtn);
      }
      
      const meta = createEl(
        'p',
        'work-meta',
        `${project.category} / ${project.year}`
      );
      
      info.appendChild(titleRow);
      info.appendChild(meta);
      
      // --- EXPANDABLE DESCRIPTION ---
      if (hasDesc) {
        const descWrap = createEl('div', 'work-description-wrap');
        const desc = createEl('p', 'work-description', project.description);
        descWrap.appendChild(desc);
        info.appendChild(descWrap);
        
        toggleBtn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          const isOpen = item.classList.toggle('is-expanded');
          toggleBtn.setAttribute('aria-expanded', String(isOpen));
        });
      }
      
      // --- VIEW PROJECT LINK ---
      if (hasLink) {
        const viewLink = createEl('a', 'work-view-link', 'View Project ↗');
        viewLink.href = project.link;
        viewLink.target = '_blank';
        viewLink.rel = 'noopener noreferrer';
        info.appendChild(viewLink);
      }
      
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
      
      const li = createEl('li', 'stack-item');
      
      li.dataset.tool = tool.name;
      
      const marker = createEl('span', 'stack-marker');
      
      const text = createEl('span', 'stack-text', tool.name);
      
      li.appendChild(marker);
      li.appendChild(text);
      
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
    
      <button
  class="contact-email"
  id="copy-email-btn"
  type="button"
  aria-label="Copy email address"
>
  <span class="contact-email-text">${config.site.email}</span>
  <span class="contact-email-icon" aria-hidden="true"></span>
  <span class="copied-tooltip">Copied</span>
</button>
    
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
          <option value="Web Development">Web Development</option>
          <option value="UI / UX Design">UI / UX Design</option>
          <option value="Backend Development">Backend Development</option>
          <option value="Full Stack Solution">Full Stack Solution</option>
          <option value="Other">Other</option>
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
  // --- copy email button (checkmark + color feedback) ---
  const initCopyEmail = () => {
    const btn = document.getElementById('copy-email-btn');
    if (!btn) return;
    
    let resetTimeout = null;
    
    btn.addEventListener('click', async () => {
      const email = config.site.email;
      
      try {
        await navigator.clipboard.writeText(email);
      } catch (err) {
        // fallback para sa mas lumang browsers
        const temp = document.createElement('textarea');
        temp.value = email;
        temp.style.position = 'fixed';
        temp.style.opacity = '0';
        document.body.appendChild(temp);
        temp.select();
        document.execCommand('copy');
        document.body.removeChild(temp);
      }
      
      btn.classList.add('is-copied');
      
      clearTimeout(resetTimeout);
      resetTimeout = setTimeout(() => {
        btn.classList.remove('is-copied');
      }, 1800);
    });
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
    let hasScrambled = false; 
    
    el.addEventListener('mouseenter', () => {
      if (!document.body.classList.contains('assembly-complete')) return;
      if (hasScrambled) return;
      
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
  
  // ==========================================
  //   ABOUT TECH STACK ANIMATION SCRIPT
  // ==========================================
  const initTechStackAnimation = () => {
    const items = document.querySelectorAll('.stack-item');
    if (!items.length) return;
    
    const list = items[0].parentElement;
    list.style.position = 'relative'; 
    const track = document.createElement('div');
    track.className = 'stack-rail-track';
    const dot = document.createElement('div');
    dot.className = 'stack-rail-dot';
    list.appendChild(track);
    list.appendChild(dot);
    
    let current = 0;
    
    const positionDot = (index) => {
      const item = items[index];
      const listRect = list.getBoundingClientRect();
      const itemRect = item.getBoundingClientRect();
      const y = (itemRect.top - listRect.top) + (itemRect.height / 2) - (dot.offsetHeight / 2);
      dot.style.transform = `translateY(${y}px)`;
    };
    
    const activate = (index) => {
      items.forEach(item => item.classList.remove('is-active'));
      items[index].classList.add('is-active');
      positionDot(index);
    };
    
    activate(current);
    
    setInterval(() => {
      current = (current + 1) % items.length;
      activate(current);
    }, 900);
  };
  
  // ============================================
  // PLAYGROUND - DEBUG SQUASH
  // ============================================
  const initPlayground = () => {
    const screen = document.getElementById('bug-screen');
    const counterEl = document.getElementById('squash-counter');
    const consoleEl = document.getElementById('squash-console');
    
    if (!screen || !counterEl || !consoleEl) return;
    
    // Prevent double init
    if (screen.dataset.initialized === 'true') return;
    screen.dataset.initialized = 'true';
    
    const TOTAL_BUGS = 10;
    let squashed = 0;
    let activeBugs = 0;
    let gameWon = false;
    let spawnInterval = null;
    
    const bugs = []; // for movement
    
    const bugMessages = [
      'bug_001 squashed (TypeError resolved)',
      'bug_002 squashed (null reference fixed)',
      'bug_003 squashed (race condition closed)',
      'bug_004 squashed (memory leak patched)',
      'bug_005 squashed (unhandled promise caught)',
      'bug_006 squashed (infinite loop broken)',
      'bug_007 squashed (CORS error resolved)',
      'bug_008 squashed (hydration mismatch fixed)',
      'bug_009 squashed (state desync corrected)',
      'bug_010 squashed (event listener cleaned)'
    ];
    
    const addConsoleLine = (text, type = '') => {
      const line = document.createElement('div');
      line.className = `console-line ${type}`;
      line.textContent = (type === 'success' || type === 'win') ? `✓ ${text}` : text;
      consoleEl.appendChild(line);
      consoleEl.scrollTop = consoleEl.scrollHeight;
    };
    
    const spawnBug = () => {
      if (gameWon || activeBugs >= 7 || squashed >= TOTAL_BUGS) return;
      
      const bug = document.createElement('div');
      bug.className = 'bug';
      
      const maxX = screen.clientWidth - 48;
      const maxY = screen.clientHeight - 48;
      
      let x = 20 + Math.random() * Math.max(maxX - 20, 10);
      let y = 20 + Math.random() * Math.max(maxY - 20, 10);
      
      // random velocity
      let vx = (Math.random() - 0.5) * 1.6;
      let vy = (Math.random() - 0.5) * 1.6;
      
      bug.style.left = `${x}px`;
      bug.style.top = `${y}px`;
      bug.style.opacity = '0';
      bug.style.transform = 'scale(0.4)';
      
      requestAnimationFrame(() => {
        bug.style.transition = 'opacity 0.35s ease, transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)';
        bug.style.opacity = '1';
        bug.style.transform = 'scale(1)';
      });
      
      const bugData = { el: bug, x, y, vx, vy, alive: true };
      bugs.push(bugData);
      
      bug.addEventListener('click', () => {
        if (!bugData.alive || gameWon) return;
        
        bugData.alive = false;
        bug.classList.add('is-squashed');
        activeBugs--;
        squashed++;
        
        counterEl.textContent = `squashed: ${squashed} / ${TOTAL_BUGS}`;
        
        const msg = bugMessages[squashed - 1] || `bug_${String(squashed).padStart(3, '0')} squashed`;
        addConsoleLine(msg, 'success');
        
        setTimeout(() => {
          if (bug.parentNode) bug.remove();
          const idx = bugs.indexOf(bugData);
          if (idx > -1) bugs.splice(idx, 1);
        }, 400);
        
        if (squashed >= TOTAL_BUGS) {
          triggerWin();
        }
      });
      
      screen.appendChild(bug);
      activeBugs++;
    };
    
    // Movement loop
    const moveBugs = () => {
      if (gameWon) return;
      
      const maxX = screen.clientWidth - 48;
      const maxY = screen.clientHeight - 48;
      
      bugs.forEach(b => {
        if (!b.alive) return;
        
        b.x += b.vx;
        b.y += b.vy;
        
        // bounce
        if (b.x <= 8 || b.x >= maxX) b.vx *= -1;
        if (b.y <= 8 || b.y >= maxY) b.vy *= -1;
        
        b.x = Math.max(8, Math.min(b.x, maxX));
        b.y = Math.max(8, Math.min(b.y, maxY));
        
        b.el.style.left = `${b.x}px`;
        b.el.style.top = `${b.y}px`;
      });
      
      requestAnimationFrame(moveBugs);
    };
    
    const triggerWin = () => {
      if (gameWon) return;
      gameWon = true;
      
      if (spawnInterval) {
        clearInterval(spawnInterval);
        spawnInterval = null;
      }
      
      // stop all bugs
      bugs.forEach(b => b.alive = false);
      
      screen.querySelectorAll('.bug').forEach(b => {
        b.classList.add('is-squashed');
        setTimeout(() => b.remove(), 300);
      });
      
      setTimeout(() => {
        screen.classList.add('win-state');
        screen.innerHTML = `<div class="win-message">SYSTEM STABLE ✓</div>`;
        addConsoleLine('ALL CLEAR — system stable', 'win');
        
        document.body.classList.add('matrix-mode');
        startMatrixRain();
      }, 450);
    };
    
    // Initial bugs
    setTimeout(() => {
      spawnBug();
      setTimeout(spawnBug, 450);
      setTimeout(spawnBug, 900);
    }, 250);
    
    // Continuous spawn
    spawnInterval = setInterval(() => {
      if (gameWon || squashed >= TOTAL_BUGS) {
        clearInterval(spawnInterval);
        return;
      }
      if (activeBugs < 6) spawnBug();
    }, 1300);
    
    // Start movement
    moveBugs();
  };
  
  // --- Matrix Rain ---
  const startMatrixRain = () => {
    if (document.getElementById('matrix-canvas')) return;
    
    const canvas = document.createElement('canvas');
    canvas.id = 'matrix-canvas';
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    let width, height, columns, drops;
    
    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF<>[]{}|/\\';
    
    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      columns = Math.floor(width / 18);
      drops = Array(columns).fill(1);
    };
    
    resize();
    window.addEventListener('resize', resize);
    
    const draw = () => {
      ctx.fillStyle = 'rgba(12, 12, 11, 0.07)';
      ctx.fillRect(0, 0, width, height);
      
      ctx.fillStyle = '#4ade80';
      ctx.font = '14px monospace';
      
      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * 18, drops[i] * 18);
        
        if (drops[i] * 18 > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      
      requestAnimationFrame(draw);
    };
    
    draw();
    
    // Smooth fade in
    requestAnimationFrame(() => {
      canvas.style.opacity = '0.18';
    });
  };
  
  // --- init all ---
  renderNav();
  renderHero();
  renderTools();
  renderServices();   
  renderWork();
  initPlayground();
  renderAbout();
  renderContact();
  initCopyEmail();
  renderFooter(); 
  initScrollReveal();
  initScrambleEffect();
  initTechStackAnimation();
  
  setTimeout(runAssemblySequence, 120);
  
  // Redraw wireframe when returning near the top
  let wireframeRedrawTimeout;
  window.addEventListener('scroll', () => {
    if (window.scrollY < 120) {
      clearTimeout(wireframeRedrawTimeout);
      wireframeRedrawTimeout = setTimeout(() => {
        const tools = document.querySelectorAll('.tool-item');
        const svg = document.getElementById('wireframe');
        if (tools.length && svg) {
          drawWireframe(tools, svg);
        }
      }, 80);
    }
  }, { passive: true });
  
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
      
      button.textContent = "SENT ✓";
      button.classList.add("is-success");
      
      status.textContent = "Project inquiry sent successfully. I'll get back to you within 24 hours.";
      
      setTimeout(() => {
        button.textContent = originalText;
        button.classList.remove("is-success");
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