import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  Dumbbell, Menu, X, Flame, Heart, Zap, Users, Trophy, Clock, ShieldCheck,
  Instagram, Twitter, Facebook, Youtube, Mail, Phone, MapPin, ArrowRight,
  Star, ChevronDown, Search, Play, Activity, Timer, Target, Sparkles,
  ArrowUp, Check,
} from "lucide-react";

import heroImg from "@/assets/hero-gym.jpg";
import t1 from "@/assets/trainer-1.jpg";
import t2 from "@/assets/trainer-2.jpg";
import t3 from "@/assets/trainer-3.jpg";
import t4 from "@/assets/trainer-4.jpg";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import g5 from "@/assets/gallery-5.jpg";
import g6 from "@/assets/gallery-6.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { property: "og:image", content: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200" },
    ],
  }),
  component: Index,
});

// ---------- Data ----------
const NAV = ["Home", "About", "Programs", "Trainers", "Pricing", "Gallery", "Testimonials", "Contact"];

const PROGRAMS = [
  { icon: Dumbbell, name: "Strength Training", desc: "Build raw power and lean muscle with progressive lifting.", duration: "60 min", level: "All Levels", cat: "Strength" },
  { icon: Flame, name: "Weight Loss", desc: "High-intensity fat-burn circuits with expert coaching.", duration: "45 min", level: "Beginner", cat: "Cardio" },
  { icon: Heart, name: "Cardio Fitness", desc: "Boost endurance and heart health with dynamic sessions.", duration: "50 min", level: "All Levels", cat: "Cardio" },
  { icon: Sparkles, name: "Yoga", desc: "Flow, breathe, and restore with certified yogis.", duration: "60 min", level: "Beginner", cat: "Wellness" },
  { icon: Zap, name: "CrossFit", desc: "Functional strength meets high-intensity conditioning.", duration: "60 min", level: "Advanced", cat: "Strength" },
  { icon: Activity, name: "Functional Training", desc: "Move better, live stronger — real-world athleticism.", duration: "45 min", level: "Intermediate", cat: "Strength" },
  { icon: Target, name: "Personal Training", desc: "1-on-1 coaching tailored to your body and goals.", duration: "60 min", level: "All Levels", cat: "Wellness" },
  { icon: Timer, name: "Zumba", desc: "Dance your way to fitness with pulsing Latin rhythms.", duration: "50 min", level: "Beginner", cat: "Cardio" },
];

const TRAINERS = [
  { img: t1, name: "Marcus Steele", spec: "Strength & Bodybuilding", exp: "12 yrs", cert: "NASM, IFBB Pro" },
  { img: t2, name: "Ava Reyes", spec: "HIIT & Fat Loss", exp: "8 yrs", cert: "ACE, Precision Nutrition" },
  { img: t3, name: "Diego Cruz", spec: "CrossFit & Functional", exp: "10 yrs", cert: "CF-L3, USAW" },
  { img: t4, name: "Lena Park", spec: "Yoga & Mobility", exp: "9 yrs", cert: "RYT-500, FRC" },
];

const PLANS = [
  { name: "Basic", price: "1,499", features: ["Gym floor access", "Locker room", "2 group classes/wk", "Fitness assessment"], featured: false },
  { name: "Standard", price: "2,999", features: ["Everything in Basic", "Unlimited group classes", "24/7 access", "1 PT session/month", "Nutrition plan"], featured: true },
  { name: "Premium", price: "4,999", features: ["Everything in Standard", "4 PT sessions/month", "Recovery lounge & sauna", "Guest passes (4)", "Custom program"], featured: false },
];

const SCHEDULE = [
  { time: "06:00", mon: "Strength", tue: "HIIT", wed: "Yoga", thu: "CrossFit", fri: "Strength", sat: "Zumba", sun: "Recovery" },
  { time: "09:00", mon: "Yoga", tue: "Cardio", wed: "Functional", thu: "Yoga", fri: "HIIT", sat: "CrossFit", sun: "Yoga" },
  { time: "17:30", mon: "CrossFit", tue: "Strength", wed: "Zumba", thu: "Cardio", fri: "Functional", sat: "Strength", sun: "—" },
  { time: "19:00", mon: "HIIT", tue: "Yoga", wed: "Strength", thu: "Zumba", fri: "CrossFit", sat: "—", sun: "—" },
];

