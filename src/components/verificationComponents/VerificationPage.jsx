import React from "react";
import VerificationForm from "./VerificationForm";
import Verify from "../../assets/images/verification.png";

const VerificationPage = () => {
  return (
    <div className="flex justify-center items-center gap-x-20 h-screen">
      {/* Left Side: Verification Form */}
      <div className="">
        <VerificationForm />
      </div>

      {/* Right side: Image */}
      <div className="w-full hidden md:block md:w-[616px]">
        <img src={Verify} alt="Cafe" />
      </div>
    </div>
  );
};

export default VerificationPage;
