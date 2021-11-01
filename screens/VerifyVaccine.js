import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View, SafeAreaView, TextInput } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { DataTable } from 'react-native-paper';

const VerifyVaccineScreen = ({navigation}) => {
  const [tableData, setTableData] = useState([
    { id: 12388, name:"Mary Tan", department:"Finance", vaccinated:"Yes", num: 2, date:"08/08/2021", certificate: "vaccine1.jpg"   },
    {  id: 12399, name:"John Jones", department:"HR", vaccinated:"Yes", num: 2, date:"09/09/2021", certificate: "vaccine1.jpg"   },
    { id: 12377, name:"Bruce Wayne", department:"Logistics", vaccinated:"No", num: 2, date:"07/07/2021", certificate: "vaccine1.jpg"   },
    { id: 12366, name:"Tony Stark",  department:"Research", vaccinated:"Yes", num: 3, date:"06/06/2021", certificate: "vaccine1.jpg"   },
    
  ])

  const [filteredData, setFilteredData] = useState([
    { id: 12388, name:"Mary Tan", department:"Finance", vaccinated:"Yes", num: 2, date:"08/08/2021", certificate: "vaccine1.jpg"   },
    {  id: 12399, name:"John Jones", department:"HR", vaccinated:"Yes", num: 2, date:"09/09/2021", certificate: "vaccine1.jpg"   },
    { id: 12377, name:"Bruce Wayne", department:"Logistics", vaccinated:"No", num: 2, date:"07/07/2021", certificate: "vaccine1.jpg"   },
    { id: 12366, name:"Tony Stark",  department:"Research", vaccinated:"Yes", num: 3, date:"06/06/2021", certificate: "vaccine1.jpg"   },
    
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


  const searchEmployeeDepartment = (text) => {
    if (text) {
      const newData = tableData.filter((item) => {
        const itemData = item.department ? item.department.toUpperCase() : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(newData);
    }
    else {
      setFilteredData(tableData);
    }
  }

  const searchEmployeeVaccinated = (text) => {
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

      const searchEmployeeNum = (text) => {
    if (text) {
      const newData = tableData.filter((item) => {
        const itemData = item.num ? item.num.toUpperCase() : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(newData);
    }
    else {
      setFilteredData(tableData);
    }
  }


    const searchEmployeeDate = (text) => {
    if (text) {
      const newData = tableData.filter((item) => {
        const itemData = item.date ? item.date.toUpperCase() : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(newData);
    }
    else {
      setFilteredData(tableData);
    }
  }

      const searchEmployeeCertificate = (text) => {
    if (text) {
      const newData = tableData.filter((item) => {
        const itemData = item.certificate ? item.certificate.toUpperCase() : "".toUpperCase();
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
            <DataTable.Title><TextInput
            placeholder="Department"
            style={{padding: 2.5}}
            onChangeText={(text) => searchEmployeeDepartment(text)} /></DataTable.Title>
            <DataTable.Title><TextInput
            placeholder="Vaccine Status"
            style={{padding: 2.5}}
            onChangeText={(text) => searchEmployeeVaccinated(text)} /></DataTable.Title>
            <DataTable.Title><TextInput
            placeholder="No. of Dose"
            style={{padding: 2.5}}
            onChangeText={(text) => searchEmployeeNum(text)} /></DataTable.Title>
            <DataTable.Title><TextInput
            placeholder="Date"
            style={{padding: 2.5}}
            onChangeText={(text) => searchEmployeeDate(text)} /></DataTable.Title>
            <DataTable.Title><TextInput
            placeholder="Certificate"
            style={{padding: 2.5}}
            onChangeText={(text) => searchEmployeeCertificate(text)} /></DataTable.Title>
       
       
       
       
        </DataTable.Header>

        <FlatList
          data={filteredData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <DataTable.Row>
              <DataTable.Cell>{item.id}</DataTable.Cell>
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