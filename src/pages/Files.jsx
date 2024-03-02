import axios from "axios"
import { useEffect } from "react"
import { BASE_URL, USER_ID } from "../App"

import PreviewFile from "../components/PreviewFile";


export default function Files({ files, setFiles }) {

    useEffect(() => {
      const url = `${BASE_URL}files/${USER_ID}`
        axios.get(url)
            .then((res) => {
              console.log(`${res.status} files: ${res.data.data.length}`);
          
              let newFiles = [...files, ...res.data.data]
    
              if(newFiles && newFiles.length != 0) setFiles(newFiles)
              
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    return (
      <div key={"filesComponent"} style={{
        border: "red solid 2px",
        padding: "20px",
        flexDirection: 'column'
      }}>
        {
          !files.length 
            ? <p>No Files are there</p>

            : files.map(file => <PreviewFile key={file.fileId} file={file}/>)
        }
      </div>
    )
}