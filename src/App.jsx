import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import Tilt from "react-parallax-tilt";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { Typewriter } from "react-simple-typewriter";
import {
  Menu,
  Download,
  Github,
  Linkedin,
  Mail,
  ArrowUpRight,
  ExternalLink,
  Shield,
  Server,
  Cpu,
  Cloud,
  Code2,
  ScrollText,
  Star,
  BadgeCheck,
} from "lucide-react";

/**
 * FINAL SINGLE-FILE APP (Dark-only)
 * - Scroll progress bar
 * - Navbar resume button sized up
 * - GitHub cards recolored to emerald/dark theme
 */

// === Editable constants ===
const NAME = "Karandeep Singh Sehgal"; // or Karandeep Singh Sehgal
const TAGLINE = "Cybersecurity Student & Systems Engineer Intern";
const GITHUB_USERNAME = "karandeeppotato"; // change to your GitHub username
const FORM_ENDPOINT = "https://formspree.io/f/xdkdvnql"; // replace with your Formspree ID

const SOCIALS = {
  github: "https://github.com/karandeeppotato",
  linkedin: "https://www.linkedin.com/in/karandeep-singh-483109145/",
  email: "mailto:sehgalkaran.cyber@example.com",
};

const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "certs", label: "Certifications" },
  { id: "blog", label: "Blog" },
  { id: "contact", label: "Contact" },
];

