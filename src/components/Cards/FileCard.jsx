import { useEffect, useMemo, useState } from "react";
import FileIcon from "../../assets/FileIcon";
import MenuListIcon from "../../assets/MenuListIcon";
import OptionsIcon from "../../assets/OptionsIcon";
import axios from "axios";
import { bytesConverter } from "../../utils/helper";

const FileCard = ({file}) => {
    const {
        fileId,
        name,
        size,
        type,
        created_at,
        totalChunks,
        userId,
    } = file

    let [downloadCurrentChunk, setDownloadCurrentChunk] = useState(null)
    let [bufferedArray, setBufferedArray] = useState([])

    let downloadFile = () => {
        let chunkId = `${downloadCurrentChunk}${decode(fileId, USER_SECERT)}`
        let url = `${BASE_URL}files/chunk/download/${hashedValue(chunkId)}`
        
        axios.get(url)
          .then((res) => {
            console.log(`Then Response ${res.status}`);
            if(res.status == 200) {
              let arr = [...bufferedArray, decode(res.data.chunk.data, USER_SECERT)]

              setBufferedArray(arr)
              setDownloadCurrentChunk((prev) => prev+1)
            }
          })
          .catch((err) => {
            console.log("Catch Response");
            console.log(err);
          })
      }

      let createdAtString = useMemo(() => {
        return new Date(created_at).toDateString()
      }, [created_at])

      let fileSize = useMemo(() => {
        return bytesConverter(size)
      }, [size])

      useEffect(() => {
        if(downloadCurrentChunk == 0) console.log(`Starting download for ${name}`);
        if(downloadCurrentChunk != null && downloadCurrentChunk<totalChunks) {
          downloadFile()
        }
      }, [downloadCurrentChunk])


    return (
        <div className="
            w-full bg-white 
            mt-[2%]
            flex items-center justify-between
            p-4 rounded-[16px]
            border-[1px] border-[#E0E0E0]
            font-[500]
        ">
            <div className="flex-2">
                <div className="
                flex justify-center items-center 
                w-[35px] h-[35px] 
                p-2 rounded-[6px] border-[1px] border-[#B0B0B0]">
                    <FileIcon/>
                </div>
            </div>
            <div className="flex-2">
                {(name.length > 10) ? `${name.substring(0, 10)}...` : name }
            </div>
            <div className="flex-2">
                {type.substring(type.indexOf('/')+1)}
            </div>
            <div className="flex-2">
                {createdAtString}
            </div>
            {/* <div className="flex-2">
                Feb 14,2024
            </div> */}
            <div className="flex-2">
                {fileSize}
            </div>
            <div className="flex-2">
                <OptionsIcon/>
            </div>
        </div>
    )
}

export default FileCard;


/**
 * 
 * 
 * {
              bufferedArray.length === totalChunks && 
                (
                  type.includes('pdf') 
                    ? <object   
                        data={bufferedArray.join("")+"#toolbar=0"}
                        width="100%"
                        height={400}
                        type={type}
                  
                      />
                    :<img src={bufferedArray.join("")} width={700} height={400}/> 
                )
            } 
 */