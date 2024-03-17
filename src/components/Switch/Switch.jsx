import { useState } from "react";

const SecureShareSwitch = ({checked,setChecked}) => {
    return (
        <div className="cursor-pointer" onClick={()=>setChecked(!checked)}>
            <input type="checkbox" className="hidden" value="" checked={checked}/>
            <div className={`w-[60px] h-[30px] ${checked ? "border-[#414BFF]" : "border-[#DDDDDD" }  border-[2px] p-1 rounded-3xl flex items-center ${checked?"justify-end":"justify-start"} transition-all duration-900`}>
                <div className={`h-[20px] w-[20px] rounded-full ${checked ? "bg-[#414BFF]" : "bg-[#DEDEDE]" }`}>

                </div>
            </div>
        </div>
    )
}

export default SecureShareSwitch;