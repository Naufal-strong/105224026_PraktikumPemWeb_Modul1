"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";

// ==========================================
// Types & Data Structures
// ==========================================
interface Slide {
  id: number;
  category: string;
  title: string;
  subtitle: string;
  notes: string;
  layout:
    | "hero"
    | "agenda"
    | "principles"
    | "code-compare"
    | "metrics"
    | "matrix"
    | "quote"
    | "conclusion";
  content?: any;
}

const SLIDES_DATA: Slide[] = [
  {
    id: 1,
    category: "PRAKTIKUM • WEEK 01",
    title: "THE ARCHITECTURE OF SIMPLICITY",
    subtitle:
      "Designing scalable web interfaces with minimalist precision, radical clarity, and uncompromising performance.",
    notes:
      "Welcome everyone. Introduce the core premise: how constraint, specifically monochrome simplicity and clean typography, drives better software engineering and user focus.",
    layout: "hero",
    content: {
      author: "Engineering & Interface Team",
      version: "v1.0.4 • 2026 Edition",
      badge: "KEYNOTE PRESENTATION",
      meta: [
        { label: "Course", value: "Pemrograman Web & Aplikasi" },
        { label: "Focus", value: "Modern Frontend Systems" },
        { label: "Status", value: "Production Ready" },
      ],
    },
  },
  {
    id: 2,
    category: "AGENDA & OVERVIEW",
    title: "SYLLABUS & CORE TRAJECTORY",
    subtitle:
      "A structured walkthrough across four critical dimensions of modern web application craft.",
    notes:
      "Quickly set expectations for the session. Emphasize that each pillar reinforces the others: foundations feed performance, which enables scale.",
    layout: "agenda",
    content: {
      items: [
        {
          index: "01",
          phase: "FOUNDATION",
          title: "Structural Composition",
          desc: "Hierarchical component architecture, declarative state pipelines, and atomic boundaries.",
          duration: "15 MIN",
        },
        {
          index: "02",
          phase: "INTERFACE",
          title: "Monochrome Ergonomics",
          desc: "Elevating contrast, visual rhythm, micro-typography, and intuitive spatial awareness.",
          duration: "20 MIN",
        },
        {
          index: "03",
          phase: "EFFICIENCY",
          title: "Performance Budgets",
          desc: "Sub-50ms interaction loops, zero-runtime bloat, and intelligent layout stability.",
          duration: "20 MIN",
        },
        {
          index: "04",
          phase: "DEPLOYMENT",
          title: "Production Scalability",
          desc: "Resilience under load, edge distribution patterns, and strict typing contracts.",
          duration: "15 MIN",
        },
      ],
    },
  },
  {
    id: 3,
    category: "CORE PRINCIPLES",
    title: "THE TRIAD OF SYSTEM DESIGN",
    subtitle:
      "Three non-negotiable fundamentals that distinguish enduring software from ephemeral code.",
    notes:
      "Spend extra time on principle 1: radical reduction isn't taking things away arbitrarily; it is discovering the essential form of the solution.",
    layout: "principles",
    content: {
      pillars: [
        {
          number: "01",
          heading: "Radical Reduction",
          subhead: "Subtract until only essence remains",
          description:
            "Every redundant pixel, nested wrapper, and decorative distraction drains cognitive bandwidth and inflates client bundle cost.",
          metrics: "62% Less Visual Fatigue",
          accentLabel: "Clarity",
        },
        {
          number: "02",
          heading: "Deterministic States",
          subhead: "Predictable under every condition",
          description:
            "Isolate mutations into pure transforms. Interfaces should behave consistently whether offline, throttled, or handling unexpected inputs.",
          metrics: "0% Ambiguous State",
          accentLabel: "Reliability",
        },
        {
          number: "03",
          heading: "Fluid Ergonomics",
          subhead: "Sub-100ms response perception",
          description:
            "Instant feedback transforms software from an obstacle into an extension of thought. Fast animations must serve function, not decoration.",
          metrics: "<40ms Latency Floor",
          accentLabel: "Speed",
        },
      ],
    },
  },
  {
    id: 4,
    category: "ENGINEERING PATTERNS",
    title: "DECLARATIVE VS MONOLITHIC",
    subtitle:
      "A direct comparative study of contemporary frontend state orchestration.",
    notes:
      "Point out the right pane: by separating query concerns from pure presentation cards, we eliminate cascading re-renders entirely.",
    layout: "code-compare",
    content: {
      leftCode: {
        tag: "LEGACY PATTERN",
        status: "DEPRECATED",
        title: "Tightly Coupled Monolith",
        snippet: `// Anti-pattern: Mixed concerns & cascading renders
function UserDashboard({ id }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/user/' + id)
      .then(res => res.json())
      .then(d => {
        setData(d);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Loading...</div>;
  return <div className="card">{data.name}</div>;
}`,
        flaws: [
          "No boundary error isolation",
          "Cascading waterfall latency",
          "Coupled fetch & presentation logic",
        ],
      },
      rightCode: {
        tag: "MODERN STANDARD",
        status: "RECOMMENDED",
        title: "Deterministic Reactive Boundary",
        snippet: `// Clean: Composable, typed & boundary-guarded
export function UserProfileCard({ userId }: { userId: string }) {
  const { user, status } = useSuspendedUser(userId);

  return (
    <Card variant="monochrome" role="article">
      <Avatar src={user.avatar} fallback={user.initials} />
      <Stack gap={2}>
        <Heading level={3}>{user.name}</Heading>
        <Badge tone="neutral">{user.role}</Badge>
      </Stack>
    </Card>
  );
}`,
        benefits: [
          "Fully isolated failure boundary",
          "Zero waterfall layout shift",
          "Type-safe polymorphic design token",
        ],
      },
    },
  },
  {
    id: 5,
    category: "TELEMETRY & IMPACT",
    title: "QUANTIFIABLE BENCHMARKS",
    subtitle:
      "Empirical outcomes measured across high-throughput production workloads.",
    notes:
      "Highlight the 42ms interaction response floor. When contrast is high and distractions are removed, task completion velocity spikes significantly.",
    layout: "metrics",
    content: {
      stats: [
        {
          value: "99.98%",
          label: "UPTIME AVAILABILITY",
          sub: "Autonomous multi-region failover",
          trend: "+0.4% from Q3",
        },
        {
          value: "42ms",
          label: "P95 INTERACTION LATENCY",
          sub: "Sub-frame layout calculations",
          trend: "3.4x faster response",
        },
        {
          value: "0.00kb",
          label: "UNUSED RUNTIME OVERHEAD",
          sub: "Zero superfluous third-party vendors",
          trend: "100% Tree-shaken",
        },
        {
          value: "3.8x",
          label: "ENGINEERING VELOCITY",
          sub: "Component reuse & unified tokens",
          trend: "Measured over 12 sprint cycles",
        },
      ],
      benchmarks: [
        { name: "Time to First Byte (TTFB)", current: "38ms", target: "<50ms", pct: 90 },
        { name: "First Contentful Paint (FCP)", current: "0.38s", target: "<0.8s", pct: 95 },
        { name: "Cumulative Layout Shift (CLS)", current: "0.001", target: "<0.05", pct: 98 },
        { name: "Total Interaction Blocking Time", current: "12ms", target: "<50ms", pct: 92 },
      ],
    },
  },
  {
    id: 6,
    category: "ARCHITECTURAL COMPARISON",
    title: "SYSTEM DESIGN MATRIX",
    subtitle:
      "Side-by-side evaluation of design tradeoffs and engineering decisions.",
    notes:
      "This slide is great for facilitating discussion or answering student queries about why we favor strict compile-time safety over runtime dynamism.",
    layout: "matrix",
    content: {
      rows: [
        {
          dimension: "Type Safety Contract",
          minimalApproach: "Compile-time strict schema validation (Zod + TS)",
          adHocApproach: "Permissive runtime type assertions & any types",
          advantage: "Eliminates 92% of production regressions",
        },
        {
          dimension: "Color & Token Hierarchy",
          minimalApproach: "Monochrome grayscale with deliberate contrast ratios",
          adHocApproach: "Arbitrary hex palette with weak accessibility standards",
          advantage: "Maximum readability & zero aesthetic fatigue",
        },
        {
          dimension: "State Synchronization",
          minimalApproach: "Unidirectional data streams & atomic signals",
          adHocApproach: "Global mutable stores with deep nested subscriptions",
          advantage: "Eliminates memory leaks and erratic re-renders",
        },
        {
          dimension: "Asset Delivery",
          minimalApproach: "Native inline SVG vectors & WebP static builds",
          adHocApproach: "Bulky external font icon bundles and unoptimized media",
          advantage: "Zero external network blocking requests",
        },
      ],
    },
  },
  {
    id: 7,
    category: "PHILOSOPHY & VISION",
    title: "THE ESSENCE OF FORM",
    subtitle:
      "Reflections on restraint, intentionality, and craftsmanship in digital design.",
    notes:
      "Pause here. Let the silence of the minimalist composition underscore the quote. Allow the audience to digest the message.",
    layout: "quote",
    content: {
      quote:
        "“Simplicity is not the lack of clutter, that's a consequence of simplicity. Simplicity somehow essentially describes the purpose and place of an object and product. The absence of clutter is merely a clue to physical simplicity.”",
      author: "Sir Jonathan Ive",
      title: "Former Chief Design Officer, Apple Inc.",
      principles: [
        "Eliminate until you cannot remove anything more without breaking purpose.",
        "Form follows clarity; clarity accelerates comprehension.",
        "Monochrome forces substance over superficial decoration.",
      ],
    },
  },
  {
    id: 8,
    category: "CONCLUSION & ACTION",
    title: "READY FOR EXECUTION",
    subtitle:
      "Next steps for implementation, repository resources, and interactive Q&A session.",
    notes:
      "Conclude the presentation. Invite questions from the floor and encourage hands-on exploration of the code structure.",
    layout: "conclusion",
    content: {
      summary:
        "The best interfaces don't demand attention for themselves—they disappear, leaving only the task, the content, and frictionless flow.",
      nextSteps: [
        {
          title: "Review Practical Repository",
          desc: "Inspect the single-file modular architecture in page.tsx.",
          badge: "CODEBASE",
        },
        {
          title: "Run Local Benchmarks",
          desc: "Verify sub-50ms render metrics with Next.js development server.",
          badge: "TESTING",
        },
        {
          title: "Extend Custom Slides",
          desc: "Add custom domain slides using the clean modular schema.",
          badge: "ASSIGNMENT",
        },
      ],
      contact: {
        org: "Pemrograman Web dan Aplikasi",
        term: "Semester Ganjil 2026",
        status: "Open for Q&A",
      },
    },
  },
];

