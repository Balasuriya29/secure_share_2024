const NotifyMeDetails = ({
  isViewsChecked,
  setIsViewsChecked,
  isDownloadsChecked,
  setIsDownloadsChecked,
  isNotifyMeChecked,
}) => {
  const NotifyMeOption = ({ optionName, isSelected, setSelected }) => {
    return (
      <div
        className={`
                w-fit p-2 border-[1px] rounded-[10px] cursor-pointer ${
                  isSelected ? "bg-black text-white" : "bg-white text-black"
                }`}
        onClick={() => {
          setSelected(!isSelected);
        }}
      >
        {optionName}
      </div>
    );
  };

  return (
    <div className="flex justify-evenly">
      <NotifyMeOption
        optionName={"Views"}
        isSelected={isNotifyMeChecked && isViewsChecked}
        setSelected={setIsViewsChecked}
      />
      <NotifyMeOption
        optionName={"Downloads"}
        isSelected={isNotifyMeChecked && isDownloadsChecked}
        setSelected={setIsDownloadsChecked}
      />
    </div>
  );
};

export default NotifyMeDetails;
