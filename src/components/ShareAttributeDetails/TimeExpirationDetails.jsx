import { useState } from "react";
import constants from "../../constants";

const TimeExpirationDetails = ({ expirationTime, setExpirationTime }) => {
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (!constants.expirationPattern.test(value)) {
      setError("Invalid expiration time");
    } else {
      setError("");
    }
    setExpirationTime(value);
  };

  return (
    <div
      className={`flex border-[1px] border-[#D0D0D0] rounded-[12px] px-2 ${
        error !== "" ? "border-red-400" : ""
      }`}
    >
      <input
        className={`
          focus:border-none focus:outline-none active:border-none
          w-[75%] h-[60px]
          `}
        type="text"
        placeholder="2s, 2d, 2m"
        value={expirationTime}
        onChange={handleInputChange}
      />{" "}
    </div>
  );
};

export default TimeExpirationDetails;
