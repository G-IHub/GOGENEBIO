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
        <h2 className="font-display font-bold text-2xl md:text-3xl mt-4">
          How The Program Works
        </h2>
      </div>

      <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        <div className="hidden lg:block absolute top-[21px] left-[12.5%] right-[12.5%] h-px bg-[#e6e1ef]" />

        {steps.map((step) => (
          <div key={step.n} className="relative flex flex-col gap-4">
            <div className="w-11 h-11 rounded-full bg-white border border-[#e6e1ef] flex items-center justify-center font-data font-semibold text-sm text-[#3d168b]">
              {step.n}
            </div>
            <h4 className="font-display font-semibold text-base text-[#0f0f0f]">
              {step.title}
            </h4>
            <p className="font-landing text-sm text-[#55506b] leading-relaxed">
              {step.text}
            </p>
          </div>
        ))}
      </div>

      <p className="font-landing text-xs text-[#8a8598] mt-8 max-w-6xl mx-auto">
        *Terms and conditions apply.
      </p>
    </div>
  );
};

export default Details;
