const SidePanelTile = ({title,icon}) =>{
    return (
        <div className="flex gap-2 p-4 px-4 bg-gray-100 rounded-md items-center">
            <div>
                {icon({width:"20",height:"20"})}
            </div>
            <div className="text-[#00000080] font-[500]">{title}</div>
        </div>
    )
}

export default SidePanelTile;