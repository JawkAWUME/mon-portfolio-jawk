import { useState, useEffect, useRef, type CSSProperties } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

// ── Font injection ──────────────────────────────────────────────────────────
const FontInjector: React.FC = () => {
  useEffect(() => {
    const l = document.createElement("link");
    l.rel = "stylesheet";
    l.href =
      "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&family=Bebas+Neue&family=JetBrains+Mono:wght@300;400;500;700&family=Inter:wght@300;400;500;600;700;800&display=swap";
    document.head.appendChild(l);
  }, []);
  return null;
};

// ── Palette ─────────────────────────────────────────────────────────────────
const C = {
  navy: "#0A1628",
  navy2: "#0F1E38",
  navy3: "#162340",
  navy4: "#0B1A30",
  yellow: "#FFCC00",
  yellowL: "#FFE566",
  yellowD: "#E6B800",
  yellowO: "rgba(255,204,0,0.15)",
  white: "#FAFAFA",
  white2: "rgba(250,250,250,0.85)",
  white3: "rgba(250,250,250,0.65)",
  muted: "rgba(250,250,250,0.45)",
  muted2: "rgba(250,250,250,0.2)",
  muted3: "rgba(250,250,250,0.1)",
  glass: "rgba(255,255,255,0.04)",
  glassB: "rgba(255,255,255,0.08)",
  border: "rgba(255,204,0,0.18)",
  borderW: "rgba(255,255,255,0.1)",
  shadow: "rgba(0,0,0,0.3)",
};

// ── Types ──────────────────────────────────────────────────────────────────
interface Skill {
  name: string;
  logo: string;
  glow: string;
  level: number;
}

interface SkillCategory {
  id: string;
  label: string;
  tagline: string;
  bg: string;
  pattern: string;
  accent: string;
  skills: Skill[];
}

interface ExperienceItem {
  text: string;
  icon: string;
}

interface Experience {
  period: string;
  company: string;
  role: string;
  loc: string;
  color: string;
  items: ExperienceItem[];
  logo: React.ReactNode;
}

interface Project {
  title: string;
  stack: string[];
  desc: string;
  tag: string;
  tagC: string;
}

// ── Skills data with devicon logos ──────────────────────────────────────────
const DEVICON = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons";
const SKILL_CATS: SkillCategory[] = [
  {
    id: "frontend",
    label: "Frontend",
    tagline: "Interfaces & Expériences",
    bg: "radial-gradient(ellipse at 20% 50%, rgba(255,204,0,0.1) 0%, transparent 65%), radial-gradient(ellipse at 80% 20%, rgba(0,100,255,0.07) 0%, transparent 55%)",
    pattern: "mesh",
    accent: "#FFCC00",
    skills: [
      { name: "Angular", logo: `${DEVICON}/angularjs/angularjs-original.svg`, glow: "#dd0031", level: 90 },
      { name: "React", logo: `${DEVICON}/react/react-original.svg`, glow: "#61dafb", level: 85 },
      { name: "Next.js", logo: `${DEVICON}/nextjs/nextjs-original.svg`, glow: "#ffffff", level: 80 },
      { name: "Vue.js", logo: `${DEVICON}/vuejs/vuejs-original.svg`, glow: "#42b883", level: 70 },
      { name: "Flutter", logo: `${DEVICON}/flutter/flutter-original.svg`, glow: "#54c5f8", level: 75 },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    tagline: "APIs & Architectures",
    bg: "radial-gradient(ellipse at 80% 30%, rgba(255,204,0,0.08) 0%, transparent 60%), radial-gradient(ellipse at 10% 70%, rgba(100,0,200,0.06) 0%, transparent 55%)",
    pattern: "circuit",
    accent: "#34D399",
    skills: [
      { name: "NestJS", logo: `${DEVICON}/nestjs/nestjs-original.svg`, glow: "#e0234e", level: 80 },
      { name: "Django", logo: `${DEVICON}/django/django-plain.svg`, glow: "#092e20", level: 65 },
      { name: "Flask", logo: `${DEVICON}/flask/flask-original.svg`, glow: "#ffffff", level: 75 },
      { name: "FastAPI", logo: `${DEVICON}/fastapi/fastapi-original.svg`, glow: "#009688", level: 70 },
      { name: "Spring", logo: `${DEVICON}/spring/spring-original.svg`, glow: "#6db33f", level: 60 },
    ],
  },
  {
    id: "data",
    label: "Data & IA",
    tagline: "Intelligence & Données",
    bg: "radial-gradient(ellipse at 50% 0%, rgba(255,204,0,0.12) 0%, transparent 55%), radial-gradient(ellipse at 20% 80%, rgba(0,200,100,0.06) 0%, transparent 60%)",
    pattern: "hex",
    accent: "#60A5FA",
    skills: [
      { name: "Python", logo: `${DEVICON}/python/python-original.svg`, glow: "#ffd43b", level: 85 },
      { name: "MongoDB", logo: `${DEVICON}/mongodb/mongodb-original.svg`, glow: "#47a248", level: 75 },
      { name: "MySQL", logo: `${DEVICON}/mysql/mysql-original.svg`, glow: "#4479a1", level: 70 },
      { name: "GPT-4o", logo: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg", glow: "#10a37f", level: 80 },
    ],
  },
  {
    id: "devops",
    label: "DevOps",
    tagline: "Infrastructure & Déploiement",
    bg: "radial-gradient(ellipse at 90% 50%, rgba(255,204,0,0.09) 0%, transparent 60%), radial-gradient(ellipse at 0% 30%, rgba(0,150,255,0.06) 0%, transparent 55%)",
    pattern: "terminal",
    accent: "#F472B6",
    skills: [
      { name: "Docker", logo: `${DEVICON}/docker/docker-original.svg`, glow: "#2496ed", level: 80 },
      { name: "Linux", logo: `${DEVICON}/linux/linux-original.svg`, glow: "#fcc624", level: 75 },
      { name: "Git", logo: `${DEVICON}/git/git-original.svg`, glow: "#f05032", level: 85 },
      { name: "Directus", logo: "https://directus.io/favicon.ico", glow: "#6644ff", level: 70 },
    ],
  },
  {
    id: "design",
    label: "Design",
    tagline: "UI, Prototype & Création",
    bg: "radial-gradient(ellipse at 30% 60%, rgba(255,204,0,0.11) 0%, transparent 60%), radial-gradient(ellipse at 70% 10%, rgba(255,80,80,0.06) 0%, transparent 55%)",
    pattern: "canvas",
    accent: "#A78BFA",
    skills: [
      { name: "Figma", logo: `${DEVICON}/figma/figma-original.svg`, glow: "#ff7262", level: 80 },
      { name: "Illustrator", logo: `${DEVICON}/illustrator/illustrator-plain.svg`, glow: "#ff9a00", level: 65 },
      { name: "Canva", logo: "https://upload.wikimedia.org/wikipedia/commons/b/bb/Canva_Logo.svg", glow: "#00c4cc", level: 70 },
    ],
  },
];

// ── Logo components for experiences ────────────────────────────────────────
const LogoSenegalNumerique: React.FC = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
    <rect width="40" height="40" rx="10" fill="#0A1628" stroke="#FFCC00" strokeWidth="1.5" />
    <text x="20" y="28" textAnchor="middle" fill="#FFCC00" fontFamily="'Bebas Neue', sans-serif" fontSize="22" fontWeight="400">SN</text>
  </svg>
);

const LogoAIBoostez: React.FC = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
    <rect width="40" height="40" rx="10" fill="#0A1628" stroke="#60A5FA" strokeWidth="1.5" />
    <text x="20" y="28" textAnchor="middle" fill="#60A5FA" fontFamily="'Bebas Neue', sans-serif" fontSize="20" fontWeight="400">AI</text>
  </svg>
);

