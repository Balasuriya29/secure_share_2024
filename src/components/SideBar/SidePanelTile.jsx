import { useNavigate } from "react-router-dom";

const SidePanelTile = ({title,icon,routeURL}) =>{
    const navigate = useNavigate();
    return (
        <div className="flex gap-2 p-4 px-4 bg-gray-100 rounded-md items-center cursor-pointer
           hover:bg-white" 
           onClick={()=>navigate(routeURL)}
        >
            <div>
                {icon({width:"20",height:"20"})}
            </div>
            <div className="text-[#00000080] font-[500]">{title}</div>
        </div>
    )
}

export default SidePanelTile;