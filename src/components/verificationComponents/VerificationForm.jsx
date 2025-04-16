import { useEffect, useState } from "react";
import logo from "../../../public/elhagz.png";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { ErrorToast } from "../../helper/ValidationHelper";
import { useForgotPassVerifyOtpMutation } from "../../redux/features/auth/authApi";
import { getEmail } from "../../helper/SessionHelper";
import { CgSpinnerTwo } from "react-icons/cg";


const VerificationForm = () => {
  const [code, setCode] = useState(new Array(4).fill(""));
  const [forgotPassVerifyOtp, { isLoading, isSuccess}] = useForgotPassVerifyOtpMutation();
  const navigate = useNavigate();

  useEffect(()=> {
    if(isSuccess){
      navigate("/reset-password")
    }
  }, [navigate, isSuccess])

  const handleChange = (value, index) => {
    if (!isNaN(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      if (value && index < 5) {
        document.getElementById(`code-${index + 1}`).focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (code[index] === "") {
        if (index > 0) {
          const newCode = [...code];
          newCode[index - 1] = "";
          setCode(newCode);
          document.getElementById(`code-${index - 1}`).focus();
        }
      } else {
        const newCode = [...code];
        newCode[index] = "";
        setCode(newCode);
      }
    }
  };



  const handleVerifyCode = async () => {
    const cleaned = code.filter(item => item !== "").map(Number);
    const otp = String(cleaned.join(''));
    if(cleaned.length < 4){
      ErrorToast("Please enter 4 digit code")
    }

    //verify-otp
    forgotPassVerifyOtp({
      email: getEmail(),
      otp
    })
  };

  return (
    <div className="max-w-xl w-full p-8 bg-white ">
      {/* Logo */}
      <div className="mb-8">
        <img src={logo} alt="Elhagz Logo" className="w-[106px] ml-36 " />
      </div>

      {/* Verification Title */}
      <Link to={"/forgot-password"}>
        <FaRegArrowAltCircleLeft />
      </Link>
      <div className="my-4">
        <h1 className="text-3xl font-bold">Verification</h1>
      </div>

      {/* Instructions */}
      <p className="text-gray-600 mb-6">
        Please enter the 4 digit verification code we have just sent to <span className="text-black font-bold">{getEmail()}</span>
      </p>

      {/* Input Fields */}
      <div className="grid grid-cols-6 gap-2 mb-6">
        {code.map((digit, index) => (
          <input
            key={index}
            id={`code-${index}`}
            type="text"
            maxLength="1"
            value={digit}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className="shadow-xs w-12 h-12 text-2xl text-center border border-[#6A6D76] text-[#0d0d0d] rounded-lg focus:outline-none"
          />
        ))}
      </div>

      {/* Success Message (Conditional - Example) */}
      <p className="text-red-500 mb-6">
        The code you entered is correct. Please proceed to recover your account.
      </p>

      {/* Verify Button */}
      <button
        type="submit"
        onClick={handleVerifyCode}
        disabled={isLoading}
        className="w-full bg-red-500 hover:bg-red-600 duration-200 p-2 border-0 rounded-md text-white flex justify-center items-center gap-x-2 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <CgSpinnerTwo className="animate-spin" fontSize={16} />
            Verifying...
          </>
        ) : (
          "Verify"
        )}
      </button>
    </div>
  );
};

export default VerificationForm;
