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


export const getCurrentUserDetails = () => {
  const userData = JSON.parse(localStorage.getItem("userDetails"));
  console.log('-------User data --------');
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
      console.log(getShareLinkResult.data);
      return getShareLinkResult.data;
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

export const login = async (username) => {
    try{
      const loginResponse = await axios.post(`${constants.BACKEND_URL}/api/auth/login`,{
          username
      });
      if(loginResponse.data.success){
        return (loginResponse.data);
      }
      else{
        return ({message:loginResponse.data.message});
      }
    }
    catch(e){
      console.log("--------Error while login------");
    }
}


export const savePassword = async (password) => {
  try{
    const response = await axios.post(`${constants.BACKEND_URL}/api/auth/savePassword`,{
        password
    },{
      headers:  {
        authorization : localStorage.getItem('access_token')
      }
    });
    if(response.data.success){
      return (response.data);
    }
    else{
      return ({message:response.data.message});
    }
  }
  catch(e){
    console.log("--------Error while login------");
  }
}

export const checkPassword = async (username,password) => {
  try{
    const response = await axios.post(`${constants.BACKEND_URL}/api/auth/checkPassword`,{
        username,
        password
    });
    if(response.data.success){
      return (response.data);
    }
    else{
      return ({message:response.data.message});
    }
  }
  catch(e){
    console.log("--------Error while checking password------");
  }
}


export const getTimeStamp = (expirationPattern) => {
    const value = expirationPattern.substring(0,expirationPattern.length-1);
    const metric = expirationPattern.charAt(expirationPattern.length-1);
    console.log("---value----",value);
    console.log("-----metric----",metric);
    const expirationTime = new Date();
    switch(metric){
      case "s":{
        expirationTime.setTime(new Date().getTime() + 1000 * value);
        break;
      }
      case "m":{
        expirationTime.setTime(new Date().getTime() + 1000 * 60 * value);
        break;
      }
      case "h":{
        expirationTime.setTime(new Date().getTime() + 1000 * 60 * 60 * value);
        break;
      }
      case "d":{
        expirationTime.setTime(new Date().getTime() + 1000 * 60 * 60 * 24 * value);
        break;
      }
    }
    return expirationTime.getTime();
}


export const getCurrentLocation = () => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function (position) {
      return ({
        success:true,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
  } 

  console.log("---else----");
  return ({success:false,message:"Location permission denied"})
}