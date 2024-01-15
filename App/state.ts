import { IMessage } from "react-native-gifted-chat";
import { create } from "zustand";

interface MessagesState {
  messages: IMessage[];
  addMessage: (messages: IMessage[]) => void;
  resetMessage: () => void;
}

export const useMessagesStore = create<MessagesState>((set) => ({
  messages: [],
  addMessage: (messages: IMessage[]) =>
    set((state) => ({ messages: [...messages, ...state.messages] })),
  resetMessage: () =>
    set(() => ({
      messages: [],
    })),
}));
