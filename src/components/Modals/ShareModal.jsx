import { Box, Button, IconButton, Modal, Snackbar } from "@mui/material";
import React, { useEffect, useState } from "react";
import ShareAttribute from "../ShareAttribute/ShareAttribute";
import TimeExpirationDetails from "../ShareAttributeDetails/TimeExpirationDetails";
import {
  getCurrentLocation,
  getCurrentUserDetails,
  getShareLink,
  getTimeStamp,
} from "../../utils/helper";
import { useNavigate } from "react-router-dom";
import CopyLinkIcon from "../../assets/CopyLinkIcon";
import ShareModalCloseIcon from "../../assets/ShareModalCloseIcon";
import GeoLocationDetails from "../ShareAttributeDetails/GeoLocationDetails";
import IPControlDetails from "../ShareAttributeDetails/IPControlDetails";

const ShareModal = ({ fileId, totalChunks, open, handleClose }) => {
  const navigate = useNavigate();

  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const user = getCurrentUserDetails();
    if (user == null) {
      navigate("/");
      return;
    }
    setUserId(user["userId"]);
  }, []);

  const style = {
    position: "absolute",
    width: "600px",
    height: "96%",
    top: "2%",
    right: "1%",
    bottom: "0",
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
  const [isIPControlChecked, setIsIPControlChecked] = useState(false);
  const [snackBarOpened, setSnackBarOpened] = useState(false);

  const [expirationTime, setExpirationTime] = useState();
  const [radius, setRadius] = useState();
  const [noOfIP, setNoOfIP] = useState();

  const handleSubmit = async () => {
    let shareTypes = [];
    let shareAttributes = {};

    const updateShareTypesAndAttributes = (shareType, shareAttribute) => {
      shareTypes.push(shareType);
      shareAttributes[shareType] = shareAttribute;
    };

    if (isTimeExpirationChecked) {
      if (expirationTime.length == 0) {
        console.log("-----Time expiration required---------");
        return;
      }

      updateShareTypesAndAttributes("time", {
        expiration: getTimeStamp(expirationTime),
      });
    }

    if (isGeoLocationChecked) {
      if (radius == 0) {
        console.log("------Radius required--------");
        return;
      }

      let locationResult;

      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          async function (position) {
            updateShareTypesAndAttributes("geoFence", {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              radius: radius,
            });
          },
          function (e) {
            console.log(e);
            alert(e.message);
          }
        );
      } else {
        alert("Location permission needed!!!");
        return;
      }
    }

    if (isIPControlChecked) {
      if (noOfIP == 0) {
        console.log("-----No of ip's required-----");
        return;
      }

      updateShareTypesAndAttributes("ipControl", { noOfIPs: noOfIP });
    }

    const data = {
      fileId: fileId,
      userId: userId,
      totalChunks: totalChunks,
      shareTypes: shareTypes,
      shareAttributes: shareAttributes,
    };

    console.log(data);

    const call = async () => {
      const response = await getShareLink(data);
      console.log(response);
      if (!response.success) {
        console.log(response.message);
        return;
      }
      navigator.clipboard.writeText(response.data.link);
      setSnackBarOpened(true);
    };

    if (isGeoLocationChecked) {
      setTimeout(() => {
        console.log("---now call----");
        console.log(data);
        call();
      }, 1000);
    } else {
      call();
    }
  };

  const handleSnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackBarOpened(false);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex items-center justify-between">
            <div className="text-black text-xl font-[500]">Share File</div>
            <div onClick={handleClose} className="cursor-pointer">
              <ShareModalCloseIcon />
            </div>
          </div>
          <div className="mt-[4%] flex gap-6 flex-wrap">
            <ShareAttribute
              title={"Geolocation"}
              isChecked={isGeoLocationChecked}
              setIsChecked={setIsGeoLocationChecked}
            >
              <GeoLocationDetails radius={radius} setRadius={setRadius} />
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
            <ShareAttribute
              title={"Unique Views"}
              isChecked={isIPControlChecked}
              setIsChecked={setIsIPControlChecked}
            >
              <IPControlDetails noOfIP={noOfIP} setNoOfIP={setNoOfIP} />
            </ShareAttribute>
          </div>
          <div className="flex-grow"></div>
          <div
            onClick={handleSubmit}
            className="self-end cursor-pointer
              w-[130px] h-[50px]
              mt-[4%] flex  items-center gap-2
              rounded-[18px] p-2 border-[1px] border-black"
          >
            <CopyLinkIcon />
            <div className="text-black font-[500] text-[16px]">Copy link</div>
          </div>
        </Box>
      </Modal>
      <Snackbar
        open={snackBarOpened}
        autoHideDuration={6000}
        onClose={handleSnackBarClose}
        sx={{
          color: "white",
        }}
        message="Link copied to clipboard"
      />
    </div>
  );
};

export default ShareModal;
