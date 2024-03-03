import GoogleIcon from "../assets/GoogleIcon"
import { getGoogleOAuthURL } from "../utils"

const GoogleSignInContainer = ({isUserLoggedIn,userDetails}) => {
    return (
        <div 
            className='w-[40px] h-[40px] flex justify-end items-center'
        >
            {
            (isUserLoggedIn)
            ?
            <img src={userDetails['picture']} ></img>
            :
            <a href={getGoogleOAuthURL()}><GoogleIcon/></a>

            }
        </div>
    )
}

export default GoogleSignInContainer;