const PROJECTS = [
  {
    title: "IoT Device Security with AWS & Suricata",
    desc: "Secured IoT devices with Raspberry Pi, integrated AWS IoT Core + Suricata IDS + ELK Stack for anomaly detection.",
    tech: ["AWS IoT", "Suricata", "Elasticsearch", "Kibana"],
    image: "https://images.unsplash.com/photo-1552283576-3ea3519bf12e?q=80&w=3862&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    links: { github: "https://github.com/karandeeppotato/IoT-Device-Security-with-AWS-Suricata" },
    category: "Cloud",
  },
  {
    title: "Windows AD Security Lab",
    desc: "Configured a 3-VM lab (Windows Server AD, Windows Client, Kali) to simulate enumeration, exploitation, and defense strategies.",
    tech: ["Windows Server", "Active Directory", "Kali Linux"],
    image: "https://images.unsplash.com/photo-1624571395775-253d9666612b?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    links: { github: "https://github.com/karandeeppotato/PT-LateralMovement-WindowsDomain-Report" },
    category: "Security",
  },
  {
    title: "Suricata Log Analysis & Reporting System",
    desc: "Developed a real-time log analysis system with ELK Stack + Suricata IDS, parsing logs with Filebeat + Logstash and visualizing in Kibana.",
    tech: ["Suricata", "Filebeat", "Logstash", "Kibana"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    links: { github: "https://www.linkedin.com/posts/karandeep-singh-483109145_suricata-ids-report-with-elk-log-analysis-activity-7351513110182051840-xCQn" },
    category: "Security",
  },
  {
    title: "Compliance-Focused CyberReports",
    desc: "Analyzed CTF scenarios, documented exploits and attack vectors, and suggested remediations. Tools: Burp Suite, Nmap, Wireshark, LinPEAS, Metasploit.",
    tech: ["Burp Suite", "Nmap", "Metasploit", "Wireshark"],
    image: "https://images.unsplash.com/photo-1618044733300-9472054094ee?q=80&w=3500&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    links: { github: "https://github.com/karandeeppotato/CyberReports" },
    category: "Security",
  },
  {
    title: "Proxmox VE Hardening Lab",
    desc: "Built a virtualization homelab with Proxmox VE, configured multiple VMs, and applied enterprise-level hardening (firewall, patching, segmentation).",
    tech: ["Proxmox VE", "Linux", "Firewall"],
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=3868&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    links: {github: "https://www.linkedin.com/posts/karandeep-singh-483109145_cybersecurity-proxmox-kalilinux-activity-7334356876563726337-dt3c" },
    category: "Security",
  },
  {
    title: "MyPortfolio",
    desc: "My Personal Portfolio Website",
    tech: ["Web Dev", "Vite", "Tailwind", "React"],
    image: "/Portfolio.png",
    links: { github: "#" },
    category: "Cloud",
  },
];

const EXPERIENCE = [
  {
    role: "Systems Engineer Intern",
    org: "Pathway Communications",
    date: "Aug 2025 – Present",
    points: [
      "Assisted with enterprise infrastructure and security operations, ensuring uptime and compliance.",
      "Hands-on experience in endpoint management, network monitoring, and incident response.",
      "Collaborated with senior engineers to strengthen system resilience and improve security posture.",
    ],
  },
  {
    role: "Cybersecurity and Threat Management (Postgraduate Diploma)",
    org: "Seneca Polytechnic, Toronto, Canada",
    date: "2025 – Present",
    points: [
      "Focused on SOC operations, incident response, network defense, and cloud security.",
      "Worked on projects using Splunk, Suricata, ELK Stack, and AWS Cloud.",
    ],
  },
  {
    role: "Reporting Systems and Database Development (Graduate Certificate)",
    org: "Conestoga College, Kitchener, Canada",
    date: "2024 – 2025",
    points: [
      "Completed advanced database management and reporting system coursework.",
      "Gained skills in SQL, NoSQL, and BI tools.",
    ],
  },
  {
    role: "Backend Development Intern",
    org: "Celebal Technologies",
    date: "Jun 2023 – Aug 2023",
    points: [
      "Built scalable RESTful APIs using Node.js and Express.",
      "Designed and optimized MongoDB schemas.",
      "Containerized microservices with Docker, worked with DevOps team.",
      "Ensured secure coding practices and collaborated in Agile workflows.",
    ],
  },
  {
    role: "Bachelor of Technology in Computer Science",
    org: "Amity University, Haryana, India",
    date: "2020 – 2024",
    points: [
      "Completed undergraduate degree in Computer Science with focus on software development and systems.",
      "Worked on academic projects and built foundation in programming, networks, and cybersecurity.",
    ],
  },
];


const SKILLS = [
  { name: "Windows Server & AD", icon: <Server className="w-5 h-5" /> },
  { name: "Splunk", icon: <ScrollText className="w-5 h-5" /> },
  { name: "Suricata", icon: <Shield className="w-5 h-5" /> },
  { name: "Nmap", icon: <Server className="w-5 h-5" /> },
  { name: "Linux", icon: <Cpu className="w-5 h-5" /> },
  { name: "AWS & Azure", icon: <Cloud className="w-5 h-5" /> },
  { name: "Python & Bash", icon: <Code2 className="w-5 h-5" /> },
  { name: "PowerShell", icon: <Code2 className="w-5 h-5" /> },
  { name: "VMware & Proxmox", icon: <Cpu className="w-5 h-5" /> },
  { name: "SQL/NoSQL", icon: <Code2 className="w-5 h-5" /> },
];

const CERTS = [
  { name: "ISC2 Certified in Cybersecurity (CC)", link: "https://www.credly.com/badges/5968c915-02eb-4186-bdb5-4c0d577cf0a9/public_url" },
  { name: "AWS Cloud Security Foundations", link: "https://www.credly.com/badges/30f7487f-189e-4f74-a28e-4d626bc30987/public_url" },
  { name: "EC-Council – Security Automation with Ansible", link: "https://learn.eccouncil.org/certificate/2103fc17-9137-418e-964c-3de4b6e34883?logged=false" },
  { name: "CCNA (in progress)", link: "https://learningnetwork.cisco.com/s/ccna" },
  { name: "CompTIA Security+ (in progress)", link: "https://www.comptia.org/en-us/certifications/security/" },
];

const BLOGS = [
  {
    title: "Understanding PKCE: A Better Authentication Method",
    date: "June 17, 2024",
    excerpt:
      "Exploring the concept of PKCE in OAuth 2.0 and How it fortifies out application against common OAuth Attacks",
    link: "https://www.linkedin.com/pulse/understanding-pkce-better-authentication-method-karandeep-singh-kbnuc/?trackingId=48x0FLxqRUmmJyDqmfPGKw%3D%3D",
  },
];

// === Utilities ===
const cn = (...classes) => classes.filter(Boolean).join(" ");

// Scrollspy hook
function useScrollSpy(ids = []) {
  const [active, setActive] = useState(ids[0] || "home");
  const obs = useRef(null);
  useEffect(() => {
    const options = { root: null, rootMargin: "0px", threshold: 0.5 };
    const callback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          if (id) setActive(id);
        }
      });
    };
    obs.current = new IntersectionObserver(callback, options);
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.current.observe(el);
    });
    return () => obs.current && obs.current.disconnect();
  }, [ids]);
  return active;
}

