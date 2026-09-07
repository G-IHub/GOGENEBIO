import logo from "../assets/Logo.png";

const Footer = () => {
  return (
    <footer className="px-5 md:px-10 lg:px-16">
      <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr] gap-8 pt-6 pb-8 border-t border-[#e6e1ef]">
        <div className="flex flex-col gap-3 max-w-xs">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Genomac Holdings" className="w-8 h-8 rounded-full object-cover" />
            <span className="font-display font-bold text-base text-[#0f0f0f]">GOGeneBio</span>
          </div>
          <p className="font-landing text-[13.5px] text-[#8a8598] leading-relaxed">
            A Genomac Holdings initiative bringing genomics &amp; bioinformatics
            training to learners worldwide.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <span className="font-data text-[11px] font-semibold tracking-widest uppercase text-[#8a8598]">
            Program
          </span>
          <a href="#curriculum" className="font-landing text-[13px] text-[#4f4f4f] hover:text-[#b241b7]">Curriculum</a>
          <a href="#how-it-works" className="font-landing text-[13px] text-[#4f4f4f] hover:text-[#b241b7]">How It Works</a>
          <a href="#testimonials" className="font-landing text-[13px] text-[#4f4f4f] hover:text-[#b241b7]">Testimonials</a>
        </div>

        <div className="flex flex-col gap-3">
          <span className="font-data text-[11px] font-semibold tracking-widest uppercase text-[#8a8598]">
            Connect
          </span>
          <span className="font-landing text-[13px] text-[#4f4f4f]">[Instagram]</span>
          <span className="font-landing text-[13px] text-[#4f4f4f]">[LinkedIn]</span>
          <span className="font-landing text-[13px] text-[#4f4f4f]">[WhatsApp Community]</span>
        </div>
      </div>
      <div className="py-5 border-t border-[#e6e1ef]">
        <p className="font-landing text-xs text-[#8a8598]">
          © 2026 GOGeneBio · Genomac Holdings. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
