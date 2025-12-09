import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";

const doctorImages = {
  "doctor1.png": require("../assets/doctors/doctor1.png"),
  "doctor2.png": require("../assets/doctors/doctor2.png"),
  "doctor3.png": require("../assets/doctors/doctor3.png"),
  "doctor4.png": require("../assets/doctors/doctor4.png"),
  "doctor5.png": require("../assets/doctors/doctor5.png"),
};

export default function DoctorDetail({
  route,
  navigation,
  reservations,
  setReservations,
}) {
  const { doctor } = route.params;

  const timeSlots = [
    "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00"];

  // 의사 id 불러와서 이 의사에세 예약된 시간 배열 가져옴 (예약내역 없으면 빈 배열)
  const reserved = reservations[doctor.id] || [];
  // 사용자가 지금 선택한 시간 저장
  const [selectedTime, setSelectedTime] = useState(null);

  const reserve = () => {
    if (!selectedTime) return;
    if (reserved.includes(selectedTime)) {
      alert("이미 예약된 시간입니다.");
      return;
    }

    setReservations((prev) => ({
      ...prev,
      [doctor.id]: [...(prev[doctor.id] || []), selectedTime],
    }));

    alert(`${selectedTime} 예약이 완료되었습니다.`);
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ padding: 20 }}>

        {/* 의사 정보 */}
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={doctorImages[doctor.image]}
            style={{ width: 80, height: 80, borderRadius: 10, marginRight: 15 }}
          />
          <View>
            <Text style={{ fontSize: 22, fontWeight: "bold" }}>{doctor.name}</Text>
            <Text style={{ color: "#777" }}>{doctor.specialty}</Text>
          </View>
        </View>

        <Text style={{ fontSize: 20, marginTop: 25, fontWeight: "bold" }}>
          전화 진료 가능 시간
        </Text>

        {/* 시간 선택 */}
        <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 10 }}>
          {timeSlots.map((t) => {
            const disabled = reserved.includes(t);
            const selected = selectedTime === t;

            return (
              <TouchableOpacity
                key={t}
                disabled={disabled}
                onPress={() => setSelectedTime(t)}
                style={{
                  padding: 10,
                  paddingHorizontal: 14,
                  borderRadius: 8,
                  margin: 5,
                  backgroundColor: disabled
                    ? "#ccc"
                    : selected
                    ? "#4A90E2"
                    : "#eee",
                }}
              >
                <Text style={{ color: disabled ? "#777" : selected ? "#fff" : "#000" }}>
                  {t}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* 예약하기 버튼 */}
        {selectedTime && (
          <TouchableOpacity
            onPress={reserve}
            style={{
              backgroundColor: "#4A90E2",
              padding: 15,
              borderRadius: 10,
              marginTop: 20,
            }}
          >
            <Text style={{ textAlign: "center", fontSize: 17, color: "#fff" }}>
              예약하기
            </Text>
          </TouchableOpacity>
        )}

      </ScrollView>

      {/* 하단 고정 영역 */}
      <View style={{ padding: 20, borderTopWidth: 1, borderColor: "#ddd", backgroundColor: "#fff" }}>
        
        {/* 안내 문구 */}
        <Text
          style={{
            textAlign: "center",
            color: "#E24A4A",
            marginBottom: 6,
            fontSize: 13,
          }}
        >
          ※ 채팅 상담은 빠른 답변을 받기 어려울 수 있습니다 ※
        </Text>

        {/* 채팅 상담하기 버튼 */}
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Chats", {
              screen: "ChatRoom",
              params: { doctor },
            })
          }
          style={{
            backgroundColor: "#28A745",
            padding: 15,
            borderRadius: 10,
          }}
        >
          <Text style={{ textAlign: "center", fontSize: 17, color: "#fff" }}>
            채팅으로 상담하기
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
