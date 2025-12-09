import { StyleSheet } from "react-native";

export default StyleSheet.create({

  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },

  searchInput: {
    margin: 8,
    marginBottom: 0,
    padding: 8,
    backgroundColor: 'white',
    borderWidth: 1,
  },

  card: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 8,
    margin: 8,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#333',
    alignItems: 'center',
  },

  doctorImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
    backgroundColor: '#ddd'
  },

  itemTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 6
  },

  specialty: {
    fontSize: 14,
    color: '#444',
  },

  rating: {
    fontSize: 13,
    color: '#333',
    marginBottom: 5
  },

  itemDescription:{
    fontSize: 14,
    color: '#555'
  },


});