const LogoMemorable: React.FC = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
    <rect width="40" height="40" rx="10" fill="#0A1628" stroke="#F472B6" strokeWidth="1.5" />
    <text x="20" y="28" textAnchor="middle" fill="#F472B6" fontFamily="'Bebas Neue', sans-serif" fontSize="20" fontWeight="400">ME</text>
  </svg>
);

const LogoYeevii: React.FC = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
    <rect width="40" height="40" rx="10" fill="#0A1628" stroke="#A78BFA" strokeWidth="1.5" />
    <text x="20" y="28" textAnchor="middle" fill="#A78BFA" fontFamily="'Bebas Neue', sans-serif" fontSize="20" fontWeight="400">YT</text>
  </svg>
);

const EXPERIENCES: Experience[] = [
  {
    period: "Fév – Déc 2025",
    company: "Senegal Numerique SA",
    role: "Dév. Angular",
    loc: "Dakar",
    color: "#FFCC00",
    logo: <LogoSenegalNumerique />,
    items: [
      { text: "Internationalisation Angular — Congrès DAPH", icon: "🌐" },
      { text: "Architecture microservices Docker + Ubuntu", icon: "🐳" },
      { text: "Stack Directus BaaS (SSO, cache, backups)", icon: "🗄️" },
      { text: "Doc. technique Maarch Courrier", icon: "📋" },
    ],
  },
  {
    period: "Fév – Avr 2025",
    company: "AI Boostez",
    role: "NestJS / Next.js",
    loc: "Remote",
    color: "#60A5FA",
    logo: <LogoAIBoostez />,
    items: [
      { text: "App de rédaction auto via ChatGPT-4o", icon: "🤖" },
      { text: "Pipeline de génération de contenu", icon: "⚙️" },
      { text: "Base de données MongoDB", icon: "🍃" },
    ],
  },
  {
    period: "Sep – Nov 2024",
    company: "Senegal Numerique SA",
    role: "Mobile Flutter",
    loc: "Dakar",
    color: "#34D399",
    logo: <LogoSenegalNumerique />,
    items: [
      { text: "Portail Mobile Paiement (Orange Money + Wave)", icon: "💸" },
      { text: "Application de Gestion de Courriers", icon: "📬" },
    ],
  },
  {
    period: "Sep 2023 – Aoû 2024",
    company: "Memorable Experience",
    role: "Full Stack (Part-time)",
    loc: "Remote",
    color: "#F472B6",
    logo: <LogoMemorable />,
    items: [
      { text: "Quiz d'évaluation des apprenants", icon: "📝" },
      { text: "Traitement CSV & reporting", icon: "📊" },
      { text: "Plateforme d'attestations de formation", icon: "🎓" },
    ],
  },
  {
    period: "Juil – Aoû 2023",
    company: "Yeevii Togo",
    role: "Vue.js",
    loc: "Remote",
    color: "#A78BFA",
    logo: <LogoYeevii />,
    items: [
      { text: "Site e-commerce VueJS + FakeAPI", icon: "🛒" },
    ],
  },
];

const PROJECTS: Project[] = [
  {
    title: "NetConfig Dashboard",
    stack: ["Angular", "NestJS", "Leaflet", "xterm.js"],
    desc: "Dashboard réseau avec carte SVG Sénégal, terminal SSH WebSocket, modération d'équipements.",
    tag: "Production",
    tagC: "#22c55e",
  },
  {
    title: "Teranga TE — Landing",
    stack: ["React", "Framer Motion", "Supabase", "i18n"],
    desc: "Site vitrine ICT & Énergie au Sahel. Vidéo hero plein écran, FR/EN, carte Leaflet custom.",
    tag: "En cours",
    tagC: "#FFCC00",
  },
  {
    title: "AM Fragrance",
    stack: ["React", "CSS", "WhatsApp API"],
    desc: "E-commerce single-page 28 produits, filtrage temps réel, checkout WhatsApp.",
    tag: "Livré",
    tagC: "#60a5fa",
  },
  {
    title: "Content AI Writer",
    stack: ["NestJS", "Next.js", "ChatGPT-4o", "MongoDB"],
    desc: "Rédaction manuelle & automatique via LLM, gestion de projets de contenu.",
    tag: "Livré",
    tagC: "#60a5fa",
  },
  {
    title: "Mobile Payment Portal",
    stack: ["Flutter", "Orange Money", "Wave"],
    desc: "Portail mobile intégrant les paiements West Africa pour Senegal Services.",
    tag: "Livré",
    tagC: "#60a5fa",
  },
];

// ── Patterns (SVG) ─────────────────────────────────────────────────────────
const PatternMesh: React.FC = () => (
  <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.06, pointerEvents: "none" }} viewBox="0 0 400 300">
    <defs>
      <pattern id="mesh-grid" width="50" height="50" patternUnits="userSpaceOnUse">
        <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#FFCC00" strokeWidth="0.5" />
      </pattern>
      <pattern id="mesh-cross" width="50" height="50" patternUnits="userSpaceOnUse">
        <path d="M 0 50 L 50 0" fill="none" stroke="#FFCC00" strokeWidth="0.5" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#mesh-grid)" />
    <rect width="100%" height="100%" fill="url(#mesh-cross)" />
    {Array.from({ length: 8 }, (_, i) => (
      <circle key={i} cx={Math.random() * 400} cy={Math.random() * 300} r="1.5" fill="#FFCC00" opacity="0.5" />
    ))}
  </svg>
);

const PatternCircuit: React.FC = () => (
  <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.07, pointerEvents: "none" }} viewBox="0 0 400 300">
    <defs>
      <filter id="circuit-glow">
        <feGaussianBlur stdDeviation="1.5" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    {[
      [40, 60, 200, 60],
      [200, 60, 200, 140],
      [200, 140, 320, 140],
      [320, 140, 320, 240],
      [120, 60, 120, 180],
      [120, 180, 280, 180],
      [80, 120, 120, 120],
      [240, 60, 240, 100],
      [280, 180, 360, 180],
    ].map(([x1, y1, x2, y2], i) => (
      <g key={i} filter="url(#circuit-glow)">
        <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#FFCC00" strokeWidth="1.2" opacity="0.6" />
        <circle cx={x1} cy={y1} r="3.5" fill="#FFCC00" opacity="0.8" />
      </g>
    ))}
  </svg>
);

const PatternHex: React.FC = () => {
  const pts: React.ReactNode[] = [];
  for (let row = 0; row < 6; row++)
    for (let col = 0; col < 9; col++) {
      const x = col * 52 + (row % 2) * 26;
      const y = row * 44;
      pts.push(
        <polygon
          key={`${row}-${col}`}
          points={`${x},${y + 12} ${x + 22},${y} ${x + 44},${y + 12} ${x + 44},${y + 34} ${x + 22},${y + 46} ${x},${y + 34}`}
          fill="none"
          stroke="#FFCC00"
          strokeWidth="0.7"
        />
      );
    }
  return (
    <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.06, pointerEvents: "none" }} viewBox="0 0 450 300">
      {pts}
    </svg>
  );
};

