import axios from "axios"
import { useEffect, useState } from "react"
import { BASE_URL, USER_ID, USER_SECERT } from "../App"


export default function Files() {
    const [files, setFiles] = useState([])
    useEffect(() => {
        const url = `${BASE_URL}files/${USER_ID}`
        axios.get(url)
            .then((res) => {
                setFiles([...files, ...res.data.files])
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    let downloadFile = () => {
        let url;
        for (let i = 0; i < totalChunks; i++) {
          let chunkId = `${i}${fileId}`
          url = `${BASE_URL}files/chunk/download/${encode(chunkId, USER_SECERT)}`
          
          axios.get(url)
            .then((res) => {
              console.log("Then Response");
              if(res.status == 200){
                let chunk = res.data.chunk.data.toString()
                setFile(file+chunk)
    
              } else {
                console.log(res.status);
              }
            })
            .catch((err) => {
              console.log("Catch Response");
              console.log(err);
            })
        }
      }

    return (
        <>
            {
                files.map(file => {
                    <div style={{
                        flexDirection: 'row'
                    }}>

                        <p>{file.name} - {file.size}</p>
                        <button onClick={downloadFile}>Download File</button>
                    
                    </div>
                })
            }
        </>
    )
}