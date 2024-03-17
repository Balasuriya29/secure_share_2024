import { useState } from "react";
import FileIcon from "../../assets/FileIcon";
import MenuListIcon from "../../assets/MenuListIcon";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuOptions from "../MenuOptions/MenuOptions";
import ShareModal from "../Modals/ShareModal";
import FavouriteIcon from "../../assets/FavouriteIcon";
import ShareIcon from "../../assets/ShareIcon";
import TrashIcon from "../../assets/TrashIcon";
import OptionsIcon from "../../assets/OptionsIcon";

const FolderCard = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [open,setIsOpen] = useState(false);

    const menuItems = [
        {
            id:1,
            name:"Add to favourites",
            icon: FavouriteIcon
        },
        {
            id:2,
            name:"Share",
            icon: ShareIcon
        },
        {
            id:3,
            name:"Move to trash",
            icon: TrashIcon
        }
    ]

    const handleAction = (id) => {
        switch(id){
            case 2:{
                setIsOpen(true);
                break;
            }
        }
    }

    return (
        <div className="
            max-w-[250px] w-[200px] h-[64px] bg-white 
            mt-[2%]
            flex justify-between items-center 
            p-[12px] rounded-[16px] border-[1px] border-[#B0B0B0]
            font-[500]
            ">
            <div className="flex-6 flex gap-4 items-center">
                <div className="
                    flex justify-center items-center w-[40px] h-[40px] 
                    p-2 rounded-[6px] border-[1px] border-[#B0B0B0]
                    ">
                    <FileIcon height={"25"} width={"25"}/>
                </div>
                <div>Foldername</div>
                <div className="flex-2 cursor-pointer" onClick={(e)=>setAnchorEl(e.currentTarget)}>
                    <OptionsIcon/>
                </div>
            </div>
            <MenuOptions anchorEl={anchorEl} setAnchorEl={setAnchorEl} menuItems={menuItems} handleAction={handleAction}/>
            <ShareModal open={open} handleClose={()=>{
                setIsOpen(false);
            }}/> 
        </div>
    )
}

export default FolderCard;