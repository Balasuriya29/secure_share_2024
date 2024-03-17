import { useState } from "react";

const TimeExpirationDetails = ({expirationTime,setExpirationTime}) => {

    const handleInputChange = (e) => {
        setExpirationTime(e.target.value);
    }

    return (
        <div className="mt-[2%]">
            <input type="text" value={expirationTime} onChange={handleInputChange}/>
        </div>
    );
};

export default TimeExpirationDetails;
