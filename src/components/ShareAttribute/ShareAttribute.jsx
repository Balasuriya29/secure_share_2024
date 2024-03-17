import SecureShareSwitch from "../Switch/Switch";

const ShareAttribute = ({title,isChecked,setIsChecked,children}) => {
  return (
    <div
      className={`px-4 py-2 rounded-[12px] ${
        isChecked ? "bg-lightViolet" : "bg-none"
      }`}
    >
      <div className="flex items-center justify-between">
        <div>{title}</div>
        <SecureShareSwitch
          checked={isChecked}
          setChecked={setIsChecked}
        />
      </div>
      {isChecked && children}
    </div>
  );
};

export default ShareAttribute;
