import logo from "../assets/Logo.png";
import { Link } from "react-router-dom";

const HubHeader = () => {
  return (
    <div className="flex items-center justify-between px-6 lg:px-16 py-4">
      <Link to="/" className="flex items-center gap-3">
        <img
          src={logo}
          alt="Genomac Holdings"
          className="w-9 h-9 rounded-full object-cover"
        />
        <div className="flex flex-col leading-tight">
          <span className="font-display font-bold text-base text-[#0f0f0f]">
            Global Outreach
          </span>
          <span className="font-data text-[9px] tracking-widest text-[#8a8598] uppercase hidden sm:block">
            A Genomac Holdings Initiative
          </span>
        </div>
      </Link>

      <div className="hidden lg:flex items-center gap-10">
        <a
          href="#programs"
          className="font-landing text-sm font-medium text-[#4f4f4f] hover:text-[#b241b7] transition"
        >
          Programs
        </a>
        <a
          href="#about"
          className="font-landing text-sm font-medium text-[#4f4f4f] hover:text-[#b241b7] transition"
        >
          About
        </a>
        <a
          href="#host"
          className="font-landing text-sm font-medium text-[#4f4f4f] hover:text-[#b241b7] transition"
        >
          Host
        </a>
      </div>

      <Link to="/host">
        <button className="text-white py-2 px-4 font-landing font-semibold bg-linear-to-r from-[#b241b7] to-[#3d168b] rounded-full hover:bg-gradient-to-l hover:from-[#3d168b] hover:to-[#b241b7] cursor-pointer transition duration-300 text-xs lg:text-sm">
          Become a Host &rarr;
        </button>
      </Link>
    </div>
  );
};

export default HubHeader;
