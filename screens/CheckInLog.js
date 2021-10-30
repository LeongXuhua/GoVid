import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View, SafeAreaView, TextInput } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { DataTable } from 'react-native-paper';

const CheckInLogScreen = ({ navigation }) => {
  const [tableData, setTableData] = useState([
    { time: "10.00AM", name: "Mary Tan", email: "abc@test.com", location: "Block A", vaccinated: "Fully Vaccinated", artResult: "Negative" },
    { time: "11.00AM", name: "John Jones", email: "test@test.com", location: "Block B", vaccinated: "Fully Vaccinated", artResult: "Negative" },
    { time: "12.00PM", name: "Bob", email: "zxc@test.com", location: "Block A", vaccinated: "Partially Vaccinated", artResult: "Negative" },
    { time: "13.00PM", name: "Tony Stark", email: "123@test.com", location: "Block D", vaccinated: "Partially Vaccinated", artResult: "Negative" },
  ])

  const [filteredData, setFilteredData] = useState([
    { time: "10.00AM", name: "Mary Tan", email: "abc@test.com", location: "Block A", vaccinated: "Fully Vaccinated", artResult: "Negative" },
    { time: "11.00AM", name: "John Jones", email: "test@test.com", location: "Block B", vaccinated: "Fully Vaccinated", artResult: "Negative" },
    { time: "12.00PM", name: "Bob", email: "zxc@test.com", location: "Block A", vaccinated: "Partially Vaccinated", artResult: "Negative" },
    { time: "13.00PM", name: "Tony Stark", email: "123@test.com", location: "Block D", vaccinated: "Partially Vaccinated", artResult: "Negative" },
  ])

  const searchTime = (text) => {
    if (text) {
      const newData = tableData.filter((item) => {
        const itemData = item.time ? item.time.toUpperCase() : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(newData);
    }
    else {
      setFilteredData(tableData);
    }
  }

  const searchName = (text) => {
    if (text) {
      const newData = tableData.filter((item) => {
        const itemData = item.name ? item.name.toUpperCase() : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(newData);
    }
    else {
      setFilteredData(tableData);
    }
  }

  const searchEmail = (text) => {
    if (text) {
      const newData = tableData.filter((item) => {
        const itemData = item.email ? item.email.toUpperCase() : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(newData);
    }
    else {
      setFilteredData(tableData);
    }
  }

  const searchLocation = (text) => {
    if (text) {
      const newData = tableData.filter((item) => {
        const itemData = item.location ? item.location.toUpperCase() : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(newData);
    }
    else {
      setFilteredData(tableData);
    }
  }

  const searchVaccinated = (text) => {
    if (text) {
      const newData = tableData.filter((item) => {
        const itemData = item.vaccinated ? item.vaccinated.toUpperCase() : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(newData);
    }
    else {
      setFilteredData(tableData);
    }
  }

  const searchArtResult = (text) => {
    if (text) {
      const newData = tableData.filter((item) => {
        const itemData = item.artResult ? item.artResult.toUpperCase() : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(newData);
    }
    else {
      setFilteredData(tableData);
    }
  }

  return (
    <SafeAreaView>
    <ScrollView>
      <DataTable>
        <DataTable.Header>

          <DataTable.Title><TextInput
            placeholder="Time"
            style={{padding: 2.5}}
            onChangeText={(text) => searchTime(text)} /></DataTable.Title>
          <DataTable.Title><TextInput
            placeholder="Name"
            style={{padding: 2.5}}
            onChangeText={(text) => searchName(text)} /></DataTable.Title>
          <DataTable.Title><TextInput
            placeholder="Email"
            style={{padding: 2.5}}
            onChangeText={(text) => searchEmail(text)} /></DataTable.Title>
          <DataTable.Title><TextInput
            placeholder="Check-In Location"
            style={{padding: 2.5}}
            onChangeText={(text) => searchLocation(text)} /></DataTable.Title>
          <DataTable.Title><TextInput
            placeholder="Vaccinated"
            style={{padding: 2.5}}
            onChangeText={(text) => searchVaccinated(text)} /></DataTable.Title>
          <DataTable.Title><TextInput
            placeholder="ART Result"
            style={{padding: 2.5}}
            onChangeText={(text) => searchArtResult(text)} /></DataTable.Title>
        </DataTable.Header>

        <FlatList
          data={filteredData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <DataTable.Row>
              <DataTable.Cell>{item.time}</DataTable.Cell>
              <DataTable.Cell>{item.name}</DataTable.Cell>
              <DataTable.Cell>{item.email}</DataTable.Cell>
              <DataTable.Cell>{item.location}</DataTable.Cell>
              <DataTable.Cell>{item.vaccinated}</DataTable.Cell>
              <DataTable.Cell>{item.artResult}</DataTable.Cell>
            </DataTable.Row>
          )}
        />
      </DataTable>
    </ScrollView>
    </SafeAreaView>
  );
}
export default CheckInLogScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#51a4fb",
  },

  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
    paddingLeft: 10
  },
});