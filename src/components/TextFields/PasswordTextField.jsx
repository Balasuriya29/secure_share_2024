import { useState } from "react";
import PasswordToggleIcon from "../../assets/PasswordToggleIcon";

const PasswordTextField = ({ value, setValue ,placeholder }) => {

    const handleChange = (e) => {
        setValue(e.target.value);
    }

    const [showPassword,setShowPassword] = useState(false);

  return (
    <div className="mt-[4%] h-[70px] flex bg-[#2F2F2F] rounded-[16px] px-4 py-2 border-[1px] border-[#747474]">
      <input
        placeholder={placeholder}
        type={showPassword ? "text" : "password"}
        onChange={handleChange}
        value={value}
        className="bg-[#2F2F2F] text-white  w-[350px] focus:border-none focus:outline-none pl-[16px] pr-[8px]"
      ></input>
      <div 
        onClick={()=>setShowPassword(!showPassword)}
      className="h-full w-[70px] cursor-pointer flex justify-center items-center">
        <PasswordToggleIcon/>
      </div>
    </div>
  );
};

export default PasswordTextField;
