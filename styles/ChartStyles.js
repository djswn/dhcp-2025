import { StyleSheet } from "react-native";

export default StyleSheet.create({
  input: {
    backgroundColor: "white",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 12,
    fontSize: 16,
  },

  radioGroup: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  radioOption: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
  },

  radioLabel: {
    fontSize: 16,
    color: "#333",
  },

  saveButton: {
    backgroundColor: "#4A90E2",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 5,
    marginBottom: 20,
  },

  saveButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
