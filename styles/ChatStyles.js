import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  nameTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },

  doctorRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },

  doctorImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginRight: 14,
  },

  infoBox: {
    backgroundColor: "#eee",
    padding: 20,
    borderRadius: 10,
  },
});
