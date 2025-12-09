import React, { useEffect, useState } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity, SafeAreaView, Image, } from "react-native";
import selectionStyles from "../styles/SelectionStyles";

const doctorImages = {
  "doctor1.png": require("../assets/doctors/doctor1.png"),
  "doctor2.png": require("../assets/doctors/doctor2.png"),
  "doctor3.png": require("../assets/doctors/doctor3.png"),
  "doctor4.png": require("../assets/doctors/doctor4.png"),
  "doctor5.png": require("../assets/doctors/doctor5.png"),
};

export default function Selection({ navigation }) {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/djswn/DHCP_2025/refs/heads/main/doctor.json"
    )
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch(() => alert("데이터 불러오기 실패"));
  }, []);

  const filtered = data.filter((item) =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={selectionStyles.card}
      onPress={() => navigation.navigate("DoctorDetail", { doctor: item })}
    >
      <Image
        source={doctorImages[item.image]}
        style={selectionStyles.doctorImage}
      />

      <View style={{ marginLeft: 12, flex: 1 }}>
        <Text style={selectionStyles.itemTitle}>{item.name}</Text>
        <Text style={selectionStyles.specialty}>{item.specialty}</Text>
        <Text style={selectionStyles.rating}>
          ⭐ {item.rating} ({item.reviews})
        </Text>
        <Text style={selectionStyles.itemDescription}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={selectionStyles.container}>
      <TextInput
        style={selectionStyles.searchInput}
        placeholder="의료진 검색"
        value={searchText}
        onChangeText={setSearchText}
      />

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
}
