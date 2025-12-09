import React, { useEffect, useState, useRef } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity } from "react-native";

export default function ChatRoom({
  route,
  chatRooms,
  setChatRooms,
}) {
  const { doctor } = route.params;
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const ws = useRef(null);

  useEffect(() => {
    const room = chatRooms[doctor.id];
    setMessages(room ? room.messages : []);
  }, [doctor, chatRooms]);

  //여기 cmd에 ipconfig 쳐서 IPv4 주소로 바꿔야함... 휴대폰이랑 같은 와이파이 사용해야함
  useEffect(() => {
    ws.current = new WebSocket("ws://192.168.35.110:8000/ws");

    ws.current.onmessage = (e) => {
      const msg = { sender: "doctor", text: e.data };

      setMessages((prev) => {
        const updated = [...prev, msg];

        setChatRooms((all) => ({
          ...all,
          [doctor.id]: { doctor, messages: updated },
        }));

        return updated;
      });
    };

    return () => ws.current.close();
  }, []);

  const sendMessage = () => {
    if (!input.trim()) return;

    const msg = { sender: "user", text: input };

    setMessages((prev) => {
      const updated = [...prev, msg];

      setChatRooms((all) => ({
        ...all,
        [doctor.id]: { doctor, messages: updated },
      }));

      return updated;
    });

    ws.current.send(input);
    setInput("");
  };

  return (
    <View style={{ flex: 1, padding: 15 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
        {doctor.name}님과의 상담
      </Text>

      <FlatList
        style={{ flex: 1, marginTop: 10 }}
        data={messages}
        keyExtractor={(_, index) => String(index)}
        renderItem={({ item }) => (
          <View
            style={{
              alignSelf: item.sender === "user" ? "flex-end" : "flex-start",
              backgroundColor: item.sender === "user" ? "#4A90E2" : "#ddd",
              padding: 10,
              marginVertical: 4,
              borderRadius: 8,
            }}
          >
            <Text style={{ color: item.sender === "user" ? "#fff" : "#000" }}>
              {item.text}
            </Text>
          </View>
        )}
      />

      <View style={{ flexDirection: "row" }}>
        <TextInput
          style={{
            flex: 1,
            borderWidth: 1,
            borderColor: "#aaa",
            padding: 10,
            borderRadius: 8,
          }}
          placeholder="메시지를 입력하세요"
          value={input}
          onChangeText={setInput}
        />

        <TouchableOpacity
          onPress={sendMessage}
          style={{
            backgroundColor: "#4A90E2",
            paddingHorizontal: 20,
            justifyContent: "center",
            marginLeft: 10,
            borderRadius: 8,
          }}
        >
          <Text style={{ color: "white" }}>보내기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
