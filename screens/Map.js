import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

import mapStyles from "../styles/MapStyles";

export default function Map() {
  const [location, setLocation] = useState(null);
  const [pharmacies, setPharmacies] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_KEY = "AIzaSyAdN5FT2f9SKV_EKUM0HMwgREK8o9_h4_0";

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        alert("GPS 권한이 필요합니다.");
        setLoading(false);
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);

      // 주변 약국 가져오기
      fetchNearbyPharmacies(loc.coords.latitude, loc.coords.longitude);
    })();
  }, []);

  const fetchNearbyPharmacies = async (lat, lng) => {
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=1500&type=pharmacy&key=${API_KEY}`;

    try {
      const response = await fetch(url);
      const json = await response.json();

      setPharmacies(json.results);
      setLoading(false);
    } catch {
      alert("약국 정보를 가져오지 못했습니다.");
      setLoading(false);
    }
  };

  if (loading || !location) {
    return (
      <View style={mapStyles.loadingContainer}>
        <ActivityIndicator size="large" color="#4A90E2" />
        <Text>주변 약국을 불러오는 중...</Text>
      </View>
    );
  }

  return (
    <MapView
      style={{ flex: 1 }}
      initialRegion={{
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
      showsUserLocation
    >
      {/* 현재 위치 */}
      <Marker coordinate={location} title="현재 위치" pinColor="blue" />

      {/* 주변 약국 마커 */}
      {pharmacies.map((p, index) => (
        <Marker
          key={index}
          coordinate={{
            latitude: p.geometry.location.lat,
            longitude: p.geometry.location.lng,
          }}
          title={p.name}
          description={p.vicinity}
          pinColor="red"
        />
      ))}
    </MapView>
  );
}

