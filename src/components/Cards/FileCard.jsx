import FileIcon from "../../assets/FileIcon";
import MenuListIcon from "../../assets/MenuListIcon";
import OptionsIcon from "../../assets/OptionsIcon";

const FileCard = () => {
    return (
        <div className="
            w-full bg-white 
            mt-[2%]
            flex items-center justify-between
            p-4 rounded-[16px]
            border-[1px] border-[#E0E0E0]
            font-[500]
        ">
            <div className="flex-2">
                <div className="
                flex justify-center items-center 
                w-[35px] h-[35px] 
                p-2 rounded-[6px] border-[1px] border-[#B0B0B0]">
                    <FileIcon/>
                </div>
            </div>
            <div className="flex-2">
                FileName
            </div>
            <div className="flex-2">
                PDF
            </div>
            <div className="flex-2">
                Feb 14,2024
            </div>
            <div className="flex-2">
                Feb 14,2024
            </div>
            <div className="flex-2">
                2mb
            </div>
            <div className="flex-2">
                <OptionsIcon/>
            </div>
        </div>
    )
}

export default FileCard;