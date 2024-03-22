import { useState } from "react";
import constants from "../../constants";

const GeoLocationDetails = ({ radius, setRadius }) => {
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (value.length !== 0 && !constants.noOfIPPattern.test(value)) {
      setError("Invalid value");
    } else {
      setError("");
    }
    setRadius(value);
  };

  return (
    <div
      className={`flex border-[1px] border-[#D0D0D0] rounded-[12px] px-2 ${
        error !== "" ? "border-red-400" : ""
      } `}
    >
      <div>
        <input
          className="
            focus:border-none focus:outline-none active:border-none
             w-[75%] h-[60px]  rounded-tl-[12px]  rounded-bl-[12px]"
          type="text"
          value={radius}
          placeholder="Radius (m)"
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};

export default GeoLocationDetails;
