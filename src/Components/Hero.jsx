import collage from "../assets/hero_img.png";
import { TbCircleArrowDownFilled } from "react-icons/tb";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="bg-[#F7F7F7] flex justify-center lg:justify-between min-h-1 lg:min-h-screen pt-10 pb-24 lg:pb-36 px-8 lg:px-16 relative">
      <div className="hidden lg:block absolute top-20 left-30 -translate-x-1/2 w-30 h-30 lg:w-100 lg:h-100 bg-[#3d168b]/30 rounded-full blur-[100px] opacity-50 z-30"></div>
      <div className="hidden lg:block absolute top-50 right-2 -translate-x-1/2 w-50 h-50 bg-[#f400ff] rounded-full blur-[150px] opacity-50 z-30"></div>
      <div className="flex flex-col gap-6 w-full lg:w-7/12 z-40">
        <div className="border border-[#b241b7] bg-[#b141b724] rounded-full px-4 py-2 flex items-center font-landing font-semibold w-full lg:w-7/12 justify-between text-[10px] md:text-sm">
          <p className="text-[#b241b7]">
            GOGeneBio — Your Bioinformatics Launchpad
          </p>
          <TbCircleArrowDownFilled className="text-[#b241b7] text-lg animate-bounce" />
        </div>
        <div>
          <h1 className="font-display font-bold text-[26px] lg:text-5xl leading-tight">
            Learn{" "}
            <span className="text-[#7ed003]">Bioinformatics & Genomics</span>{" "}
            From Scratch — No Experience Needed
          </h1>
          <p className="font-landing text-xs lg:text-base text-[#4f4f4f] mt-4 leading-loose">
            Are you curious about genomics & bioinformatics but don't know where
            to start? GOGeneBio is designed just for people like you. No prior
            experience needed. You'll gain real skills, not just theory.
          </p>
        </div>
        <Link to="/form">
          <button className="font-landing w-full lg:w-1/4 text-white py-2 px-3 font-medium bg-linear-to-r from-[#b241b7] to-[#3d168b] rounded-full hover:bg-gradient-to-l hover:from-[#3d168b] hover:to-[#b241b7] cursor-pointer hover:translate-x-2 transition duration-300 text-[13px] mt-2">
            Register Now &rarr;
          </button>
        </Link>
      </div>
      <div className="absolute hidden lg:flex z-40 right-20 top-20 justify-end">
        <img src={collage} className="w-9/12" alt="" />
      </div>

      {/* Rectangles */}
      <div className="hidden lg:block">
        <div className="w-16 h-16 z-20 border-1 blur-[1px] [border-image:linear-gradient(to_bottom,#f200ff85,#f200ff00)_8] absolute left-20 top-2"></div>
        <div className="w-16 h-16 z-20 border-1 blur-[1px] [border-image:linear-gradient(to_left,#f200ff85,#f200ff00)_1] absolute bottom-4 left-10"></div>
        <div className="w-16 h-16 z-20 border-1 blur-[1px] [border-image:linear-gradient(to_right,#f200ff85,#f200ff00)_1] absolute bottom-20 left-30 "></div>
        <div className="w-16 h-16 z-20 border-1 blur-[1px] [border-image:linear-gradient(to_bottom,#f200ff85,#f200ff00)_1] absolute bottom-20 left-80"></div>
        <div className="w-16 h-16 z-20 border-1 blur-[1px] [border-image:linear-gradient(to_top,#f200ff85,#f200ff00)_1] absolute top-40 right-150"></div>
        <div className="w-16 h-16 z-20 border-1 blur-[1px] [border-image:linear-gradient(to_left,#f200ff85,#f200ff00)_1] absolute top-60 right-150"></div>
        <div className="w-16 h-16 z-20 border-1 blur-[1px] [border-image:linear-gradient(to_bottom,#f200ff85,#f200ff00)_1] absolute top-80 right-150"></div>
        <div className="w-16 h-16 z-20 border-1 blur-[1px] [border-image:linear-gradient(to_left,#f200ff85,#f200ff00)_1] absolute top-20 left-130"></div>
        <div className="w-16 h-16 z-20 border-1 blur-[1px] [border-image:linear-gradient(to_right,#f200ff85,#f200ff00)_1] absolute top-20 right-130"></div>
        <div className="w-16 h-16 z-20 border-1 blur-[1px] [border-image:linear-gradient(to_right,#f200ff85,#f200ff00)_1] absolute top-80 left-100"></div>
        <div className="w-16 h-16 z-20 border-1 blur-[1px] [border-image:linear-gradient(to_right,#f200ff85,#f200ff00)_1] absolute top-60 left-80"></div>
        <div className="w-16 h-16 z-20 border-1 blur-[1px] [border-image:linear-gradient(to_top,#f200ff85,#f200ff00)_1] absolute top-40 left-40"></div>
        <div className="w-16 h-16 z-20 border-1 blur-[1px] [border-image:linear-gradient(to_right,#f200ff85,#f200ff00)_1] absolute bottom-38 left-50"></div>
        <div className="w-16 h-16 z-20 border-1 blur-[1px] [border-image:linear-gradient(to_left,#f200ff85,#f200ff00)_1] absolute bottom-10 left-140"></div>
        <div className="w-16 h-16 z-20 border-1 blur-[1px] [border-image:linear-gradient(to_bottom,#f200ff85,#f200ff00)_1] absolute top-50 right-100"></div>
        <div className="w-16 h-16 z-20 border-1 blur-[1px] [border-image:linear-gradient(to_bottom,#f200ff85,#f200ff00)_1] absolute top-32 right-75"></div>
        <div className="w-16 h-16 z-20 border-1 blur-[1px] [border-image:linear-gradient(to_top,#f200ff85,#f200ff00)_1] absolute bottom-10 right-65"></div>
        <div className="w-16 h-16 z-20 border-1 blur-[1px] [border-image:linear-gradient(to_left,#f200ff85,#f200ff00)_1] absolute top-45 right-12"></div>
        <div className="w-16 h-16 z-20 border-1 blur-[1px] [border-image:linear-gradient(to_bottom,#f200ff85,#f200ff00)_1] absolute top-72 right-24"></div>
        <div className="w-16 h-16 z-10 border-1 blur-[1px] [border-image:linear-gradient(to_top,#f200ff85,#f200ff00)_1] absolute top-0 right-90"></div>
      </div>

      {/* dots */}
      <div className="hidden lg:block">
        <div className="bg-white w-0.5 h-0.5 rounded-full blur-[1px] absolute right-10 top-10"></div>
        <div className="bg-white w-0.5 h-0.5 rounded-full blur-[1px] absolute right-30 top-5"></div>
        <div className="bg-white w-0.5 h-0.5 rounded-full blur-[1px] absolute left-10 top-15"></div>
        <div className="bg-white w-0.5 h-0.5 rounded-full blur-[1px] absolute right-80 top-20"></div>
        <div className="bg-white w-0.5 h-0.5 rounded-full blur-[1px] absolute right-76 top-16"></div>
        <div className="bg-white w-0.5 h-0.5 rounded-full blur-[1px] absolute left-76 top-5"></div>
        <div className="bg-white w-0.5 h-0.5 rounded-full blur-[1px] absolute left-50 top-30"></div>
        <div className="bg-white w-0.5 h-0.5 rounded-full blur-[1px] absolute left-90 bottom-16"></div>
        <div className="bg-white w-0.5 h-0.5 rounded-full blur-[1px] absolute left-30 top-60"></div>
        <div className="bg-white w-0.5 h-0.5 rounded-full blur-[1px] absolute right-15 top-40"></div>
        <div className="bg-white w-0.5 h-0.5 rounded-full blur-[1px] absolute right-20 top-70"></div>
        <div className="bg-white w-0.5 h-0.5 rounded-full blur-[1px] absolute right-120 top-30"></div>
        <div className="bg-white w-0.5 h-0.5 rounded-full blur-[1px] absolute right-140 top-70"></div>
      </div>
    </div>
  );
};

export default Hero;
