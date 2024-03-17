import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { USER_SECERT, BASE_URL } from "../App";
import { decode, hashedValue } from "../utils/crypt";
import axios from "axios";

const GetFile = () => {
  const { shareId } = useParams();


  const [fileId,setFileId] = useState(null);
  const [totalChunks,setTotalChunks] = useState(null);


  useEffect(() => {
    const socket = io("http://localhost:3001");
    socket.emit("getFile", {
      shareId: shareId,
    });
    socket.on("fileStatus", (data) => {
      console.log("----Get File------");
      console.log(data);
      setFileId(data["fileId"]);
      setTotalChunks(data["totalChunks"]);
      setShowFile(data["showFile"]);
    });
  }, []);
  const [showFile, setShowFile] = useState(false);
  let [downloadCurrentChunk, setDownloadCurrentChunk] = useState(null);
  let [bufferedArray, setBufferedArray] = useState([]);

  let downloadFile = () => {
    console.log("-------Downloading file--------");
    let chunkId = `${downloadCurrentChunk}${decode(fileId, USER_SECERT)}`;
    let url = `${BASE_URL}files/chunk/download/${hashedValue(chunkId)}`;

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

  useEffect(()=>{
    if(fileId){
        setDownloadCurrentChunk(0);
    }
  },[fileId])

  return (
    <div className="w-[100vw] h-[100vh]">
      <div className="flex justify-center flex-col">
        <div>File</div>
        <div>{showFile}</div>
        {showFile && (
          <img
            src={bufferedArray.join("")}
            height={200}
            width={200}
          ></img>
        )}
      </div>
    </div>
  );
};

export default GetFile;
