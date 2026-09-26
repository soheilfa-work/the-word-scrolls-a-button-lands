import { SiteHeader } from "./site-header";

const cards = [
  {
    title: "Capture",
    subtitle: "your thoughts",
    className: "left-[18%] top-0 w-[158px]",
    icon: "doc",
  },
  {
    title: "Organize",
    subtitle: "your ideas",
    className: "left-[4%] top-[48%] w-[158px]",
    icon: "folder",
  },
  {
    title: "Great ideas",
    subtitle: "start with a thought.",
    className: "left-[40%] top-[36%] w-[180px]",
    icon: "bulb",
    featured: true,
  },
  {
    title: "Turn into",
    subtitle: "real projects",
    className: "right-0 top-[8%] w-[158px]",
    icon: "rocket",
  },
];

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative h-screen overflow-hidden bg-[#070c0b] text-white"
    >
      <div
        className="absolute inset-0 bg-cover bg-[center_right] bg-no-repeat"
        style={{ backgroundImage: "url(/sections/hero-bg.png)" }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#070c0b] via-[#070c0b]/80 to-transparent" />
      <div className="relative flex h-full flex-col">
        <div className="mx-auto grid w-full max-w-6xl flex-1 items-center gap-8 px-8 pb-16 sm:px-12 lg:grid-cols-2 lg:px-16">
          <div className="max-w-xl">
            <p className="text-[11px] font-medium tracking-[0.28em] text-white/55">
              IDEAS × NOTES × ACTION
            </p>
            <h1 className="mt-4 text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
              <span className="text-[#8ee0c4]">Thinkly</span>
              <br />
              Where Your Ideas
              <br />
              Find Direction.
            </h1>
            <p className="mt-6 max-w-md text-[15px] leading-7 text-white/70">
              Capture your thoughts, organize your ideas, and turn them into
              something meaningful. Thinkly is your space to think, plan and
              create.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#explore"
                className="rounded-full bg-[#8ee0c4] px-5 py-2.5 text-sm font-medium text-[#10211b] transition-colors hover:bg-[#a5ebcf]"
              >
                Start Exploring →
              </a>
              <button
                type="button"
                className="flex items-center gap-2 rounded-full border border-white/20 px-4 py-2.5 text-sm text-white/90 transition-colors hover:bg-white/10"
              >
                <span className="grid h-5 w-5 place-items-center rounded-full border border-white/40">
                  <svg
                    viewBox="0 0 24 24"
                    className="ml-0.5 h-2.5 w-2.5"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M8 5v14l11-7L8 5Z" />
                  </svg>
                </span>
                Watch Video
              </button>
            </div>
          </div>

          <div className="relative hidden h-[340px] lg:block">
            <svg
              className="absolute inset-0 h-full w-full"
              viewBox="0 0 520 340"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M150 80 C 220 80, 230 150, 280 160 C 330 170, 360 90, 450 110"
                stroke="rgba(255,255,255,0.28)"
                strokeWidth="1.4"
                strokeDasharray="3 5"
              />
              <path
                d="M140 200 C 210 190, 240 170, 280 175"
                stroke="rgba(255,255,255,0.28)"
                strokeWidth="1.4"
                strokeDasharray="3 5"
              />
            </svg>
            {cards.map((card) => (
              <article
                key={card.title}
                className={`absolute rounded-2xl border border-white/15 bg-[#121c1a]/75 p-4 shadow-xl shadow-black/30 backdrop-blur-md ${card.className}`}
              >
                <span className="absolute right-3 top-3 h-1.5 w-1.5 rounded-full bg-[#8ee0c4]" />
                <CardIcon name={card.icon} />
                <p
                  className={`mt-3 text-sm font-medium ${card.featured ? "text-center" : ""}`}
                >
                  {card.title}
                </p>
                <p
                  className={`text-xs text-white/55 ${card.featured ? "text-center" : ""}`}
                >
                  {card.subtitle}
                </p>
              </article>
            ))}
          </div>
        </div>
        <div className="pointer-events-none absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-[10px] tracking-[0.35em] text-white/45">
          SCROLL
          <span className="h-8 w-px bg-white/35" />
        </div>
      </div>
    </section>
  );
}

function CardIcon({ name }: { name: string }) {
  const common = "h-5 w-5 text-[#8ee0c4]";
  if (name === "folder") {
    return (
      <svg
        viewBox="0 0 24 24"
        className={common}
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M3.5 8.5h6l2 2h9v8.5a1.5 1.5 0 0 1-1.5 1.5h-14A1.5 1.5 0 0 1 3.5 19V8.5Z"
          stroke="currentColor"
          strokeWidth="1.6"
        />
      </svg>
    );
  }
  if (name === "bulb") {
    return (
      <svg
        viewBox="0 0 24 24"
        className={`${common} mx-auto h-8 w-8`}
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M9 18h6M10 21h4"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M8 14a5.5 5.5 0 1 1 8 0c-.8.8-1.5 1.6-1.5 2.8h-5C9.5 15.6 8.8 14.8 8 14Z"
          stroke="currentColor"
          strokeWidth="1.6"
        />
      </svg>
    );
  }
  if (name === "rocket") {
    return (
      <svg
        viewBox="0 0 24 24"
        className={common}
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M14 10.5 5.5 19M14.5 4.5c2.8.2 5 2.4 5.2 5.2-2.2 2.6-5.2 4.3-8.2 4.3-1 0-2.4-.2-3.2-1S7.5 11 7.5 10c0-3 1.7-6 4.3-8.2 1 .2 2.2.6 2.7 2.7Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className={common} fill="none" aria-hidden="true">
      <path
        d="M7 3.5h7l4 4V20.5H7v-17Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M14 3.5v4h4M9.5 12h6M9.5 15.5h4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
