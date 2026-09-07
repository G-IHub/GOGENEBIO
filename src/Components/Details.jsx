import React from "react";

const steps = [
  {
    n: "01",
    title: "Core Global Sessions",
    text: "Live online lectures from expert instructors, building up from first principles.",
  },
  {
    n: "02",
    title: "Hands-On Mini-Project",
    text: "Apply what you learn to a real dataset — from raw data to annotated results.",
  },
  {
    n: "03",
    title: "Community & Mentorship",
    text: "Live Q&A, peer WhatsApp/Telegram groups, plus onsite mentorship and local hubs where available.",
  },
  {
    n: "04",
    title: "Certification & Next Steps",
    text: "Earn a certificate of participation, with early access to mentorship, fellowships, and Train-the-Trainer pathways.*",
  },
];

const Details = () => {
  return (
    <div id="how-it-works" className="px-5 md:px-10 lg:px-16 py-16 md:py-20 bg-[#f5f3fa] scroll-mt-20">
      <div className="flex flex-col items-center text-center max-w-xl mx-auto mb-12 md:mb-16">
        <div className="bg-white rounded-full px-4 py-1.5">
          <span className="font-data text-[11px] font-semibold tracking-widest uppercase text-[#3d168b]">
            Program Format
          </span>
        </div>
        <h2 className="font-display font-bold text-xl md:text-3xl mt-4">
          How The Program Works
        </h2>
      </div>

      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row lg:items-stretch">
        {steps.map((step, i) => (
          <React.Fragment key={step.n}>
            <div className="flex-1 bg-white border border-[#e6e1ef] rounded-2xl p-6 flex flex-col gap-3 shadow-[0_20px_40px_-30px_rgba(50,20,80,0.3)]">
              <div className="w-10 h-10 rounded-full bg-[#b241b71a] flex items-center justify-center font-data font-semibold text-sm text-[#3d168b]">
                {step.n}
              </div>
              <h4 className="font-display font-semibold text-sm md:text-base text-[#0f0f0f]">
                {step.title}
              </h4>
              <p className="font-landing text-[13px] text-[#55506b] leading-relaxed">
                {step.text}
              </p>
            </div>

            {i < steps.length - 1 && (
              <div
                className="flex items-center justify-center shrink-0 text-[#c9bfdd] py-2 lg:py-0 lg:px-1"
                aria-hidden="true"
              >
                {/* down chevron on stacked layout, right chevron on the row */}
                <svg
                  className="w-5 h-5 lg:hidden"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
                <svg
                  className="hidden lg:block w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 6l6 6-6 6" />
                </svg>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      <p className="font-landing text-xs text-[#8a8598] mt-8 max-w-6xl mx-auto">
        *Terms and conditions apply.
      </p>
    </div>
  );
};

export default Details;
