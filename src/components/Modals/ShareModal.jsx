import { Box, Modal, Switch, Typography } from "@mui/material";

const ShareModal = ({open,handleClose}) => {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '600px',
        height: '500px',
        borderRadius:'8px',
        bgcolor: 'background.paper',
        p: 4,
      };
    
    const switchProps = {
        inputProps: { 
            'aria-label': 'Switch demo',
            
        }
    }
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box sx={style}>
                <div>FileName</div>
                <div className="w-full h-[1px] bg-gray-200"></div>
                <div className="flex flex-col mt-[4%] gap-6">
                    <div className="flex items-center justify-between">
                        <div>Geolocation</div>
                        <Switch  {...switchProps}  />
                    </div>
                    <div className="flex items-center justify-between">
                        <div>Expiration Time</div>
                        <Switch  {...switchProps}  />
                    </div>
                    <div className="flex items-center justify-between">
                        <div>Notify Me</div>
                        <Switch  {...switchProps}  />
                    </div>
                </div>
            </Box>
        </Modal>
    )
}

export default ShareModal;