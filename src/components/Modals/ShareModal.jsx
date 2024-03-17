import { Box, Button, Modal, Switch, Typography } from "@mui/material";
import FileIcon from "../../assets/FileIcon";
import SecureShareSwitch from "../Switch/Switch";
import { useState } from "react";
import GeoLocationDetails from "../ShareAttributeDetails/GeoLocationDetails";
import ShareAttribute from "../ShareAttribute/ShareAttribute";
import TimeExpirationDetails from "../ShareAttributeDetails/TimeExpirationDetails";
import ShareIconV2 from "../../assets/ShareIconV2";
import { getShareLink } from "../../utils/helper";

const ShareModal = ({ fileId, totalChunks , open, handleClose }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "600px",
    height: "500px",
    borderRadius: "8px",
    bgcolor: "background.paper",
    display: "flex",
    flexDirection: "column",
    p: 4,
  };

  const switchProps = {
    inputProps: {
      "aria-label": "Switch demo",
    },
  };

  const [isGeoLocationChecked, setIsGeoLocationChecked] = useState(false);
  const [isTimeExpirationChecked, setIsTimeExpirationChecked] = useState(false);
  const [isNotifyMeChecked, setIsNotifyChecked] = useState(false);

  const [expirationTime, setExpirationTime] = useState();

  const handleSubmit = async () => {
    if (isTimeExpirationChecked && expirationTime.length == 0) {
      return;
    }
    const data = {
      fileId: fileId,
      userId: "65f1ee104a569a3ec08f7fbe",
      totalChunks:totalChunks,
      shareTypes: ["time"],
      shareAttributes: {
        time:{
          expiration:expirationTime
        }
      }
    };
    await getShareLink(data);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className="flex items-center gap-2">
          <FileIcon />
          <div>FileName</div>
        </div>
        <div className="w-full h-[1px] mt-[4%] bg-gray-200"></div>
        <div className="flex flex-col mt-[4%] gap-6">
          <ShareAttribute
            title={"Geolocation"}
            isChecked={isGeoLocationChecked}
            setIsChecked={setIsGeoLocationChecked}
          >
            <GeoLocationDetails />
          </ShareAttribute>

          <ShareAttribute
            title={"Time Expiration"}
            isChecked={isTimeExpirationChecked}
            setIsChecked={setIsTimeExpirationChecked}
          >
            <TimeExpirationDetails
              expirationTime={expirationTime}
              setExpirationTime={setExpirationTime}
            />
          </ShareAttribute>
        </div>
        <div className="flex-grow"></div>
        <div
          onClick={handleSubmit}
          className="self-end cursor-pointer` w-[130px] h-[50px] mt-[4%] flex justify-center items-center gap-2 rounded-[8px] p-4 bg-violet"
        >
          <ShareIconV2 height={24} width={24} />
          <div className="text-[#4253ED] font-[500] text-[16px]">Share</div>
        </div>
      </Box>
    </Modal>
  );
};

export default ShareModal;
