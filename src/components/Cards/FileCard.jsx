import { useEffect, useMemo, useState } from "react";
import FileIcon from "../../assets/FileIcon";
import MenuListIcon from "../../assets/MenuListIcon";
import OptionsIcon from "../../assets/OptionsIcon";
import axios from "axios";
import { bytesConverter } from "../../utils/helper";
import FavouriteIcon from "../../assets/FavouriteIcon";
import ShareIcon from "../../assets/ShareIcon";
import TrashIcon from "../../assets/TrashIcon";
import MenuOptions from "../MenuOptions/MenuOptions";
import ShareModal from "../Modals/ShareModal";

const FileCard = ({file}) => {
    const {
        _id,
        fileId,
        name,
        size,
        type,
        created_at,
        totalChunks,
        userId,
    } = file

    

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

      let createdAtString = useMemo(() => {
        return new Date(created_at).toDateString()
      }, [created_at])

      let fileSize = useMemo(() => {
        return bytesConverter(size)
      }, [size])

     


    return (
        <div className="
            w-full bg-white 
            mt-[2%]
            flex items-center justify-between
            p-4 rounded-[16px]
            border-[1px] border-[#E0E0E0]
            font-[500]
        ">
            <div className="flex-2">
                <div className="
                flex justify-center items-center 
                w-[35px] h-[35px] 
                p-2 rounded-[6px] border-[1px] border-[#B0B0B0]">
                    <FileIcon/>
                </div>
            </div>
            <div className="flex-2">
                {(name.length > 10) ? `${name.substring(0, 10)}...` : name }
            </div>
            <div className="flex-2">
                {type.substring(type.indexOf('/')+1)}
            </div>
            <div className="flex-2">
                {createdAtString}
            </div>
            {/* <div className="flex-2">
                Feb 14,2024
            </div> */}
            <div className="flex-2">
                {fileSize}
            </div>
            <div className="flex-2 cursor-pointer" onClick={(e)=>setAnchorEl(e.currentTarget)}>
                <OptionsIcon/>
            </div>
            <MenuOptions anchorEl={anchorEl} setAnchorEl={setAnchorEl} menuItems={menuItems} handleAction={handleAction}/>
            <ShareModal fileId={fileId} totalChunks={totalChunks} open={open} handleClose={()=>{
                setIsOpen(false);
            }}/> 
        </div>
    )
}

export default FileCard;


/**
 * 
 * 
 * {
              bufferedArray.length === totalChunks && 
                (
                  type.includes('pdf') 
                    ? <object   
                        data={bufferedArray.join("")+"#toolbar=0"}
                        width="100%"
                        height={400}
                        type={type}
                  
                      />
                    :<img src={bufferedArray.join("")} width={700} height={400}/> 
                )
            } 
 */