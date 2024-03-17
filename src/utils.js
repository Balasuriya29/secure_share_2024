import QueryString from "qs";
import constants from "./constants";
import Cookies from "js-cookie";
import axios from "axios";

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
    if(!userData)
        return null;
    return userData;

}


export const getShareLink = async (data) => {
    try{
        const getShareLinkResult = await axios.post(`${constants.BACKEND_URL}${constants.GET_SHARE_LINK_ENDPOINT}`,{
            fileId : data.fileId,
            userId : data.userId,
            shareTypes : data.shareTypes,
            shareAttributes : data.shareAttributes,
        });
        console.log('----getShareLinkResult-----');
        console.log(getShareLinkResult);
    }
    catch(e){
        console.log('------Error while getting share link-----');
        console.log(e.message());
        return ({success:false,message:e.message()})
    }
}


export const getSharedFiles = async (userId) => {
    try{
        const sharedFilesResult = await axios.post(`${constants.BACKEND_URL}${constants.GET_SHARED_FILES_ENDPOINT}`,{userId});
        const data = sharedFilesResult.data;
        if(!data.success){
            return ({success:false,message:data.message});
        }
        return ({success:true,data});
    }
    catch{
        console.log('------Error while getting shared files-----');
        console.log(e.message());
        return ({success:false,message:e.message()})
    }
}