const GALLERY = [g1, g2, g3, g4, g5, g6];

const TESTIMONIALS = [
  { name: "Sarah Mitchell", role: "Member since 2022", rating: 5, text: "PowerFit changed my life. Down 30 lbs, stronger than ever. The trainers actually care." },
  { name: "James Okafor", role: "Powerlifter", rating: 5, text: "The equipment is top-tier and the 24/7 access fits my chaotic schedule. Best gym in the city." },
  { name: "Priya Sharma", role: "Yoga student", rating: 5, text: "Lena's classes are meditation and workout in one. I leave feeling grounded and powerful." },
  { name: "Diego Alvarez", role: "CrossFit athlete", rating: 5, text: "Real coaching, real community. My deadlift went from 315 to 465 in a year." },
];

const FAQ = [
  { q: "How do memberships work?", a: "All plans are month-to-month with no long-term contracts. Upgrade, downgrade, or pause anytime through your member portal." },
  { q: "Can I book personal training?", a: "Yes — every plan includes access to certified PTs. Standard includes 1 session/month; Premium includes 4. Additional sessions available." },
  { q: "What is your cancellation policy?", a: "Cancel anytime with 7 days' notice. No hidden fees, no penalties. We only want members who love being here." },
  { q: "What are your hours?", a: "Standard & Premium members have 24/7 access. Staffed hours are Mon–Fri 5am–11pm, Sat–Sun 7am–9pm." },
];

// ---------- Helpers ----------
function useInView<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    if (!ref.current || seen) return;
    const el = ref.current;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setSeen(true), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, [seen]);
  return { ref, seen };
}

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const { ref, seen } = useInView<HTMLSpanElement>();
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!seen) return;
    const dur = 1800;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min((t - start) / dur, 1);
      setVal(Math.floor(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [seen, to]);
  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
}

// ---------- Page ----------
function Index() {
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 900);
    const onScroll = () => {
      const h = document.documentElement;
      setScrolled(h.scrollTop > 40);
      setProgress((h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => { clearTimeout(t); window.removeEventListener("scroll", onScroll); };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Loading */}
      {loading && (
        <div className="fixed inset-0 z-[100] grid place-items-center bg-background">
          <div className="flex flex-col items-center gap-4">
            <Dumbbell className="h-12 w-12 text-primary animate-pulse" />
            <div className="font-display text-2xl tracking-wider">POWER<span className="text-primary">FIT</span></div>
          </div>
        </div>
      )}

      {/* Scroll progress */}
      <div className="fixed left-0 top-0 z-[60] h-0.5 w-full bg-transparent">
        <div className="h-full bg-primary transition-[width] duration-100" style={{ width: `${progress}%` }} />
      </div>

      <Nav navOpen={navOpen} setNavOpen={setNavOpen} scrolled={scrolled} />
      <Hero />
      <Marquee />
      <About />
      <Programs />
      <Trainers />
      <Pricing />
      <BMI />
      <Schedule />
      <Gallery />
      <Testimonials />
      <FAQSection />
      <Contact />
      <Footer />

      {/* Scroll-to-top */}
      {scrolled && (
        <a href="#home" aria-label="Back to top"
          className="fixed bottom-6 right-6 z-50 grid h-12 w-12 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg transition hover:scale-110 animate-pulse-red">
          <ArrowUp className="h-5 w-5" />
        </a>
      )}
    </div>
  );
}

