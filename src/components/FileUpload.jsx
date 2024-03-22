import axios from "axios";
import FileUploadIcon from "../assets/FileUpload";
import { useEffect, useState } from "react";

import { encode, hashedValue } from "../utils/crypt";
import { USER_SECERT } from "../App";
import constants from "../constants";

const KB = 1024;
const CHUNK_SIZE = 500 * KB;

const FileUpload = ({ setFiles, userId }) => {
  // let [selectedFile, setSelectedFile] = useState(null)
  let [fileId, setFileId] = useState("");
  let [fileArray, setFileArray] = useState([]);

  let [currentChunkIndex, setCurrentChunkIndex] = useState(null);
  let [totalChunks, setTotalChunks] = useState(null);

  let readFile = (file) => {
    const reader = new FileReader();
    if (!file) return;

    reader.onload = (e) => {
      storeFile(e, file);
    };
    reader.readAsDataURL(file);
  };

  let storeFile = (readerEvent, file) => {
    let newFileArray = readerEvent.target.result.match(
      new RegExp(".{1," + CHUNK_SIZE + "}", "g")
    );

    console.log("----newFileArray-----");
    console.log(newFileArray);

    setFileArray(newFileArray);
    setTotalChunks(newFileArray.length);

    uploadFile(file,newFileArray.length);
  };

  let startChunkUpload = () => {
    let data = encode(fileArray[currentChunkIndex], USER_SECERT);

    const params = new URLSearchParams();
    params.set("currentChunkIndex", currentChunkIndex);
    params.set("fileId", hashedValue(`${currentChunkIndex}${fileId}`));

    const headers = {
      "Content-Type": "application/octet-stream",
    };

    const url = `${
      constants.BACKEND_URL
    }/api/files/chunk/upload?${params.toString()}`;

    axios
      .post(url, data, { headers })
      .then((res) => {
        console.log(`Then Response -> ${res.status}`);
        if (res.status == 200) {
          console.log(`chunk ${currentChunkIndex} added ${res.data.message}`);

          setCurrentChunkIndex(++currentChunkIndex);
        }
      })
      .catch((err) => {
        console.log("Catch Response -> ");
        console.log(err);
      });
  };

  let uploadFile = (selectedFile,totalChunks) => {
    if (!selectedFile) {
      console.log("Select A File❗");
      return;
    }

    let fileId = hashedValue(Date.now().toString() + userId);
    setFileId(fileId);

    const data = {
      name: selectedFile.name,
      size: selectedFile.size,
      type: selectedFile.type,
      totalChunks: totalChunks,
      created_at: Date.now(),
      fileId: encode(fileId, USER_SECERT),
      userId: userId,
    };

    const url = `${constants.BACKEND_URL}/api/files/file/upload`;

    axios
      .post(url, data)
      .then((res) => {
        console.log(`Then Response for file upload ${res.status}`);
        if (res.status == 200) {
          console.log("-------setting files------");
          console.log("------data---------");
          console.log(data);
          setFiles([data]);
          setCurrentChunkIndex(0);
        }
      })
      .catch((err) => {
        console.log(`Catch Response for file upload`);
        console.log(err);
      });
  };

  // Effect to send chunked data
  useEffect(() => {
    if (currentChunkIndex != null && currentChunkIndex < totalChunks) {
      startChunkUpload();
    }
  }, [currentChunkIndex]);

  const openFilePicker = () => {
    document.getElementById("filePickerElement").click();
  };

  const handleFileChange = (e) => {
    let lsFiles = e.target.files;

    for (const key in lsFiles) {
      if (Object.hasOwnProperty.call(lsFiles, key)) {
        const file = lsFiles[key];

        console.log(file);
        readFile(file);
      }
    }

    // const file = e.target.files[0]

    // readFile(file)
  };

  const handleDrop = (e) => {
    handleFileChange(e);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className="
        flex flex-col justify-center items-center
        h-[150px] bg-lightGray mt-[2%] 
        rounded-[12px]
        border-dashed border-[#6473FF] border-[2px]"
    >
      <div className="p-2 bg-[#D4E4FB] w-fit rounded-xl">
        <FileUploadIcon />
      </div>
      <div className="font-[500] text-lg">
        <input
          multiple="multiple"
          type="file"
          onChange={handleFileChange}
          accept=".pdf,.jpg,.jpeg,.png"
          className="hidden"
          id="filePickerElement"
        ></input>
        Drag and drop files, or{" "}
        <span
          className="text-[#4253ED] cursor-pointer"
          onClick={openFilePicker}
        >
          Browse
        </span>
      </div>
    </div>
  );
};

export default FileUpload;
