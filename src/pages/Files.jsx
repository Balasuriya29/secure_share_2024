import axios from "axios"
import { useEffect, useState } from "react"
import { BASE_URL, USER_ID } from "../App"

import FileCard from "../components/Cards/FileCard";
import { CircularProgress } from "@mui/material";
import ArrowDownIcon from "../assets/ArrowDownIcon";


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
        textAlign: 'center',
        overflow: 'scroll',
        height: "55vh"
      }}>
        {
          isLoading 
            ? <CircularProgress variant="indeterminate" color="info" size={50} style={{
              marginTop: '100px'
            }} />

            : !files.length 
                ? <p>No Files are there</p>
                : FilesListing(files)
            
        }
      </div>
    )
}


const FilesListing = (files) => {
  return (
    <div>
      <div className="
            w-full bg-white 
            mt-[2%]" style={{
          display:'flex',
          justifyContent:'start',
          paddingLeft:'1vw',
          alignItems:'center'
        }}>

            <div style={{
              display: 'flex',
              flex:0.38,
              flexDirection: 'row',
              justifyContent:"start",
              alignItems: 'center',
              
            }}>
              <p style={{
                paddingRight: '4px'
              }}>Name</p>
              
              <ArrowDownIcon />
            </div>
            
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              flex: 0.17,
              textAlign:'start',
              alignItems: 'center',
              paddingLeft:'2vw'
            }}>
                 <p style={{
                paddingRight: '4px'
              }}>File Type</p>
                <ArrowDownIcon />

            </div>
            <div  style={{
              display: 'flex',
              flexDirection: 'row',
              flex: 0.3,
              alignItems: 'center', 
              paddingLeft:'1vw'
            }}>
              <p style={{
                paddingRight: '4px'
              }}>Date Uploaded</p>

              <ArrowDownIcon />

            </div>
            <div  style={{
              display: 'flex',
              flexDirection: 'row',
              flex: 0.2,
              alignItems: 'center',

            }}>
                 <p style={{
                paddingRight: '4px'
              }}>File Size</p>
                <ArrowDownIcon />

            </div> 
        </div>
        {
          files.map(file => 

            <FileCard key={file.fileId} file={file}/>
          )
        }

      </div>

  )
}