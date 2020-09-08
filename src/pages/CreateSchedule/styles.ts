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
  },

  date: {
    fontSize: 18,
  },

  datePicker: {
    width: 300,
    height: 55,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
    marginVertical: 20,
    backgroundColor: "#fff",
  },

  picker: {
    width: 300,
    height: 55
  }
});
