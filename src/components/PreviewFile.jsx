import React, { useEffect, useState } from "react";
import { BASE_URL } from "../App";
import { hashedValue } from "../utils/crypt";
import axios from "axios";


export default function PreviewFile({file}) {
    const {
        fileId,
        name,
        size,
        type,
        created_at,
        totalChunks,
        userId,
    } = file

    let [bufferedArray, setBufferedArray] = useState({})
    let [dC, setDC] = useState(0)

    const [newData, setNewData] = useState(null)

    let downloadFile = (fileId, totalChunks) => {
        let url;
        for (let i = 0; i < totalChunks; i++) {
          let chunkId = `${i}${fileId}`
          url = `${BASE_URL}files/chunk/download/${hashedValue(chunkId)}`
          
          axios.get(url)
            .then((res) => {
              console.log("Then Response");
              if(res.status == 200) {
                
                setBufferedArray((prev) => {
                    return {
                        ...prev, 
                        [i] :  res.data.chunk.data.data
                    }
                })

                setDC(++dC)
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

      useEffect(() => {
        if(dC == totalChunks) {
            let newBufferedArray = []

            for (let i = 0; i < totalChunks; i++) {
                bufferedArray[i].forEach(element => {
                    newBufferedArray.push(element)
                });
            }

            console.log(newBufferedArray);

            // Convert the array of numbers to a Uint8Array
            const uint8Array = new Uint8Array(newBufferedArray);

            // Create a Blob from the Uint8Array
            const blob = new Blob([uint8Array], {type: type});

            convertBlobToBase64(blob)
        }
      }, [dC])

      const convertBlobToBase64 = (blob) => {
        // Create a FileReader
        const reader = new FileReader();
    
        // Define a callback function to handle the result of reading
        reader.onloadend = () => {
          // The result property contains the base64 string
          const base64 = reader.result;
          console.log(base64);
          setNewData(base64);
        };
    
        // Read the Blob as a data URL (base64)
        reader.readAsDataURL(blob);
      };

    return (
        <>
        <div style={{
            flexDirection: 'row'
        }}>

            <p>{(name.length > 10) ? name.substring(0, 10) + "..." : name } - {Math.round((size/1024)/1024)}MB</p>
            <button onClick={() => {
                downloadFile(fileId, totalChunks)
            }}>Download File</button>



        </div>
            { newData && <img src={newData} width={700} height={400}/> } 
        </>
    )   
}