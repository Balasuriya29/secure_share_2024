import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const LocationDetails = () => {

  const [latitude,setLatitude] = useState();
  const [longitude,setLongitude] = useState();
 
  useEffect(()=>{
  //   navigator.geolocation.watchPosition(
  //     (position) => {
  //         const { latitude, longitude } = position.coords;
  //         setLatitude(latitude);
  //         setLongitude(longitude);
  //         const socket = io("http://localhost:3001");
  //         console.log("Connecting to socket");
  //         socket.emit('getFile',{
  //             fileId:"sdfsf3",
  //             latitude:latitude,
  //             longitude:longitude
  //         });
  //         socket.on('fileStatus',(data)=>{
  //             setShowFile(data["showFile"])
  //         })
  //     },
  //     (error) => {
  //         console.log("Error: ", error.message);
  //     },
  // );
  },[]);


  const handleClick = () => {
      navigator.geolocation.getCurrentPosition(
      (position) => {
          const { latitude, longitude } = position.coords;
          setLatitude(latitude);
          setLongitude(longitude);
          const socket = io("http://localhost:3001");
          console.log("Connecting to socket");
          socket.emit('getFile',{
              fileId:"sdfsf3",
              latitude:latitude,
              longitude:longitude
          });
          socket.on('fileStatus',(data)=>{
              setShowFile(data["showFile"])
          })
      },
      (error) => {
          console.log("Error: ", error.message);
      },
  );
  }

  return (
    <div>
        <div onClick={handleClick}>Get file</div>
        <div>
          {latitude}
          <br></br>
          {longitude}
        </div>
    </div>
  );
};

export default LocationDetails;
