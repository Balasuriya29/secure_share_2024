import { useState } from "react";
import constants from "../../constants";

const IPControlDetails = ({ noOfIP, setNoOfIP }) => {
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (value.length !== 0 && !constants.noOfIPPattern.test(value)) {
      setError("Invalid value");
    } else {
      setError("");
    }
    setNoOfIP(value);
  };

  return (
    <div
      className={`flex border-[1px] border-[#D0D0D0] rounded-[12px] px-2 ${
        error !== "" ? "border-red-400" : ""
      } `}
    >
      <input
        className={`
              focus:border-none focus:outline-none active:border-none
              w-[75%] h-[60px]
              `}
        type="text"
        placeholder="01"
        value={noOfIP}
        onChange={handleInputChange}
      />
      <div className="self-center text-[#7D7D7D]">users</div>
    </div>
  );
};

export default IPControlDetails;
