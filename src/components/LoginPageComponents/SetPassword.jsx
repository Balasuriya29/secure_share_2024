import { useState } from "react";
import RightArrowIcon from "../../assets/RightArrowIcon";
import PasswordTextField from "../TextFields/PasswordTextField";
import { savePassword } from "../../utils/helper";
import { useNavigate } from "react-router-dom";

const SetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [encryptionKey, setEncryptionKey] = useState("");
  const navigate = useNavigate();

  const submitPassword = async () => {
    if (password.length === 0 || confirmPassword.length === 0) {
      return;
    }
    if (password !== confirmPassword) {
      return;
    }
    if (!encryptionKey) {
      return;
    }

    const response = await savePassword(password);

    if (response.success) {
      navigate("/home");
      return;
    }

    console.log("---------error---------");
  };

  return (
    <>
      <div className="mt-[15%] font-[500] text-white text-[18px]">
        Great username! Now, enter your password to secure your account.
      </div>
      <PasswordTextField
        value={password}
        setValue={setPassword}
        placeholder={"Password"}
      />
      <PasswordTextField
        value={confirmPassword}
        setValue={setConfirmPassword}
        placeholder={"Set Password"}
      />
      <PasswordTextField
        value={encryptionKey}
        setValue={setEncryptionKey}
        placeholder={"Set Key For Encryting files"}
      />
      <div
        onClick={submitPassword}
        className="w-[450px] cursor-pointer rounded-[12px] h-[60px] mt-[5%] bg-white flex justify-center items-center"
      >
        <RightArrowIcon />
      </div>
    </>
  );
};

export default SetPassword;
