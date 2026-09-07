import React from "react";
import { Link } from "react-router-dom";

const ClosedForm = () => {
  return (
    <div className="flex justify-center items-center min-h-screen relative">
      <Link to="/gogenbio">
        <button className="border border-[#9D3CA7] rounded-full p-2 px-2.5 md:p-2.5 md:px-4 text-[14px] md:text-[16px] cursor-pointer absolute top-5 left-5  md:top-10 md:left-10">
          &larr; Back to Home
        </button>
      </Link>
      <h1 className=" text-2xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#511E8C] to-[#9D3CA7]">
        Registration is now closed.
      </h1>
    </div>
  );
};

export default ClosedForm;
