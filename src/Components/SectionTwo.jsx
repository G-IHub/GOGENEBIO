import React from "react";
import Reveal from "./Reveal";
import Counter from "./Counter";

const stats = [
  {
    value: "100k+",
    label: "Trained bioinformaticians & practicing professionals globally",
  },
  {
    value: "120+",
    label: "Countries reached — making a difference worldwide",
  },
  {
    value: "1000+",
    label: "Publications, scholarships, grants & jobs from our participants",
  },
];

const SectionTwo = () => {
  return (
    <div className="relative z-10 mx-4 md:mx-8 lg:mx-16 mt-6 lg:-mt-12">
      <Reveal className="bg-white border border-[#e6e1ef] rounded-2xl shadow-[0_30px_60px_-30px_rgba(50,20,80,0.35)] grid grid-cols-1 md:grid-cols-3">
        {stats.map((stat, index) => (
          <div
            key={stat.value}
            className={`px-8 py-7 md:py-8 flex flex-col gap-1.5 ${
              index < stats.length - 1
                ? "border-b md:border-b-0 md:border-r border-[#e6e1ef]"
                : ""
            }`}
          >
            <Counter
              value={stat.value}
              className="font-data font-semibold text-2xl md:text-3xl text-[#3d168b]"
            />
            <span className="font-landing text-xs md:text-[13.5px] text-[#55506b] leading-relaxed">
              {stat.label}
            </span>
          </div>
        ))}
      </Reveal>
    </div>
  );
};

export default SectionTwo;
