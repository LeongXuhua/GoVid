import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View, SafeAreaView, TextInput } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { DataTable } from 'react-native-paper';

const VerifyVaccineScreen = ({navigation}) => {
  const [tableData, setTableData] = useState([
    { name:"Mary Tan", id: 12388, department:"Finance", vaccinated:"Yes", num: 2, date:"08/08/2021", certificate: "vaccine1.jpg"   },
    { name:"John Jones", id: 12399, department:"HR", vaccinated:"Yes", num: 2, date:"09/09/2021", certificate: "vaccine1.jpg"   },
    { name:"Bruce Wayne", id: 12377, department:"Logistics", vaccinated:"No", num: 2, date:"07/07/2021", certificate: "vaccine1.jpg"   },
    { name:"Tony Stark", id: 12366, department:"Research", vaccinated:"Yes", num: 3, date:"06/06/2021", certificate: "vaccine1.jpg"   },
    
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
       
        </DataTable.Header>

        <FlatList
          data={filteredData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <DataTable.Row>
              <DataTable.Cell><TextInput
                style={{padding: 5}}
                value={item.name}
                onChangeText={(text) => {editName(text), setEditedItem(item.id)}} /></DataTable.Cell>
              <DataTable.Cell>{item.department}</DataTable.Cell>
              <DataTable.Cell>{item.vaccinated}</DataTable.Cell>
              <DataTable.Cell>{item.num}</DataTable.Cell>
              <DataTable.Cell>{item.date}</DataTable.Cell>
              <DataTable.Cell>{item.certificate}</DataTable.Cell>
            </DataTable.Row>
          )}
        />
      </DataTable>
    </ScrollView>
    </SafeAreaView>
  );
}
export default VerifyVaccineScreen;

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