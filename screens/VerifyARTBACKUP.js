import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { DataTable, Switch, Subheading } from 'react-native-paper';

const VerifyARTScreen = ({navigation}) => {
  const [tableData, setTableData] = useState([
    { id: "12388", name:"Mary Tan", art:"Negative",  date:"08/08/2021", image: "  image1.jpg"   },
    {  id: "12399", name:"John Jones", art:"Negative",  date:"09/09/2021", image: "  image1.jpg"   },
    { id: "12377", name:"Bruce Wayne", department:"Logistics", art:"Positive",  date:"07/07/2021", image: "  image1.jpg"   },
    { id: "12366", name:"Tony Stark", art:"Negative",  date:"06/06/2021", image: "  image1.jpg"   },
    
  ])

  const [filteredData, setFilteredData] = useState([
    { id: "12388", name:"Mary Tan", art:"Negative", date:"08/08/2021", image: "  image1.jpg"   },
    {  id: "12399", name:"John Jones",  art:"Negative",  date:"09/09/2021", image: "  image1.jpg"   },
    { id: "12377", name:"Bruce Wayne",art:"Positive",  date:"07/07/2021", image: "  image1.jpg"   },
    { id: "12366", name:"Tony Stark",  art:"Negative", num: "3", date:"06/06/2021", image: "  image1.jpg"   },
    
  ])

  const [value, setValue] = useState(false);

  const switchValueLabel = `  ${
    value === true ? 'Approve' : 'Pending'
  }`;

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


  const searchEmployeeArt = (text) => {
    if (text) {
      const newData = tableData.filter((item) => {
        const itemData = item.art ? item.art.toUpperCase() : "".toUpperCase();
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

      const searchEmployeeImage = (text) => {
    if (text) {
      const newData = tableData.filter((item) => {
        const itemData = item.image ? item.image.toUpperCase() : "".toUpperCase();
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
    <ScrollView horizontal>
      <DataTable>
        <DataTable.Header>

          <DataTable.Title><TouchableOpacity><TextInput
            placeholder="Employee ID"
            style={{padding: 2.5, width: 100}}
            onChangeText={(text) => searchEmployeeID(text)} /></TouchableOpacity></DataTable.Title>
          <DataTable.Title><TouchableOpacity><TextInput
            placeholder="Name"
            style={{padding: 2.5, width: 100}}
            onChangeText={(text) => searchEmployeeName(text)} /></TouchableOpacity></DataTable.Title>
           
            <DataTable.Title><TouchableOpacity><TextInput
            placeholder="ART Status"
            style={{padding: 2.5, width: 100}}
            onChangeText={(text) => searchEmployeeArt(text)} /></TouchableOpacity></DataTable.Title>

            <DataTable.Title><TouchableOpacity><TextInput
            placeholder="Date"
            style={{padding: 2.5, width: 100}}
            onChangeText={(text) => searchEmployeeDate(text)} /></TouchableOpacity></DataTable.Title>
            <DataTable.Title><TouchableOpacity><TextInput
            placeholder="image"
            style={{padding: 2.5, width: 100}}
            onChangeText={(text) => searchEmployeeImage(text)} /></TouchableOpacity></DataTable.Title>
            <DataTable.Title><TouchableOpacity><TextInput
            placeholder="Status"
            style={{padding: 2.5, width: 200}}
             /></TouchableOpacity></DataTable.Title>

       
       
       
        </DataTable.Header>

        <FlatList
          data={filteredData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <DataTable.Row>
              <DataTable.Cell>{item.id}</DataTable.Cell>
              <DataTable.Cell>{item.name}</DataTable.Cell>
              <DataTable.Cell>{item.art}</DataTable.Cell>
              <DataTable.Cell>{item.date}</DataTable.Cell>
              <DataTable.Cell>{item.image}</DataTable.Cell>
              <DataTable.Cell>
               <Switch
                 value={value}
                   onValueChange={() => setValue(!value)}
                />
                 <Subheading>{switchValueLabel}</Subheading>
                 </DataTable.Cell>
            </DataTable.Row>
          )}
        />
      </DataTable>
    </ScrollView>
    </SafeAreaView>
  );
}
export default VerifyARTScreen;

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