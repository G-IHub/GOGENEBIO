import React from "react";
import Reveal from "./Reveal";
import Counter from "./Counter";

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

const Eyebrow = ({ children }) => (
  <div className="bg-[#b241b71a] rounded-full px-4 py-1.5 inline-block">
    <span className="font-data text-[11px] font-semibold tracking-widest uppercase text-[#3d168b]">
      {children}
    </span>
  </div>
);

const TrackRecord = () => {
  return (
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
  );
};

export default TrackRecord;
