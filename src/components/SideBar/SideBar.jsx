import SidePanelTile from "./SidePanelTile";
import HomeIcon from "../../assets/HomeIcon";
import FavouriteIcon from "../../assets/FavouriteIcon";
import TrashIcon from "../../assets/TrashIcon";
import RecentIcon from "../../assets/RecentIcon";
import SettingsIcon from "../../assets/SettingsIcon";

const SideBar = () => {
  return (
    <div className="w-[18%] p-[2%] bg-[#F4F5F6]">
      <div className="font-bold text-xl text-center">Secure Share</div>
      <div className="h-[100px] px-[20px] mt-[24px] rounded-[12px] bg-black text-white text-center flex items-center">
        Your Files Now More Secured
      </div>
      <div className="mt-4 flex flex-col gap-2">
        <SidePanelTile icon={HomeIcon} title={"Home"} routeURL={"/"} />
        <SidePanelTile
          icon={RecentIcon}
          title={"Shared"}
          routeURL={"/shared"}
        />
        {/* <SidePanelTile icon={FavouriteIcon} title={"Favourites"} /> */}
        {/* <SidePanelTile icon={TrashIcon} title={"Trash"} /> */}
        <SidePanelTile
          icon={SettingsIcon}
          title={"Settings"}
          routeURL={"/settings"}
        />
      </div>
    </div>
  );
};

export default SideBar;
