import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ZegoExpressEngine } from "zego-express-engine-webrtc";
import useStore from "./zestand/store";

const APP_ID = 1273556140;
// Remove SERVER_SECRET if unused or keep as a string if needed:
// const SERVER_SECRET = "e1ec9d74d6eec639e9a53db8e33c7dc1";

const zg = new ZegoExpressEngine(APP_ID, "wss");

const CallPage = ({ isVideo = false }) => {
  const { roomID } = useParams();
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const localAudioRef = useRef(null);
  const remoteAudioRef = useRef(null);
  const [stream, setStream] = useState(null);
  const navigate = useNavigate();

  const user = useStore((state) => state.user);

  useEffect(() => {
    let isMounted = true; // to avoid setting state if component unmounted
    const handleRemoteStreamAdded = async (remoteStream) => {
      const stream = await zg.startPlayingStream(remoteStream.streamID);
      if (isMounted) {
        if (isVideo) {
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = stream;
            remoteVideoRef.current.play().catch(() => {});
          }
        } else {
          if (remoteAudioRef.current) {
            remoteAudioRef.current.srcObject = stream;
            remoteAudioRef.current.play().catch(() => {});
          }
        }
      }
    };

    const init = async () => {
      // fetch token from server
      const res = await fetch(`/api/zego/token?roomID=${roomID}&userID=${user.id}`);
      const { token } = await res.json();

      await zg.loginRoom(roomID, token, {
        userID: user.id,
        userName: user.firstName,
      });

      const localStream = await zg.createStream({
        camera: { audio: true, video: isVideo },
      });

      await zg.startPublishingStream(user.id, localStream);

      if (isVideo) {
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = localStream;
          localVideoRef.current.play().catch(() => {});
        }
      } else {
        if (localAudioRef.current) {
          localAudioRef.current.srcObject = localStream;
          localAudioRef.current.play().catch(() => {});
        }
      }

      zg.on("remoteStreamAdded", handleRemoteStreamAdded);

      setStream(localStream);
    };

    init();

    return () => {
      isMounted = false;
      zg.off("remoteStreamAdded", handleRemoteStreamAdded);
      if (stream) {
        zg.stopPublishingStream(user.id);
        zg.destroyStream(stream);
      }
      zg.logoutRoom(roomID);
    };
  }, [roomID, user.id, user.firstName, isVideo, stream]);

  const handleEndCall = () => {
    navigate("/chat");
  };

  return (
    <div style={{ padding: 20, textAlign: "center" }}>
      <h2>{isVideo ? "Video Call" : "Audio Call"}</h2>

      {/* Video elements */}
      <video
        ref={localVideoRef}
        autoPlay
        muted
        playsInline
        style={{ width: "40%", display: isVideo ? "inline-block" : "none" }}
      />
      <video
        ref={remoteVideoRef}
        autoPlay
        playsInline
        style={{ width: "40%", display: isVideo ? "inline-block" : "none" }}
      />

      {/* Audio elements */}
      <audio
        ref={localAudioRef}
        autoPlay
        muted
        style={{ display: isVideo ? "none" : "inline-block" }}
      />
      <audio
        ref={remoteAudioRef}
        autoPlay
        style={{ display: isVideo ? "none" : "inline-block" }}
      />

      <br />
      <button onClick={handleEndCall}>End Call</button>
    </div>
  );
};

export default CallPage;
