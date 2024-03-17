import DropdownIcon from "../../assets/DropdownIcon";
import GoogleIcon from "../../assets/GoogleIcon";
import NotificationIcon from "../../assets/NotificationIcon";
import { getGoogleOAuthURL } from "../../utils/helper";
import SearchBar from "../SearchBar";

const NavBar = ({userDetails}) => {

    return (
        <div className='flex items-center'>
            <SearchBar/>
            <div className='flex-grow'></div>
            <div className='flex gap-5'>
            <NotificationIcon/>
            <div className='flex gap-2 items-center w-fit max-w-[250px] bg-black text-white rounded-[60px] px-4'>
                {(userDetails)
                ?
                userDetails['name']
                :
                <a href={getGoogleOAuthURL()}><GoogleIcon/></a>}

                <DropdownIcon/>
            </div>
            </div>
        </div>
    )
}

export default NavBar;