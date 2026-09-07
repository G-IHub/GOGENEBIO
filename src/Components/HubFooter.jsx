import logo from "../assets/Logo.png";
import { Link } from "react-router-dom";

const HubFooter = () => {
  return (
    <footer className="px-5 md:px-10 lg:px-16">
      <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr] gap-8 pt-6 pb-8 border-t border-[#e6e1ef]">
        <div className="flex flex-col gap-3 max-w-xs">
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="Genomac Holdings"
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="font-display font-bold text-base text-[#0f0f0f]">
              Global Outreach
            </span>
          </div>
          <p className="font-landing text-[13.5px] text-[#8a8598] leading-relaxed">
            We don&apos;t wait for opportunity to reach underserved communities.
            We take the opportunity there.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <span className="font-data text-[11px] font-semibold tracking-widest uppercase text-[#8a8598]">
            Explore
          </span>
          <a
            href="#programs"
            className="font-landing text-sm text-[#4f4f4f] hover:text-[#b241b7]"
          >
            Programs
          </a>
          <a
            href="#about"
            className="font-landing text-sm text-[#4f4f4f] hover:text-[#b241b7]"
          >
            About
          </a>
          <Link
            to="/host"
            className="font-landing text-sm text-[#4f4f4f] hover:text-[#b241b7]"
          >
            Become a Host
          </Link>
        </div>

        <div className="flex flex-col gap-3">
          <span className="font-data text-[11px] font-semibold tracking-widest uppercase text-[#8a8598]">
            Connect
          </span>
          <span className="font-landing text-sm text-[#4f4f4f]">[Instagram]</span>
          <span className="font-landing text-sm text-[#4f4f4f]">[LinkedIn]</span>
          <span className="font-landing text-sm text-[#4f4f4f]">
            [WhatsApp Community]
          </span>
        </div>
      </div>
      <div className="py-5 border-t border-[#e6e1ef]">
        <p className="font-landing text-xs text-[#8a8598]">
          © 2026 Global Outreach · Genomac Holdings. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default HubFooter;
