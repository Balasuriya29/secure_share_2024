import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { USER_SECERT } from "../App";
import { decode, hashedValue } from "../utils/crypt";
import axios from "axios";
import constants from "../constants";
import SideBar from "../components/SideBar/SideBar";

const GetFile = () => {
  const { shareId } = useParams();

  const [fileId, setFileId] = useState(null);
  const [totalChunks, setTotalChunks] = useState(null);
  const [errorMessage, setErrorMessage] = useState();
  const [keyboardPressed, setKeyboardPressed] = useState(false);

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      e.preventDefault();
      console.log(e.key);
      setKeyboardPressed(true);
    });

    document.addEventListener("keyup", (e) => {
      e.preventDefault();
      console.log(e.key);
      setKeyboardPressed(false);
    });

    const socket = io("http://localhost:3001");
    socket.emit("getFile", {
      shareId: shareId,
    });

    socket.on("getLocationDetails", (data) => {
      if ("geolocation" in navigator) {
        navigator.geolocation.watchPosition(
          async function (position) {
            console.log(position);
            socket.emit("getFile", {
              shareId: shareId,
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
            console.log({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          function (e) {
            console.log(e);
            alert(e.message);
          }
        );
      } else {
        alert("Location permission needed!!!");
        return;
      }
    });

    socket.on("fileStatus", (data) => {
      console.log("----Get File------");
      console.log(data);
      setFileId(data["fileId"]);
      setTotalChunks(data["totalChunks"]);
      setShowFile(data["showFile"]);
      setErrorMessage(data["message"]);
    });
  }, []);

  const [showFile, setShowFile] = useState(false);
  let [downloadCurrentChunk, setDownloadCurrentChunk] = useState(null);
  let [bufferedArray, setBufferedArray] = useState([]);

  let downloadFile = () => {
    console.log("-------Downloading file--------");
    let chunkId = `${downloadCurrentChunk}${decode(fileId, USER_SECERT)}`;
    let url = `${constants.BACKEND_URL}/api/files/chunk/download/${hashedValue(
      chunkId
    )}`;

    axios
      .get(url)
      .then((res) => {
        console.log(`Then Response ${res.status}`);
        if (res.status == 200) {
          let arr = [
            ...bufferedArray,
            decode(res.data.chunk.data, USER_SECERT),
          ];

          setBufferedArray(arr);
          setDownloadCurrentChunk((prev) => prev + 1);
        }
      })
      .catch((err) => {
        console.log("Catch Response");
        console.log(err);
      });
  };

  useEffect(() => {
    // if (downloadCurrentChunk == 0) console.log(`Starting download for ${name}`);
    if (downloadCurrentChunk != null && downloadCurrentChunk < totalChunks) {
      downloadFile();
    }
  }, [downloadCurrentChunk]);

  useEffect(() => {
    if (fileId) {
      setDownloadCurrentChunk(0);
    }
  }, [fileId]);

  return (
    <div className="w-[100vw] h-[100vh] flex">
      <SideBar />
      <div className="w-[85%] p-4 bg-white">
        <div className="w-full h-full bg-black rounded-[30px]">
          {!keyboardPressed && showFile ? (
            <img
              src={bufferedArray.join("")}
              className="w-full h-full rounded-[30px]"
            ></img>
          ) : (
            <div className="flex justify-center items-center h-full">
              <div className="text-white font-[500] text-2xl">
                {errorMessage}
              </div>
            </div>
          )}
        </div>
      </div>
      {/* <div>File</div>
        <div>{showFile}</div>
        {showFile && (
          <img src={bufferedArray.join("")} height={200} width={200}></img>
        )} */}
    </div>
  );
};

export default GetFile;
