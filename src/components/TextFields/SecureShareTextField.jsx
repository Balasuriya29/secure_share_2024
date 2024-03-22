import RightArrowIcon from "../../assets/RightArrowIcon";

const SecureShareTextField = ({ value, setValue, onSubmit }) => {
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className="h-[70px] flex bg-[#2F2F2F] rounded-[16px] px-4 py-2 border-[1px] border-[#747474]">
      <input
        onChange={handleChange}
        placeholder="Username"
        value={value}
        className="bg-[#2F2F2F] text-white  w-[350px] focus:border-none focus:outline-none pl-[16px] pr-[8px]"
      ></input>
      <div
        className=" h-full w-[70px] cursor-pointer flex justify-center items-center rounded-[10px] bg-white"
        onClick={onSubmit}
      >
        <RightArrowIcon />
      </div>
    </div>
  );
};

export default SecureShareTextField;
