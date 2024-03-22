import { TextField } from "@mui/material";
import LoginPageBG from "../assets/LoginPageBG.svg";
import RightArrowIcon from "../assets/RightArrowIcon";
import SecureShareTextField from "../components/TextFields/SecureShareTextField";
import GetUsername from "../components/LoginPageComponents/GetUsername";
import SetPassword from "../components/LoginPageComponents/SetPassword";
import ConfirmPassword from "../components/LoginPageComponents/ConfirmPassword";
import { useState } from "react";

const LoginPage = () => {

    const [loginState,setLoginState] = useState("login");

  return (
    <div
      className="h-[100vh] w-[100vw] bg-primary flex"
      style={{
        backgroundImage: `url(${LoginPageBG})`,
        backgroundRepeat: "no-repeat",
        backgroundPositionY: "center",
      }}
    >
      <div className="w-[50%] h-full m-auto flex flex-col items-center  py-[5%]">
        {
            (loginState === "login")
                ? <GetUsername nextState={setLoginState}/>
                : (loginState === "setPassword")
                    ? <SetPassword/>
                    : <ConfirmPassword/>
        }
      </div>
    </div>
  );
};

export default LoginPage;
