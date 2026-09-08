import React from "react";
import { Link } from "react-router-dom";
import HubHeader from "../Components/HubHeader";
import HubFooter from "../Components/HubFooter";
import Reveal from "../Components/Reveal";
import Counter from "../Components/Counter";
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

// From the last GoGeneBio Global Outreach (Oct–Nov 2025). Confirm/adjust
// the participant count and lists with real figures.
const lastOutreach = {
  participants: "~4,000",
  countries: [
    "Tunisia",
    "Pakistan",
    "Nigeria",
    "Zambia",
    "India",
    "Algeria",
    "Morocco",
    "Bangladesh",
    "Egypt",
    "Canada",
    "Philippines",
    "Indonesia",
    "Spain",
    "Sudan",
    "Botswana",
    "Madagascar",
  ],
  institutions: [
    "University of Ibadan",
    "Usmanu Danfodiyo University, Sokoto",
    "LAUTECH, Ogbomoso",
    "Ambrose Alli University, Ekpoma",
  ],
  rating: "4.1 / 5",
  responses: "500+",
};

// Lightly edited from the testimonial sheet — one or more per country.
const testimonials = [
  {
    quote:
      "I joined the training as a novice, but now I've been equipped with new skills — tools useful for both my professional career and my academics. Thank you for this valuable opportunity.",
    name: "Awoyomi Oluwaseyi Lola",
    country: "Nigeria",
  },
  {
    quote:
      "As a biology PhD graduate working on antimicrobial resistance in MDR and XDR bacteria, it was an impactful opportunity to learn about Geneious and transcriptomics. Thank you for making genomics simple and accessible to all participants.",
    name: "Meha Fethi",
    country: "Tunisia",
  },
  {
    quote:
      "As someone with no prior programming experience, I was initially intimidated. But the material was carefully designed for beginners, and the hands-on workshops made learning manageable and engaging. I highly recommend it to any biologist interested in computational methods.",
    name: "Nayab Ali",
    country: "Pakistan",
  },
  {
    quote:
      "Exceptionally well-structured and informative. The facilitator provided practical insights I can immediately apply to my work. I feel more confident and better equipped to perform my role.",
    name: "Sailota Njovu",
    country: "Zambia",
  },
  {
    quote:
      "The training was very interesting and helpful. I learned a lot of new skills and the instructor was excellent. Thank you for this great experience!",
    name: "Soufiane Yassara",
    country: "Morocco",
  },
  {
    quote:
      "Thank you for the Geneious software access and hands-on practice. The teacher was very good — whenever I had a doubt, he cleared it.",
    name: "Neha Kumari",
    country: "India",
  },
  {
    quote:
      "The training sessions were comprehensive and clearly explained. The free access to the software played a pivotal role.",
    name: "Tayeba Zaman Fabia",
    country: "Bangladesh",
  },
  {
    quote:
      "The training was excellent. I appreciate the Genomac team for building this network, and I look forward to a time when our institutions of higher learning partner with Genomac to train future bioinformaticians.",
    name: "Esumeh Frederick I.",
    country: "Nigeria",
  },
  {
    quote:
      "A great experience. I gained valuable insights into transcriptomics and RNA-Seq analysis, and I appreciated the practical sessions on bioinformatics tools.",
    name: "Maryem Saidane",
    country: "Tunisia",
  },
  {
    quote:
      "An exceptional learning experience. The hands-on sessions and practical exposure to tools like Geneious strengthened my understanding of genomic data analysis. Truly grateful for such a valuable, fully funded global opportunity.",
    name: "Laiba Siddique",
    country: "Pakistan",
  },
  {
    quote:
      "Informative and well-structured. The content was relevant, practical and easy to follow. It has improved my understanding of bioinformatics tools and their applications.",
    name: "Faith Olohize Abraham",
    country: "Nigeria",
  },
  {
    quote:
      "Theoretical knowledge paired with hands-on practical sessions that made complex concepts accessible. The instructors were experts, and incredibly supportive — every participant felt confident to apply what they learned. I wholeheartedly recommend it.",
    name: "Odette Kasonde",
    country: "Zambia",
  },
  {
    quote:
      "The facilitators combined in-depth scientific knowledge with practical insight. Well-structured sessions, with valuable exposure to cutting-edge genomic technologies and bioinformatics tools.",
    name: "Wael Ayari",
    country: "Tunisia",
  },
  {
    quote:
      "An incredible learning experience. The mentors explained complex topics in a very clear way. It truly enhanced my interest and confidence in pursuing genomics research.",
    name: "Roshaan Fatima",
    country: "Pakistan",
  },
  {
    quote:
      "An eye-opening and enriching experience that greatly enhanced my understanding of computational approaches to biological data.",
    name: "Muhammad Shamsudeen Umar",
    country: "Nigeria",
  },
  {
    quote:
      "The outreach was very well organised and helped me understand the topic better.",
    name: "Asmaa Idmbarek",
    country: "Spain",
  },
  {
    quote:
      "I enjoyed the training and enhanced my knowledge in genomics and bioinformatics. Overall the training was wonderful.",
    name: "Miriam Ropafadzo Chiminyah",
    country: "Botswana",
  },
  {
    quote:
      "Being a host for GoGeneBio was both a challenge and a privilege. Watching participants from different backgrounds come together through genomics made every effort worth it. Initiatives like this ignite curiosity and build global collaboration — especially in my country, the Philippines.",
    name: "Howard Gabriel G. Mercado",
    country: "Local host · Philippines",
  },
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
          <Reveal className="lg:w-7/12">
            <Eyebrow>Global Outreach</Eyebrow>
            <h1 className="font-display font-bold text-[26px] md:text-5xl leading-tight mt-5">
              Bringing genomics &amp; bioinformatics to{" "}
              <span className="text-[#7ed003]">communities everywhere</span>
            </h1>
            <p className="font-landing text-[13px] md:text-lg text-[#4f4f4f] mt-5 leading-relaxed max-w-2xl">
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
          </Reveal>

          <Reveal delay={120} className="hidden lg:block lg:w-5/12">
            <img src={heroCollage} alt="" className="w-full" />
          </Reveal>
        </div>
      </div>

      {/* Stats */}
      <div className="relative z-10 px-4 md:px-8 lg:px-16 -mt-10">
        <Reveal className="bg-white border border-[#e6e1ef] rounded-2xl shadow-[0_30px_60px_-30px_rgba(50,20,80,0.35)] grid grid-cols-1 md:grid-cols-3">
          {stats.map((stat, i) => (
            <div
              key={stat.value}
              className={`px-8 py-7 flex flex-col gap-1.5 ${
                i < stats.length - 1
                  ? "border-b md:border-b-0 md:border-r border-[#e6e1ef]"
                  : ""
              }`}
            >
              <Counter
                value={stat.value}
                className="font-data font-semibold text-2xl md:text-3xl text-[#3d168b]"
              />
              <span className="font-landing text-[13.5px] text-[#55506b] leading-relaxed">
                {stat.label}
              </span>
            </div>
          ))}
        </Reveal>
      </div>

      {/* About */}
      <div
        id="about"
        className="px-5 md:px-10 lg:px-16 py-16 md:py-24 scroll-mt-20"
      >
        <Reveal className="rounded-3xl border border-[#e0cff2] bg-[#f5eefb] p-7 md:p-12">
          <Eyebrow>About</Eyebrow>
          <h2 className="font-display font-bold text-xl md:text-3xl mt-4">
            One initiative, many ways in
          </h2>
          <div className="font-landing text-[13px] md:text-base text-[#55506b] leading-relaxed mt-4 space-y-4">
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
                className="bg-white border border-[#e0cff2] rounded-2xl p-5 flex flex-col gap-2.5"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#b241b71a] flex items-center justify-center shrink-0">
                    {r.icon}
                  </div>
                  <h3 className="font-display font-semibold text-[13.5px] text-[#0f0f0f] leading-snug">
                    {r.title}
                  </h3>
                </div>
                <p className="font-landing text-xs text-[#55506b] leading-relaxed">
                  {r.text}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      {/* Approach */}
      <div
        id="approach"
        className="px-5 md:px-10 lg:px-16 py-16 md:py-24 bg-linear-to-r from-[#b241b7] to-[#3d168b] text-white scroll-mt-20"
      >
        <Reveal className="max-w-5xl mx-auto">
          <div className="bg-white/10 rounded-full px-4 py-1.5 inline-block">
            <span className="font-data text-[11px] font-semibold tracking-widest uppercase text-[#c9b8ec]">
              Our Approach
            </span>
          </div>
          <h2 className="font-display font-bold text-xl md:text-4xl mt-4">
            What Makes Our Outreach Different?
          </h2>
          <p className="font-landing text-[13px] md:text-lg text-[#e6ddf5] leading-relaxed mt-5 max-w-3xl">
            We don&apos;t just tell people about science —{" "}
            <span className="text-[#a3e635] font-semibold">
              we let them experience it
            </span>
            . Traditional outreach often ends when the presentation ends. Our
            goal is different: we design programs that take participants from
            their first encounter with genomics to their first practical
            experience with it.
          </p>

          <div className="mt-10 rounded-2xl border border-white/25 bg-white/5 p-6 md:p-8">
            <p className="font-landing text-sm text-[#c9b8ec] mb-4">
              Depending on the program, participants may:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
              {approachItems.map((item) => (
                <div key={item} className="flex gap-3 items-start">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#a3e635"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4 mt-1 shrink-0"
                    aria-hidden="true"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  <span className="font-landing text-[13px] md:text-[15px] text-white">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <p className="font-display font-bold text-lg md:text-2xl mt-12">
            The event is not the destination.{" "}
            <span className="text-[#a3e635]">It is the beginning.</span>
          </p>
        </Reveal>
      </div>

      {/* Programs */}
      <div
        id="programs"
        className="px-5 md:px-10 lg:px-16 py-16 md:py-24 bg-[#f5f3fa] scroll-mt-20"
      >
        <Reveal className="flex flex-col items-center text-center max-w-xl mx-auto mb-12">
          <Eyebrow>Programs</Eyebrow>
          <h2 className="font-display font-bold text-xl md:text-3xl mt-4">
            Programs under the Outreach
          </h2>
        </Reveal>

        <Reveal className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
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
              <h3 className="font-display font-bold text-base md:text-lg text-[#0f0f0f]">
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
        </Reveal>
      </div>

      {/* Track record */}
      <div
        id="track-record"
        className="px-5 md:px-10 lg:px-16 py-16 md:py-24 scroll-mt-20"
      >
        <Reveal className="max-w-6xl mx-auto">
          <Eyebrow>Track Record</Eyebrow>
          <h2 className="font-display font-bold text-xl md:text-3xl mt-4">
            Proven across regions
          </h2>

          {/* Last outreach recap */}
          <div className="mt-8 rounded-3xl border border-[#e0cff2] bg-[#f5eefb] p-7 md:p-10">
            <p className="font-data text-[11px] font-semibold tracking-widest uppercase text-[#3d168b]">
              Last outreach · GoGeneBio 2025
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 mt-4">
              <div className="py-4 sm:py-1 sm:pr-6 border-b sm:border-b-0 border-[#e0cff2]">
                <Counter
                  value={String(lastOutreach.participants)}
                  className="font-data font-semibold text-2xl md:text-3xl text-[#3d168b]"
                />
                <p className="font-landing text-xs text-[#55506b] mt-1">
                  participants
                </p>
              </div>
              <div className="py-4 sm:py-1 sm:px-6 border-b sm:border-b-0 sm:border-l border-[#e0cff2]">
                <Counter
                  value={String(lastOutreach.countries.length)}
                  className="font-data font-semibold text-2xl md:text-3xl text-[#3d168b]"
                />
                <p className="font-landing text-xs text-[#55506b] mt-1">
                  countries
                </p>
              </div>
              <div className="py-4 sm:py-1 sm:pl-6 sm:border-l border-[#e0cff2]">
                <Counter
                  value={String(lastOutreach.rating)}
                  className="font-data font-semibold text-2xl md:text-3xl text-[#3d168b]"
                />
                <p className="font-landing text-xs text-[#55506b] mt-1">
                  average rating ({lastOutreach.responses} responses)
                </p>
              </div>
            </div>

            <p className="font-landing text-xs font-semibold uppercase tracking-wide text-[#8a8598] mt-8 mb-3">
              Countries reached
            </p>
            <div className="flex flex-wrap gap-2">
              {lastOutreach.countries.map((c) => (
                <span
                  key={c}
                  className="font-landing text-[13px] bg-white border border-[#e0cff2] rounded-full px-3 py-1 text-[#3f3a52]"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>

          {/* Where we've worked */}
          <div className="mt-10">
            <h3 className="font-display font-semibold text-base md:text-lg text-[#0f0f0f]">
              Where we&apos;ve worked
            </h3>
            <p className="font-landing text-sm text-[#55506b] mt-2 max-w-2xl">
              Recent outreach editions have run with partner universities and
              institutions, including:
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              {lastOutreach.institutions.map((i) => (
                <span
                  key={i}
                  className="font-landing text-[13px] bg-[#f5f3fa] border border-[#e6e1ef] rounded-full px-3 py-1 text-[#3f3a52]"
                >
                  {i}
                </span>
              ))}
              <span className="font-landing text-[13px] text-[#8a8598] px-3 py-1">
                + partner universities across Tunisia, Pakistan and Zambia
              </span>
            </div>
          </div>
        </Reveal>

        {/* In their words — auto-sliding */}
        <div className="mt-14">
          <Reveal className="max-w-6xl mx-auto">
            <h3 className="font-display font-semibold text-base md:text-lg text-[#0f0f0f]">
              In their words
            </h3>
            <p className="font-landing text-sm text-[#55506b] mt-1">
              Participants from the last outreach — one or more per country.
            </p>
          </Reveal>

          <div className="marquee-pause mt-6 -mx-5 md:-mx-10 lg:-mx-16 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_3rem,black_calc(100%-3rem),transparent)]">
            <div
              className="animate-marquee-x flex gap-5 w-max py-1 px-5 md:px-10 lg:px-16"
              style={{ "--marquee-duration": "110s" }}
            >
              {[...testimonials, ...testimonials].map((t, i) => (
                <figure
                  key={i}
                  className="w-[300px] shrink-0 bg-white border border-[#e6e1ef] rounded-2xl p-6 flex flex-col gap-3"
                >
                  <svg
                    width="26"
                    height="18"
                    viewBox="0 0 30 22"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M0 22V13.5C0 6 4.5 1 12 0L13 3.5C8 5 6 8 6 12H12V22H0ZM17 22V13.5C17 6 21.5 1 29 0L30 3.5C25 5 23 8 23 12H29V22H17Z"
                      fill="#b241b7"
                      opacity="0.5"
                    />
                  </svg>
                  <blockquote className="font-landing text-sm text-[#3f3a52] leading-relaxed flex-1">
                    {t.quote}
                  </blockquote>
                  <figcaption className="pt-2 border-t border-[#e6e1ef]">
                    <span className="block font-landing text-[13px] font-semibold text-[#0f0f0f]">
                      {t.name}
                    </span>
                    <span className="block font-landing text-xs text-[#8a8598]">
                      {t.country}
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Host CTA */}
      <div
        id="host"
        className="px-5 md:px-10 lg:px-16 py-16 md:py-24 scroll-mt-20"
      >
        <Reveal className="relative overflow-hidden rounded-3xl bg-linear-to-r from-[#b241b7] to-[#3d168b] py-14 md:py-16 px-8 flex flex-col items-center text-center gap-4">
          <div className="absolute -top-16 -right-10 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-10 w-64 h-64 bg-[#7ed003] opacity-15 rounded-full blur-3xl" />
          <h2 className="relative font-display font-bold text-xl md:text-3xl text-white max-w-xl">
            Bring the Outreach to your community
          </h2>
          <p className="relative font-landing text-[13px] md:text-base text-[#f3e9f7] max-w-md">
            Universities, schools, labs and community organisations can host a
            program in their region. Tell us about yours.
          </p>
          <Link to="/host" className="relative mt-2">
            <button className="bg-white text-[#3d168b] font-landing font-bold py-3 px-7 rounded-full text-sm cursor-pointer hover:-translate-y-0.5 transition">
              Apply to Host &rarr;
            </button>
          </Link>
        </Reveal>
      </div>

      <HubFooter />
    </div>
  );
};

export default Hub;
