import { useEffect, useState } from "react";
import RightArrowIcon from "../../assets/RightArrowIcon";
import PasswordTextField from "../TextFields/PasswordTextField";
import { checkPassword, getCurrentUserDetails } from "../../utils/helper";
import { useNavigate } from "react-router-dom";

const CheckPassword = () => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const user = getCurrentUserDetails();
    if (!user) {
      return;
    }
    setUsername(user.username);
    setLoading(false);
  }, []);

  const handleCheckPassword = async () => {
    const response = await checkPassword(username, password);
    if (!response.success) {
      console.log(response);
      return;
    }
    navigate("/home");
    return;
  };
  return (
    <>
      <div className="mt-[20%] font-[500] text-white text-[18px]">
        Welcome Back! Now, enter your password to secure your account.
      </div>
      {!loading && (
        <div>
          <PasswordTextField
            placeholder={"Password"}
            value={password}
            setValue={setPassword}
          />
          <div
            onClick={handleCheckPassword}
            className="w-[450px] cursor-pointer rounded-[12px] h-[60px] mt-[5%] bg-white flex justify-center items-center"
          >
            <RightArrowIcon />
          </div>
        </div>
      )}
    </>
  );
};

export default CheckPassword;