// Custom cursor
function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  useEffect(() => {
    const move = (e) => {
      const { clientX: x, clientY: y } = e;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed z-[100] left-0 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-400 mix-blend-screen"
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed z-[99] left-0 top-0 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-400/40"
      />
    </>
  );
}

// Scroll progress bar
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed left-0 top-0 z-[200] h-1 w-full origin-left bg-emerald-500"
    />
  );
}

// Particle background
function ParticleBG() {
  const init = async (engine) => {
    await loadSlim(engine);
  };
  const options = useMemo(
    () => ({
      fpsLimit: 60,
      interactivity: {
        events: { onHover: { enable: true, mode: "repulse" }, resize: true },
        modes: { repulse: { distance: 100 } },
      },
      particles: {
        number: { value: 40, density: { enable: true, area: 800 } },
        size: { value: { min: 1, max: 3 } },
        move: { enable: true, speed: 1 },
        opacity: { value: 0.4 },
        links: { enable: true, opacity: 0.2 },
        color: { value: "#10b981" },
      },
      detectRetina: true,
      background: { color: { value: "transparent" } },
    }),
    []
  );
  return (
    <Particles id="tsparticles" init={init} options={options} className="absolute inset-0 -z-10" />
  );
}

// Glass card wrapper
function GlassCard({ children, className }) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-white/10 bg-neutral-900/60 p-5 shadow-2xl backdrop-blur-xl",
        className
      )}
    >
      {children}
    </div>
  );
}

// Navbar with scrollspy (dark-only)
function Navbar({ active }) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener("scroll", close);
    return () => window.removeEventListener("scroll", close);
  }, []);
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-neutral-950/60 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <a href="#home" className="font-semibold tracking-tight">
          {NAME}
        </a>
        <div className="flex items-center gap-2">
          <a
            href="/KarandeepSinghSehgal_Resume.pdf"
            className="inline-flex items-center gap-2 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 px-5 py-2.5 text-base font-medium text-emerald-400 hover:bg-emerald-500/20"
          >
            <Download className="h-4 w-4" /> Download Resume
          </a>
          <button className="md:hidden" onClick={() => setOpen((v) => !v)} aria-label="Menu">
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </nav>
      <div className={cn("md:block border-t border-white/10", open ? "block" : "hidden")}>
        <div className="mx-auto max-w-6xl px-4 py-2">
          <ul className="flex flex-wrap gap-3 text-sm md:justify-center">
            {NAV_LINKS.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  className={cn(
                    "rounded-full px-3 py-1.5 hover:bg-white/10",
                    active === l.id ? "bg-emerald-500/20 text-emerald-400" : ""
                  )}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}

