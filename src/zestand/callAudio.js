import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { socket } from '../../socket';
import axios from '../../utils/axios';

const useAudioCallStore = create(
  devtools((set, get) => ({
    open_audio_dialog: false,
    open_audio_notification_dialog: false,
    call_queue: [],
    incoming: false,

    // Actions
    pushToAudioCallQueue: ({ call, incoming }) => {
      const { call_queue } = get();
      if (call_queue.length === 0) {
        set((state) => ({
          call_queue: [call],
          open_audio_dialog: !incoming,
          open_audio_notification_dialog: incoming,
          incoming,
        }));
      } else {
        socket.emit('user_is_busy_audio_call', { call, incoming });
      }
    },

    resetAudioCallQueue: () => {
      set({
        call_queue: [],
        open_audio_notification_dialog: false,
        incoming: false,
      });
    },

    closeNotificationDialog: () => {
      set({ open_audio_notification_dialog: false });
    },

    updateCallDialog: (stateVal) => {
      set({
        open_audio_dialog: stateVal,
        open_audio_notification_dialog: false,
      });
    },

    // Async Call Start
    startAudioCall: async (id, token) => {
      const { resetAudioCallQueue, pushToAudioCallQueue } = get();
      try {
        resetAudioCallQueue();
        const response = await axios.post(
          '/user/start-audio-call',
          { id },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );

        pushToAudioCallQueue({ call: response.data.data, incoming: false });
      } catch (err) {
        console.error(err);
      }
    },

    receiveIncomingCall: (call) => {
      get().pushToAudioCallQueue({ call, incoming: true });
    },
  }))
);

export default useAudioCallStore;
