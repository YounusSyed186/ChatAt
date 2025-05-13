import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { faker } from "@faker-js/faker";
import { AWS_S3_REGION, S3_BUCKET_NAME } from "../config";

const user_id = window.localStorage.getItem("user_id");

const useConversationStore = create(
  immer((set, get) => ({
    direct_chat: {
      conversations: [],
      current_conversation: null,
      current_messages: [],
    },
    group_chat: {},

    // Actions
    fetchDirectConversations: (conversations) => {
      const list = conversations.map((el) => {
        const user = el.participants.find((elm) => elm._id.toString() !== user_id);
        return {
          id: el._id,
          user_id: user?._id,
          name: `${user?.firstName} ${user?.lastName}`,
          online: user?.status === "Online",
        //   img: `https://${S3_BUCKET_NAME}.s3.${AWS_S3_REGION}.amazonaws.com/${user?.avatar}`,
          msg: el.messages.slice(-1)[0]?.text || "",
          time: "9:36",
          unread: 0,
          pinned: false,
          about: user?.about,
        };
      });

      set((state) => {
        state.direct_chat.conversations = list;
      });
    },

    updateDirectConversation: (conversation) => {
      set((state) => {
        state.direct_chat.conversations = state.direct_chat.conversations.map((el) => {
          if (el?.id !== conversation._id) return el;

          const user = conversation.participants.find((elm) => elm._id.toString() !== user_id);
          return {
            id: conversation._id,
            user_id: user?._id,
            name: `${user?.firstName} ${user?.lastName}`,
            online: user?.status === "Online",
            img: faker.image.avatar(),
            msg: faker.music.songName(),
            time: "9:36",
            unread: 0,
            pinned: false,
          };
        });
      });
    },

    addDirectConversation: (conversation) => {
      const user = conversation.participants.find((elm) => elm._id.toString() !== user_id);

      set((state) => {
        state.direct_chat.conversations = state.direct_chat.conversations.filter(
          (el) => el?.id !== conversation._id
        );
        state.direct_chat.conversations.push({
          id: conversation._id,
          user_id: user?._id,
          name: `${user?.firstName} ${user?.lastName}`,
          online: user?.status === "Online",
          img: faker.image.avatar(),
          msg: faker.music.songName(),
          time: "9:36",
          unread: 0,
          pinned: false,
        });
      });
    },

    setCurrentConversation: (conversation) => {
      set((state) => {
        state.direct_chat.current_conversation = conversation;
      });
    },

    fetchCurrentMessages: (messages) => {
      const formatted_messages = messages.map((el) => ({
        id: el._id,
        type: "msg",
        subtype: el.type,
        message: el.text,
        incoming: el.to === user_id,
        outgoing: el.from === user_id,
      }));

      set((state) => {
        state.direct_chat.current_messages = formatted_messages;
      });
    },

    addDirectMessage: (message) => {
      set((state) => {
        state.direct_chat.current_messages.push(message);
      });
    },
  }))
);

export default useConversationStore;
