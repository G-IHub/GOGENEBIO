import logo from "../assets/Logo.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="flex items-center justify-between px-6 lg:px-16 py-4">
      <Link to="/gogenbio" className="flex items-center gap-3">
        <img src={logo} alt="Genomac Holdings" className="w-9 h-9 rounded-full object-cover" />
        <div className="flex flex-col leading-tight">
          <span className="font-display font-bold text-base text-[#0f0f0f]">GOGeneBio</span>
          <span className="font-data text-[9px] tracking-widest text-[#8a8598] uppercase hidden sm:block">
            A Genomac Holdings Initiative
          </span>
        </div>
      </Link>

      <div className="hidden lg:flex items-center gap-10">
        <a href="#curriculum" className="font-landing text-sm font-medium text-[#4f4f4f] hover:text-[#b241b7] transition">
          Curriculum
        </a>
        <a href="#how-it-works" className="font-landing text-sm font-medium text-[#4f4f4f] hover:text-[#b241b7] transition">
          How It Works
        </a>
        <a href="#testimonials" className="font-landing text-sm font-medium text-[#4f4f4f] hover:text-[#b241b7] transition">
          Testimonials
        </a>
      </div>

      <Link to="/form">
        <button className="text-white py-2 px-4 font-landing font-semibold bg-linear-to-r from-[#b241b7] to-[#3d168b] rounded-full hover:bg-gradient-to-l hover:from-[#3d168b] hover:to-[#b241b7] cursor-pointer transition duration-300 text-xs lg:text-sm">
          Register Now &rarr;
        </button>
      </Link>
    </div>
  );
};

export default Header;
