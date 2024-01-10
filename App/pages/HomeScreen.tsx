import { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { NavigationProps } from "../Navigation";
import { IAiTheme, aiTheme } from "../aiTheme";

const HomeScreen = ({ navigation }: NavigationProps) => {
  const themes = aiTheme;
  const [selectedTheme, setSelectedTheme] = useState<IAiTheme>(themes[0]);

  const insets = useSafeAreaInsets();

  const gotoChatScreen = () => {
    navigation.push("Chat", { theme: selectedTheme });
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
      <View style={styles.nameText}>
        <Text style={styles.textHeader}>Hello,</Text>
        <Text style={styles.textHeader}>
          I am{" "}
          <Text style={[{ color: selectedTheme.primary }, styles.textHeader]}>
            {selectedTheme.name}
          </Text>
        </Text>
      </View>
      <Image
        style={styles.aiPreview}
        source={{
          uri: selectedTheme.image,
        }}
      />
      <Text style={{ fontSize: 16 }}>How Can i help you ?</Text>
      <View style={styles.imgWrapper}>
        <View style={styles.listAi}>
          {themes.map((theme, idx) => {
            if (selectedTheme.id == idx + 1) return;
            return (
              <Pressable
                key={idx}
                style={pressStyle1}
                onPress={() => {
                  setSelectedTheme(themes[idx]);
                }}
              >
                <Image
                  style={styles.listAiImg}
                  source={{
                    uri: theme.image,
                  }}
                />
              </Pressable>
            );
          })}
        </View>
        <Text style={{ color: "#708090" }}>Choose Your Chat Buddy</Text>
      </View>

      <Pressable
        style={({ pressed }) => pressStyle2(pressed, selectedTheme.primary)}
        onPress={gotoChatScreen}
      >
        <Text style={styles.btnText}>Let's Chat</Text>
      </Pressable>
    </View>
  );
};

const pressStyle1 = ({ pressed }: { pressed: boolean }) => [
  {
    backgroundColor: pressed ? "rgb(210, 230, 255)" : "transparent",
  },
  styles.imgBtn,
];
const pressStyle2 = (pressed: boolean, primary: string) => [
  {
    backgroundColor: pressed ? `${primary}80` : primary,
  },
  styles.btn,
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",

    gap: 20,
  },
  aiPreview: {
    width: 160,
    height: 160,
  },
  listAi: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  listAiImg: {
    width: 50,
    height: 50,
  },
  btn: {
    padding: 16,
    borderRadius: 50,
    paddingHorizontal: 40,
    marginTop: 20,
  },
  btnText: { color: "white" },
  textHeader: {
    fontSize: 34,
    fontWeight: "bold",
  },
  nameText: {
    display: "flex",
    alignItems: "center",
    width: 220,
  },
  imgBtn: {
    padding: 14,
    borderRadius: 50,
  },
  imgWrapper: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    padding: 10,
    paddingVertical: 14,
    paddingTop: 10,
  },
});

export default HomeScreen;
