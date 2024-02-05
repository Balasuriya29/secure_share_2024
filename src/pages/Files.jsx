import axios from "axios"
import { useEffect, useState } from "react"
import { BASE_URL, USER_ID, USER_SECERT } from "../App"
import { decode, hashedValue } from "../utils/crypt"

import PreviewFile from "../components/PreviewFile";


export default function Files({ files, setFiles }) {

    useEffect(() => {
      const url = `${BASE_URL}files/${USER_ID}`
        axios.get(url)
            .then((res) => {
                let newFiles = []

                res.data.data.map(file => {
                  let newFile = {
                    ...file, 
                    'fileId': decode(file.fileId, USER_SECERT) 
                  }
                  newFiles.push(newFile)
                })

                if(newFiles) setFiles([...newFiles])
                
            })
            .catch((err) => {
                console.log(err);
            })
    }, [files.length])

    return (
      <>
        <div style={{
          border: "red solid 2px",
          padding: "20px"
        }}>
          {
            !files.length 
              ? <p>No Files are there</p>

              : files.map(file => <PreviewFile key={file.fileId} file={file}/>)
          }
        </div>
      </>
    )
}