import axios from 'axios'
import { useEffect, useState } from 'react'

import { encode, hashedValue } from '../utils/crypt'
import { USER_SECERT, BASE_URL, USER_ID } from '../App'

const KB = 1024
const CHUNK_SIZE = 500 * KB

export default function UploadFile({ setFiles }) {
    
  let [selectedFile, setSelectedFile] = useState(null)
  let [fileId, setFileId] = useState("")
  let [file, setFile] = useState({})
  
  let [fileArray, setFileArray] = useState([])

  let [currentChunkIndex, setCurrentChunkIndex] = useState(null)
  let [totalChunks, setTotalChunks] = useState(null)

  let handleChangeInFile = (e) => {
    const file = e.target.files[0]

    readFile(file)
  } 

  let readFile = (file) => {
    const reader = new FileReader()
    if(!file) return
    
    reader.onload = e => {
      storeFile(e, file)
    }
    reader.readAsDataURL(file)
  }

  let storeFile = (readerEvent, file) => {
    let newFileArray = readerEvent.target.result.match(new RegExp('.{1,' + CHUNK_SIZE + '}', 'g'))
      
    setFileArray(newFileArray)
    setSelectedFile(file)
    setTotalChunks(newFileArray.length)
  }

  let startChunkUpload = () => {
    let data = encode(fileArray[currentChunkIndex], USER_SECERT)
    
    const params = new URLSearchParams();
    params.set('currentChunkIndex', currentChunkIndex)
    params.set('fileId', hashedValue(`${currentChunkIndex}${fileId}`))

    const headers = {
      'Content-Type': 'application/octet-stream'
    }

    const url = `${BASE_URL}files/chunk/upload?${params.toString()}`

    axios.post(url, data, {headers})
      .then((res) => {
        console.log(`Then Response -> ${res.status}`); 
        if(res.status == 200) {
          console.log(`chunk ${currentChunkIndex} added ${res.data.message}`);

          setCurrentChunkIndex(++currentChunkIndex)
        }
      })
      .catch((err) => {
        console.log("Catch Response -> ");
        console.log(err);
      })
  }

  let uploadFile = () => {
    if(!selectedFile) {
      console.log("Select A File❗")
      return
    }

    let fileId = hashedValue(Date.now().toString()+USER_ID)
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
        console.log(`Then Response for file upload ${res.status}`);
        if(res.status == 200){
          setFile(data)
          setCurrentChunkIndex(0)
        }   
      })
      .catch((err) => {
        console.log(`Catch Response for file upload`);
        console.log(err);
      })
  }


  // Effect to send chunked data
  useEffect(() => {    
    if(currentChunkIndex != null && currentChunkIndex<totalChunks) {
      startChunkUpload()
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