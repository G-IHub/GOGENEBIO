import { Link } from "react-router-dom";
import HubHeader from "../Components/HubHeader";
import HubFooter from "../Components/HubFooter";
import heroCollage from "../assets/hero_img.png";

// PLACEHOLDER COPY — replace names / descriptions with the real ones.
const programs = [
  {
    name: "GoGeneBio",
    tag: "Now open",
    live: true,
    to: "/gogenbio",
    description:
      "Learn bioinformatics & genomics from scratch — global online sessions, a hands-on mini-project, local hubs, and a certificate. No experience needed.",
  },
  {
    name: "Innovation Tour Outreach",
    tag: "Coming soon",
    live: false,
    description:
      "A travelling programme bringing hands-on genomics demos and talks to campuses and institutions across regions.",
  },
  {
    name: "School Host-Based Outreach",
    tag: "Coming soon",
    live: false,
    description:
      "Partner schools host a guided introduction to genomics for their students, run with support from the Global Outreach team.",
  },
];

const stats = [
  { value: "100k+", label: "Learners & professionals reached globally" },
  { value: "120+", label: "Countries" },
  { value: "1000+", label: "Publications, scholarships, grants & jobs" },
];

const approachItems = [
  "Explore real genomic datasets",
  "Perform practical bioinformatics analyses",
  "Build computational workflows",
  "Use AI for scientific research",
  "Meet researchers and industry professionals",
  "Work on mini research projects",
  "Discover scientific career pathways",
  "Find scholarships and research opportunities",
  "Join global scientific communities",
  "Continue learning after the outreach program",
];

// PLACEHOLDER — reasons the Outreach focuses on underserved communities.
const reasons = [
  {
    title: "Talent is everywhere, access isn't",
    text: "Brilliant minds in under-resourced regions rarely get a first door into genomics. We open it.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#3d168b" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c2.6 2.7 2.6 15.3 0 18M12 3c-2.6 2.7-2.6 15.3 0 18" />
      </svg>
    ),
  },
  {
    title: "Local problems need local scientists",
    text: "Health, crop and environmental challenges are best solved by people who live them. We build that capacity where it's needed.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#3d168b" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11z" />
        <circle cx="12" cy="10" r="2.5" />
      </svg>
    ),
  },
  {
    title: "A young field should stay open",
    text: "Genomics is still being written. Everyone deserves a chance to help write it — not only those near well-funded labs.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#3d168b" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M12 7v13M4 5.5A2.5 2.5 0 0 1 6.5 3H12v15H6.5A2.5 2.5 0 0 0 4 20.5V5.5zM20 5.5A2.5 2.5 0 0 0 17.5 3H12v15h5.5A2.5 2.5 0 0 1 20 20.5V5.5z" />
      </svg>
    ),
  },
  {
    title: "One learner changes a community",
    text: "Graduates go on to teach, mentor and start things. Reaching one person ripples outward for years.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#3d168b" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <circle cx="12" cy="12" r="2.5" />
        <path d="M12 5.5a6.5 6.5 0 0 1 6.5 6.5M12 3a9 9 0 0 1 9 9M12 18.5A6.5 6.5 0 0 1 5.5 12M12 21a9 9 0 0 1-9-9" />
      </svg>
    ),
  },
];

const Eyebrow = ({ children }) => (
  <div className="bg-[#b241b71a] rounded-full px-4 py-1.5 inline-block">
    <span className="font-data text-[11px] font-semibold tracking-widest uppercase text-[#3d168b]">
      {children}
    </span>
  </div>
);

