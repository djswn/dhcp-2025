import React, { useState } from "react";
import { Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Provider as PaperProvider } from "react-native-paper";

import HomeStack from "./navigation/HomeStack";
import ChatStack from "./navigation/ChatStack";

import Chart from "./screens/Chart";
import Map from "./screens/Map";

import commonStyles from "./styles/CommonStyles";

const Tab = createBottomTabNavigator();

export default function App() {
  const [chatRooms, setChatRooms] = useState({});
  const [reservations, setReservations] = useState({});

  return (
    <PaperProvider>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="Home"
            children={() => (
              <HomeStack
                chatRooms={chatRooms}
                setChatRooms={setChatRooms}
                reservations={reservations}
                setReservations={setReservations}
              />
            )}
            options={{
              tabBarIcon: () => (
                <Image
                  style={commonStyles.logo}
                  source={require("./assets/selection.png")}
                />
              ),
            }}
          />

          <Tab.Screen
            name="Chats"
            children={({ navigation }) => (
              <ChatStack chatRooms={chatRooms} setChatRooms={setChatRooms} navigation={navigation} />
            )}
            options={{
              tabBarIcon: () => (
                <Image style={commonStyles.logo} source={require('./assets/chat.png')} />
              ),
            }}
          />


          <Tab.Screen
            name="Chart"
            component={Chart}
            options={{
              tabBarIcon: () => (
                <Image
                  style={commonStyles.logo}
                  source={require("./assets/chart.png")}
                />
              ),
            }}
          />

          <Tab.Screen
            name="Map"
            component={Map}
            options={{
              tabBarIcon: () => (
                <Image
                  style={commonStyles.logo}
                  source={require("./assets/map.png")}
                />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
