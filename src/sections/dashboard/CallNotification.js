import { faker } from "@faker-js/faker";
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Slide,
  Stack,
} from "@mui/material";
import React from "react";
import { socket } from "../../../socket";
import { AWS_S3_REGION, S3_BUCKET_NAME } from "../../../config";
import useAudioCallStore from "../../zestand/callAudio";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CallNotification = ({ open, handleClose }) => {
  const {
    user,
    call_queue,
    resetAudioCallQueue,
    updateCallDialog,
  } = useAudioCallStore((state) => state); // Access Zustand state and actions

  const call_details = call_queue[0]; // Since it's an array, we can get the first element

  const handleAccept = () => {
    socket.emit("audio_call_accepted", { ...call_details });
    updateCallDialog(true); // Update dialog state to show the call dialog
  };

  const handleDeny = () => {
    socket.emit("audio_call_denied", { ...call_details });
    resetAudioCallQueue(); // Clear the call queue
    handleClose(); // Close the notification dialog
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleDeny}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogContent>
        <Stack direction="row" spacing={24} p={2}>
          <Stack>
            <Avatar
              sx={{ height: 100, width: 100 }}
              src={`https://${S3_BUCKET_NAME}.s3.${AWS_S3_REGION}.amazonaws.com/${call_details?.from_user?.avatar}`}
            />
          </Stack>
          <Stack>
            <Avatar
              sx={{ height: 100, width: 100 }}
              src={`https://${S3_BUCKET_NAME}.s3.${AWS_S3_REGION}.amazonaws.com/${user?.avatar}`}
            />
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleAccept} variant="contained" color="success">
          Accept
        </Button>
        <Button onClick={handleDeny} variant="contained" color="error">
          Deny
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CallNotification;
