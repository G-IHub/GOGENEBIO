import React from "react";

const items = [
  {
    text: "Understand the basics of DNA, genes, and genomes — what they are and why they matter",
    icon: (
      <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="#3d168b" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4c4 2 4 6 0 8 4 2 4 6 0 8" />
        <path d="M20 4c-4 2-4 6 0 8-4 2-4 6 0 8" />
        <path d="M6 8h12M6 20h12" />
      </svg>
    ),
  },
  {
    text: "Connect your own field of study to genomics and bioinformatics",
    icon: (
      <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="#3d168b" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="8" />
        <path d="M12 8v4l3 2" />
      </svg>
    ),
  },
  {
    text: "Run real bioinformatics tools — retrieve, clean, and assemble genome data",
    icon: (
      <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="#3d168b" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="14" rx="2" />
        <path d="M7 9l3 2-3 2M12 13h4" />
      </svg>
    ),
  },
  {
    text: "Annotate genes and identify basic functions, like resistance and virulence",
    icon: (
      <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="#3d168b" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 7h10v6a5 5 0 0 1-10 0V7z" />
        <path d="M9 21h6M12 18v3" />
      </svg>
    ),
  },
  {
    text: "Apply comparative genomics to spot similarities and differences across organisms",
    icon: (
      <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="#3d168b" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="12" r="6" />
        <circle cx="15" cy="12" r="6" />
      </svg>
    ),
  },
  {
    text: "See how bioinformatics shapes health, agriculture, and the environment",
    icon: (
      <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="#3d168b" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c2.5 2.5 2.5 15.5 0 18M12 3c-2.5 2.5-2.5 15.5 0 18" />
      </svg>
    ),
  },
];

const ProgramBenefits = () => {
  return (
    <div id="curriculum" className="px-5 md:px-10 lg:px-16 pt-20 md:pt-28 pb-16 md:pb-20 flex flex-col items-center scroll-mt-20">
      <div className="flex flex-col items-center text-center max-w-xl mb-10 md:mb-14">
        <div className="bg-[#b241b71a] rounded-full px-4 py-1.5">
          <span className="font-data text-[11px] font-semibold tracking-widest uppercase text-[#3d168b]">
            Curriculum
          </span>
        </div>
        <h2 className="font-display font-bold text-2xl md:text-3xl mt-4">
          What You'll Learn
        </h2>
        <p className="font-landing text-sm md:text-base text-[#55506b] mt-2">
          By the end of the program, you'll be able to:
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full max-w-6xl">
        {items.map((item, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-2xl border border-[#e6e1ef] flex flex-col gap-3.5 hover:shadow-md hover:-translate-y-0.5 transition duration-300"
          >
            <div className="w-10 h-10 rounded-xl bg-[#b241b71a] flex items-center justify-center">
              {item.icon}
            </div>
            <p className="font-landing text-sm md:text-[15px] text-[#3f3a52] leading-relaxed">
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgramBenefits;