// ==========================================
// Main Presentation Component
// ==========================================
export default function PresentationPage() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isDark, setIsDark] = useState(true);
  const [isOverviewOpen, setIsOverviewOpen] = useState(false);
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [copiedCodeIndex, setCopiedCodeIndex] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const totalSlides = SLIDES_DATA.length;
  const currentSlide = SLIDES_DATA[currentSlideIndex];

  // Presentation Timer Effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning]);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins.toString().padStart(2, "0")}:${remainder
      .toString()
      .padStart(2, "0")}`;
  };

  // Slide Navigation Handlers
  const nextSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev < totalSlides - 1 ? prev + 1 : prev));
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  const jumpToSlide = (index: number) => {
    if (index >= 0 && index < totalSlides) {
      setCurrentSlideIndex(index);
      setIsOverviewOpen(false);
    }
  };

  // Fullscreen Handler
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  // Keyboard Navigation Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is in an input or textarea
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      switch (e.key) {
        case "ArrowRight":
        case "ArrowDown":
        case " ":
        case "PageDown":
        case "l":
          e.preventDefault();
          nextSlide();
          break;
        case "ArrowLeft":
        case "ArrowUp":
        case "PageUp":
        case "h":
          e.preventDefault();
          prevSlide();
          break;
        case "Home":
          e.preventDefault();
          jumpToSlide(0);
          break;
        case "End":
          e.preventDefault();
          jumpToSlide(totalSlides - 1);
          break;
        case "f":
        case "F":
          e.preventDefault();
          toggleFullscreen();
          break;
        case "g":
        case "G":
          e.preventDefault();
          setIsOverviewOpen((prev) => !prev);
          break;
        case "s":
        case "S":
          e.preventDefault();
          setIsNotesOpen((prev) => !prev);
          break;
        case "t":
        case "T":
          e.preventDefault();
          setIsDark((prev) => !prev);
          break;
        case "?":
          e.preventDefault();
          setIsHelpOpen((prev) => !prev);
          break;
        case "Escape":
          setIsOverviewOpen(false);
          setIsHelpOpen(false);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide, totalSlides]);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedCodeIndex(id);
    setTimeout(() => setCopiedCodeIndex(null), 2000);
  };

  const progressPercent = ((currentSlideIndex + 1) / totalSlides) * 100;

  return (
    <div
      ref={containerRef}
      className={`min-h-screen w-full flex flex-col justify-between font-sans transition-colors duration-300 select-none overflow-x-hidden ${
        isDark
          ? "bg-black text-white"
          : "bg-white text-black"
      }`}
    >
      {/* ========================================================================= */}
      {/* TOP BAR / HEADER                                                         */}
      {/* ========================================================================= */}
      <header
        className={`w-full px-6 py-4 flex items-center justify-between border-b backdrop-blur-md sticky top-0 z-30 transition-colors ${
          isDark
            ? "border-zinc-800/80 bg-black/80"
            : "border-zinc-200/80 bg-white/80"
        }`}
      >
        <div className="flex items-center gap-4">
          <div
            className={`w-7 h-7 rounded-sm flex items-center justify-center font-bold text-xs tracking-tighter transition-all ${
              isDark ? "bg-white text-black" : "bg-black text-white"
            }`}
          >
            P1
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-semibold tracking-wider uppercase opacity-60">
                {currentSlide.category}
              </span>
              <span
                className={`w-1 h-1 rounded-full ${
                  isDark ? "bg-zinc-600" : "bg-zinc-300"
                }`}
              />
              <span className="text-xs font-mono opacity-40">
                SLIDE {String(currentSlideIndex + 1).padStart(2, "0")} /{" "}
                {String(totalSlides).padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>

        {/* Center / Progress Indicator Bar */}
        <div className="hidden md:flex flex-col items-center gap-1.5 w-64">
          <div
            className={`w-full h-1 rounded-full overflow-hidden ${
              isDark ? "bg-zinc-800" : "bg-zinc-200"
            }`}
          >
            <div
              className={`h-full transition-all duration-300 ease-out ${
                isDark ? "bg-white" : "bg-black"
              }`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex justify-between w-full text-[10px] font-mono opacity-40 tracking-wider">
            <span>START</span>
            <span>{Math.round(progressPercent)}% COMPLETE</span>
            <span>END</span>
          </div>
        </div>

        {/* Top Right Utilities */}
        <div className="flex items-center gap-2">
          {/* Presentation Timer */}
          <div
            className={`hidden sm:flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-mono transition-colors ${
              isDark
                ? "border-zinc-800 bg-zinc-950/60 text-zinc-300"
                : "border-zinc-200 bg-zinc-50 text-zinc-700"
            }`}
          >
            <button
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              title={isTimerRunning ? "Pause Timer" : "Start Timer"}
              className="hover:opacity-70 transition-opacity"
            >
              {isTimerRunning ? (
                <svg
                  className="w-3 h-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <rect x="6" y="4" width="4" height="16" />
                  <rect x="14" y="4" width="4" height="16" />
                </svg>
              ) : (
                <svg
                  className="w-3 h-3"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              )}
            </button>
            <span className="font-semibold">{formatTime(timerSeconds)}</span>
            <button
              onClick={() => setTimerSeconds(0)}
              title="Reset Timer"
              className="opacity-40 hover:opacity-100 transition-opacity text-[10px]"
            >
              ↺
            </button>
          </div>

          {/* Theme Toggle Button */}
          <button
            onClick={() => setIsDark(!isDark)}
            title="Toggle Monochrome Inversion (T)"
            className={`p-2 rounded-lg border transition-all ${
              isDark
                ? "border-zinc-800 hover:bg-zinc-900 text-zinc-300"
                : "border-zinc-200 hover:bg-zinc-100 text-zinc-700"
            }`}
          >
            {isDark ? (
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
            ) : (
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
              </svg>
            )}
          </button>

          {/* Overview Grid Toggle Button */}
          <button
            onClick={() => setIsOverviewOpen(true)}
            title="Slide Grid Overview (G)"
            className={`p-2 rounded-lg border transition-all ${
              isDark
                ? "border-zinc-800 hover:bg-zinc-900 text-zinc-300"
                : "border-zinc-200 hover:bg-zinc-100 text-zinc-700"
            }`}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <rect x="3" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="14" width="7" height="7" rx="1" />
              <rect x="3" y="14" width="7" height="7" rx="1" />
            </svg>
          </button>

          {/* Speaker Notes Toggle Button */}
          <button
            onClick={() => setIsNotesOpen(!isNotesOpen)}
            title="Presenter Notes (S)"
            className={`p-2 rounded-lg border transition-all ${
              isNotesOpen
                ? isDark
                  ? "bg-white text-black border-white"
                  : "bg-black text-white border-black"
                : isDark
                ? "border-zinc-800 hover:bg-zinc-900 text-zinc-300"
                : "border-zinc-200 hover:bg-zinc-100 text-zinc-700"
            }`}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
            </svg>
          </button>

          {/* Help Shortcuts Button */}
          <button
            onClick={() => setIsHelpOpen(true)}
            title="Keyboard Shortcuts (?)"
            className={`p-2 rounded-lg border transition-all ${
              isDark
                ? "border-zinc-800 hover:bg-zinc-900 text-zinc-300"
                : "border-zinc-200 hover:bg-zinc-100 text-zinc-700"
            }`}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </button>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* MAIN SLIDE VIEWPORT                                                      */}
      {/* ========================================================================= */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 sm:px-12 py-8 flex flex-col justify-center relative">
        {/* Subtle decorative background watermarks */}
        <div
          className={`absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.02] text-[18vw] font-black font-mono leading-none tracking-tighter ${
            isDark ? "text-white" : "text-black"
          }`}
        >
          {String(currentSlideIndex + 1).padStart(2, "0")}
        </div>

        {/* Dynamic Slide Layouts */}
        <div className="relative z-10 w-full transition-all duration-300">
          {/* 1. HERO SLIDE */}
          {currentSlide.layout === "hero" && (
            <div className="flex flex-col justify-center min-h-[58vh]">
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 rounded-full border text-xs font-mono tracking-widest uppercase self-start w-auto">
                <span className="w-2 h-2 rounded-full animate-ping bg-emerald-500 inline-block" />
                <span>{currentSlide.content.badge}</span>
              </div>

              <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.05] max-w-5xl mb-6">
                {currentSlide.title}
              </h1>

              <p
                className={`text-lg sm:text-2xl leading-relaxed max-w-3xl mb-12 font-normal ${
                  isDark ? "text-zinc-400" : "text-zinc-600"
                }`}
              >
                {currentSlide.subtitle}
              </p>

              <div
                className={`grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t max-w-3xl ${
                  isDark ? "border-zinc-800" : "border-zinc-200"
                }`}
              >
                {currentSlide.content.meta.map((m: any, i: number) => (
                  <div key={i} className="flex flex-col gap-1">
                    <span className="text-[11px] font-mono uppercase tracking-wider opacity-50">
                      {m.label}
                    </span>
                    <span className="text-sm font-semibold tracking-wide">
                      {m.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 2. AGENDA SLIDE */}
          {currentSlide.layout === "agenda" && (
            <div className="flex flex-col justify-center min-h-[58vh]">
              <div className="mb-8">
                <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-3">
                  {currentSlide.title}
                </h2>
                <p
                  className={`text-base sm:text-lg max-w-3xl ${
                    isDark ? "text-zinc-400" : "text-zinc-600"
                  }`}
                >
                  {currentSlide.subtitle}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentSlide.content.items.map((item: any, idx: number) => (
                  <div
                    key={idx}
                    className={`p-6 rounded-xl border transition-all duration-200 hover:-translate-y-0.5 ${
                      isDark
                        ? "border-zinc-800 bg-zinc-950/50 hover:border-zinc-600"
                        : "border-zinc-200 bg-zinc-50/70 hover:border-zinc-400"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-xs font-bold px-2 py-1 rounded bg-black/10 dark:bg-white/10">
                        PHASE {item.index}
                      </span>
                      <span className="text-xs font-mono opacity-50">
                        {item.duration}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-2 tracking-tight">
                      {item.title}
                    </h3>
                    <p
                      className={`text-sm leading-relaxed ${
                        isDark ? "text-zinc-400" : "text-zinc-600"
                      }`}
                    >
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. PRINCIPLES SLIDE */}
          {currentSlide.layout === "principles" && (
            <div className="flex flex-col justify-center min-h-[58vh]">
              <div className="mb-8">
                <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-3">
                  {currentSlide.title}
                </h2>
                <p
                  className={`text-base sm:text-lg max-w-3xl ${
                    isDark ? "text-zinc-400" : "text-zinc-600"
                  }`}
                >
                  {currentSlide.subtitle}
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {currentSlide.content.pillars.map((pillar: any, idx: number) => (
                  <div
                    key={idx}
                    className={`p-8 rounded-2xl border flex flex-col justify-between relative group ${
                      isDark
                        ? "border-zinc-800 bg-zinc-950/70 hover:border-white/40"
                        : "border-zinc-200 bg-zinc-50 hover:border-black/40"
                    } transition-all duration-300`}
                  >
                    <div>
                      <div className="flex justify-between items-baseline mb-6">
                        <span className="font-mono text-3xl font-black tracking-tight opacity-30 group-hover:opacity-70 transition-opacity">
                          {pillar.number}
                        </span>
                        <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full border border-current opacity-60">
                          {pillar.accentLabel}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold tracking-tight mb-2">
                        {pillar.heading}
                      </h3>
                      <div className="text-xs font-mono mb-4 opacity-60 tracking-wide uppercase">
                        {pillar.subhead}
                      </div>
                      <p
                        className={`text-sm leading-relaxed mb-6 ${
                          isDark ? "text-zinc-400" : "text-zinc-600"
                        }`}
                      >
                        {pillar.description}
                      </p>
                    </div>

                    <div
                      className={`pt-4 border-t text-xs font-mono font-semibold flex items-center justify-between ${
                        isDark ? "border-zinc-800/80" : "border-zinc-200"
                      }`}
                    >
                      <span className="opacity-50">BENCHMARK</span>
                      <span>{pillar.metrics}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. CODE COMPARE SLIDE */}
          {currentSlide.layout === "code-compare" && (
            <div className="flex flex-col justify-center min-h-[58vh]">
              <div className="mb-6">
                <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-2">
                  {currentSlide.title}
                </h2>
                <p
                  className={`text-base sm:text-lg max-w-3xl ${
                    isDark ? "text-zinc-400" : "text-zinc-600"
                  }`}
                >
                  {currentSlide.subtitle}
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left (Legacy) */}
                <div
                  className={`p-6 rounded-2xl border flex flex-col justify-between ${
                    isDark
                      ? "border-zinc-800 bg-zinc-950/60"
                      : "border-zinc-200 bg-zinc-50"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-red-500/10 text-red-500 font-semibold tracking-wider">
                        {currentSlide.content.leftCode.tag}
                      </span>
                      <span className="text-xs font-mono opacity-40">
                        {currentSlide.content.leftCode.status}
                      </span>
                    </div>
                    <h4 className="text-base font-semibold mb-3">
                      {currentSlide.content.leftCode.title}
                    </h4>
                    <div className="relative">
                      <pre className="p-4 rounded-xl font-mono text-xs overflow-x-auto leading-relaxed bg-black/90 text-zinc-300 border border-zinc-800">
                        <code>{currentSlide.content.leftCode.snippet}</code>
                      </pre>
                      <button
                        onClick={() =>
                          copyToClipboard(
                            currentSlide.content.leftCode.snippet,
                            "left"
                          )
                        }
                        className="absolute top-2.5 right-2.5 px-2 py-1 text-[10px] font-mono rounded bg-white/10 hover:bg-white/20 text-white transition-all"
                      >
                        {copiedCodeIndex === "left" ? "Copied" : "Copy"}
                      </button>
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-zinc-800/40">
                    <span className="text-[11px] font-mono uppercase tracking-wider opacity-50 block mb-2">
                      Vulnerabilities
                    </span>
                    <ul className="space-y-1 text-xs opacity-75">
                      {currentSlide.content.leftCode.flaws.map(
                        (f: string, i: number) => (
                          <li key={i} className="flex items-center gap-2">
                            <span className="text-red-500 font-bold">✕</span> {f}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </div>

                {/* Right (Modern) */}
                <div
                  className={`p-6 rounded-2xl border flex flex-col justify-between ${
                    isDark
                      ? "border-zinc-700 bg-zinc-900/60"
                      : "border-zinc-300 bg-white shadow-sm"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 font-semibold tracking-wider">
                        {currentSlide.content.rightCode.tag}
                      </span>
                      <span className="text-xs font-mono opacity-40">
                        {currentSlide.content.rightCode.status}
                      </span>
                    </div>
                    <h4 className="text-base font-semibold mb-3">
                      {currentSlide.content.rightCode.title}
                    </h4>
                    <div className="relative">
                      <pre className="p-4 rounded-xl font-mono text-xs overflow-x-auto leading-relaxed bg-black/90 text-zinc-100 border border-zinc-800">
                        <code>{currentSlide.content.rightCode.snippet}</code>
                      </pre>
                      <button
                        onClick={() =>
                          copyToClipboard(
                            currentSlide.content.rightCode.snippet,
                            "right"
                          )
                        }
                        className="absolute top-2.5 right-2.5 px-2 py-1 text-[10px] font-mono rounded bg-white/10 hover:bg-white/20 text-white transition-all"
                      >
                        {copiedCodeIndex === "right" ? "Copied" : "Copy"}
                      </button>
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-zinc-800/40">
                    <span className="text-[11px] font-mono uppercase tracking-wider opacity-50 block mb-2">
                      Advantages
                    </span>
                    <ul className="space-y-1 text-xs opacity-85">
                      {currentSlide.content.rightCode.benefits.map(
                        (b: string, i: number) => (
                          <li key={i} className="flex items-center gap-2">
                            <span className="text-emerald-500 font-bold">✓</span>{" "}
                            {b}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 5. METRICS SLIDE */}
          {currentSlide.layout === "metrics" && (
            <div className="flex flex-col justify-center min-h-[58vh]">
              <div className="mb-8">
                <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-2">
                  {currentSlide.title}
                </h2>
                <p
                  className={`text-base sm:text-lg max-w-3xl ${
                    isDark ? "text-zinc-400" : "text-zinc-600"
                  }`}
                >
                  {currentSlide.subtitle}
                </p>
              </div>

              {/* 4 Stat Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {currentSlide.content.stats.map((s: any, idx: number) => (
                  <div
                    key={idx}
                    className={`p-6 rounded-2xl border flex flex-col justify-between ${
                      isDark
                        ? "border-zinc-800 bg-zinc-950/60"
                        : "border-zinc-200 bg-zinc-50"
                    }`}
                  >
                    <div>
                      <div className="text-3xl sm:text-5xl font-black font-mono tracking-tight mb-2">
                        {s.value}
                      </div>
                      <div className="text-[11px] font-mono tracking-wider uppercase font-semibold opacity-70 mb-1">
                        {s.label}
                      </div>
                      <div
                        className={`text-xs ${
                          isDark ? "text-zinc-400" : "text-zinc-600"
                        }`}
                      >
                        {s.sub}
                      </div>
                    </div>
                    <div className="mt-4 pt-3 border-t border-zinc-800/40 text-[11px] font-mono opacity-50">
                      {s.trend}
                    </div>
                  </div>
                ))}
              </div>

              {/* Progress bars benchmark breakdown */}
              <div
                className={`p-6 rounded-2xl border ${
                  isDark
                    ? "border-zinc-800 bg-zinc-950/40"
                    : "border-zinc-200 bg-zinc-50/60"
                }`}
              >
                <div className="text-xs font-mono uppercase tracking-widest opacity-60 mb-4">
                  Real-World Execution Telemetry
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                  {currentSlide.content.benchmarks.map((b: any, i: number) => (
                    <div key={i} className="flex flex-col gap-1.5">
                      <div className="flex justify-between text-xs font-mono">
                        <span>{b.name}</span>
                        <span className="font-semibold">
                          {b.current}{" "}
                          <span className="opacity-40">/ {b.target}</span>
                        </span>
                      </div>
                      <div
                        className={`w-full h-1.5 rounded-full overflow-hidden ${
                          isDark ? "bg-zinc-800" : "bg-zinc-200"
                        }`}
                      >
                        <div
                          className={`h-full rounded-full ${
                            isDark ? "bg-white" : "bg-black"
                          }`}
                          style={{ width: `${b.pct}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 6. COMPARISON MATRIX SLIDE */}
          {currentSlide.layout === "matrix" && (
            <div className="flex flex-col justify-center min-h-[58vh]">
              <div className="mb-6">
                <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-2">
                  {currentSlide.title}
                </h2>
                <p
                  className={`text-base sm:text-lg max-w-3xl ${
                    isDark ? "text-zinc-400" : "text-zinc-600"
                  }`}
                >
                  {currentSlide.subtitle}
                </p>
              </div>

              <div
                className={`w-full overflow-x-auto rounded-2xl border ${
                  isDark
                    ? "border-zinc-800 bg-zinc-950/70"
                    : "border-zinc-200 bg-zinc-50"
                }`}
              >
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr
                      className={`border-b font-mono text-xs uppercase tracking-wider ${
                        isDark
                          ? "border-zinc-800 text-zinc-400"
                          : "border-zinc-200 text-zinc-600"
                      }`}
                    >
                      <th className="py-4 px-6 w-1/4">Evaluation Dimension</th>
                      <th className="py-4 px-6 w-1/3">
                        <span className="inline-flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                          Minimalist & Typed Model
                        </span>
                      </th>
                      <th className="py-4 px-6 w-1/3 opacity-60">
                        Ad-hoc & Permissive Model
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/30 dark:divide-zinc-800/60 font-sans">
                    {currentSlide.content.rows.map((r: any, idx: number) => (
                      <tr
                        key={idx}
                        className={`transition-colors ${
                          isDark
                            ? "hover:bg-zinc-900/40"
                            : "hover:bg-zinc-100/60"
                        }`}
                      >
                        <td className="py-4 px-6 font-semibold font-mono text-xs">
                          {r.dimension}
                        </td>
                        <td className="py-4 px-6 font-medium">
                          <div>{r.minimalApproach}</div>
                          <div className="text-[11px] font-mono opacity-50 mt-1">
                            ✦ {r.advantage}
                          </div>
                        </td>
                        <td className="py-4 px-6 opacity-60">
                          {r.adHocApproach}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 7. QUOTE SLIDE */}
          {currentSlide.layout === "quote" && (
            <div className="flex flex-col justify-center min-h-[58vh] max-w-4xl mx-auto">
              <div className="mb-6 opacity-40 font-serif text-7xl leading-none">
                “
              </div>

              <blockquote className="text-2xl sm:text-4xl md:text-5xl font-medium tracking-tight leading-snug mb-8">
                {currentSlide.content.quote}
              </blockquote>

              <div className="flex items-center gap-4 mb-12">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-bold font-mono text-base ${
                    isDark ? "bg-white text-black" : "bg-black text-white"
                  }`}
                >
                  JI
                </div>
                <div>
                  <div className="font-bold text-lg">
                    {currentSlide.content.author}
                  </div>
                  <div
                    className={`text-xs font-mono ${
                      isDark ? "text-zinc-400" : "text-zinc-600"
                    }`}
                  >
                    {currentSlide.content.title}
                  </div>
                </div>
              </div>

              <div
                className={`grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t ${
                  isDark ? "border-zinc-800" : "border-zinc-200"
                }`}
              >
                {currentSlide.content.principles.map((p: string, i: number) => (
                  <div key={i} className="text-xs opacity-75 font-mono leading-relaxed">
                    0{i + 1}. {p}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 8. CONCLUSION SLIDE */}
          {currentSlide.layout === "conclusion" && (
            <div className="flex flex-col justify-center min-h-[58vh]">
              <div className="mb-8">
                <div className="inline-block px-3 py-1 mb-4 rounded-full border text-xs font-mono uppercase tracking-widest">
                  {currentSlide.content.contact.status}
                </div>
                <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-4">
                  {currentSlide.title}
                </h2>
                <p
                  className={`text-xl sm:text-2xl max-w-3xl leading-relaxed ${
                    isDark ? "text-zinc-300" : "text-zinc-700"
                  }`}
                >
                  {currentSlide.content.summary}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {currentSlide.content.nextSteps.map((step: any, i: number) => (
                  <div
                    key={i}
                    className={`p-6 rounded-2xl border transition-all ${
                      isDark
                        ? "border-zinc-800 bg-zinc-950/60 hover:border-zinc-700"
                        : "border-zinc-200 bg-zinc-50 hover:border-zinc-300"
                    }`}
                  >
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/10 dark:bg-white/10 font-semibold mb-3 inline-block">
                      {step.badge}
                    </span>
                    <h4 className="text-lg font-bold mb-2">{step.title}</h4>
                    <p
                      className={`text-xs leading-relaxed ${
                        isDark ? "text-zinc-400" : "text-zinc-600"
                      }`}
                    >
                      {step.desc}
                    </p>
                  </div>
                ))}
              </div>

              <div
                className={`flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t text-xs font-mono ${
                  isDark ? "border-zinc-800 text-zinc-500" : "border-zinc-200 text-zinc-500"
                }`}
              >
                <div>
                  {currentSlide.content.contact.org} •{" "}
                  {currentSlide.content.contact.term}
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => jumpToSlide(0)}
                    className="underline hover:opacity-100 transition-opacity"
                  >
                    Restart Deck (Home)
                  </button>
                  <span>•</span>
                  <button
                    onClick={() => setIsOverviewOpen(true)}
                    className="underline hover:opacity-100 transition-opacity"
                  >
                    All Slides Grid
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* ========================================================================= */}
      {/* FLOATING BOTTOM DOCK / CONTROLS                                          */}
      {/* ========================================================================= */}
      <footer className="w-full pb-6 px-6 flex justify-center sticky bottom-0 z-30 pointer-events-none">
        <div
          className={`pointer-events-auto flex items-center gap-3 px-4 py-2.5 rounded-full border shadow-2xl backdrop-blur-xl transition-all ${
            isDark
              ? "bg-zinc-950/90 border-zinc-800 text-white shadow-black/80"
              : "bg-white/95 border-zinc-300 text-black shadow-zinc-300/60"
          }`}
        >
          {/* Previous Button */}
          <button
            onClick={prevSlide}
            disabled={currentSlideIndex === 0}
            title="Previous Slide (← or H)"
            className={`p-2 rounded-full transition-all ${
              currentSlideIndex === 0
                ? "opacity-30 cursor-not-allowed"
                : isDark
                ? "hover:bg-zinc-800 active:scale-95"
                : "hover:bg-zinc-100 active:scale-95"
            }`}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Slide Indicator & Quick Menu */}
          <button
            onClick={() => setIsOverviewOpen(true)}
            className="flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold tracking-wider hover:opacity-80 transition-opacity"
            title="Open Grid Overview (G)"
          >
            <span>
              {String(currentSlideIndex + 1).padStart(2, "0")} /{" "}
              {String(totalSlides).padStart(2, "0")}
            </span>
            <span className="text-[10px] opacity-40">▼</span>
          </button>

          {/* Next Button */}
          <button
            onClick={nextSlide}
            disabled={currentSlideIndex === totalSlides - 1}
            title="Next Slide (→, Space, or L)"
            className={`p-2 rounded-full transition-all ${
              currentSlideIndex === totalSlides - 1
                ? "opacity-30 cursor-not-allowed"
                : isDark
                ? "hover:bg-zinc-800 active:scale-95"
                : "hover:bg-zinc-100 active:scale-95"
            }`}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          <div
            className={`h-4 w-px mx-1 ${
              isDark ? "bg-zinc-800" : "bg-zinc-200"
            }`}
          />

          {/* Fullscreen Button */}
          <button
            onClick={toggleFullscreen}
            title="Toggle Fullscreen (F)"
            className={`p-2 rounded-full transition-all ${
              isDark ? "hover:bg-zinc-800" : "hover:bg-zinc-100"
            }`}
          >
            {isFullscreen ? (
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path d="M8 3v3a2 2 0 01-2 2H3m18 0h-3a2 2 0 01-2-2V3m0 18v-3a2 2 0 012-2h3M3 16h3a2 2 0 012 2v3" />
              </svg>
            ) : (
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
              </svg>
            )}
          </button>
        </div>
      </footer>

      {/* ========================================================================= */}
      {/* SPEAKER NOTES DRAWER                                                      */}
      {/* ========================================================================= */}
      {isNotesOpen && (
        <aside
          className={`fixed bottom-20 right-6 left-6 sm:left-auto sm:w-96 p-5 rounded-2xl border shadow-2xl z-40 backdrop-blur-xl animate-in fade-in slide-in-from-bottom-4 duration-200 ${
            isDark
              ? "bg-zinc-950/95 border-zinc-800 text-zinc-100 shadow-black"
              : "bg-white/95 border-zinc-300 text-zinc-900 shadow-xl"
          }`}
        >
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-zinc-800/40">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider">
                Speaker Notes
              </span>
            </div>
            <button
              onClick={() => setIsNotesOpen(false)}
              className="text-xs font-mono opacity-50 hover:opacity-100"
            >
              ✕ CLOSE
            </button>
          </div>
          <p className="text-xs leading-relaxed font-sans opacity-90 mb-3">
            {currentSlide.notes}
          </p>
          <div className="flex justify-between items-center text-[10px] font-mono opacity-40 pt-2 border-t border-zinc-800/20">
            <span>KEY: S TO HIDE</span>
            <span>SLIDE {currentSlideIndex + 1} OF {totalSlides}</span>
          </div>
        </aside>
      )}

      {/* ========================================================================= */}
      {/* SLIDE GRID OVERVIEW MODAL                                                */}
      {/* ========================================================================= */}
      {isOverviewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
          <div
            className={`w-full max-w-6xl max-h-[85vh] rounded-3xl border flex flex-col overflow-hidden shadow-2xl ${
              isDark
                ? "bg-zinc-950 border-zinc-800 text-white"
                : "bg-white border-zinc-200 text-black"
            }`}
          >
            {/* Modal Header */}
            <div className="px-8 py-6 border-b border-zinc-800/40 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold tracking-tight">
                  Slide Deck Overview
                </h3>
                <p className="text-xs font-mono opacity-50">
                  Select any slide to jump directly (or press ESC to dismiss)
                </p>
              </div>
              <button
                onClick={() => setIsOverviewOpen(false)}
                className={`p-2 rounded-full border transition-all ${
                  isDark
                    ? "border-zinc-800 hover:bg-zinc-900"
                    : "border-zinc-200 hover:bg-zinc-100"
                }`}
              >
                ✕
              </button>
            </div>

            {/* Grid of Slides */}
            <div className="p-8 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {SLIDES_DATA.map((slide, index) => {
                const isActive = index === currentSlideIndex;
                return (
                  <button
                    key={slide.id}
                    onClick={() => jumpToSlide(index)}
                    className={`text-left p-4 rounded-xl border flex flex-col justify-between aspect-[16/10] transition-all relative group ${
                      isActive
                        ? isDark
                          ? "border-white bg-zinc-900 ring-2 ring-white/20"
                          : "border-black bg-zinc-100 ring-2 ring-black/20"
                        : isDark
                        ? "border-zinc-800/80 bg-zinc-900/30 hover:border-zinc-600 hover:bg-zinc-900/60"
                        : "border-zinc-200 bg-zinc-50 hover:border-zinc-400 hover:bg-zinc-100"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between text-[10px] font-mono opacity-50 mb-2">
                        <span>#{String(index + 1).padStart(2, "0")}</span>
                        <span>{slide.layout}</span>
                      </div>
                      <div className="font-bold text-xs line-clamp-2 leading-snug">
                        {slide.title}
                      </div>
                    </div>
                    <div className="text-[10px] font-mono opacity-40 line-clamp-1">
                      {slide.category}
                    </div>
                    {isActive && (
                      <span className="absolute bottom-2 right-2 text-[9px] font-mono px-1.5 py-0.5 rounded bg-white text-black dark:bg-black dark:text-white font-bold">
                        ACTIVE
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* KEYBOARD SHORTCUTS HELP MODAL                                            */}
      {/* ========================================================================= */}
      {isHelpOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
          <div
            className={`w-full max-w-lg rounded-3xl border p-8 shadow-2xl ${
              isDark
                ? "bg-zinc-950 border-zinc-800 text-white"
                : "bg-white border-zinc-200 text-black"
            }`}
          >
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-800/40">
              <h3 className="text-xl font-bold tracking-tight">
                Keyboard Navigation
              </h3>
              <button
                onClick={() => setIsHelpOpen(false)}
                className="text-xs font-mono opacity-50 hover:opacity-100"
              >
                ✕ CLOSE
              </button>
            </div>

            <div className="space-y-3 font-mono text-xs">
              {[
                { keys: ["→", "Space", "L"], desc: "Next Slide" },
                { keys: ["←", "H"], desc: "Previous Slide" },
                { keys: ["G"], desc: "Toggle Grid Overview" },
                { keys: ["S"], desc: "Toggle Speaker Notes" },
                { keys: ["T"], desc: "Toggle Theme (Invert Colors)" },
                { keys: ["F"], desc: "Toggle Fullscreen" },
                { keys: ["Home", "End"], desc: "Jump to First / Last Slide" },
                { keys: ["?"], desc: "Open this Help Guide" },
                { keys: ["Esc"], desc: "Dismiss Modals / Drawers" },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between py-1.5 border-b border-zinc-800/20"
                >
                  <span className="opacity-70 font-sans">{item.desc}</span>
                  <div className="flex gap-1">
                    {item.keys.map((k, ki) => (
                      <kbd
                        key={ki}
                        className={`px-2 py-1 rounded text-[11px] font-bold ${
                          isDark
                            ? "bg-zinc-800 text-zinc-200 border border-zinc-700"
                            : "bg-zinc-100 text-zinc-800 border border-zinc-300"
                        }`}
                      >
                        {k}
                      </kbd>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={() => setIsHelpOpen(false)}
                className={`w-full py-2.5 rounded-xl font-bold text-xs tracking-wider uppercase transition-all ${
                  isDark
                    ? "bg-white text-black hover:bg-zinc-200"
                    : "bg-black text-white hover:bg-zinc-800"
                }`}
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
