import { useState } from "react";
import RightArrowIcon from "../../assets/RightArrowIcon";
import PasswordTextField from "../TextFields/PasswordTextField";
import { checkPassword } from "../../utils/helper";
import { useNavigate } from "react-router-dom";

const CheckPassword = () => {
    const [password,setPassword] = useState("");
    const navigate = useNavigate();

    const handleCheckPassword = async () => {
        const response = await checkPassword("arunkarthick",password);
        if(!response.success){
            console.log(response);
        }
        navigate("/home");
        return;
    }
  return (
    <>
      <div className="mt-[20%] font-[500] text-white text-[18px]">
        Welcome Back! Now, enter your password to secure your account.
      </div>
      <PasswordTextField placeholder={"Password"} value={password} setValue={setPassword} />
      <div 
      onClick={handleCheckPassword}
      className="w-[450px] cursor-pointer rounded-[12px] h-[60px] mt-[5%] bg-white flex justify-center items-center">
        <RightArrowIcon />
      </div>
    </>
  );
};

export default CheckPassword;
