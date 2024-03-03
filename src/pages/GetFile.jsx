import { useEffect, useState } from "react";
import {io} from "socket.io-client";

const GetFile = () => {
    useEffect(()=>{
        const socket = io("http://localhost:3001");
        socket.emit('getFile',{
            fileId:"sdfsf3"
        });
        socket.on('fileStatus',(data)=>{
            setShowFile(data["showFile"])
        })
    },[])
    const [showFile,setShowFile] = useState(false);
    return (
        <div className="w-[100vw] h-[100vh]">
            <div className="flex justify-center flex-col">
                <div>File</div>
                <div>{showFile}</div>
                {showFile && <img src="https://picsum.photos/200/300" height={200} width={200}></img>}
            </div>
        </div>
    )
}

export default GetFile;