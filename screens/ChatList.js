import React from "react";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";

const doctorImages = {
  "doctor1.png": require("../assets/doctors/doctor1.png"),
  "doctor2.png": require("../assets/doctors/doctor2.png"),
  "doctor3.png": require("../assets/doctors/doctor3.png"),
  "doctor4.png": require("../assets/doctors/doctor4.png"),
  "doctor5.png": require("../assets/doctors/doctor5.png"),
};

export default function ChatList({ navigation, chatRooms }) {
  const rooms = Object.values(chatRooms);

  if (rooms.length === 0) {
    return (
      <View
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Text>채팅 목록이 없습니다.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={rooms}
      keyExtractor={(item) => item.doctor.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={{
            padding: 15,
            flexDirection: "row",
            borderBottomWidth: 1,
            borderColor: "#ccc",
          }}
          onPress={() =>
            navigation.navigate("ChatRoom", { doctor: item.doctor })
          }
        >
          <Image
            source={doctorImages[item.doctor.image]}
            style={{
              width: 55,
              height: 55,
              borderRadius: 30,
              marginRight: 10,
            }}
          />

          <View style={{ justifyContent: "center" }}>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              {item.doctor.name}
            </Text>

            <Text style={{ color: "#888" }}>
              {item.messages.length > 0
                ? item.messages[item.messages.length - 1].text
                : "대화를 시작해보세요"}
            </Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
}
