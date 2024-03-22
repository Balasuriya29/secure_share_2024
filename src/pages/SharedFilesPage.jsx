import { useEffect } from "react";
import SideBar from "../components/SideBar/SideBar";
import { getSharedFiles, getCurrentUserDetails } from "../utils/helper";
import { useNavigate } from "react-router-dom";

const SharedFilesPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      //Get user shared file
      console.log("Get user shared files");
      const user = JSON.parse(getCurrentUserDetails());
      if (!user) {
        console.log("Cookie not found");
        navigate("/");
        return;
      }
      console.log("------user------", user);
      const sharedFilesResult = await getSharedFiles(user["userId"]);
      if (sharedFilesResult.success) {
        console.log(sharedFilesResult);
      }
    })();
  }, []);
  return (
    <div className="h-[100vh] w-[100vw] flex">
      <SideBar />
      <div className="w-[85%] py-[1%] px-[3%] bg-white"></div>
    </div>
  );
};

export default SharedFilesPage;