// ---------- Nav ----------
function Nav({ navOpen, setNavOpen, scrolled }: { navOpen: boolean; setNavOpen: (b: boolean) => void; scrolled: boolean }) {
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? "glass py-3" : "bg-transparent py-5"}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6">
        <a href="#home" className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-md bg-primary">
            <Dumbbell className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-display text-xl tracking-wider">POWER<span className="text-primary">FIT</span></span>
        </a>
        <nav className="hidden items-center gap-7 lg:flex">
          {NAV.map(n => (
            <a key={n} href={`#${n.toLowerCase()}`} className="text-sm font-medium text-muted-foreground transition hover:text-primary">{n}</a>
          ))}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <a href="#pricing" className="rounded-md border border-primary/40 px-4 py-2 text-sm font-semibold text-foreground transition hover:bg-primary/10">Book Free Trial</a>
          <a href="#pricing" className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition hover:brightness-110">Join Now</a>
        </div>
        <button aria-label="Menu" onClick={() => setNavOpen(!navOpen)} className="lg:hidden">
          {navOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {navOpen && (
        <div className="glass mx-4 mt-3 rounded-xl p-4 lg:hidden">
          <div className="flex flex-col gap-1">
            {NAV.map(n => (
              <a key={n} href={`#${n.toLowerCase()}`} onClick={() => setNavOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition hover:bg-primary/10 hover:text-primary">{n}</a>
            ))}
            <a href="#pricing" onClick={() => setNavOpen(false)} className="mt-2 rounded-md bg-primary px-3 py-2 text-center text-sm font-semibold text-primary-foreground">Join Now</a>
          </div>
        </div>
      )}
    </header>
  );
}

// ---------- Hero ----------
function Hero() {
  return (
    <section id="home" className="relative min-h-screen overflow-hidden">
      <img src={heroImg} alt="" width={1920} height={1280} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
      <div className="absolute inset-0 bg-background/60" />

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-4 pt-24 sm:px-6">
        <div className="max-w-3xl animate-fade-up">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full glass-red px-4 py-1.5 text-xs font-semibold uppercase tracking-widest">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse-red" /> #1 Fitness Club — Est. 2010
          </div>
          <h1 className="font-display text-5xl font-bold uppercase leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl">
            Stronger <span className="text-gradient-red">Every Day.</span><br />
            Healthier for Life.
          </h1>
          <p className="mt-6 max-w-xl text-base text-muted-foreground sm:text-lg">
            PowerFit Gym is where discipline meets community. World-class equipment, elite trainers, and 24/7 access — built for people who refuse to settle.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#pricing" className="group inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3.5 font-semibold text-primary-foreground shadow-lg shadow-primary/40 transition hover:brightness-110">
              Join Now <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </a>
            <a href="#programs" className="inline-flex items-center gap-2 rounded-md border border-white/20 bg-white/5 px-6 py-3.5 font-semibold backdrop-blur transition hover:bg-white/10">
              <Play className="h-4 w-4" /> Book Free Trial
            </a>
          </div>
          {/* Countdown */}
          <Countdown />
        </div>
      </div>
    </section>
  );
}

function Countdown() {
  const target = useRef(Date.now() + 1000 * 60 * 60 * 72);
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const i = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(i);
  }, []);
  const diff = Math.max(0, target.current - now);
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff / 3600000) % 24);
  const m = Math.floor((diff / 60000) % 60);
  const s = Math.floor((diff / 1000) % 60);
  const box = (n: number, l: string) => (
    <div className="glass-red flex min-w-16 flex-col items-center rounded-lg px-3 py-2">
      <span className="font-display text-2xl">{String(n).padStart(2, "0")}</span>
      <span className="text-[10px] uppercase tracking-widest text-muted-foreground">{l}</span>
    </div>
  );
  return (
    <div className="mt-10 max-w-lg">
      <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">🔥 Founder's offer — 40% off first 3 months</p>
      <div className="flex gap-2">{box(d, "Days")}{box(h, "Hrs")}{box(m, "Min")}{box(s, "Sec")}</div>
    </div>
  );
}

