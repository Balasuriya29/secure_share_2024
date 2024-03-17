import axios from "axios"
import { useEffect, useState } from "react"
import { BASE_URL, USER_ID } from "../App"

import FileCard from "../components/Cards/FileCard";
import { CircularProgress } from "@mui/material";


export default function Files({ files, setFiles }) {

    let [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
      const url = `${BASE_URL}files/${USER_ID}`
        axios.get(url)
            .then((res) => {
              console.log(`${res.status} files: ${res.data.data.length}`);
          
              let newFiles = res.data.data
                
              if(newFiles && newFiles.length != 0) setFiles(newFiles)

              setIsLoading(false)
              
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    return (
      <div key={"filesComponent"} style={{
        flexDirection: 'column',
        boxSizing: 'border-box',
        textAlign: 'center'
      }}>
        {
          isLoading 
            ? <CircularProgress variant="indeterminate" color="info" size={50} style={{
              marginTop: '100px'
            }} />

            : !files.length 
                ? <p>No Files are there</p>
                : files.map(file => <FileCard key={file.fileId} file={file}/>)
        }
      </div>
    )
}