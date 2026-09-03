import React from "react";
import {
  FaChalkboardTeacher,
  FaProjectDiagram,
  FaComments,
  FaUsers,
  FaCertificate,
} from "react-icons/fa";

const Details = () => {
  return (
    <div className="p-5 md:p-10 lg:p-15 flex flex-col justify-center items-center">
      <div className="flex bg-[#b241b7]/10 justify-between items-center p-2 px-4 rounded-3xl">
        <p className="font-semibold text-sm text-[#b241b7]">
          What you need to know about the Program
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
        {/* Core Global Sessions */}
        <div className="col-span-1 p-6 md:p-8 lg:p-10 rounded-2xl bg-[#F1F4F9] border border-[#DFDFDFDF]">
          <div className="flex justify-center mb-4">
            <FaChalkboardTeacher className="text-[#4b0662] text-4xl" />
          </div>
          <h4 className="font-medium text-lg text-center">
            Core Global Sessions
          </h4>
          <p className="text-center text-sm mt-2">
            Online lectures from experts starting from the fundamentals.
          </p>
        </div>

        {/* Hands-On Mini-Project */}
        <div className="col-span-1 lg:col-span-2 p-6 md:p-8 lg:p-10 rounded-2xl bg-[#F1F4F9] border border-[#DFDFDFDF]">
          <div className="flex justify-center mb-4">
            <FaProjectDiagram className="text-[#66ff00]/50 text-4xl" />
          </div>
          <h4 className="font-medium text-lg text-center">
            Hands-On Mini-Project
          </h4>
          <p className="text-center text-sm mt-2">
            Apply what you learn to a small real dataset: from raw data →
            annotated results.
          </p>
        </div>

        {/* Interactive Q&A & Discussion */}
        <div className="col-span-1 p-6 md:p-8 lg:p-10 rounded-2xl bg-[#F1F4F9] border border-[#DFDFDFDF]">
          <div className="flex justify-center mb-4">
            <FaComments className="text-[#b241b7]/80 text-4xl" />
          </div>
          <h4 className="font-medium text-lg text-center">
            Interactive Q&A & Discussion
          </h4>
          <p className="text-center text-sm mt-2">
            Ask questions live or in local hubs; discuss challenges and
            solutions.
          </p>
        </div>

        {/* Peer & Mentor Support */}
        <div className="col-span-1 p-6 md:p-8 lg:p-10 rounded-2xl bg-[#F1F4F9] border border-[#DFDFDFDF]">
          <div className="flex justify-center mb-4">
            <FaUsers className="text-orange-600/70 text-4xl" />
          </div>
          <h4 className="font-medium text-lg text-center">
            Peer & Mentor Support
          </h4>
          <p className="text-center text-sm mt-2">
            WhatsApp/Telegram group, local hosts, feedback on your work.
          </p>
        </div>

        {/* Certification & Next Steps */}
        <div className="col-span-1 p-6 md:p-8 lg:p-10 rounded-2xl bg-[#F1F4F9] border border-[#DFDFDFDF]">
          <div className="flex justify-center mb-4">
            <FaCertificate className="text-[#3d168b]/80 text-4xl" />
          </div>
          <h4 className="font-medium text-lg text-center">
            Certification & Next Steps
          </h4>
          <p className="text-center text-sm mt-2">
            Certificate would be given to all Interested participant but PS:
            Terms and Conditions Apply.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Details;