function Marquee() {
  const items = ["STRENGTH", "DISCIPLINE", "COMMUNITY", "24/7 ACCESS", "NO EXCUSES", "STRENGTH", "DISCIPLINE", "COMMUNITY", "24/7 ACCESS", "NO EXCUSES"];
  return (
    <div className="border-y border-border bg-surface py-5 overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap gap-12">
        {items.concat(items).map((t, i) => (
          <span key={i} className="font-display text-2xl uppercase tracking-widest text-muted-foreground">
            {t} <span className="mx-6 text-primary">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ---------- About ----------
function About() {
  const stats = [
    { n: 5000, s: "+", l: "Active Members" },
    { n: 50, s: "+", l: "Expert Trainers" },
    { n: 15, s: "+", l: "Years Experience" },
    { n: 24, s: "/7", l: "Gym Access" },
  ];
  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionKicker>About PowerFit</SectionKicker>
            <h2 className="mt-3 font-display text-4xl font-bold uppercase leading-tight sm:text-5xl">
              Built by athletes.<br /><span className="text-gradient-red">For everyone.</span>
            </h2>
            <p className="mt-6 text-muted-foreground">
              Since 2010, PowerFit has been the training ground for weekend warriors, competitive lifters, and everyone in between. Our mission is simple: give every member the tools, coaching, and community they need to become the strongest version of themselves.
            </p>
            <div className="mt-8 space-y-3">
              {["World-class equipment across 2 floors", "Certified coaches with real credentials", "Recovery lounge, sauna, and cold plunge", "No contracts. No judgment. Just results."].map(f => (
                <div key={f} className="flex items-center gap-3">
                  <div className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary/15">
                    <Check className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <span className="text-sm text-foreground/90">{f}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {stats.map((s, i) => (
              <div key={s.l} className="glass rounded-2xl p-6 sm:p-8 transition hover:border-primary/40 hover:-translate-y-1"
                style={{ animationDelay: `${i * 80}ms` }}>
                <div className="font-display text-4xl font-bold text-primary sm:text-5xl">
                  <Counter to={s.n} suffix={s.s} />
                </div>
                <div className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionKicker({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
      <span className="h-1.5 w-1.5 rounded-full bg-primary" />{children}
    </div>
  );
}

// ---------- Programs ----------
function Programs() {
  const [filter, setFilter] = useState("All");
  const [q, setQ] = useState("");
  const cats = ["All", "Strength", "Cardio", "Wellness"];
  const filtered = PROGRAMS.filter(p =>
    (filter === "All" || p.cat === filter) &&
    (q === "" || p.name.toLowerCase().includes(q.toLowerCase()))
  );
  return (
    <section id="programs" className="relative bg-surface py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <SectionKicker>Programs</SectionKicker>
            <h2 className="mt-3 font-display text-4xl font-bold uppercase leading-tight sm:text-5xl">
              Train your way. <span className="text-gradient-red">Every way.</span>
            </h2>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search programs..." aria-label="Search programs"
                className="w-full rounded-md border border-input bg-secondary/40 py-2.5 pl-9 pr-3 text-sm outline-none transition focus:border-primary sm:w-56" />
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {cats.map(c => (
            <button key={c} onClick={() => setFilter(c)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest transition ${filter === c ? "bg-primary text-primary-foreground" : "border border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"}`}>
              {c}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((p) => {
            const Icon = p.icon;
            return (
              <div key={p.name} className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:border-primary/50">
                <div className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: "radial-gradient(400px circle at 50% 0%, oklch(0.58 0.22 27 / 0.15), transparent)" }} />
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-primary to-primary/50 shadow-lg shadow-primary/30">
                  <Icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="mt-5 font-display text-xl uppercase tracking-wide">{p.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
                <div className="mt-5 flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{p.duration}</span>
                  <span className="inline-flex items-center gap-1"><Target className="h-3.5 w-3.5" />{p.level}</span>
                </div>
                <button className="mt-5 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-widest text-primary transition hover:gap-2">
                  Learn More <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            );
          })}
          {filtered.length === 0 && <p className="col-span-full py-12 text-center text-muted-foreground">No programs found.</p>}
        </div>
      </div>
    </section>
  );
}

// ---------- Trainers ----------
function Trainers() {
  return (
    <section id="trainers" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center">
          <SectionKicker>Meet the Team</SectionKicker>
          <h2 className="mt-3 font-display text-4xl font-bold uppercase leading-tight sm:text-5xl">
            Coaches Who <span className="text-gradient-red">Push Harder.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">Certified. Experienced. Obsessed with your results.</p>
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TRAINERS.map(t => (
            <article key={t.name} className="group relative overflow-hidden rounded-2xl border border-border bg-card transition hover:border-primary/50">
              <div className="relative aspect-[4/5] overflow-hidden">
                <img src={t.img} alt={t.name} loading="lazy" width={800} height={1000}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex justify-center gap-2 pb-4 opacity-0 transition group-hover:opacity-100">
                  {[Instagram, Twitter, Facebook].map((I, i) => (
                    <a key={i} href="#" aria-label="social" className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg">
                      <I className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-display text-xl uppercase">{t.name}</h3>
                <p className="mt-1 text-sm text-primary">{t.spec}</p>
                <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1"><Trophy className="h-3.5 w-3.5" />{t.exp}</span>
                  <span className="inline-flex items-center gap-1"><ShieldCheck className="h-3.5 w-3.5" />{t.cert}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- Pricing ----------
function Pricing() {
  return (
    <section id="pricing" className="relative bg-surface py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center">
          <SectionKicker>Membership</SectionKicker>
          <h2 className="mt-3 font-display text-4xl font-bold uppercase leading-tight sm:text-5xl">
            Plans built for <span className="text-gradient-red">every goal.</span>
          </h2>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {PLANS.map(p => (
            <div key={p.name}
              className={`relative rounded-2xl border p-8 transition hover:-translate-y-1 ${p.featured ? "border-primary bg-gradient-to-b from-primary/15 to-card btn-glow" : "border-border bg-card hover:border-primary/40"}`}>
              {p.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-[10px] font-bold uppercase tracking-widest text-primary-foreground">
                  Most Popular
                </span>
              )}
              <h3 className="font-display text-2xl uppercase">{p.name}</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="font-display text-6xl font-bold">₹{p.price}</span>
                <span className="text-sm text-muted-foreground">/month</span>
              </div>
              <ul className="mt-6 space-y-3">
                {p.features.map(f => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span className="text-foreground/90">{f}</span>
                  </li>
                ))}
              </ul>
              <button className={`mt-8 w-full rounded-md py-3 text-sm font-semibold uppercase tracking-widest transition ${p.featured ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30 hover:brightness-110" : "border border-border hover:border-primary hover:text-primary"}`}>
                Join Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- BMI ----------
function BMI() {
  const [h, setH] = useState("");
  const [w, setW] = useState("");
  const hn = parseFloat(h), wn = parseFloat(w);
  const bmi = hn && wn ? wn / Math.pow(hn / 100, 2) : 0;
  const cat = !bmi ? "" : bmi < 18.5 ? "Underweight" : bmi < 25 ? "Healthy" : bmi < 30 ? "Overweight" : "Obese";
  const tip = !bmi ? "Enter your height and weight to calculate your BMI." :
    bmi < 18.5 ? "Focus on strength training and calorie-dense whole foods." :
    bmi < 25 ? "You're in a healthy range — keep training consistently!" :
    bmi < 30 ? "Combine cardio and strength; small deficits compound." :
    "Start with low-impact cardio and consult one of our trainers.";
  const color = !bmi ? "text-muted-foreground" : bmi < 18.5 || bmi >= 30 ? "text-primary" : bmi < 25 ? "text-emerald-400" : "text-amber-400";

  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="glass-red rounded-3xl p-8 sm:p-12">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <SectionKicker>BMI Calculator</SectionKicker>
              <h2 className="mt-3 font-display text-3xl font-bold uppercase sm:text-4xl">Know your <span className="text-gradient-red">baseline.</span></h2>
              <p className="mt-3 text-muted-foreground">Body Mass Index is a quick check-in — not the whole story. Our trainers use it as one input in your custom program.</p>
              <div className="mt-6 space-y-4">
                <label className="block">
                  <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Height (cm)</span>
                  <input type="number" value={h} onChange={e => setH(e.target.value)} placeholder="175"
                    className="mt-1 w-full rounded-md border border-input bg-background/60 px-4 py-3 outline-none transition focus:border-primary" />
                </label>
                <label className="block">
                  <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Weight (kg)</span>
                  <input type="number" value={w} onChange={e => setW(e.target.value)} placeholder="70"
                    className="mt-1 w-full rounded-md border border-input bg-background/60 px-4 py-3 outline-none transition focus:border-primary" />
                </label>
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-card/60 p-8 text-center">
              <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Your BMI</div>
              <div className={`mt-2 font-display text-7xl font-bold ${color}`}>{bmi ? bmi.toFixed(1) : "—"}</div>
              <div className={`mt-2 text-sm font-semibold uppercase tracking-widest ${color}`}>{cat || "Awaiting input"}</div>
              <p className="mt-6 text-sm text-muted-foreground">{tip}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- Schedule ----------
function Schedule() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const keys: (keyof typeof SCHEDULE[0])[] = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
  return (
    <section className="bg-surface py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center">
          <SectionKicker>Weekly Schedule</SectionKicker>
          <h2 className="mt-3 font-display text-4xl font-bold uppercase sm:text-5xl">Find your <span className="text-gradient-red">time slot.</span></h2>
        </div>
        <div className="mt-12 overflow-x-auto rounded-2xl border border-border">
          <table className="w-full min-w-[720px] text-sm">
            <thead className="bg-card">
              <tr>
                <th className="p-4 text-left font-display uppercase tracking-widest text-muted-foreground">Time</th>
                {days.map(d => <th key={d} className="p-4 text-left font-display uppercase tracking-widest text-muted-foreground">{d}</th>)}
              </tr>
            </thead>
            <tbody>
              {SCHEDULE.map((row, i) => (
                <tr key={row.time} className={i % 2 ? "bg-card/40" : ""}>
                  <td className="p-4 font-display text-primary">{row.time}</td>
                  {keys.map(k => (
                    <td key={k} className="p-4">
                      {row[k] === "—" ? <span className="text-muted-foreground">—</span> :
                        <span className="rounded-md bg-primary/10 px-2 py-1 text-xs font-semibold text-primary">{row[k]}</span>}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

// ---------- Gallery ----------
function Gallery() {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <section id="gallery" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center">
          <SectionKicker>Gallery</SectionKicker>
          <h2 className="mt-3 font-display text-4xl font-bold uppercase sm:text-5xl">Inside the <span className="text-gradient-red">grind.</span></h2>
        </div>
        <div className="mt-12 columns-2 gap-4 md:columns-3 [column-fill:_balance]">
          {GALLERY.map((src, i) => (
            <button key={i} onClick={() => setOpen(src)}
              className="mb-4 block w-full overflow-hidden rounded-xl border border-border transition hover:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary">
              <img src={src} alt={`Gym ${i + 1}`} loading="lazy"
                className="h-auto w-full transition duration-700 hover:scale-105" />
            </button>
          ))}
        </div>
      </div>
      {open && (
        <div role="dialog" aria-modal="true" onClick={() => setOpen(null)}
          className="fixed inset-0 z-[70] grid animate-fade-in place-items-center bg-background/90 p-4 backdrop-blur">
          <button aria-label="Close" className="absolute right-6 top-6 grid h-11 w-11 place-items-center rounded-full bg-primary text-primary-foreground">
            <X />
          </button>
          <img src={open} alt="" className="max-h-[85vh] max-w-full rounded-xl" />
        </div>
      )}
    </section>
  );
}

// ---------- Testimonials ----------
function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI(v => (v + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(t);
  }, []);
  return (
    <section id="testimonials" className="relative overflow-hidden bg-surface py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 opacity-30"
        style={{ background: "radial-gradient(600px circle at 20% 20%, oklch(0.58 0.22 27 / 0.3), transparent)" }} />
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6">
        <div className="text-center">
          <SectionKicker>Testimonials</SectionKicker>
          <h2 className="mt-3 font-display text-4xl font-bold uppercase sm:text-5xl">Real members. <span className="text-gradient-red">Real results.</span></h2>
        </div>
        <div className="mt-12 glass rounded-3xl p-8 sm:p-12">
          <div className="mb-4 flex justify-center gap-1">
            {Array.from({ length: TESTIMONIALS[i].rating }).map((_, k) => <Star key={k} className="h-5 w-5 fill-primary text-primary" />)}
          </div>
          <p className="text-center font-display text-xl leading-relaxed sm:text-2xl">"{TESTIMONIALS[i].text}"</p>
          <div className="mt-6 flex flex-col items-center">
            <div className="grid h-12 w-12 place-items-center rounded-full bg-primary font-display text-lg text-primary-foreground">
              {TESTIMONIALS[i].name.split(" ").map(x => x[0]).join("")}
            </div>
            <div className="mt-3 font-display uppercase tracking-widest">{TESTIMONIALS[i].name}</div>
            <div className="text-xs text-muted-foreground">{TESTIMONIALS[i].role}</div>
          </div>
          <div className="mt-6 flex justify-center gap-2">
            {TESTIMONIALS.map((_, k) => (
              <button key={k} aria-label={`Review ${k + 1}`} onClick={() => setI(k)}
                className={`h-1.5 rounded-full transition-all ${k === i ? "w-8 bg-primary" : "w-1.5 bg-border"}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- FAQ ----------
function FAQSection() {
  const [open, setOpen] = useState(0);
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="text-center">
          <SectionKicker>FAQ</SectionKicker>
          <h2 className="mt-3 font-display text-4xl font-bold uppercase sm:text-5xl">Questions? <span className="text-gradient-red">Answered.</span></h2>
        </div>
        <div className="mt-10 space-y-3">
          {FAQ.map((f, i) => (
            <div key={f.q} className="overflow-hidden rounded-xl border border-border bg-card">
              <button onClick={() => setOpen(open === i ? -1 : i)}
                className="flex w-full items-center justify-between gap-4 p-5 text-left font-display uppercase tracking-wide transition hover:text-primary">
                <span>{f.q}</span>
                <ChevronDown className={`h-5 w-5 shrink-0 transition-transform ${open === i ? "rotate-180 text-primary" : ""}`} />
              </button>
              <div className={`grid transition-all duration-300 ${open === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                <div className="overflow-hidden">
                  <p className="px-5 pb-5 text-sm text-muted-foreground">{f.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- Contact ----------
function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [err, setErr] = useState<string | null>(null);
  const [ok, setOk] = useState(false);
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.includes("@") || form.message.trim().length < 10) {
      setErr("Please fill all fields (message ≥ 10 chars, valid email).");
      return;
    }
    setErr(null); setOk(true);
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setOk(false), 4000);
  };
  return (
    <section id="contact" className="bg-surface py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center">
          <SectionKicker>Contact</SectionKicker>
          <h2 className="mt-3 font-display text-4xl font-bold uppercase sm:text-5xl">Get in <span className="text-gradient-red">touch.</span></h2>
        </div>
        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          <form onSubmit={submit} className="glass space-y-4 rounded-2xl p-6 sm:p-8" noValidate>
            <div>
              <label htmlFor="name" className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Name</label>
              <input id="name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                className="mt-1 w-full rounded-md border border-input bg-background/60 px-4 py-3 outline-none transition focus:border-primary" />
            </div>
            <div>
              <label htmlFor="email" className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Email</label>
              <input id="email" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                className="mt-1 w-full rounded-md border border-input bg-background/60 px-4 py-3 outline-none transition focus:border-primary" />
            </div>
            <div>
              <label htmlFor="msg" className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Message</label>
              <textarea id="msg" rows={5} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                className="mt-1 w-full rounded-md border border-input bg-background/60 px-4 py-3 outline-none transition focus:border-primary" />
            </div>
            {err && <p className="text-sm text-primary">{err}</p>}
            {ok && <p className="text-sm text-emerald-400">Message sent — we'll be in touch soon.</p>}
            <button type="submit" className="w-full rounded-md bg-primary py-3 font-semibold uppercase tracking-widest text-primary-foreground shadow-lg shadow-primary/30 transition hover:brightness-110">
              Send Message
            </button>
          </form>
          <div className="space-y-4">
            {[
              { I: MapPin, t: "Address", v: "42, Lokhandwala Complex, Andheri West, Mumbai, Maharashtra 400053" },
              { I: Phone, t: "Phone", v: "+91 98765 43210" },
              { I: Mail, t: "Email", v: "hello@powerfitgym.com" },
              { I: Clock, t: "Hours", v: "Staffed Mon–Fri 5am–11pm · 24/7 for members" },
            ].map(({ I, t, v }) => (
              <div key={t} className="flex items-start gap-4 rounded-xl border border-border bg-card p-5">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-primary/15">
                  <I className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{t}</div>
                  <div className="mt-1 text-sm">{v}</div>
                </div>
              </div>
            ))}
            <iframe title="PowerFit Gym location"
              src="https://www.openstreetmap.org/export/embed.html?bbox=72.80%2C19.12%2C72.84%2C19.15&layer=mapnik"
              className="h-64 w-full rounded-xl border border-border" loading="lazy" />
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- Footer ----------
function Footer() {
  const [nlEmail, setNlEmail] = useState("");
  const [nlOk, setNlOk] = useState(false);
  return (
    <footer className="border-t border-border bg-background py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="grid h-9 w-9 place-items-center rounded-md bg-primary">
                <Dumbbell className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-display text-xl tracking-wider">POWER<span className="text-primary">FIT</span></span>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">Stronger every day. Healthier for life.</p>
            <div className="mt-5 flex gap-2">
              {[Instagram, Twitter, Facebook, Youtube].map((I, i) => (
                <a key={i} href="#" aria-label="social" className="grid h-9 w-9 place-items-center rounded-full border border-border transition hover:border-primary hover:bg-primary hover:text-primary-foreground">
                  <I className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-display uppercase tracking-widest">Quick Links</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {NAV.slice(0, 6).map(n => <li key={n}><a href={`#${n.toLowerCase()}`} className="transition hover:text-primary">{n}</a></li>)}
            </ul>
          </div>
          <div>
            <h4 className="font-display uppercase tracking-widest">Hours</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>Mon–Fri · 5:00 – 23:00</li>
              <li>Sat–Sun · 7:00 – 21:00</li>
              <li className="text-primary">Members · 24/7 access</li>
            </ul>
          </div>
          <div>
            <h4 className="font-display uppercase tracking-widest">Newsletter</h4>
            <p className="mt-4 text-sm text-muted-foreground">Training tips, offers, and event drops.</p>
            <form onSubmit={(e) => { e.preventDefault(); if (nlEmail.includes("@")) { setNlOk(true); setNlEmail(""); } }} className="mt-4 flex gap-2">
              <input type="email" required placeholder="Email address" value={nlEmail} onChange={e => setNlEmail(e.target.value)}
                aria-label="Email address"
                className="w-full rounded-md border border-input bg-secondary/40 px-3 py-2 text-sm outline-none focus:border-primary" />
              <button className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">Join</button>
            </form>
            {nlOk && <p className="mt-2 text-xs text-emerald-400">Subscribed!</p>}
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} PowerFit Gym. All rights reserved.</p>
          <p>Built with discipline & <Users className="inline h-3 w-3 text-primary" /> community.</p>
        </div>
      </div>
    </footer>
  );
}
