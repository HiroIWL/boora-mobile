import { StyleSheet, Text } from "react-native";

export default function Header() {
  return <Text style={styles.title}>Boora !</Text>;
}

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    fontFamily: "JosefinSans_700Bold",
    color: "#FF9800",
    textAlign: "center", 
    width: "100%",
  },
});
