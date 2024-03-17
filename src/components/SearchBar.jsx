import { TextField } from "@mui/material";
import FilterIcon from "../assets/FilterIcon";

const SearchBar = () => {
  return (
    <div className="flex items-center gap-4 w-[450px] bg-lightGray rounded-lg p-2 px-4">
      <TextField 
        
        className="w-[500px] shadow-[0px_8px_40px_0px_rgba(0,0,0,0.1)] border-none"></TextField>
      {/* <input
        className="
                w-[500px] shadow-[0px_8px_40px_0px_rgba(0,0,0,0.1)] border-none
                bg-lightGray 
                active:border-none
                px-[10px]
                focus:outline-none
                focus:border-none"
        placeholder="Search"
      ></input> */}
      <div className="w-fit h-[50px] flex items-center rounded-md cursor-pointer">
        <FilterIcon width={"20"} height={"20"} />
      </div>
    </div>
  );
};

export default SearchBar;
