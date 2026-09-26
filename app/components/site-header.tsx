function Logo() {
  return (
    <a href="#home" className="flex items-center gap-2.5 text-white">
      <span className="relative grid h-7 w-7 place-items-center">
        <svg viewBox="0 0 32 32" className="h-7 w-7" aria-hidden="true">
          <path
            d="M16 3.5 27.5 10v12L16 28.5 4.5 22V10L16 3.5Z"
            fill="none"
            stroke="#8ee0c4"
            strokeWidth="1.6"
          />
          <path
            d="M16 8.2 23 12.2v7.6L16 23.8 9 19.8v-7.6L16 8.2Z"
            fill="#8ee0c4"
          />
        </svg>
      </span>
      <span className="text-[17px] font-semibold tracking-tight">Thinkly</span>
    </a>
  );
}

const links = ["Home", "Features", "Explore", "About"];

export function SiteHeader() {
  return (
    <header className="fixed w-full z-20 flex items-center justify-between px-8 py-6 sm:px-12 lg:px-16">
      <Logo />
      <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-9 text-[15px] text-white/80 md:flex">
        {links.map((link) => (
          <a
            key={link}
            href={`#${link.toLowerCase()}`}
            className={
              link === "Home"
                ? "text-[#8ee0c4] underline decoration-[#8ee0c4] decoration-2 underline-offset-[10px]"
                : "transition-colors hover:text-white"
            }
          >
            {link}
          </a>
        ))}
      </nav>
      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label="Search"
          className="grid h-10 w-10 place-items-center rounded-full text-white/90 transition-colors hover:bg-white/10"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-[18px] w-[18px]"
            fill="none"
            aria-hidden="true"
          >
            <circle
              cx="11"
              cy="11"
              r="6.25"
              stroke="currentColor"
              strokeWidth="1.7"
            />
            <path
              d="M16 16.5 20 20.5"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
            />
          </svg>
        </button>
        <a
          href="#contact"
          className="rounded-full border border-white/25 px-4 py-2 text-sm text-white transition-colors hover:bg-white/10"
        >
          Get Started
        </a>
      </div>
    </header>
  );
}
