import SelectedRoundIcon from "../../assets/SelectedRoundIcon";

const ShareAttribute = ({ title, isChecked, setIsChecked, children }) => {
  return (
    <div
      className={`w-[250px] rounded-[16px] border-[2px] border-${
        isChecked ? "black" : "bg-gray-300"
      } p-4`}
    >
      <div className="flex">
        <div className="flex flex-col">
          <div className="font-[500] text-[18px] text-black">{title}</div>
          <div className="text-[#757575] text-[14px]">What's {title} ?</div>
        </div>
        <div className="flex-grow"></div>
        <div
          className="cursor-pointer"
          onClick={() => setIsChecked(!isChecked)}
        >
          {isChecked ? (
            <SelectedRoundIcon />
          ) : (
            <div className="w-[32px] h-[32px] rounded-full border-[1px]"></div>
          )}
        </div>
      </div>
      <div className="my-[8%]">{children}</div>
    </div>
  );
};

export default ShareAttribute;