const PatternTerminal: React.FC = () => (
  <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.07, pointerEvents: "none" }} viewBox="0 0 400 300">
    {["$ npm run build", "▶ Compiled successfully", "$ docker build .", "✓ Image pushed", "$ git push origin main", "→ Deployed to prod"].map(
      (t, i) => (
        <g key={i} opacity={0.7 - i * 0.1}>
          <text x="16" y={36 + i * 40} fill="#FFCC00" fontFamily="monospace" fontSize="11">
            {t}
          </text>
        </g>
      )
    )}
  </svg>
);

const PatternCanvas: React.FC = () => (
  <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.07, pointerEvents: "none" }} viewBox="0 0 400 300">
    <circle cx="80" cy="80" r="50" fill="none" stroke="#FFCC00" strokeWidth="1.2" />
    <rect x="160" y="40" width="80" height="80" fill="none" stroke="#FFCC00" strokeWidth="1.2" transform="rotate(20,200,80)" />
    <polygon points="300,30 360,120 240,120" fill="none" stroke="#FFCC00" strokeWidth="1.2" />
    <circle cx="340" cy="200" r="35" fill="none" stroke="#FFCC00" strokeWidth="1.2" />
    <line x1="40" y1="180" x2="180" y2="260" stroke="#FFCC00" strokeWidth="1.2" />
    <line x1="180" y1="260" x2="300" y2="190" stroke="#FFCC00" strokeWidth="1.2" />
    <line x1="40" y1="200" x2="300" y2="200" stroke="#FFCC00" strokeWidth="0.5" strokeDasharray="4,4" />
  </svg>
);

const PATTERNS: Record<string, React.ReactNode> = {
  mesh: <PatternMesh />,
  circuit: <PatternCircuit />,
  hex: <PatternHex />,
  terminal: <PatternTerminal />,
  canvas: <PatternCanvas />,
};

// ── Particles ──────────────────────────────────────────────────────────────
const Particles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let W = (canvas.width = window.innerWidth),
      H = (canvas.height = window.innerHeight);

    const particles = Array.from({ length: 100 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 2 + 0.5,
      life: Math.random(),
      maxLife: 0.01,
    }));

    let animationId: number;

    const animate = () => {
      ctx.clearRect(0, 0, W, H);

      particles.forEach((p) => {
        p.life += p.maxLife;
        if (p.life > 1) p.life = 0;
        const alpha = p.life < 0.5 ? p.life * 2 : (1 - p.life) * 2;

        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,204,0,${alpha * 0.4})`;
        ctx.fill();

        const mx = mouseRef.current.x;
        const my = mouseRef.current.y;
        if (mx && my) {
          const dx = p.x - mx;
          const dy = p.y - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mx, my);
            ctx.strokeStyle = `rgba(255,204,0,${(1 - dist / 120) * 0.1})`;
            ctx.stroke();
          }
        }
      });

      particles.forEach((a, i) => {
        particles.slice(i + 1).forEach((b) => {
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(255,204,0,${(1 - dist / 100) * 0.05})`;
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    const onResize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", opacity: 0.8 }} />;
};

// ── Custom cursor ──────────────────────────────────────────────────────────
const Cursor: React.FC = () => {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const tgt = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      tgt.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMouseMove);

    let animationId: number;
    const animate = () => {
      pos.current.x += (tgt.current.x - pos.current.x) * 0.12;
      pos.current.y += (tgt.current.y - pos.current.y) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${pos.current.x - 18}px, ${pos.current.y - 18}px)`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${tgt.current.x - 4}px, ${tgt.current.y - 4}px)`;
      }
      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          width: 36,
          height: 36,
          border: "1.5px solid rgba(255,204,0,.5)",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9999,
          top: 0,
          left: 0,
          mixBlendMode: "screen",
          boxShadow: "0 0 12px rgba(255,204,0,0.2)",
        }}
      />
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          width: 8,
          height: 8,
          background: "#FFCC00",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9999,
          top: 0,
          left: 0,
          boxShadow: "0 0 8px rgba(255,204,0,0.8)",
        }}
      />
    </>
  );
};

// ── Glitch ─────────────────────────────────────────────────────────────────
const Glitch: React.FC<{ text: string; style?: CSSProperties }> = ({ text, style = {} }) => {
  const [g, setG] = useState(false);
  const [offset1, setOffset1] = useState({ x: 0, y: 0 });
  const [offset2, setOffset2] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const iv = setInterval(() => {
      setG(true);
      setOffset1({ x: (Math.random() - 0.5) * 8, y: (Math.random() - 0.5) * 3 });
      setOffset2({ x: (Math.random() - 0.5) * 6, y: (Math.random() - 0.5) * 3 });
      setTimeout(() => setG(false), 200);
    }, 5000);
    return () => clearInterval(iv);
  }, []);

  return (
    <div style={{ position: "relative", display: "inline-block", ...style }}>
      <span style={{ visibility: g ? "hidden" : "visible", fontFamily: "'Bebas Neue',sans-serif" }}>{text}</span>
      {g && (
        <>
          <span
            style={{
              position: "absolute",
              inset: 0,
              color: "#FF3366",
              clipPath: "polygon(0 15%, 100% 5%, 100% 45%, 0 35%)",
              transform: `translate(${offset1.x}px, ${offset1.y}px)`,
              fontFamily: "'Bebas Neue',sans-serif",
            }}
          >
            {text}
          </span>
          <span
            style={{
              position: "absolute",
              inset: 0,
              color: "#00D4FF",
              clipPath: "polygon(0 55%, 100% 45%, 100% 85%, 0 75%)",
              transform: `translate(${offset2.x}px, ${offset2.y}px)`,
              fontFamily: "'Bebas Neue',sans-serif",
            }}
          >
            {text}
          </span>
          <span
            style={{
              position: "absolute",
              inset: 0,
              color: "#FFCC00",
              clipPath: "polygon(0 80%, 100% 70%, 100% 100%, 0 90%)",
              transform: `translate(${-offset1.x}px, ${-offset1.y}px)`,
              fontFamily: "'Bebas Neue',sans-serif",
            }}
          >
            {text}
          </span>
        </>
      )}
    </div>
  );
};

// ── Terminal typer ─────────────────────────────────────────────────────────
const Typer: React.FC<{ lines: string[] }> = ({ lines }) => {
  const [cur, setCur] = useState(0);
  const [typed, setTyped] = useState("");
  const [done, setDone] = useState<string[]>([]);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const cursorInterval = setInterval(() => setShowCursor((prev) => !prev), 530);
    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    if (cur >= lines.length) return;
    let i = 0;
    const iv = setInterval(() => {
      if (i <= lines[cur].length) {
        setTyped(lines[cur].slice(0, i));
        i++;
      } else {
        clearInterval(iv);
        setDone((d) => [...d, lines[cur]]);
        setTyped("");
        setTimeout(() => setCur((c) => c + 1), 500);
      }
    }, 35);
    return () => clearInterval(iv);
  }, [cur, lines]);

  return (
    <div
      style={{
        fontFamily: "'JetBrains Mono',monospace",
        fontSize: 12,
        color: "rgba(250,250,250,0.6)",
        lineHeight: 1.9,
        padding: "4px 0",
      }}
    >
      {done.map((l, i) => (
        <div key={i}>
          <span style={{ color: C.yellow, marginRight: 6 }}>$</span>
          <span>{l}</span>
        </div>
      ))}
      {cur < lines.length && (
        <div>
          <span style={{ color: C.yellow, marginRight: 6 }}>$</span>
          <span>{typed}</span>
          <span
            style={{
              opacity: showCursor ? 1 : 0,
              transition: "opacity .1s",
              color: C.yellow,
            }}
          >
            █
          </span>
        </div>
      )}
    </div>
  );
};

