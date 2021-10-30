import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View, SafeAreaView, TextInput } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { DataTable } from 'react-native-paper';

const EmployeeInfoScreen = ({ navigation }) => {
  const [tableData, setTableData] = useState([
    { id: 1, name: "Mary Tan", email: "abc@test.com", managerID: 11, managerName: "Tim", vaccinated: "Fully Vaccinated", artResult: "Negative" },
    { id: 2, name: "John Jones", email: "abc@test.com", managerID: 1, managerName: "Mary Tan", vaccinated: "Partially Vaccinated", artResult: "Negative" },
    { id: 3, name: "Tony Stark", email: "abc@test.com", managerID: 5, managerName: "MBob", vaccinated: "Partially Vaccinated", artResult: "Negative" },
    { id: 5, name: "MBob", email: "abc@test.com", managerID: 11, managerName: "Tim", vaccinated: "Fully Vaccinated", artResult: "Negative" },
  ])

  const [filteredData, setFilteredData] = useState([
    { id: 1, name: "Mary Tan", email: "abc@test.com", managerID: 11, managerName: "Tim", vaccinated: "Fully Vaccinated", artResult: "Negative" },
    { id: 2, name: "John Jones", email: "abc@test.com", managerID: 1, managerName: "Mary Tan", vaccinated: "Partially Vaccinated", artResult: "Negative" },
    { id: 3, name: "Tony Stark", email: "abc@test.com", managerID: 5, managerName: "MBob", vaccinated: "Partially Vaccinated", artResult: "Negative" },
    { id: 5, name: "MBob", email: "abc@test.com", managerID: 11, managerName: "Tim", vaccinated: "Fully Vaccinated", artResult: "Negative" },
  ])

  const searchEmployeeID = (text) => {
    if (text) {
      const newData = tableData.filter((item) => {
        const itemData = item.id ? item.id.toUpperCase() : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(newData);
    }
    else {
      setFilteredData(tableData);
    }
  }

  const searchEmployeeName = (text) => {
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

  const searchManagerID = (text) => {
    if (text) {
      const newData = tableData.filter((item) => {
        const itemData = item.managerID ? item.managerID.toUpperCase() : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(newData);
    }
    else {
      setFilteredData(tableData);
    }
  }

  const searchManagerName = (text) => {
    if (text) {
      const newData = tableData.filter((item) => {
        const itemData = item.managerName ? item.managerName.toUpperCase() : "".toUpperCase();
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
  const [editedItem, setEditedItem] = useState("");

  const editName = (text) => {
    if(text){
      const newData = tableData.map((item) => {
        if(item.id === editedItem){
          item.name = text;
          return item;
        }
        return item;
      });
      setFilteredData(newData);
    }
    else{
      setFilteredData(tableData);
    }
  }

  const editManagerID = (text) => {
    if(text){
      const newData = tableData.map((item) => {
        if(item.id === editedItem){
          item.managerID = text;
          return item;
        }
        return item;
      });
      setFilteredData(newData);
    }
    else{
      setFilteredData(tableData);
    }
  }

  const editManagerName = (text) => {
    if(text){
      const newData = tableData.map((item) => {
        if(item.id === editedItem){
          item.managerName = text;
          return item;
        }
        return item;
      });
      setFilteredData(newData);
    }
    else{
      setFilteredData(tableData);
    }
  }

  return (
    <SafeAreaView>
    <ScrollView>
      <DataTable>
        <DataTable.Header>

          <DataTable.Title><TextInput
            placeholder="Employee ID"
            style={{padding: 2.5}}
            onChangeText={(text) => searchEmployeeID(text)} /></DataTable.Title>
          <DataTable.Title><TextInput
            placeholder="Name"
            style={{padding: 2.5}}
            onChangeText={(text) => searchEmployeeName(text)} /></DataTable.Title>
          <DataTable.Title><TextInput
            placeholder="Email"
            style={{padding: 2.5}}
            onChangeText={(text) => searchEmail(text)} /></DataTable.Title>
          <DataTable.Title><TextInput
            placeholder="Manager ID"
            style={{padding: 2.5}}
            onChangeText={(text) => searchManagerID(text)} /></DataTable.Title>
          <DataTable.Title><TextInput
            placeholder="Manager Name"
            style={{padding: 2.5}}
            onChangeText={(text) => searchManagerName(text)} /></DataTable.Title>
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
              <DataTable.Cell><TextInput
                style={{padding: 5}}
                value={item.name}
                onChangeText={(text) => {editName(text), setEditedItem(item.id)}} /></DataTable.Cell>
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
export default EmployeeInfoScreen;

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