import './App.css'

import Files from './pages/Files'
import PreviewFile from './pages/PreviewFile'

export const BASE_URL = 'http://localhost:3000/api/'
export const USER_SECERT = "mydekumeansyoucandoit@2911"
export const USER_ID = "12345"

function App() {

  return (
    <>
      <PreviewFile />
    </>
  )
}

export default App
