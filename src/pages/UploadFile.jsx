import axios from 'axios'
import { useEffect, useState } from 'react'

import { encode, hashedValue } from '../utils/crypt'
import { USER_SECERT, BASE_URL, USER_ID } from '../App'

const KB = 1024
const CHUNK_SIZE = 500 * KB

export default function UploadFile({ setFiles }) {
    
  let [selectedFile, setSelectedFile] = useState(null)
  let [currentChunkIndex, setCurrentChunkIndex] = useState(null)
  let [totalChunks, setTotalChunks] = useState(null)
  let [fileId, setFileId] = useState("")

  let [file, setFile] = useState("")

  let handleChangeInFile = (e) => {
    const file = e.target.files[0]

    setSelectedFile(file)
    setTotalChunks(Math.ceil(file.size / CHUNK_SIZE))
  } 

  let handleSendFile = () => setCurrentChunkIndex(0)

  let readAndUploadCurrentChunk = () => {
    const reader = new FileReader()
    if(!selectedFile) return

    const from = currentChunkIndex * CHUNK_SIZE
    const to = from + CHUNK_SIZE

    console.log(from+"----"+to);

    const blob = selectedFile.slice(from, to)
    reader.onload = e => uploadChuck(e)

    reader.readAsDataURL(blob)
  }

  let uploadChuck = (readerEvent) => {
    const data = readerEvent.target.result

    console.log("-->>"+`${currentChunkIndex}${fileId}`);

    const params = new URLSearchParams();
    params.set('currentChunkIndex', currentChunkIndex)
    params.set('fileId', hashedValue(`${currentChunkIndex}${fileId}`))

    const headers = {
      'Content-Type': 'application/octet-stream'
    }

    const url = `${BASE_URL}files/chunk/upload?${params.toString()}`

    axios.post(url, data, {headers})
      .then((res) => {
        console.log("Then Response -> "); 
        if(res.status == 200) {
          console.log(`chunk ${currentChunkIndex} added ${res.data.message}`);

          console.log("Next Chunk:");
          setCurrentChunkIndex(++currentChunkIndex)
        } else {
          console.log(res.status);
        }
      })
      .catch((err) => {
        console.log("Catch Response -> ");
        console.log(err);
      })
  }

  let uploadFile = () => {
    if(!selectedFile) {
      console.log("Select A File❗");
      return;
    }

    let fileId = hashedValue(Date.now())
    setFileId(fileId)


    const data = {
      'name': selectedFile.name, 
      'size': selectedFile.size, 
      'type': selectedFile.type, 
      'totalChunks': totalChunks,
      'fileId': encode(fileId, USER_SECERT),
      'userId': USER_ID
    }
    
    const url = `${BASE_URL}files/file/upload`
    
    axios.post(url, data)
      .then((res) => {
        console.log("Then Response");
        if(res.status == 200){
          
          setFile(data)
          handleSendFile()
        } else {
          console.log(res.status);
        }
      })
      .catch((err) => {
        console.log("Catch Response");
        console.log(err);
      })

  }


  // Effect to send chunked data
  useEffect(() => {
    console.log(currentChunkIndex +" ---- "+ totalChunks);
    
    if(currentChunkIndex != null && currentChunkIndex<totalChunks) {
      readAndUploadCurrentChunk()
    } 

    if(currentChunkIndex && currentChunkIndex == totalChunks) {
      setFiles((prev) => [...prev, file])
    }
  }, [currentChunkIndex])


    return <>
        <div>
        <input type='file' onChange={handleChangeInFile}/>
        </div>

        <button onClick={uploadFile}>Send File</button>
    </>
}