// ── 3D Tilt ────────────────────────────────────────────────────────────────
const Tilt: React.FC<{
  children: React.ReactNode;
  style?: CSSProperties;
  maxTilt?: number;
  glareOpacity?: number;
}> = ({ children, style = {}, maxTilt = 12, glareOpacity = 0.18 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [rot, setRot] = useState({ x: 0, y: 0 });
  const [shine, setShine] = useState({ x: 50, y: 50, op: 0 });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      ref={ref}
      onMouseMove={(e) => {
        const b = ref.current?.getBoundingClientRect();
        if (!b) return;
        const x = (e.clientX - b.left) / b.width - 0.5;
        const y = (e.clientY - b.top) / b.height - 0.5;
        setRot({ x: y * -maxTilt, y: x * maxTilt });
        setShine({
          x: ((e.clientX - b.left) / b.width) * 100,
          y: ((e.clientY - b.top) / b.height) * 100,
          op: glareOpacity,
        });
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setRot({ x: 0, y: 0 });
        setIsHovered(false);
        setShine((s) => ({ ...s, op: 0 }));
      }}
      style={{
        transform: `perspective(1200px) rotateX(${rot.x}deg) rotateY(${rot.y}deg) scale3d(${
          isHovered ? 1.02 : 1
        }, ${isHovered ? 1.02 : 1}, 1)`,
        transition: "transform 0.15s ease-out",
        position: "relative",
        overflow: "hidden",
        ...style,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          pointerEvents: "none",
          background: `
            radial-gradient(circle at ${shine.x}% ${shine.y}%, rgba(255,204,0,${shine.op}), transparent 60%),
            linear-gradient(135deg, rgba(255,255,255,${shine.op * 0.3}) 0%, transparent 50%)
          `,
          transition: "opacity .3s",
          zIndex: 2,
        }}
      />
      {children}
    </div>
  );
};

// ── Reveal text ────────────────────────────────────────────────────────────
const RevealText: React.FC<{ children: React.ReactNode; style?: CSSProperties; delay?: number }> = ({
  children,
  style = {},
  delay = 0,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }}
    style={style}
  >
    {children}
  </motion.div>
);

// ── Section header ─────────────────────────────────────────────────────────
const SH: React.FC<{ tag: string; title: string; sub?: string }> = ({ tag, title, sub }) => (
  <RevealText style={{ marginBottom: 64, textAlign: "center" }}>
    <div
      style={{
        fontFamily: "'JetBrains Mono',monospace",
        fontSize: 11,
        color: C.yellow,
        letterSpacing: ".3em",
        textTransform: "uppercase",
        marginBottom: 14,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 14,
      }}
    >
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: 50 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        style={{ height: 1, background: `linear-gradient(90deg, transparent, ${C.yellow})` }}
      />
      <motion.span
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        {tag}
      </motion.span>
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: 50 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        style={{ height: 1, background: `linear-gradient(90deg, ${C.yellow}, transparent)` }}
      />
    </div>
    <h2
      style={{
        fontFamily: "'Bebas Neue',sans-serif",
        fontSize: "clamp(48px,7vw,90px)",
        fontWeight: 400,
        color: C.white,
        letterSpacing: ".05em",
        lineHeight: 1,
        margin: "0 0 18px",
        textShadow: "0 0 40px rgba(255,204,0,0.15)",
      }}
    >
      {title}
    </h2>
    {sub && (
      <p
        style={{
          fontSize: 15,
          color: C.muted,
          maxWidth: 540,
          margin: "0 auto",
          lineHeight: 1.7,
          fontFamily: "'Plus Jakarta Sans',sans-serif",
          fontWeight: 400,
        }}
      >
        {sub}
      </p>
    )}
  </RevealText>
);

// ── Nav ────────────────────────────────────────────────────────────────────
const NAV: { id: string; l: string }[] = [
  { id: "hero", l: "Home" },
  { id: "about", l: "Profil" },
  { id: "skills", l: "Stack" },
  { id: "xp", l: "Expériences" },
  { id: "projects", l: "Projets" },
  { id: "contact", l: "Contact" },
];

const Nav: React.FC<{ active: string }> = ({ active }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? scrollY / docHeight : 0);
      setIsScrolled(scrollY > 20);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        height: 68,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 clamp(20px,5vw,80px)",
        background: isScrolled ? "rgba(10,22,40,0.9)" : "rgba(10,22,40,0.75)",
        backdropFilter: "blur(28px)",
        WebkitBackdropFilter: "blur(28px)",
        borderBottom: `1px solid ${isScrolled ? C.border : "transparent"}`,
        transition: "background .3s, border-color .3s",
      }}
    >
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          height: 1.5,
          background: `linear-gradient(90deg, ${C.yellow}, ${C.yellowL}, ${C.yellow})`,
          width: `${scrollProgress * 100}%`,
          transition: "width .1s linear",
        }}
      />
      <div
        style={{
          fontFamily: "'Bebas Neue',sans-serif",
          fontSize: 22,
          color: C.yellow,
          letterSpacing: ".12em",
          display: "flex",
          alignItems: "center",
          gap: 6,
        }}
      >
        <span
          style={{
            display: "inline-block",
            width: 8,
            height: 8,
            background: C.yellow,
            borderRadius: "50%",
            marginRight: 4,
            boxShadow: "0 0 8px rgba(255,204,0,0.6)",
          }}
        />
        JASON<span style={{ color: C.white, opacity: 0.4 }}>.DEV</span>
      </div>
      <div style={{ display: "flex", gap: 4, background: C.glass, borderRadius: 10, padding: 3 }}>
        {NAV.map((n) => (
          <motion.button
            key={n.id}
            onClick={() => scrollTo(n.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              fontFamily: "'JetBrains Mono',monospace",
              fontSize: 11,
              letterSpacing: ".1em",
              color: active === n.id ? C.navy : C.muted,
              background: active === n.id ? C.yellow : "transparent",
              border: "none",
              borderRadius: 7,
              padding: "7px 16px",
              cursor: "pointer",
              transition: "all .25s",
              fontWeight: active === n.id ? 600 : 400,
              boxShadow: active === n.id ? "0 0 16px rgba(255,204,0,0.3)" : "none",
            }}
          >
            {n.l}
          </motion.button>
        ))}
      </div>
      <div
        style={{
          fontFamily: "'JetBrains Mono',monospace",
          fontSize: 10,
          color: C.muted2,
          letterSpacing: ".12em",
          display: "flex",
          alignItems: "center",
          gap: 6,
        }}
      >
        <span style={{ color: C.yellow }}>●</span> v2.0
      </div>
    </motion.nav>
  );
};

