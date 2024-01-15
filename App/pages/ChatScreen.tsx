import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { StyleSheet, ToastAndroid, View } from "react-native";
import "react-native-get-random-values";
import { GiftedChat, IMessage } from "react-native-gifted-chat";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { v4 as uuidv4 } from "uuid";
import { INavScreen } from "../Navigation";
import { getBardApi, resetSignal } from "../api";
import { useMessagesStore } from "../state";

export interface ValidationError {
  message: string;
  errors: Record<string, string[]>;
}

export const showToast = (title: string) => {
  ToastAndroid.showWithGravity(title, ToastAndroid.SHORT, ToastAndroid.TOP);
};

const me = {
  _id: 2,
};

const ChatScreen = ({ route: { params } }: INavScreen) => {
  const [isLoading, setIsLoading] = useState(false);

  const messages = useMessagesStore((state) => state.messages);
  const addMessages = useMessagesStore((state) => state.addMessage);
  const resetMessages = useMessagesStore((state) => state.resetMessage);

  const insets = useSafeAreaInsets();

  useEffect(() => {
    return () => {
      resetMessages();
      resetSignal();
    };
  }, []);

  const ai = {
    _id: 1,
    name: params?.theme.name!,
    avatar: params?.theme.image!,
  };

  const aiInitMsgFake = () => {
    const prompt = `Hello! I am ${params?.theme.name}, How can I assist you?`;

    const startMsg = [
      {
        _id: 1,
        text: prompt,
        createdAt: new Date(),
        user: ai,
      },
    ];

    addMessages(startMsg);
    GiftedChat.append(messages, startMsg);
  };

  if (messages.length === 0) {
    aiInitMsgFake();
  }

  const aiInitMsgProper = async () => {
    const prompt = `Hello! I am ${params?.theme.name}, an AI assistant who is happy to help you. I am still under development, but I am learning new things every day. I can help you with a variety of tasks, such as finding information, translating languages, writing different kinds of text, and more. I am always here to help, so please don't hesitate to ask me any questions you may have.`;

    const aiResponse = await getAiResponse(prompt);

    if (aiResponse) {
      const startMsg = [
        {
          _id: uuidv4(),
          text: aiResponse,
          createdAt: new Date(),
          user: ai,
        },
      ];

      addMessages(startMsg);
      GiftedChat.append(messages, startMsg);
    }
  };

  const onSend = useCallback(async (messages: IMessage[] = []) => {
    addMessages(messages);
    GiftedChat.append(messages, messages);

    setIsLoading(true);

    const aiResponse = await getAiResponse(messages[0].text);

    if (aiResponse) {
      const chatMsg: IMessage[] = [
        {
          _id: uuidv4(),
          text: aiResponse,
          createdAt: new Date(),
          user: ai,
        },
      ];

      setIsLoading(false);

      addMessages(chatMsg);
      GiftedChat.append(messages, chatMsg);
    }

    setIsLoading(false);
  }, []);

  const getAiResponse = async (msg: string): Promise<string | null> => {
    try {
      const res = await getBardApi(msg);

      const textFromAI = res.data.text;

      return textFromAI;
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        showToast(error.message);
      } else {
        // console.error(error);
      }

      return null;
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        },
      ]}
    >
      <GiftedChat
        isTyping={isLoading}
        messages={messages}
       
        onSend={(messages) => onSend(messages)}
        user={me}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
});

export default ChatScreen;
