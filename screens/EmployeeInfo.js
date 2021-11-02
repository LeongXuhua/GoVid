import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { ActivityIndicator, DataTable } from 'react-native-paper';
import firebase from 'firebase';
import "firebase/firestore";

const EmployeeInfoScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [orgId, setOrgId]= useState();
  
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const snapshot = await firebase.firestore()
      .collection('users')
      .doc(firebase.auth().currentUser.uid)
      .get()

      const organisationId = await snapshot.data().organisationId;
      setOrgId(organisationId);
    }
    
    catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(()=>{
    const fetchEmployee = async()=>{
    const employee =[];

    const snapshot2 = await firebase.firestore()
        .collection('organisations')
        .doc(orgId)
        .collection('employees').orderBy('id')
        .get()

    snapshot2.docs.map(function(doc){
            employee.push(
              {
                //add employee fields into here
                id: doc.data().id,
                name: doc.data().name,
                email: doc.data().email,
                managerID: doc.data().managerId,
                managerName: doc.data().managerName,
                vaccinated: doc.data().vaccinated,
                artResult: doc.data().artResult,
                uid: doc.id,
              }
            )
          setTableData(employee)
          setFilteredData(employee)
          setIsLoading(false)
        })
        
        
    setIsLoading(false)}
    fetchEmployee();
  }, [orgId])

  const [tableData, setTableData] = useState([
    /*{ id: "1", name: "Mary Tan", email: "abc@test.com", managerID: "11", managerName: "Tim", vaccinated: "Fully Vaccinated", artResult: "Negative" },
    { id: "2", name: "John Jones", email: "abc@test.com", managerID: "1", managerName: "Mary Tan", vaccinated: "Partially Vaccinated", artResult: "Negative" },
    { id: "3", name: "Tony Stark", email: "abc@test.com", managerID: "5", managerName: "MBob", vaccinated: "Partially Vaccinated", artResult: "Negative" },
    { id: "5", name: "MBob", email: "abc@test.com", managerID: "11", managerName: "Tim", vaccinated: "Fully Vaccinated", artResult: "Negative" },*/
  ])

  const [filteredData, setFilteredData] = useState([
    /*{ id: "1", name: "Mary Tan", email: "abc@test.com", managerID: "11", managerName: "Tim", vaccinated: "Fully Vaccinated", artResult: "Negative" },
    { id: "2", name: "John Jones", email: "abc@test.com", managerID: "1", managerName: "Mary Tan", vaccinated: "Partially Vaccinated", artResult: "Negative" },
    { id: "3", name: "Tony Stark", email: "abc@test.com", managerID: "5", managerName: "MBob", vaccinated: "Partially Vaccinated", artResult: "Negative" },
    { id: "5", name: "MBob", email: "abc@test.com", managerID: "11", managerName: "Tim", vaccinated: "Fully Vaccinated", artResult: "Negative" },*/
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

  const onPressItem = (item) => {
    setEditedItem(item.id)
  }

  const editManagerID = (text) => {
      const newData = tableData.map((item) => {
        if(item.id === editedItem){
          //get employee's uid
          //remove from old manager's list

          //add to new manager's list

          //update employee's manager record

          item.managerID = text;
          return item;
        }
        return item;
      });
      setFilteredData(newData);
  }

  const editManagerName = (text) => {
      const newData = tableData.map((item) => {
        if(item.id === editedItem){
          item.managerName = text;
          return item;
        }
        return item;
      });
      setFilteredData(newData);
  }

if (isLoading){
  return <ActivityIndicator />
}

  return (
    <SafeAreaView>
    <ScrollView horizontal>
    <View>
      <DataTable>
      <DataTable.Header>
          
          <DataTable.Title><TouchableOpacity><TextInput
            placeholder="ID"
            style={{padding: 2.5}}
            onChangeText={(text) => searchEmployeeID(text)} /></TouchableOpacity></DataTable.Title>
          <DataTable.Title><TouchableOpacity><TextInput
            placeholder="Name"
            style={{padding: 2.5, width: 100}}
            onChangeText={(text) => searchEmployeeName(text)} /></TouchableOpacity></DataTable.Title>
          <DataTable.Title><TouchableOpacity><TextInput
            placeholder="Email"
            style={{padding: 2.5, width: 100}}
            onChangeText={(text) => searchEmail(text)} /></TouchableOpacity></DataTable.Title>
          <DataTable.Title><TouchableOpacity><TextInput
            placeholder="Manager ID"
            style={{padding: 2.5, width: 100}}
            onChangeText={(text) => searchManagerID(text)} /></TouchableOpacity></DataTable.Title>
          <DataTable.Title><TouchableOpacity><TextInput
            placeholder="Manager Name"
            style={{padding: 2.5, width: 140}}
            onChangeText={(text) => searchManagerName(text)} /></TouchableOpacity></DataTable.Title>
          <DataTable.Title><TouchableOpacity><TextInput
            placeholder="Vaccinated"
            style={{padding: 2.5, width: 140}}
            onChangeText={(text) => searchVaccinated(text)} /></TouchableOpacity></DataTable.Title>
          <DataTable.Title><TouchableOpacity><TextInput
            placeholder="ART Result"
            style={{padding: 2.5, width: 140}}
            onChangeText={(text) => searchArtResult(text)} /></TouchableOpacity></DataTable.Title>
        </DataTable.Header>

        <FlatList
          data={filteredData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            
            <DataTable.Row>
              <DataTable.Cell >{item.id}</DataTable.Cell>
              <DataTable.Cell >{item.name}</DataTable.Cell>
                  <DataTable.Cell >{item.email}</DataTable.Cell>
                  <DataTable.Cell><TouchableOpacity
                    onPress={()=> onPressItem(item)}>
                  <TextInput
                    style={{ padding: 5}}
                    value={item.managerID}
                    keyExtractor={item => item.id}
                    onChangeText={(text) => {editManagerID(text)}}
                  />
                  </TouchableOpacity></DataTable.Cell>
                <DataTable.Cell><TouchableOpacity
                    onPress={()=> onPressItem(item)}>
                  <TextInput
                    style={{ padding: 5, width: 100}}
                    value={item.managerName}
                    keyExtractor={item => item.id}
                    onChangeText={(text) => {editManagerName(text)}}
                  />
                  </TouchableOpacity></DataTable.Cell>
              <DataTable.Cell>{item.vaccinated}</DataTable.Cell>
              <DataTable.Cell>{item.artResult}</DataTable.Cell>
            </DataTable.Row>
          )}
        />
      </DataTable>
      </View>
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