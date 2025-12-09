import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TextInput, TouchableOpacity, Dimensions } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { RadioButton } from "react-native-paper";

import chartStyles from "../styles/ChartStyles";

export default function Chart() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");

  const [systolic, setSystolic] = useState("");
  const [diastolic, setDiastolic] = useState("");

  const [standard, setStandard] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/djswn/DHCP_2025/refs/heads/main/blood_pressure.json"
    )
      .then((res) => res.json())
      .then((json) => setStandard(json.categories));
  }, []);

  const analyzeBloodPressure = (sys, dia) => {
    for (const c of standard) {
      const sysOK = sys >= c.systolic.min && sys <= c.systolic.max;
      const diaOK = dia >= c.diastolic.min && dia <= c.diastolic.max;

      if (["정상혈압", "주의혈압"].includes(c.name)) {
        if (sysOK && diaOK) return c.name;
      }

      if (["고혈압전단계", "고혈압 1기", "고혈압 2기"].includes(c.name)) {
        if (sysOK || diaOK) return c.name;
      }

      if (c.name === "수축기단독고혈압") {
        if (sysOK && diaOK) return c.name;
      }
    }

    return "판정 불가";
  };

  const handleCheck = () => {
    if (!name || !age || !gender || !systolic || !diastolic) {
      alert("모든 정보를 입력해주세요!");
      return;
    }

    const sys = Number(systolic);
    const dia = Number(diastolic);
    const category = analyzeBloodPressure(sys, dia);

    setResult({
      userSys: sys,
      userDia: dia,
      category: category,
    });
  };

  return (
    <ScrollView style={{ padding: 16 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold" }}>혈압 비교 그래프</Text>

      <TextInput
        style={chartStyles.input}
        placeholder="이름"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={chartStyles.input}
        placeholder="나이"
        keyboardType="numeric"
        value={age}
        onChangeText={setAge}
      />

      {/* 성별 선택 */}
      <View style={chartStyles.radioGroup}>
        <TouchableOpacity
          style={chartStyles.radioOption}
          onPress={() => setGender("male")}
        >
          <RadioButton
            value="male"
            status={gender === "male" ? "checked" : "unchecked"}
            onPress={() => setGender("male")}
            color="#4A90E2"
            uncheckedColor="#ccc"
          />
          <Text style={chartStyles.radioLabel}>남성</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={chartStyles.radioOption}
          onPress={() => setGender("female")}
        >
          <RadioButton
            value="female"
            status={gender === "female" ? "checked" : "unchecked"}
            onPress={() => setGender("female")}
            color="#E24A4A"
            uncheckedColor="#ccc"
          />
          <Text style={chartStyles.radioLabel}>여성</Text>
        </TouchableOpacity>
      </View>

      {/* 수축기 & 이완기 입력 */}
      <TextInput
        style={chartStyles.input}
        placeholder="수축기 (예: 120)"
        keyboardType="numeric"
        value={systolic}
        onChangeText={setSystolic}
      />

      <TextInput
        style={chartStyles.input}
        placeholder="이완기 (예: 80)"
        keyboardType="numeric"
        value={diastolic}
        onChangeText={setDiastolic}
      />

      {/* 버튼 */}
      <TouchableOpacity style={chartStyles.saveButton} onPress={handleCheck}>
        <Text style={chartStyles.saveButtonText}>비교하기</Text>
      </TouchableOpacity>

      {/* 결과 */}
      {result && (
        <>
          <Text style={{ fontSize: 18, marginTop: 20 }}>
            내 혈압: {result.userSys} / {result.userDia} mmHg
          </Text>

          <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 5 }}>
            판정 결과: {result.category}
          </Text>

          {/* 그래프 */}
          <BarChart
            data={{
              labels: ["정상 수축기", "정상 이완기", "내 수축기", "내 이완기"],
              datasets: [
                {
                  data: [120, 80, result.userSys, result.userDia],
                },
              ],
            }}
            width={Dimensions.get("window").width - 32}
            height={260}
            yAxisInterval={1}
            chartConfig={{
              backgroundGradientFrom: "#fff",
              backgroundGradientTo: "#fff",
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(30,144,255,${opacity})`,
              propsForBackgroundLines: {
                strokeWidth: 1,
                stroke: "#ddd",
                strokeDasharray: "0",
              },
            }}
            style={{ marginTop: 20 }}
          />
        </>
      )}
    </ScrollView>
  );
}
