import React, { useEffect, useState } from "react";
import { BASE_URL, USER_SECERT } from "../App";
import { decode, hashedValue } from "../utils/crypt";
import axios from "axios";


export default function PreviewFile({file}) {
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

      useEffect(() => {
        if(downloadCurrentChunk == 0) console.log(`Starting download for ${name}`);
        if(downloadCurrentChunk != null && downloadCurrentChunk<totalChunks) {
          downloadFile()
        }
      }, [downloadCurrentChunk])

    return (
        <div style={{
            flexDirection: 'row'
        }}>
            {
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
            
            <p>{(name.length > 10) ? `${name.substring(0, 10)}...` : name } - {((size/1024)/1024).toFixed(2)}MB</p>
            <button onClick={() => {
              if(bufferedArray.length == 0) {
                setDownloadCurrentChunk(0)
              }
            }}>Download File</button>
        </div>
    )   
}