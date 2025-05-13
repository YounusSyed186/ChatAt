import React, { useEffect, useRef } from "react";
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Slide,
  Stack,
} from "@mui/material";

import { ZegoExpressEngine } from "zego-express-engine-webrtc";
import axiosInstance from "../../../utils/axios";
import { socket } from "../../../socket";
import { AWS_S3_REGION, S3_BUCKET_NAME } from "../../../config";
import useAudioCallStore from "../../../store/useAudioCallStore";
import useAuthStore from "../../../store/useAuthStore";
import useAppStore from "../../../store/useAppStore"; // for `user`

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CallDialog = ({ open, handleClose }) => {
  const audioStreamRef = useRef(null);
  const { user } = useAppStore();
  const { token } = useAuthStore();

  const {
    call_queue,
    incoming,
    resetAudioCallQueue,
  } = useAudioCallStore();

  const [call_details] = call_queue || [];

  const appID = 1642584767;
  const server = "wss://webliveroom1642584767-api.coolzcloud.com/ws";
  const zg = new ZegoExpressEngine(appID, server);

  const roomID = call_details?.roomID;
  const userID = call_details?.userID;
  const userName = call_details?.userName;
  const streamID = call_details?.streamID;

  const handleDisconnect = () => {
    resetAudioCallQueue();

    socket?.off("audio_call_accepted");
    socket?.off("audio_call_denied");
    socket?.off("audio_call_missed");

    zg.stopPublishingStream(streamID);
    zg.stopPlayingStream(userID);
    zg.destroyStream(audioStreamRef.current);
    zg.logoutRoom(roomID);

    handleClose();
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      socket.emit(
        "audio_call_not_picked",
        { to: streamID, from: userID },
        () => {}
      );
    }, 30 * 1000);

    socket.on("audio_call_missed", () => handleDisconnect());
    socket.on("audio_call_accepted", () => clearTimeout(timer));
    socket.on("audio_call_denied", () => handleDisconnect());

    if (!incoming) {
      socket.emit("start_audio_call", { to: streamID, from: userID, roomID });
    }

    let this_token;

    async function fetchToken() {
      const response = await axiosInstance.post(
        "/user/generate-zego-token",
        { userId: userID, room_id: roomID },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      this_token = response.data.token;
    }

    fetchToken().then(() => {
      zg.checkSystemRequirements().then((result) => {
        const { webRTC, microphone } = result;
        if (webRTC && microphone) {
          zg.loginRoom(
            roomID,
            this_token,
            { userID, userName },
            { userUpdate: true }
          )
            .then(async () => {
              const localStream = await zg.createStream({
                camera: { audio: true, video: false },
              });

              audioStreamRef.current = localStream;
              document.getElementById("local-audio").srcObject = localStream;
              zg.startPublishingStream(streamID, localStream);

              zg.on("roomUserUpdate", async (roomID, updateType, userList) => {
                if (updateType !== "ADD") {
                  handleDisconnect();
                } else {
                  const remoteStream = await zg.startPlayingStream(userID);
                  const remoteAudio = document.getElementById("remote-audio");
                  remoteAudio.srcObject = remoteStream;
                  remoteAudio.play();
                }
              });
            })
            .catch((err) => console.error(err));
        }
      });
    });

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleDisconnect}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogContent>
        <Stack direction="row" spacing={24} p={2}>
          <Stack>
            <Avatar
              sx={{ height: 100, width: 100 }}
              src={`https://${S3_BUCKET_NAME}.s3.${AWS_S3_REGION}.amazonaws.com/${call_details?.from_user?.avatar}`}
            />
            <audio id="local-audio" controls={false} />
          </Stack>
          <Stack>
            <Avatar
              sx={{ height: 100, width: 100 }}
              src={`https://${S3_BUCKET_NAME}.s3.${AWS_S3_REGION}.amazonaws.com/${user?.avatar}`}
            />
            <audio id="remote-audio" controls={false} />
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDisconnect} variant="contained" color="error">
          End Call
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CallDialog;
