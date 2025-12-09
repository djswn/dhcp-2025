import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ChatList from "../screens/ChatList";
import ChatRoom from "../screens/ChatRoom";

const Stack = createStackNavigator();

export default function ChatStack({ navigation, chatRooms, setChatRooms }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>

      {/* ChatList가 첫 화면 */}
      <Stack.Screen
        name="ChatList"
        children={(props) => (
          <ChatList {...props} chatRooms={chatRooms} />
        )}
      />

      {/* ChatRoom */}
      <Stack.Screen
        name="ChatRoom"
        children={(props) => (
          <ChatRoom
            {...props}
            chatRooms={chatRooms}
            setChatRooms={setChatRooms}
          />
        )}
      />

    </Stack.Navigator>
  );
}
