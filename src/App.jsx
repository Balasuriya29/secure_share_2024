import { useEffect, useState } from "react";
import "./App.css";

import Cookies from "js-cookie";
import FolderCard from "./components/Cards/FolderCard";
import FileCard from "./components/Cards/FileCard";
import SideBar from "./components/SideBar/SideBar";
import HomePageHeaderWrapper from "./components/TextWrappers/HomePageHeaderWrapper";
import FileUploadIcon from "./assets/FileUpload";
import ShareIconV2 from "./assets/ShareIconV2";
import ViewAllContainer from "./components/TextWrappers/ViewAllContainer";
import NavBar from "./components/Navbar/NavBar";
import { getUserFromCookie } from "./utils/helper";
import FileUpload from "./components/FileUpload";
import Files from "./pages/Files";

export const BASE_URL = "http://localhost:3000/api/";
export const USER_SECERT = "mydekumeansyoucandoit@2911";
export const USER_ID = "12345";

function App() {
  const [files, setFiles] = useState([]);

  let handleSetFiles = (newFiles) => {
    console.log("setting new files");

    let finalFiles = [...files, ...newFiles];
    finalFiles.sort((a, b) => {
      let d1 = parseInt(a.created_at);
      let d2 = parseInt(b.created_at);

      if (d1 < d2) return 1;
      if (d1 > d2) return -1;
    });

    setFiles(finalFiles);
  };

  const [userDetails, setUserDetails] = useState();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    const userDataFromCookie = getUserFromCookie();
    console.log(userDataFromCookie);
    if (userDataFromCookie) {
      setUserDetails(JSON.parse(userDataFromCookie));
      console.log(JSON.parse(userDataFromCookie));
      setIsUserLoggedIn(true);
    }
  }, []);

  return (
    <>
      <div className="h-[100vh] w-[100vw] flex">
        <SideBar />
        <div className="w-[85%] py-[1%] px-[3%] bg-white">
          <NavBar userDetails={userDetails} />
          <div className="w-full flex-grow flex mt-[2%]">
            <div className="w-[70%] pb-6 pr-[4%]">
              <div>
                      <HomePageHeaderWrapper title={"Upload"} showViewAll={false}/> 
                      <FileUpload setFiles={handleSetFiles}/>
                    </div>
                    <div>

                      <div className='mt-[4%]'>
                        <div className='flex items-center justify-between'>
                            <div className='font-[600] text-xl'>Files</div>
                        </div>    
                      </div>
                      <Files files={files} setFiles={handleSetFiles}/>
                    </div>
            </div>
            <div className="w-[30%] pl-[4%] h-[80vh]">
              <HomePageHeaderWrapper
                title={"File Preview"}
                showViewAll={false}
              />
              <div className="w-full h-[160px] mt-[4%] bg-violet"></div>
              <div>
                <div className="font-[500] text-[20px] mt-[4%]">File Name</div>
                <div className="text-[#939393] font-[500] text-[18px]">
                  10.05 MB
                </div>
              </div>
              <div className="w-[130px] h-[50px] mt-[4%] flex justify-center items-center gap-2 rounded-[8px] p-4 bg-violet">
                <ShareIconV2 height={24} width={24} />
                <div className="text-[#4253ED] font-[500] text-[16px]">
                  Share
                </div>
              </div>
              <div className="flex gap-2 mt-[4%] justify-between items-center">
                <div className="flex flex-col">
                  <div className="font-[500] text-[20px] mt-[4%]">
                    Shared History
                  </div>
                  <div className="flex gap-2 items-center">
                    <div className="font-[500] text-[14px]">Jan 16, 2024</div>
                    <div className="text-[#5F5F5F]">23:17</div>
                  </div>
                </div>
                <ViewAllContainer />
              </div>
              <div className="h-fit w-full mt-[4%] bg-lightGray rounded-[12px] p-6 flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <div>Geolocation</div>
                  <div className="h-[40px] w-[60px] bg-white rounded-[6px] font-[500] flex justify-center items-center">
                    20m
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div>Geolocation</div>
                  <div className="h-[40px] w-[60px] bg-white rounded-[6px] font-[500] flex justify-center items-center">
                    20m
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div>Geolocation</div>
                  <div className="h-[40px] w-[60px] bg-white rounded-[6px] font-[500] flex justify-center items-center">
                    20m
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
