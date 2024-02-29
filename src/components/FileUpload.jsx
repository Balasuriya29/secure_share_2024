import FileUploadIcon from "../assets/FileUpload"

const FileUpload = () => {
    
  const openFilePicker = () => {
    document.getElementById('filePickerElement').click();
  }

  const handleFileChange = (e) => {
    console.log('-------File upload change------');
    console.log(e.target.value);
  }

  const handleDrop = (e) => {
    console.log("--------On file drop---------");
    console.log(e);
  }

  const handleDragOver = (e) => {
    e.preventDefault();
  }

    return (
        <div 
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className='
        flex flex-col justify-center items-center
        h-[150px] bg-lightGray mt-[2%] 
        rounded-[12px]
        border-dashed border-[#6473FF] border-[2px]'>
            <div className='p-2 bg-[#D4E4FB] w-fit rounded-xl'>
                <FileUploadIcon/>
            </div>
            <div className='font-[500] text-lg'>
            <input type='file' onChange={handleFileChange} accept='.pdf,.jpg,.jpeg,.png' className='hidden' id='filePickerElement'></input>
            Drag and drop files, or <span className='text-[#4253ED] cursor-pointer' onClick={openFilePicker}>Browse</span>
            </div>
        </div>
    )
}

export default FileUpload;