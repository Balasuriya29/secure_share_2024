import axios from 'axios'
import { useEffect, useState } from 'react'

import { encode, generateId } from '../utils/crypt'
import { USER_SECERT, BASE_URL, USER_ID } from '../App'

const KB = 1024
const CHUNK_SIZE = 500 * KB

export default function PreviewFile() {
    
  let [selectedFile, setSelectedFile] = useState(null)
  let [currentChunkIndex, setCurrentChunkIndex] = useState(null)
  let [totalChunks, setTotalChunks] = useState(null)
  let [fileId, setFileId] = useState("")

  let [isFileUploaded, setFileUploaded] = useState(false)
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

  let showImage = () => {
    setFileUploaded(true)

    // const reader = new FileReader()
    // if(!selectedFile) return

    // const blob = selectedFile
    // reader.onload = e => {
    //   console.log("show image")
    //   setFileUploaded(true)
    //   setFile(e.target.result)
    // }

    // reader.readAsDataURL(blob)
  }

  let uploadChuck = (readerEvent) => {
    const data = readerEvent.target.result

    console.log("-->>"+`${currentChunkIndex}${fileId}`);

    const params = new URLSearchParams();
    params.set('currentChunkIndex', currentChunkIndex)
    params.set('fileId', encode(`${currentChunkIndex}${fileId}`, USER_SECERT))

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

    const data = {
      'name': selectedFile.name, 
      'size': selectedFile.size, 
      'type': selectedFile.type, 
      'totalChunks': totalChunks,
      'fileId': generateId(),
      'userId': USER_ID
    }
    
    const url = `${BASE_URL}files/file/upload`
    
    axios.post(url, data)
      .then((res) => {
        console.log("Then Response");
        if(res.status == 200){
          console.log(`file added ${res.data.message}`);
          setFileId(res.data.received.fileId)
          
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

  // Effect to send chunked data
  useEffect(() => {
    console.log(currentChunkIndex +" ---- "+ totalChunks);
    
    if(currentChunkIndex != null && currentChunkIndex<totalChunks) {
      readAndUploadCurrentChunk()
    } 
  }, [currentChunkIndex])


    return <>
        <div>
        <input type='file' onChange={handleChangeInFile}/>
        </div>

        <button onClick={uploadFile}>Send File</button>
        <button onClick={showImage}>Show File</button>
        <button onClick={downloadFile}>Download File</button>

        {
            isFileUploaded && <img src={file} width={700} height={400}/>
        }
    </>
}