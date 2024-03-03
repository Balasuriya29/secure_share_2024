import QueryString from "qs";
import constants from "./constants";
import Cookies from "js-cookie";

export const getGoogleOAuthURL = () => {
    const BASE_URL = "https://accounts.google.com/o/oauth2/v2/auth";
    const queryParams = {
        client_id : constants.GOOGLE_CLIENT_ID,
        redirect_uri : constants.GOOGLE_REDIRECT_URL,
        response_type : 'code',
    }
    const scopes = ['profile', 'email', 'openid'];
    return (`${BASE_URL}?${QueryString.stringify(queryParams)}&scope=${scopes.join (' ')}`);
}


export const getUserFromCookie = () => {
    const userData = Cookies.get('userdata'); 
    console.log('-------User data from cookie--------');
    console.log(userData);
    return userData;

}