const Hub = () => {
  return (
    <div>
      <HubHeader />

      {/* Hero */}
      <div className="relative overflow-hidden px-5 md:px-10 lg:px-16 pt-12 md:pt-20 pb-16 md:pb-24 bg-[#F7F7F7]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(61,22,139,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(61,22,139,0.06) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage:
              "linear-gradient(to bottom, black 0%, black 55%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, black 0%, black 55%, transparent 100%)",
          }}
        />
        <div className="relative flex flex-col lg:flex-row lg:items-center lg:gap-12 max-w-6xl">
          <div className="lg:w-7/12">
            <Eyebrow>Global Outreach</Eyebrow>
            <h1 className="font-display font-bold text-3xl md:text-5xl leading-tight mt-5">
              Bringing genomics &amp; bioinformatics to{" "}
              <span className="text-[#7ed003]">communities everywhere</span>
            </h1>
            <p className="font-landing text-sm md:text-lg text-[#4f4f4f] mt-5 leading-relaxed max-w-2xl">
              {/* PLACEHOLDER — replace with the real mission statement. */}
              The Global Outreach is a Genomac Holdings initiative running a
              growing family of programs that make genomics and bioinformatics
              education accessible — online, on campus, and through local hosts
              around the world.
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <Link to="/host">
                <button className="font-landing font-semibold text-white py-2.5 px-6 bg-linear-to-r from-[#b241b7] to-[#3d168b] rounded-full hover:-translate-y-0.5 transition text-sm cursor-pointer">
                  Host a Program &rarr;
                </button>
              </Link>
              <a href="#programs">
                <button className="font-landing font-semibold text-[#3d168b] py-2.5 px-6 border border-[#3d168b] rounded-full hover:bg-[#3d168b] hover:text-white transition text-sm cursor-pointer">
                  Explore Programs
                </button>
              </a>
            </div>
          </div>

          <div className="hidden lg:block lg:w-5/12">
            <img src={heroCollage} alt="" className="w-full" />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="relative z-10 px-4 md:px-8 lg:px-16 -mt-10">
        <div className="bg-white border border-[#e6e1ef] rounded-2xl shadow-[0_30px_60px_-30px_rgba(50,20,80,0.35)] grid grid-cols-1 md:grid-cols-3">
          {stats.map((stat, i) => (
            <div
              key={stat.value}
              className={`px-8 py-7 flex flex-col gap-1.5 ${
                i < stats.length - 1
                  ? "border-b md:border-b-0 md:border-r border-[#e6e1ef]"
                  : ""
              }`}
            >
              <span className="font-data font-semibold text-3xl text-[#3d168b]">
                {stat.value}
              </span>
              <span className="font-landing text-[13.5px] text-[#55506b] leading-relaxed">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* About */}
      <div
        id="about"
        className="px-5 md:px-10 lg:px-16 py-16 md:py-24 scroll-mt-20"
      >
        <div className="rounded-3xl border border-[#e0cff2] bg-[#f5eefb] p-7 md:p-12">
          <Eyebrow>About</Eyebrow>
          <h2 className="font-display font-bold text-2xl md:text-3xl mt-4">
            One initiative, many ways in
          </h2>
          <div className="font-landing text-sm md:text-base text-[#55506b] leading-relaxed mt-4 space-y-4">
            {/* PLACEHOLDER — replace with real about copy. */}
            <p>
              Genomics and bioinformatics are reshaping health, agriculture, and
              research — but access to good, beginner-friendly training is
              uneven. The Global Outreach exists to close that gap.
            </p>
            <p>
              Each program below is a different route in: a global online course,
              a travelling tour, a school partnership. They share a curriculum
              philosophy, a mentor network, and a commitment to reaching learners
              wherever they are.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
            {reasons.map((r) => (
              <div
                key={r.title}
                className="bg-white border border-[#e0cff2] rounded-2xl p-6 flex flex-col gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-[#b241b71a] flex items-center justify-center">
                  {r.icon}
                </div>
                <h3 className="font-display font-semibold text-[15px] text-[#0f0f0f] leading-snug">
                  {r.title}
                </h3>
                <p className="font-landing text-[13.5px] text-[#55506b] leading-relaxed">
                  {r.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Approach */}
      <div
        id="approach"
        className="px-5 md:px-10 lg:px-16 py-16 md:py-24 bg-[#3d168b] text-white scroll-mt-20"
      >
        <div className="max-w-5xl mx-auto">
          <div className="bg-white/10 rounded-full px-4 py-1.5 inline-block">
            <span className="font-data text-[11px] font-semibold tracking-widest uppercase text-[#c9b8ec]">
              Our Approach
            </span>
          </div>
          <h2 className="font-display font-bold text-2xl md:text-4xl mt-4">
            What Makes Our Outreach Different?
          </h2>
          <p className="font-display font-semibold text-lg md:text-2xl text-[#7ed003] mt-5">
            We don&apos;t just tell people about science. We let them experience
            it.
          </p>
          <p className="font-landing text-sm md:text-base text-[#e6ddf5] leading-relaxed mt-5 max-w-2xl">
            Traditional outreach often ends when the presentation ends. Our goal
            is different. We design programs that can take participants from their
            first encounter with genomics to their first practical experience
            with it.
          </p>

          <p className="font-landing text-sm text-[#c9b8ec] mt-10 mb-4">
            Depending on the program, participants may:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
            {approachItems.map((item) => (
              <div key={item} className="flex gap-3 items-start">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#7ed003"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4 mt-1 shrink-0"
                  aria-hidden="true"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                <span className="font-landing text-sm md:text-[15px] text-white">
                  {item}
                </span>
              </div>
            ))}
          </div>

          <p className="font-display font-bold text-xl md:text-2xl mt-12">
            The event is not the destination.{" "}
            <span className="text-[#7ed003]">It is the beginning.</span>
          </p>
        </div>
      </div>

      {/* Programs */}
      <div
        id="programs"
        className="px-5 md:px-10 lg:px-16 py-16 md:py-24 bg-[#f5f3fa] scroll-mt-20"
      >
        <div className="flex flex-col items-center text-center max-w-xl mx-auto mb-12">
          <Eyebrow>Programs</Eyebrow>
          <h2 className="font-display font-bold text-2xl md:text-3xl mt-4">
            Programs under the Outreach
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {programs.map((p) => (
            <div
              key={p.name}
              className="bg-white border border-[#e6e1ef] rounded-2xl p-7 flex flex-col gap-4"
            >
              <span
                className={`font-data text-[10px] font-semibold tracking-widest uppercase w-fit px-2.5 py-1 rounded-full ${
                  p.live
                    ? "bg-[#7ed00322] text-[#3f6b00]"
                    : "bg-[#e6e1ef] text-[#8a8598]"
                }`}
              >
                {p.tag}
              </span>
              <h3 className="font-display font-bold text-lg text-[#0f0f0f]">
                {p.name}
              </h3>
              <p className="font-landing text-sm text-[#55506b] leading-relaxed flex-1">
                {p.description}
              </p>
              {p.live ? (
                <Link
                  to={p.to}
                  className="font-landing font-semibold text-sm text-[#b241b7] hover:text-[#3d168b]"
                >
                  Learn more &rarr;
                </Link>
              ) : (
                <span className="font-landing text-sm text-[#8a8598]">
                  Details coming soon
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Host CTA */}
      <div
        id="host"
        className="px-5 md:px-10 lg:px-16 py-16 md:py-24 scroll-mt-20"
      >
        <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-[#b241b7] to-[#3d168b] py-14 md:py-16 px-8 flex flex-col items-center text-center gap-4">
          <div className="absolute -top-16 -right-10 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-10 w-64 h-64 bg-[#7ed003] opacity-15 rounded-full blur-3xl" />
          <h2 className="relative font-display font-bold text-xl md:text-3xl text-white max-w-xl">
            Bring the Outreach to your community
          </h2>
          <p className="relative font-landing text-sm md:text-base text-[#f3e9f7] max-w-md">
            Universities, schools, labs and community organisations can host a
            program in their region. Tell us about yours.
          </p>
          <Link to="/host" className="relative mt-2">
            <button className="bg-white text-[#3d168b] font-landing font-bold py-3 px-7 rounded-full text-sm cursor-pointer hover:-translate-y-0.5 transition">
              Apply to Host &rarr;
            </button>
          </Link>
        </div>
      </div>

      <HubFooter />
    </div>
  );
};

export default Hub;