// Hero
function Hero() {
  return (
    <section id="home" className="relative overflow-hidden">
      <ParticleBG />
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-4 py-24 text-center md:py-32">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold tracking-tight md:text-6xl"
        >
          {NAME}
        </motion.h1>

        <p className="max-w-2xl text-balance text-neutral-300">{TAGLINE}</p>

        <p className="text-lg text-neutral-200">
          <Typewriter
            words={["Cybersecurity Student", "SOC Enthusiast", "Systems Engineer Intern"]}
            loop={0}
            cursor
            cursorBlinking
            typeSpeed={60}
            deleteSpeed={40}
            delaySpeed={1500}
          />
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <a
            href="/KarandeepSinghSehgal_Resume.pdf"
            className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-2 text-emerald-400 hover:bg-emerald-500/20"
          >
            <Download className="h-4 w-4" /> Download Resume
          </a>
          <a
            href={SOCIALS.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2 hover:bg-white/10"
          >
            <Github className="h-4 w-4" /> GitHub
          </a>
          <a
            href={SOCIALS.linkedin}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2 hover:bg-white/10"
          >
            <Linkedin className="h-4 w-4" /> LinkedIn
          </a>
          <a
            href={SOCIALS.email}
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2 hover:bg-white/10"
          >
            <Mail className="h-4 w-4" /> Email
          </a>
        </div>

        {/* GitHub Stats (recolored to match theme) */}
        <div className="mt-8 flex w-full max-w-3xl flex-col items-center gap-4">
          <img
            src={`https://github-readme-stats.vercel.app/api?username=${GITHUB_USERNAME}&show_icons=true&hide_border=true&bg_color=00000000&title_color=10b981&text_color=9ca3af&icon_color=10b981`}
            alt="GitHub Stats"
            className="w-full rounded-2xl border border-white/10"
            loading="lazy"
          />
          <img
            src={`https://github-readme-streak-stats.herokuapp.com/?user=${GITHUB_USERNAME}&hide_border=true&background=00000000&ring=10b981&fire=10b981&currStreakNum=FFFFFF&sideNums=FFFFFF&currStreakLabel=9ca3af&sideLabels=9ca3af&dates=6b7280`}
            alt="GitHub Streak"
            className="w-full rounded-2xl border border-white/10"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}

// Projects with filters
function Projects() {
  const categories = ["All", "Security", "Web", "Cloud"];
  const [active, setActive] = useState("All");
  const filtered = useMemo(
    () => (active === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === active)),
    [active]
  );

  return (
    <section id="projects" className="mx-auto max-w-6xl px-4 py-20">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h2 className="text-3xl font-semibold">Projects</h2>
          <p className="text-sm text-neutral-400">Filter by category and hover to peek details.</p>
        </div>
        <div className="flex gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={cn(
                "rounded-full px-3 py-1.5 text-sm",
                active === c
                  ? "bg-emerald-500/20 text-emerald-400"
                  : "hover:bg-white/10 border border-white/10"
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p, idx) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
          >
            <Tilt glareEnable={true} glareMaxOpacity={0.25} scale={1.02} className="h-full">
              <GlassCard className="flex h-full flex-col overflow-hidden">
                <div className="relative aspect-[16/9] overflow-hidden rounded-xl">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="mt-4 flex flex-1 flex-col">
                  <h3 className="text-lg font-semibold">{p.title}</h3>
                  <p className="mt-1 text-sm text-neutral-400">{p.desc}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {p.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-white/10 px-2 py-0.5 text-xs text-neutral-400"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 flex gap-3 pt-2">
                    <a
                      href={p.links.github}
                      className="inline-flex items-center gap-1 text-sm text-emerald-400 hover:underline"
                    >
                      <Github className="h-4 w-4" /> GitHub Link
                    </a>
                  </div>
                </div>
              </GlassCard>
            </Tilt>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// Experience timeline
function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-6xl px-4 py-20">
      <h2 className="mb-8 text-3xl font-semibold">Experience & Education</h2>
      <div className="relative border-l border-white/10 pl-6">
        {EXPERIENCE.map((e, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="mb-10"
          >
            <div className="absolute -left-2.5 mt-1 h-5 w-5 rounded-full border border-emerald-400 bg-neutral-900" />
            <GlassCard>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-lg font-semibold">
                  {e.role} – {e.org}
                </h3>
                <span className="text-xs text-neutral-500">{e.date}</span>
              </div>
              <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-neutral-300">
                {e.points.map((p, idx) => (
                  <li key={idx}>{p}</li>
                ))}
              </ul>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// Skills grid
function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl px-4 py-20">
      <h2 className="mb-8 text-3xl font-semibold">Skills</h2>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {SKILLS.map((s, i) => (
          <motion.div
            key={s.name}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.35, delay: i * 0.05 }}
          >
            <GlassCard className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="rounded-xl bg-emerald-500/15 p-2 text-emerald-400">
                  {s.icon}
                </span>
                <span className="font-medium">{s.name}</span>
              </div>
              <Star className="h-4 w-4 text-neutral-500" />
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// Certifications
function Certs() {
  return (
    <section id="certs" className="mx-auto max-w-6xl px-4 py-20">
      <h2 className="mb-8 text-3xl font-semibold">Certifications</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CERTS.map((c, i) => (
          <motion.a
            key={c.name}
            href={c.link}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.35, delay: i * 0.05 }}
            className="group"
          >
            <GlassCard className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <BadgeCheck className="h-5 w-5 text-emerald-400" />
                <span className="font-medium group-hover:underline">{c.name}</span>
              </div>
              <ArrowUpRight className="h-4 w-4 text-neutral-500" />
            </GlassCard>
          </motion.a>
        ))}
      </div>
    </section>
  );
}

// Blog list (optional)
function Blog() {
  return (
    <section id="blog" className="mx-auto max-w-6xl px-4 py-20">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h2 className="text-3xl font-semibold">Blog</h2>
          <p className="text-sm text-neutral-400">
            Short writeups on labs, concepts, and notes.
          </p>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {BLOGS.map((b, i) => (
          <motion.a
            key={b.title}
            href={b.link}
            className="group"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.35, delay: i * 0.05 }}
          >
            <GlassCard>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold group-hover:underline">
                  {b.title}
                </h3>
                <span className="text-xs text-neutral-500">{b.date}</span>
              </div>
              <p className="mt-2 text-sm text-neutral-400">{b.excerpt}</p>
            </GlassCard>
          </motion.a>
        ))}
      </div>
    </section>
  );
}

// Contact form (Formspree)
function Contact() {
  const [visits, setVisits] = useState(0);
  useEffect(() => {
    const key = "visit-count";
    const current = Number(localStorage.getItem(key) || 0) + 1;
    localStorage.setItem(key, String(current));
    setVisits(current);
  }, []);

  return (
    <section id="contact" className="mx-auto max-w-6xl px-4 py-20">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h2 className="text-3xl font-semibold">Contact</h2>
          <p className="text-sm text-neutral-400">
            Drop a message — I usually respond within a day.
          </p>
        </div>
        <div className="text-xs text-neutral-500">
          Visitor count (this device): {visits}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <GlassCard>
          <form action={FORM_ENDPOINT} method="POST" className="space-y-3">
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm">Name</label>
                <input
                  name="name"
                  required
                  className="w-full rounded-xl border border-white/10 bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-400"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm">Email</label>
                <input
                  name="email"
                  type="email"
                  required
                  className="w-full rounded-xl border border-white/10 bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-400"
                />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-sm">Message</label>
              <textarea
                name="message"
                rows={5}
                required
                className="w-full rounded-xl border border-white/10 bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-400"
              />
            </div>
            <button className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-2 text-emerald-400 hover:bg-emerald-500/20">
              <Mail className="h-4 w-4" /> Send
            </button>
          </form>
        </GlassCard>
        <GlassCard>
          <h3 className="mb-3 text-lg font-semibold">Elsewhere</h3>
          <div className="flex flex-col gap-3 text-sm">
            <a
              href={SOCIALS.github}
              className="inline-flex items-center gap-2 text-emerald-400 hover:underline"
            >
              <Github className="h-4 w-4" /> GitHub
            </a>
            <a
              href={SOCIALS.linkedin}
              className="inline-flex items-center gap-2 text-emerald-400 hover:underline"
            >
              <Linkedin className="h-4 w-4" /> LinkedIn
            </a>
            <a
              href={SOCIALS.email}
              className="inline-flex items-center gap-2 text-emerald-400 hover:underline"
            >
              <Mail className="h-4 w-4" /> Email
            </a>
          </div>
          <div className="mt-6">
            <h4 className="text-sm font-medium">Resume</h4>
            <a
              href="/KarandeepSinghSehgal_Resume.pdf"
              className="inline-flex items-center gap-2 pt-1 text-emerald-400 hover:underline"
            >
              <Download className="h-4 w-4" /> Download PDF
            </a>
          </div>
        </GlassCard>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 py-10">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 text-sm text-neutral-500">
        <span>
          © {new Date().getFullYear()} {NAME}. All rights reserved.
        </span>
        <a href="#home" className="hover:underline">
          Back to top
        </a>
      </div>
    </footer>
  );
}

export default function App() {
  // Force dark + smooth scroll
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    document.documentElement.classList.add("dark");
  }, []);

  const active = useScrollSpy(NAV_LINKS.map((n) => n.id));

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <Cursor />
      <ScrollProgress />
      <Navbar active={active} />

      <main className="space-y-0">
        <Hero />
        <Projects />
        <Experience />
        <Skills />
        <Certs />
        <Blog />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
