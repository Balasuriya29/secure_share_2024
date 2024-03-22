import { useState } from "react";
import SecureShareTextField from "../TextFields/SecureShareTextField";
import { login } from "../../utils/helper";

const GetUsername = ({ nextState }) => {
  const [username, setUsername] = useState("");

  const handleSubmit = async () => {
    if (username.length === 0) {
      return;
    }
    // Backend call
    const response = await login(username);
    if (response.success) {
      console.log(response);
      localStorage.setItem("access_token", response.access_token);
      localStorage.setItem("userDetails", response.userDetails);
      nextState(response.isNewUser ? "setPassword" : "confirmPassword");
    }
  };

  return (
    <>
      <div className="text-[60px] font-[600] text-[#A3ACFF]">Secure Share</div>
      <div className="rounded-[60px] mt-[5%] p-4 text-[18px] text-white font-[500] border-[#828282] border-[1px]">
        New users: Select a unique username to begin your cloud account.
      </div>
      <div className="mt-[10%]">
        <SecureShareTextField
          value={username}
          setValue={setUsername}
          onSubmit={handleSubmit}
        />
      </div>
    </>
  );
};

export default GetUsername;
