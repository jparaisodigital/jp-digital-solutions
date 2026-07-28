// ============================================
// JPARAISO DIGITAL SOLUTIONS - CONFIGURATION
// ============================================
// Edit values here. Wag mag-edit sa HTML/CSS/JS directly.
// ============================================

const config = {

  // --- SITE INFO ---
  site: {
    name: "JP DIGITAL SOLUTIONS",
    title: "Full Stack Development & Digital Solutions",
    email: "jparaiso.digital@gmail.com",
    location: "Philippines",
    tagline: "Properly built. Easily used."
  },

  // --- NAVIGATION ---
  nav: [
    { label: "Home", href: "#home" },
    { label: "Services", href: "#services" },
    { label: "Work", href: "#work" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" }
  ],

  // --- FLOATING TOOLS ---
// x,y = position percentage (0-100)
// size = pixels
// Add/remove tools by editing this array

  // --- FLOATING TOOLS ---
  tools: [
    {
      name: "React",
      src: "assets/images/tools/react.svg",
      color:"#61DAFB",
      position: { desktop: { x: 10, y: 22 }, tablet: { x: 15, y: 20 }, mobile: { x: 5, y: 18 } },
      size: { desktop: 56, tablet: 48, mobile: 36 },
      float: { duration: 6.3, delay: 0.2, amplitude: 18, driftX: 4 }
    },
    {
      name: "JavaScript",
      src: "assets/images/tools/javascript.svg",
      color:"#5FA04E",
      position: { desktop: { x: 82, y: 18 }, tablet: { x: 75, y: 15 }, mobile: { x: 80, y: 17 } },
      size: { desktop: 52, tablet: 44, mobile: 36 },
      float: { duration: 5.7, delay: 1.4, amplitude: 12, driftX: -2 }
    },
    {
      name: "Node.js",
      src: "assets/images/tools/nodedotjs.svg",
      color:"#5FA04E",
      position: { desktop: { x: 90, y: 76 }, tablet: { x: 85, y: 70 }, mobile: { x: 83, y: 70 } },
      size: { desktop: 64, tablet: 56, mobile: 36 },
      float: { duration: 7.1, delay: 0.8, amplitude: 24, driftX: 6 }
    },
    {
      name: "Git",
      src: "assets/images/tools/git.svg",
      color:"#F05032",
      position: { desktop: { x: 12, y: 82 }, tablet: { x: 10, y: 75 }, mobile: { x: 10, y: 65 } },
      size: { desktop: 48, tablet: 40, mobile: 36 },
      float: { duration: 5.2, delay: 2.0, amplitude: 10, driftX: -3 }
    },
    {
      name: "HTML5",
      src: "assets/images/tools/html5.svg",
      color:"#E34F26",
      position: { desktop: { x: 50, y: 15 }, tablet: { x: 50, y: 10 }, mobile: { x: 45, y: 15 } },
      size: { desktop: 52, tablet: 44, mobile: 36 },
      float: { duration: 6.8, delay: 1.1, amplitude: 20, driftX: 2 }
    },
    {
      name: "CSS3",
      src: "assets/images/tools/css.svg",
      color:"#1572B6",
      position: { desktop: { x: 14, y: 48 }, tablet: { x: 8, y: 50 }, mobile: { x: 10, y: 37 } },
      size: { desktop: 52, tablet: 44, mobile: 36 },
      float: { duration: 5.9, delay: 2.5, amplitude: 14, driftX: -5 }
    },
    
    {
      name: "VS Code",
      src: "assets/images/tools/vscode.svg",
      color:"#007ACC",
      position: { desktop: { x: 84, y: 48 }, tablet: { x: 80, y: 35 }, mobile: { x: 80, y: 40 } },
      size: { desktop: 50, tablet: 42, mobile: 36 },
      float: { duration: 6.0, delay: 1.8, amplitude: 16, driftX: -4 }
    },
    {
      name: "GitHub",
      src: "assets/images/tools/github.svg",
      color:"#181717",
      position: { desktop: { x: 65, y: 90 }, tablet: { x: 70, y: 85 }, mobile: { x: 70, y: 85 } },
      size: { desktop: 56, tablet: 48, mobile: 36 },
      float: { duration: 7.3, delay: 0.5, amplitude: 26, driftX: 5 }
    },
    {
      name: "Netlify",
      src: "assets/images/tools/netlify.svg",
      color:"#00C7B7",
      position: { desktop: { x: 34, y: 18 }, tablet: { x: 30, y: 85 }, mobile: { x: 20, y: 85 } },
      size: { desktop: 48, tablet: 40, mobile: 36 },
      float: { duration: 5.5, delay: 2.9, amplitude: 11, driftX: 3 }
    },
    {
      name: "Supabase",
      src: "assets/images/tools/supabase.svg",
      color:"#3ECF8E",
      position: { desktop: { x: 40, y: 84 }, tablet: { x: 45, y: 30 }, mobile: { x: 45, y: 30 } },
      size: { desktop: 54, tablet: 46, mobile: 36 },
      float: { duration: 6.7, delay: 1.0, amplitude: 22, driftX: -6 }
    }
  ],

  // --- SERVICES ---
services: [
  {
    title: "Web Development",
    desc: "Fast, responsive, and scalable web applications built with modern technologies."
  },
  {
    title: "UI/UX Design",
    desc: "Clean, intuitive interfaces designed for optimal user experience."
  },
  {
    title: "Backend Systems",
    desc: "Robust APIs, database architecture, and server-side solutions."
  },
  {
    title: "Full Stack Solutions",
    desc: "End-to-end development from concept to deployment."
  }
],

  // --- PROJECTS ---
  projects: [
    {
      title: "TATTOO STUDIO",
      category: "Web Application",
      year: "2026",
      image: "assets/images/projects/tattoo.PNG",
      description: "Tattoo Studio",
      link: "https://tattoo-studio-demo.netlify.app/",
      status: "live"
    },

    {
      title: "E-COMMERCE PLATFORM",
      category: "Web Application",
      year: "2026",
      image: "assets/images/projects/ecommerce.PNG",
      description: "",
      link: "#",
      status: "coming"
    },

    {
      title: "COFFEE SHOP",
      category: "Web Application",
      year: "2026",
      image: "assets/images/projects/work.PNG",
      description: "",
      link: "#",
      status: "coming"
    },

    {
      title: "BARBER SHOP",
      category: "Web Application",
      year: "2026",
      image: "assets/images/projects/work.PNG",
      description: "",
      link: "#",
      status: ""
    }
    
  ],

  // --- DESIGN TOKENS ---
  design: {
    colors: {
      bg: "#F0EDE8",           // dirty white background
      bgDark: "#1A1916",       // dark section background
      text: "#1A1916",         // primary text
      textMuted: "#6B6860",    // secondary text
      border: "#D5D0C8",       // borders and dividers
      accent: "#3D3D3D",       // accent elements
      inverse: "#F0EDE8"       // text on dark bg
    },
    fonts: {
      heading: "'Space Grotesk', monospace",
      body: "'Inter', sans-serif"
    },
    spacing: {
      sectionPadding: "100px",
      containerMax: "1200px",
      gridGap: "32px"
    }
  }
};