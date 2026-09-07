import React from "react";
import { Link } from "react-router-dom";
import Reveal from "./Reveal";

const CTASection = () => {
  return (
    <div className="px-5 md:px-10 lg:px-16 pb-16 md:pb-20">
      <Reveal className="relative overflow-hidden rounded-3xl bg-linear-to-r from-[#b241b7] to-[#3d168b] py-14 md:py-16 px-8 flex flex-col items-center text-center gap-4">
        <div className="absolute -top-16 -right-10 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-10 w-64 h-64 bg-[#7ed003] opacity-15 rounded-full blur-3xl" />

        <h2 className="relative font-display font-bold text-lg md:text-3xl text-white max-w-lg">
          Ready to start your bioinformatics journey?
        </h2>
        <p className="relative font-landing text-[13px] md:text-base text-[#f3e9f7] max-w-md">
          Join learners across 120+ countries — no experience required.
        </p>
        <Link to="/form" className="relative mt-2">
          <button className="bg-white text-[#3d168b] font-landing font-bold py-3 px-7 rounded-full text-[13px] cursor-pointer hover:-translate-y-0.5 transition">
            Register Now &rarr;
          </button>
        </Link>
      </Reveal>
    </div>
  );
};

export default CTASection;
