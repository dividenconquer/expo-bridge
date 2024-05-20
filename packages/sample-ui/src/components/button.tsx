import {
  TouchableOpacity,
  StyleSheet,
  GestureResponderEvent,
  Text,
} from "react-native";

export interface ButtonProps {
  text: string;
  onClick?: (event: GestureResponderEvent) => void;
}

export function Button({ text, onClick }: ButtonProps) {
  return (
    <TouchableOpacity style={styles.button} onPress={onClick}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: "#2f80ed",
  },
  text: {
    color: "white",
    fontSize: 15,
    fontWeight: "700",
  },
});
