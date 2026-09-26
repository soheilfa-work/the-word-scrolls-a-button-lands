import { SiteHeader } from "./site-header";

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
      <rect
        x="3.5"
        y="5.5"
        width="17"
        height="13"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="m4.5 7 7.5 6L19.5 7"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
      <path
        d="M12 21s6-5.4 6-10a6 6 0 1 0-12 0c0 4.6 6 10 6 10Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle cx="12" cy="11" r="2" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function LinkIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
      <path
        d="M10 13.5a4 4 0 0 0 5.7.4l2.3-2.3a4 4 0 0 0-5.7-5.7L11 7.2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M14 10.5a4 4 0 0 0-5.7-.4L6 12.4a4 4 0 0 0 5.7 5.7L13 16.8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

const contacts = [
  { icon: MailIcon, label: "Email", value: "hello@thinkly.dev" },
  { icon: PinIcon, label: "Location", value: "Amsterdam, Netherlands" },
  {
    icon: LinkIcon,
    label: "Follow",
    value: "GitHub  /  X  /  LinkedIn  /  Instagram",
  },
];

export function ContactSection() {
  return (
    <section
      id="contact"
      className="relative h-fit lg:h-screen overflow-hidden bg-[#070c0b] text-white"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url(/sections/contact-bg.png)" }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#070c0b] via-[#070c0b]/88 to-[#070c0b]/25" />
      <div className="relative flex h-full flex-col">
        <div className="mx-auto grid w-full max-w-6xl flex-1 items-center gap-10 px-8  py-10 sm:px-12 lg:grid-cols-[1fr_minmax(0,460px)] lg:px-16">
          <div className="max-w-xl">
            <p className="text-[11px] font-medium tracking-[0.28em] text-white/55">
              GET IN TOUCH
            </p>
            <h1 className="mt-4 text-5xl font-semibold leading-[1.05] tracking-tight sm:text-[56px]">
              Let&apos;s Build
              <br />
              <span className="whitespace-nowrap">
                Something <span className="text-[#8ee0c4]">Great.</span>
              </span>
            </h1>
            <p className="mt-6 max-w-sm text-[15px] leading-7 text-white/70">
              Have an idea, a question, or just want to say hi? I&apos;d love to
              hear from you. Fill out the form and I&apos;ll get back to you as
              soon as possible.
            </p>
            <ul className="mt-8 space-y-4">
              {contacts.map((item) => (
                <li key={item.label} className="flex items-center gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/5 text-[#8ee0c4] ring-1 ring-white/10">
                    <item.icon />
                  </span>
                  <span>
                    <span className="block text-sm text-white/90">
                      {item.label}
                    </span>
                    <span className="block text-sm text-white/45">
                      {item.value}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <form className="rounded-2xl border border-white/10 bg-[#101816]/80 p-5 shadow-2xl shadow-black/40 backdrop-blur-md sm:p-6">
            <span className="mb-4 block h-0.5 w-8 rounded-full bg-[#8ee0c4]" />
            <h2 className="text-lg font-medium">Send a Message</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 flex items-center gap-1.5 text-xs text-white/70">
                  <UserGlyph /> Name <span className="text-[#8ee0c4]">*</span>
                </span>
                <input
                  required
                  name="name"
                  placeholder="Your name"
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm outline-none placeholder:text-white/30 focus:border-[#8ee0c4]/60"
                />
              </label>
              <label className="block">
                <span className="mb-1.5 flex items-center gap-1.5 text-xs text-white/70">
                  <MailIcon /> Email <span className="text-[#8ee0c4]">*</span>
                </span>
                <input
                  required
                  type="email"
                  name="email"
                  placeholder="you@domain.com"
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm outline-none placeholder:text-white/30 focus:border-[#8ee0c4]/60"
                />
              </label>
            </div>
            <label className="mt-3 block">
              <span className="mb-1.5 flex items-center gap-1.5 text-xs text-white/70">
                <ChatGlyph /> Subject
              </span>
              <input
                name="subject"
                placeholder="What's this about?"
                className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm outline-none placeholder:text-white/30 focus:border-[#8ee0c4]/60"
              />
            </label>
            <label className="mt-3 block">
              <span className="mb-1.5 flex items-center gap-1.5 text-xs text-white/70">
                <ChatGlyph /> Message <span className="text-[#8ee0c4]">*</span>
              </span>
              <textarea
                required
                name="message"
                rows={4}
                placeholder="Tell me more..."
                className="w-full resize-none rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm outline-none placeholder:text-white/30 focus:border-[#8ee0c4]/60"
              />
            </label>
            <div className="mt-4 flex items-center justify-between gap-4">
              <button
                type="submit"
                className="rounded-full bg-[#8ee0c4] px-5 py-2.5 text-sm font-medium text-[#10211b] transition-colors hover:bg-[#a5ebcf]"
              >
                Send Message →
              </button>
              <p className="flex items-center gap-2 text-[11px] leading-4 text-white/40">
                <LockGlyph />
                Your information is safe
                <br />
                with us.
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

function UserGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-3.5 w-3.5"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="12" cy="8" r="3" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M5.5 19c1.4-3 3.6-4.5 6.5-4.5S17.1 16 18.5 19"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ChatGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-3.5 w-3.5"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6 16.5 4 20l4.2-1.4A8 8 0 1 0 6 16.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </svg>
  );
}

function LockGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-3.5 w-3.5 shrink-0"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="6"
        y="10"
        width="12"
        height="9"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M8.5 10V8a3.5 3.5 0 0 1 7 0v2"
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </svg>
  );
}