// ── Skill level ────────────────────────────────────────────────────────────
const SkillLevel: React.FC<{ level: number; color: string }> = ({ level, color }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div
      style={{
        position: "absolute",
        bottom: 14,
        left: 20,
        right: 20,
        height: 2.5,
        background: "rgba(255,255,255,0.06)",
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      <motion.div
        ref={ref}
        initial={{ width: 0 }}
        animate={isInView ? { width: `${level}%` } : { width: 0 }}
        transition={{ duration: 1.2, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        style={{
          height: "100%",
          borderRadius: 2,
          background: `linear-gradient(90deg, ${color}, ${C.yellow})`,
          boxShadow: `0 0 8px ${color}60`,
        }}
      />
    </div>
  );
};

// ── Floating cards ─────────────────────────────────────────────────────────
const FloatingCard: React.FC<{ children: React.ReactNode; delay?: number; duration?: number }> = ({
  children,
  delay = 0,
  duration = 3,
}) => (
  <motion.div
    animate={{ y: [0, -12, 0, 8, 0] }}
    transition={{ duration, delay, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
  >
    {children}
  </motion.div>
);

// ── Background grid ────────────────────────────────────────────────────────
const BackgroundGrid: React.FC = () => (
  <div
    style={{
      position: "fixed",
      inset: 0,
      zIndex: 0,
      pointerEvents: "none",
      backgroundImage: `
        linear-gradient(rgba(255,204,0,0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,204,0,0.03) 1px, transparent 1px)
      `,
      backgroundSize: "60px 60px",
      maskImage: "radial-gradient(ellipse at center, black 30%, transparent 70%)",
    }}
  />
);

// ══════════════════════════════════════════════════════════════════════════
export default function Portfolio() {
  const [active, setActive] = useState("hero");
  const [activeXp, setActiveXp] = useState(0);
  const [activeCat, setActiveCat] = useState("frontend");
  const [copied, setCopied] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  useEffect(() => {
    const els = NAV.map((n) => document.getElementById(n.id)).filter((el): el is HTMLElement => el !== null);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { threshold: 0.3, rootMargin: "-80px 0px 0px 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText("jasonawume5@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const curCat = SKILL_CATS.find((c) => c.id === activeCat) || SKILL_CATS[0];

  const CSS = `
    *{box-sizing:border-box;margin:0;padding:0}
    html{scroll-behavior:smooth}
    body{background:${C.navy};cursor:none;overflow-x:hidden}
    ::selection{background:rgba(255,204,0,.3);color:${C.navy}}
    ::-webkit-scrollbar{width:4px}
    ::-webkit-scrollbar-track{background:${C.navy}}
    ::-webkit-scrollbar-thumb{background:linear-gradient(180deg,${C.yellow},${C.yellowD});border-radius:2px}
    .skill-card:hover .skill-logo{transform:scale(1.15) translateY(-6px);filter:drop-shadow(0 8px 20px rgba(255,204,0,.3))}
    .skill-card:hover{border-color:rgba(255,204,0,.4)!important;background:rgba(255,204,0,.06)!important;box-shadow:0 12px 40px rgba(0,0,0,.2)}
    .xp-btn:hover{background:rgba(255,204,0,.06)!important;border-color:rgba(255,204,0,.25)!important}
    .proj-card:hover{border-color:${C.yellow}44!important;transform:translateY(-6px)!important;box-shadow:0 20px 60px rgba(0,0,0,.3)}
    .cat-tab:hover{color:${C.white}!important;background:rgba(255,204,0,.05)!important}
    .cat-tab.active{color:${C.yellow}!important;border-color:${C.yellow}!important;background:rgba(255,204,0,.07)!important;box-shadow:0 0 20px rgba(255,204,0,.1)}
    .contact-link:hover{background:rgba(255,204,0,.08)!important;border-color:rgba(255,204,0,.35)!important;color:${C.yellow}!important;transform:translateY(-2px)}
  `;

  return (
    <div
      style={{
        background: C.navy,
        color: C.white,
        fontFamily: "'Plus Jakarta Sans',sans-serif",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      <style>{CSS}</style>
      <FontInjector />
      <Cursor />
      <Particles />
      <BackgroundGrid />
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,.02) 3px, rgba(0,0,0,.02) 4px)",
          mixBlendMode: "overlay",
        }}
      />
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          background: "radial-gradient(ellipse at center, transparent 60%, rgba(10,22,40,.4) 100%)",
        }}
      />
      <Nav active={active} />

      {/* ── HERO ───────────────────────────────────────────────────────── */}
      <section id="hero" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden", zIndex: 2 }}>
        <motion.div animate={{ rotate: [0, 90, 180, 270, 360] }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} style={{ position: "absolute", right: "-5%", top: "20%", width: 500, height: 500, border: "1px solid rgba(255,204,0,0.04)", borderRadius: "40% 60% 30% 70% / 50% 40% 60% 50%" }} />
        <motion.div animate={{ rotate: [0, -90, -180, -270, -360] }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} style={{ position: "absolute", right: "5%", top: "28%", width: 350, height: 350, border: "1px solid rgba(255,204,0,0.06)", borderRadius: "60% 40% 50% 50% / 40% 60% 40% 60%" }} />
        <motion.div animate={{ y: [0, -30, 0], scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} style={{ position: "absolute", right: "12%", top: "35%", width: 120, height: 120, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,204,0,.15), transparent 70%)", filter: "blur(20px)" }} />

        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "110px clamp(24px,6vw,100px) 80px", width: "100%", position: "relative", zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, x: -60 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }} style={{ display: "inline-flex", alignItems: "center", gap: 10, fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: C.yellow, letterSpacing: ".2em", textTransform: "uppercase", marginBottom: 24, background: "rgba(255,204,0,0.06)", border: "1px solid rgba(255,204,0,0.15)", borderRadius: 30, padding: "6px 18px" }}>
              <motion.span animate={{ opacity: [1, 0.4, 1], scale: [1, 0.8, 1] }} transition={{ duration: 2, repeat: Infinity }} style={{ width: 8, height: 8, background: C.yellow, borderRadius: "50%", display: "inline-block", boxShadow: "0 0 10px rgba(255,204,0,0.6)" }} />
              Disponible · Dakar, Sénégal
            </motion.div>
            <Glitch text="Keli Jason" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(68px,10vw,140px)", fontWeight: 400, color: C.white, lineHeight: 0.9, letterSpacing: ".05em", display: "block" }} />
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6, duration: 0.8 }} style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(68px,10vw,140px)", fontWeight: 400, lineHeight: 0.9, letterSpacing: ".05em", background: `linear-gradient(135deg, ${C.yellow}, #FFE566 40%, ${C.yellowD} 60%, ${C.yellow})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundSize: "300% 300%", animation: "gradientShift 4s ease infinite", marginBottom: 32, filter: "drop-shadow(0 0 20px rgba(255,204,0,0.2))" }}>AWUME</motion.div>
            <motion.div initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: "auto" }} transition={{ delay: 0.8, duration: 1 }} style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 36 }}>
              <div style={{ width: 50, height: 2, background: `linear-gradient(90deg, ${C.yellow}, transparent)` }} />
              <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 13, color: C.muted, letterSpacing: ".06em" }}>
                Full Stack Developer & IA · En recherche de stage / CDD · Bac+3 Génie Logiciel
              </p>
            </motion.div>

            {/* Terminal box */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.8 }} style={{ background: `linear-gradient(135deg, ${C.navy2}, ${C.navy3})`, border: `1px solid ${C.border}`, borderRadius: 16, padding: "24px 28px", maxWidth: 480, marginBottom: 44, boxShadow: "0 20px 60px rgba(0,0,0,.4), 0 0 40px rgba(255,204,0,.05)", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "30%", background: "linear-gradient(180deg, rgba(255,204,0,0.02), transparent)", pointerEvents: "none" }} />
              <div style={{ display: "flex", gap: 8, marginBottom: 16, alignItems: "center" }}>
                {["#ff5f57", "#ffbd2e", "#28c940"].map((c) => (
                  <motion.div key={c} whileHover={{ scale: 1.2 }} style={{ width: 11, height: 11, borderRadius: "50%", background: c, cursor: "pointer" }} />
                ))}
                <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: C.muted2, marginLeft: 8 }}>jason@portfolio ~</span>
              </div>
              <Typer lines={["ls -la ./competences", "cat ./profil.json", "node server.js --port 3000", "git status"]} />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3, duration: 0.8 }} style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <motion.button whileHover={{ scale: 1.04, boxShadow: "0 0 50px rgba(255,204,0,.4)" }} whileTap={{ scale: 0.96 }} onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })} style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: 13, background: C.yellow, color: C.navy, border: "none", borderRadius: 12, padding: "16px 34px", cursor: "pointer", letterSpacing: ".06em", boxShadow: "0 0 30px rgba(255,204,0,.25)", position: "relative", overflow: "hidden" }}>Mes projets →</motion.button>
              <motion.button whileHover={{ scale: 1.04, borderColor: C.yellow, color: C.yellow }} whileTap={{ scale: 0.96 }} onClick={() => document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" })} style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 600, fontSize: 13, background: "transparent", color: C.white, border: `1px solid ${C.borderW}`, borderRadius: 12, padding: "16px 34px", cursor: "pointer", letterSpacing: ".06em", transition: "all .3s" }}>Voir le stack</motion.button>
            </motion.div>
          </motion.div>
        </div>

        <motion.div animate={{ y: [0, 8, 0], opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 2 }} style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", fontFamily: "'JetBrains Mono',monospace", fontSize: 16, color: `${C.yellow}99`, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: 10, letterSpacing: ".1em" }}>SCROLL</span>
          <span>↓</span>
        </motion.div>
      </section>

      {/* ── ABOUT ──────────────────────────────────────────────────────── */}
      <section id="about" style={{ position: "relative", zIndex: 2, padding: "140px clamp(24px,6vw,100px)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SH tag="01 / Profil" title="QUI SUIS-JE ?" sub="Développeur Full Stack & IA, à l'affût d'un stage débouchant sur un CDD ou d'un CDD pour déployer mon savoir-faire et impacter vos projets." />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 28 }}>
            <Tilt style={{ background: `linear-gradient(135deg, ${C.navy2}, ${C.navy3})`, border: `1px solid ${C.border}`, borderRadius: 24, padding: "40px 36px", position: "relative" }}>
              {/* Badge Open to work */}
              <div style={{
                position: "absolute",
                top: 16,
                right: 16,
                background: "rgba(255,204,0,0.15)",
                border: "1px solid rgba(255,204,0,0.3)",
                borderRadius: 20,
                padding: "4px 12px",
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontFamily: "'JetBrains Mono',monospace",
                fontSize: 10,
                color: C.yellow,
                letterSpacing: ".08em",
              }}>
                <span>🔍</span> Open to work
              </div>
              <div style={{ width: 80, height: 80, borderRadius: 22, background: `linear-gradient(135deg, ${C.yellow}, #FFE566)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, fontWeight: 900, fontFamily: "'Bebas Neue',sans-serif", color: C.navy, marginBottom: 28, letterSpacing: ".06em", boxShadow: "0 12px 40px rgba(255,204,0,.2)" }}>JA</div>
              <h3 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 30, fontWeight: 400, letterSpacing: ".06em", color: C.white, marginBottom: 10 }}>KELI JASON AWUME</h3>
              <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: C.yellow, marginBottom: 24, letterSpacing: ".1em" }}>jasonawume5@gmail.com</p>
              <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.8, fontWeight: 300 }}>
                Diplômé d'une Licence Génie Logiciel (ISM Dakar), actuellement en stage à Senegal Numerique SA. Je recherche activement un stage pré‑emploi ou un CDD pour mettre mon expertise en Angular, NestJS et IA au service de projets ambitieux. Passionné, rigoureux, prêt à coder l'avenir avec vous.
              </p>
            </Tilt>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {[{ n: "6+", l: "Projets & stages" },{ n: "2021", l: "1er code" },{ n: "Bac+3", l: "Génie Logiciel" },{ n: "5", l: "Frameworks" }].map((s, i) => (
                <FloatingCard key={s.l} delay={i * 0.2} duration={3.5 + i * 0.3}>
                  <motion.div whileHover={{ scale: 1.05, borderColor: C.yellow }} style={{ background: `linear-gradient(135deg, ${C.navy2}, ${C.navy3})`, border: `1px solid ${C.borderW}`, borderRadius: 18, padding: "26px 20px", cursor: "default", transition: "all .25s" }}>
                    <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 50, fontWeight: 400, color: C.yellow, lineHeight: 1, letterSpacing: ".04em", textShadow: "0 0 20px rgba(255,204,0,.2)" }}>{s.n}</div>
                    <div style={{ fontSize: 12, color: C.muted, marginTop: 8, fontFamily: "'JetBrains Mono',monospace" }}>{s.l}</div>
                  </motion.div>
                </FloatingCard>
              ))}
            </div>
            <Tilt style={{ background: `linear-gradient(135deg, ${C.navy2}, ${C.navy3})`, border: "1px solid rgba(255,204,0,.2)", borderRadius: 24, padding: "36px 32px" }}>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: C.yellow, letterSpacing: ".2em", textTransform: "uppercase", marginBottom: 24, display: "flex", alignItems: "center", gap: 8 }}><span>🏆</span> Prix & Distinctions</div>
              {[{ y: "2021", t: "Best Student in General Knowledge", o: "CEPA International Quiz Challenge — Lomé" },{ y: "2015", t: "Meilleur Élève en Mathématiques + Vainqueur Global", o: "Les Éclaireurs — TV5Monde" }].map((d, i) => (
                <motion.div key={d.y} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 + i * 0.2 }} style={{ borderLeft: "2px solid rgba(255,204,0,.4)", paddingLeft: 18, marginBottom: 22 }}>
                  <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: C.yellow, marginBottom: 6 }}>{d.y}</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: C.white, marginBottom: 6, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{d.t}</div>
                  <div style={{ fontSize: 11, color: C.muted, fontFamily: "'JetBrains Mono',monospace" }}>{d.o}</div>
                </motion.div>
              ))}
            </Tilt>
          </div>
        </div>
      </section>

      {/* ── SKILLS ─────────────────────────────────────────────────────── */}
      <section id="skills" style={{ position: "relative", zIndex: 2, padding: "140px clamp(24px,6vw,100px)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <SH tag="02 / Stack" title="COMPÉTENCES TECHNIQUES" sub="Technologies maîtrisées à travers projets concrets et stages professionnels." />
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", marginBottom: 56 }}>
            {SKILL_CATS.map((cat) => (
              <motion.button
                key={cat.id}
                className={`cat-tab${activeCat === cat.id ? " active" : ""}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCat(cat.id)}
                style={{
                  fontFamily: "'JetBrains Mono',monospace",
                  fontSize: 12,
                  letterSpacing: ".1em",
                  color: activeCat === cat.id ? C.yellow : C.muted,
                  background: activeCat === cat.id ? "rgba(255,204,0,.07)" : "transparent",
                  border: `1px solid ${activeCat === cat.id ? C.yellow : C.borderW}`,
                  borderRadius: 10,
                  padding: "11px 24px",
                  cursor: "pointer",
                  transition: "all .25s",
                  fontWeight: activeCat === cat.id ? 500 : 300,
                }}
              >
                {cat.label}
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCat}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              style={{
                position: "relative",
                background: curCat.bg + "," + C.navy2,
                border: `1px solid ${C.border}`,
                borderRadius: 32,
                overflow: "hidden",
                padding: "60px clamp(24px,5vw,70px)",
                boxShadow: "0 0 60px rgba(0,0,0,.3)",
              }}
            >
              <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>{PATTERNS[curCat.pattern]}</div>
              <div style={{ position: "absolute", top: 0, left: "10%", right: "10%", height: 3, background: `linear-gradient(90deg, transparent, ${C.yellow}, transparent)`, opacity: 0.8 }} />

              <div style={{ position: "relative", display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 52, flexWrap: "wrap", gap: 16 }}>
                <div>
                  <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: C.yellow, letterSpacing: ".25em", textTransform: "uppercase", marginBottom: 10, opacity: 0.8 }}>// {activeCat}</div>
                  <h3 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 46, fontWeight: 400, color: C.white, letterSpacing: ".06em", lineHeight: 1 }}>{curCat.label}</h3>
                  <p style={{ fontSize: 14, color: C.muted, fontFamily: "'Plus Jakarta Sans',sans-serif", marginTop: 8, fontWeight: 300 }}>{curCat.tagline}</p>
                </div>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: C.muted2, background: "rgba(255,255,255,.04)", border: `1px solid ${C.borderW}`, borderRadius: 10, padding: "10px 20px", alignSelf: "flex-start" }}>
                  {curCat.skills.length} technologies
                </div>
              </div>

              <div style={{ position: "relative", display: "grid", gridTemplateColumns: `repeat(auto-fill, minmax(${curCat.skills.length <= 3 ? 220 : 180}px, 1fr))`, gap: 20 }}>
                {curCat.skills.map((sk, i) => (
                  <motion.div
                    key={sk.name}
                    className="skill-card"
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.08, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                    onMouseEnter={() => setHoveredSkill(sk.name)}
                    onMouseLeave={() => setHoveredSkill(null)}
                    style={{
                      position: "relative",
                      background: hoveredSkill === sk.name ? "rgba(255,204,0,.06)" : "rgba(255,255,255,.02)",
                      border: `1px solid ${hoveredSkill === sk.name ? "rgba(255,204,0,.45)" : C.borderW}`,
                      borderRadius: 22,
                      padding: "36px 22px 40px",
                      cursor: "default",
                      transition: "all .3s",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 16,
                      boxShadow: hoveredSkill === sk.name ? `0 12px 50px ${sk.glow}18` : "none",
                    }}
                  >
                    {hoveredSkill === sk.name && (
                      <div style={{ position: "absolute", inset: 0, borderRadius: 22, background: `radial-gradient(circle at 50% 35%, ${sk.glow}15, transparent 60%)`, pointerEvents: "none" }} />
                    )}
                    <div style={{ position: "relative", width: 72, height: 72, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <motion.div
                        animate={{
                          scale: hoveredSkill === sk.name ? [1, 1.2, 1] : 1,
                          opacity: hoveredSkill === sk.name ? [0.4, 0.7, 0.4] : 0.3,
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                        style={{
                          position: "absolute",
                          inset: -8,
                          borderRadius: "50%",
                          background: `${sk.glow}20`,
                          filter: `blur(${hoveredSkill === sk.name ? 20 : 12}px)`,
                        }}
                      />
                      <img
                        className="skill-logo"
                        src={sk.logo}
                        alt={sk.name}
                        style={{
                          width: 56,
                          height: 56,
                          objectFit: "contain",
                          position: "relative",
                          zIndex: 1,
                          filter: sk.name === "Next.js" || sk.name === "Flask" || sk.name === "Django" ? "brightness(1.1)" : "none",
                          transition: "all .3s",
                        }}
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                          ((e.target as HTMLImageElement).nextSibling as HTMLElement).style.display = "flex";
                        }}
                      />
                      <div
                        style={{
                          display: "none",
                          width: 56,
                          height: 56,
                          borderRadius: 16,
                          background: `${sk.glow}25`,
                          alignItems: "center",
                          justifyContent: "center",
                          fontFamily: "'Bebas Neue',sans-serif",
                          fontSize: 22,
                          color: sk.glow,
                          letterSpacing: ".06em",
                          position: "relative",
                          zIndex: 1,
                        }}
                      >
                        {sk.name.slice(0, 2).toUpperCase()}
                      </div>
                    </div>
                    <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 14, fontWeight: 600, color: hoveredSkill === sk.name ? C.white : C.white2, textAlign: "center", letterSpacing: ".02em", transition: "color .3s" }}>
                      {sk.name}
                    </div>
                    <SkillLevel level={sk.level} color={sk.glow} />
                    <motion.div
                      animate={{ opacity: hoveredSkill === sk.name ? [0.6, 1, 0.6] : 0.3 }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: hoveredSkill === sk.name ? sk.glow : C.muted2,
                        boxShadow: hoveredSkill === sk.name ? `0 0 10px ${sk.glow}` : "none",
                        position: "absolute",
                        bottom: 18,
                      }}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── EXPERIENCES ────────────────────────────────────────────────── */}
      <section id="xp" style={{ position: "relative", zIndex: 2, padding: "140px clamp(24px,6vw,100px)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SH tag="03 / Parcours" title="EXPÉRIENCES" sub="Stages et missions depuis 2022 à Dakar et à distance." />

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 36, alignItems: "start" }}>
            {/* Timeline avec logos */}
            <div style={{ display: "flex", flexDirection: "column", gap: 6, position: "relative" }}>
              <div style={{ position: "absolute", left: 31, top: 16, bottom: 16, width: 2, background: `linear-gradient(to bottom, ${C.yellow}80, transparent)`, borderRadius: 1 }} />
              {EXPERIENCES.map((xp, i) => (
                <motion.button
                  key={i}
                  className="xp-btn"
                  onClick={() => setActiveXp(i)}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  style={{
                    display: "flex",
                    gap: 16,
                    padding: "16px 16px",
                    background: activeXp === i ? "rgba(255,204,0,.06)" : "transparent",
                    border: `1px solid ${activeXp === i ? C.border : "transparent"}`,
                    borderRadius: 20,
                    cursor: "pointer",
                    textAlign: "left",
                    position: "relative",
                    transition: "all .3s",
                    alignItems: "center",
                  }}
                >
                  {/* Logo */}
                  <div style={{ flexShrink: 0, zIndex: 1 }}>
                    {xp.logo}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 10, fontFamily: "'JetBrains Mono',monospace", color: C.muted2, marginBottom: 2, letterSpacing: ".06em" }}>{xp.period}</div>
                    <div style={{ fontSize: 15, fontWeight: 600, color: activeXp === i ? xp.color : C.white2, transition: "color .3s", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{xp.company}</div>
                    <div style={{ fontSize: 12, color: C.muted, fontFamily: "'JetBrains Mono',monospace", marginTop: 2 }}>{xp.role}</div>
                  </div>
                  {activeXp === i && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      style={{
                        width: 10, height: 10,
                        borderRadius: "50%",
                        background: xp.color,
                        position: "absolute",
                        left: -4, top: "50%",
                        transform: "translateY(-50%)",
                        boxShadow: `0 0 12px ${xp.color}`,
                      }}
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Détail avec illustrations descriptives */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeXp}
                initial={{ opacity: 0, x: 40, rotateY: 10 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                exit={{ opacity: 0, x: -20, rotateY: -5 }}
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                style={{ gridColumn: "span 2" }}
              >
                <Tilt style={{
                  background: `linear-gradient(135deg, ${C.navy2}, ${C.navy3})`,
                  border: `1px solid ${EXPERIENCES[activeXp].color}25`,
                  borderRadius: 26,
                  padding: "40px 36px",
                }}>
                  {/* En-tête avec logo + infos */}
                  <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 32 }}>
                    <div style={{ flexShrink: 0 }}>
                      {EXPERIENCES[activeXp].logo}
                    </div>
                    <div>
                      <h3 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 36, fontWeight: 400, color: EXPERIENCES[activeXp].color, letterSpacing: ".06em", marginBottom: 4 }}>
                        {EXPERIENCES[activeXp].company}
                      </h3>
                      <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: C.muted }}>
                        {EXPERIENCES[activeXp].role} · {EXPERIENCES[activeXp].loc}
                      </p>
                    </div>
                    <div style={{ marginLeft: "auto", fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: C.muted2, background: C.glass, border: `1px solid ${C.borderW}`, borderRadius: 10, padding: "8px 16px", whiteSpace: "nowrap" }}>
                      {EXPERIENCES[activeXp].period}
                    </div>
                  </div>

                  {/* Liste des tâches avec icônes illustratives */}
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 20 }}>
                    {EXPERIENCES[activeXp].items.map((item, ii) => (
                      <motion.li
                        key={ii}
                        initial={{ opacity: 0, x: 15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: ii * 0.1, duration: 0.4 }}
                        style={{
                          display: "flex",
                          gap: 16,
                          alignItems: "flex-start",
                          padding: "12px 16px",
                          background: "rgba(255,255,255,0.02)",
                          borderRadius: 12,
                          border: "1px solid rgba(255,255,255,0.04)",
                        }}
                      >
                        <span style={{ fontSize: 28, flexShrink: 0, lineHeight: 1 }}>
                          {item.icon}
                        </span>
                        <span style={{
                          fontSize: 14,
                          color: C.white3,
                          lineHeight: 1.7,
                          fontFamily: "'Plus Jakarta Sans',sans-serif",
                          fontWeight: 300,
                        }}>
                          {item.text}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </Tilt>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ── PROJECTS ───────────────────────────────────────────────────── */}
      <section id="projects" style={{ position: "relative", zIndex: 2, padding: "140px clamp(24px,6vw,100px)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SH tag="04 / Réalisations" title="PROJETS" sub="Applications concrètes livrées en contexte professionnel et personnel." />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 24 }}>
            {PROJECTS.map((p, i) => (
              <motion.div
                key={p.title}
                className="proj-card"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <Tilt style={{ background: `linear-gradient(135deg, ${C.navy2}, ${C.navy3})`, border: `1px solid ${C.borderW}`, borderRadius: 22, padding: "32px 28px", height: "100%", cursor: "default", transition: "all .3s" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 14, background: `${C.yellow}12`, display: "grid", placeItems: "center", border: `1px solid ${C.yellow}25` }}>
                      <div style={{ width: 16, height: 16, borderRadius: 5, background: C.yellow, boxShadow: "0 0 10px rgba(255,204,0,.4)" }} />
                    </div>
                    <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: p.tagC, letterSpacing: ".15em", background: `${p.tagC}15`, padding: "5px 12px", borderRadius: 8, border: `1px solid ${p.tagC}25` }}>{p.tag}</span>
                  </div>
                  <h3 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 26, fontWeight: 400, color: C.white, letterSpacing: ".06em", marginBottom: 12 }}>{p.title}</h3>
                  <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.7, marginBottom: 20, fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 300 }}>{p.desc}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: "auto" }}>
                    {p.stack.map((s) => (
                      <span key={s} style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: C.muted2, background: C.glass, border: `1px solid ${C.borderW}`, borderRadius: 6, padding: "4px 10px" }}>{s}</span>
                    ))}
                  </div>
                </Tilt>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ────────────────────────────────────────────────────── */}
      <section id="contact" style={{ position: "relative", zIndex: 2, padding: "140px clamp(24px,6vw,100px) 180px" }}>
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.04, 0.08, 0.04], x: [0, 20, 0], y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          style={{ position: "absolute", left: "50%", top: "40%", transform: "translate(-50%, -50%)", width: 500, height: 300, background: "radial-gradient(ellipse, rgba(255,204,0,.08), transparent 70%)", pointerEvents: "none", filter: "blur(40px)" }}
        />
        <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center", position: "relative" }}>
          <SH tag="05 / Contact" title="TRAVAILLONS ENSEMBLE" />
          <p style={{ fontSize: 16, color: C.muted, lineHeight: 1.8, marginBottom: 60, fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 300 }}>
            Disponible pour stages, CDI, freelance ou projets collaboratifs. N'hésitez pas à me contacter !
          </p>
          <motion.button
            whileHover={{ scale: 1.03, boxShadow: "0 0 80px rgba(255,204,0,.35)" }}
            whileTap={{ scale: 0.97 }}
            onClick={copyEmail}
            style={{
              fontFamily: "'Plus Jakarta Sans',sans-serif",
              fontWeight: 700,
              fontSize: 15,
              background: copied ? "rgba(255,204,0,.12)" : C.yellow,
              color: copied ? C.yellow : C.navy,
              border: copied ? `2px solid ${C.yellow}` : "none",
              borderRadius: 16,
              padding: "20px 44px",
              cursor: "pointer",
              display: "block",
              width: "100%",
              maxWidth: 460,
              margin: "0 auto 28px",
              transition: "all .3s",
              letterSpacing: ".04em",
            }}
          >
            {copied ? "✓ Email copié !" : "jasonawume5@gmail.com"}
          </motion.button>
          <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap", marginBottom: 64 }}>
            {[
              { l: "LinkedIn ↗", href: "https://linkedin.com/in/jason-awume", c: "#60A5FA" },
              { l: "GitHub / JawkAWUME ↗", href: "https://github.com/JawkAWUME", c: C.white2 },
              { l: "+221 77 246 07 74", href: "tel:+221772460774", c: "#34D399" },
            ].map((b) => (
              <motion.a
                key={b.l}
                href={b.href}
                target="_blank"
                rel="noopener"
                className="contact-link"
                whileHover={{ scale: 1.05, y: -2 }}
                style={{
                  fontFamily: "'JetBrains Mono',monospace",
                  fontSize: 12,
                  color: b.c,
                  background: "rgba(255,255,255,.03)",
                  border: `1px solid ${C.borderW}`,
                  borderRadius: 12,
                  padding: "14px 28px",
                  cursor: "pointer",
                  textDecoration: "none",
                  letterSpacing: ".06em",
                  transition: "all .25s",
                }}
              >
                {b.l}
              </motion.a>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 10 }}>
            {[C.yellow, C.white2, "#60A5FA", "#34D399", "#A78BFA"].map((c, i) => (
              <motion.div
                key={i}
                animate={{ opacity: [0.3, 0.8, 0.3], scale: [1, 1.5, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                style={{ width: 7, height: 7, borderRadius: "50%", background: c }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────────────── */}
      <footer
        style={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          padding: "28px",
          borderTop: `1px solid ${C.border}`,
          background: `linear-gradient(0deg, ${C.navy2}, transparent)`,
        }}
      >
        <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: C.muted2, letterSpacing: ".14em" }}>
          © 2025 KELI JASON AWUME · REACT + FRAMER MOTION · DAKAR, SÉNÉGAL
        </p>
      </footer>

      <style>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
}