import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  subHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
  },

  subTitle: {
    fontFamily: "Sedan",
    fontSize: 26,
  },

  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 28,
  },

  input: {
    backgroundColor: "#fff",
    width: 300,
    height: 56,
    justifyContent: "center",
    borderRadius: 5,
    padding: 12,
    marginVertical: 10
  },

  label: {
    fontSize: 16,
    fontFamily: 'Sedan'
  },
});
