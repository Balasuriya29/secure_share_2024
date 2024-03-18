import QueryString from "qs";
import constants from "../constants";
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
          totalChunks: data.totalChunks,
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



const units = ["B", "KB", "MB", "GB"];

export const bytesConverter = (x) => {
  let l = 0,
    n = parseInt(x, 10) || 0;

  while (n >= 1024 && ++l) {
    n = n / 1024;
  }

  return n.toFixed(n < 10 && l > 0 ? 1 : 0) + " " + units[l];
};

export const getShortenedFileName = (name, endIndex) =>
  name.length > endIndex ? `${name.substring(0, endIndex)}...` : name;

export const getFileType = (type) =>
  type.substring(type.indexOf("/") + 1).toUpperCase();
