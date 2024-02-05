import { useState } from 'react'
import './App.css'

import Files from './pages/Files'
import UploadFile from './pages/UploadFile'

export const BASE_URL = 'http://localhost:3000/api/'
export const USER_SECERT = "mydekumeansyoucandoit@2911"
export const USER_ID = "12345"

function App() {
  const [files, setFiles] = useState([])

  let handleSetFiles = (newFile) => {
    console.log("setting new files");

    setFiles((prev) => [...prev, newFile])
  }

  return (
    <>
      <Files files={files} setFiles={handleSetFiles}/>
      <UploadFile setFiles={handleSetFiles}/>
    </>
  )
}

export default App
