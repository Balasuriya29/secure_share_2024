import { Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import RecentIcon from "../../assets/RecentIcon";
import FavouriteIcon from "../../assets/FavouriteIcon";
import ShareIcon from "../../assets/ShareIcon";
import TrashIcon from "../../assets/TrashIcon";

const MenuOptions = ({anchorEl,setAnchorEl,menuItems,handleAction}) => {
    const open = Boolean(anchorEl);
    const handleClose = (id) => {
        handleAction(id);
        setAnchorEl(null);
    }

    return (
        <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                sx={{
                    "&.MuiPaper-root":{
                        backgroundColor:"green"
                    }
                }}
                MenuListProps={{
                'aria-labelledby': 'basic-button',
                }}
            >
            {
                menuItems.map((menuItem)=>{
                    return (
                    <MenuItem 
                    onClick={()=>handleClose(menuItem.id)}>
                        <div className="flex items-center gap-3">
                            {menuItem.icon({width:"15",height:"15"})}
                            {menuItem.name}
                        </div>
                    </MenuItem>
                    )
                })
            }
            </Menu>
    )
}

export default MenuOptions;