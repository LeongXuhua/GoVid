import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, Modal, Platform } from "react-native";
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
                vaccinated: doc.data().vaccinationResult,
                artResult: doc.data().ARTResult,
                uid: doc.id,
              }
            )
          setTableData([...employee])
          setFilteredData([...employee])
          setIsLoading(false)
        })
        
        
    setIsLoading(false)}
    fetchEmployee();
  }, [orgId])

  const [tableData, setTableData] = useState([])

  const [filteredData, setFilteredData] = useState([])

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
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editedItem, setEditedItem] = useState("");
  const [inputText, setInputText] = useState("");
  const [onPressType, setOnPressType] = useState("");

  const onPressManagerID = (item) => {
    setIsModalVisible(true);
    setInputText(item.managerID);
    setEditedItem(item.id);
    setOnPressType("id");
  }
  const onPressManagerName = (item) => {
    setIsModalVisible(true);
    setInputText(item.managerName);
    setEditedItem(item.id);
    setOnPressType("name");
  }

  const onPressSaveEdit = () => {
    if(onPressType === "id"){
      editManagerID(editedItem);
      setIsModalVisible(false);
    }
    else if(onPressType === "name"){
      editManagerName(editedItem);
      setIsModalVisible(false);
    }
  }

  const editManagerID = () => {
      const newData = tableData.map((item) => {
        if(item.id === editedItem){
          //get employee's uid
          //remove from old manager's list

          //add to new manager's list

          //update employee's manager record

          item.managerID = inputText;
          return item;
        }
        return item;
      });
      setFilteredData(newData);
  }

  const editManagerName = () => {
      const newData = tableData.map((item) => {
        if(item.id === editedItem){
          item.managerName = inputText;
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
      <Text>Click on the table header to search</Text>
      <DataTable>
      <DataTable.Header>
          
          <View><TouchableOpacity><TextInput
            placeholder="ID"
            style={{height: 40, width: Platform.OS === 'android' ? 25:150, fontWeight: 'bold'}}
            onChangeText={(text) => searchEmployeeID(text)} /></TouchableOpacity></View>
          <View><TouchableOpacity><TextInput
            placeholder="Name"
            style={{height: 40, width: Platform.OS === 'android' ? 100:250, fontWeight: 'bold'}}
            onChangeText={(text) => searchEmployeeName(text)} /></TouchableOpacity></View>
          <View><TouchableOpacity><TextInput
            placeholder="Email"
            style={{height: 40, width: Platform.OS === 'android' ? 100:250, fontWeight: 'bold'}}
            onChangeText={(text) => searchEmail(text)} /></TouchableOpacity></View>
          <View><TouchableOpacity><TextInput
            placeholder="Manager ID"
            style={{height: 40, width: Platform.OS === 'android' ? 100:250, fontWeight: 'bold'}}
            onChangeText={(text) => searchManagerID(text)} /></TouchableOpacity></View>
          <View><TouchableOpacity><TextInput
            placeholder="Manager Name"
            style={{height: 40, width: Platform.OS === 'android' ? 100:250, fontWeight: 'bold'}}
            onChangeText={(text) => searchManagerName(text)} /></TouchableOpacity></View>
          <View><TouchableOpacity><TextInput
            placeholder="Vaccinated"
            style={{height: 40, width: Platform.OS === 'android' ? 100:250, fontWeight: 'bold'}}
            onChangeText={(text) => searchVaccinated(text)} /></TouchableOpacity></View>
          <View><TouchableOpacity><TextInput
            placeholder="ART Result"
            style={{height: 40, width: Platform.OS === 'android' ? 100:250, fontWeight: 'bold'}}
            onChangeText={(text) => searchArtResult(text)} /></TouchableOpacity></View>
        </DataTable.Header>

        <FlatList
          data={filteredData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            
            <DataTable.Row>
              <View style={{width: Platform.OS === 'android' ? 25:150}}><Text>{item.id}</Text></View>
              <View style={{width: Platform.OS === 'android' ? 100:250}}><Text>{item.name}</Text></View>
              <View style={{width: Platform.OS === 'android' ? 100:250}}><Text>{item.email}</Text></View>
              <TouchableOpacity onPress={()=> onPressManagerID(item)} style={{width: Platform.OS === 'android' ? 100:250}}>
                <Text>{item.managerID}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=> onPressManagerName(item)} style={{width: Platform.OS === 'android' ? 100:250}}>
                <Text>{item.managerName}</Text>
              </TouchableOpacity>
              <View style={{width: Platform.OS === 'android' ? 100:250}}><Text>{item.vaccinated}</Text></View>
              <View style={{width: Platform.OS === 'android' ? 100:250}}><Text>{item.artResult}</Text></View>
            </DataTable.Row>
          )}
        />
        <Modal
          animationType='slide'
          transparent={true}
          visible={isModalVisible}
          onRequestClose={() => setIsModalVisible(false)}
        >
          <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Change Text:</Text>
            <TextInput
            style={styles.modalInput}
            onChangeText={(text) => setInputText(text)}
            defaultValue={inputText}></TextInput>
          
          <TouchableOpacity
            style={styles.modalSaveButton}
            onPress={()=> onPressSaveEdit()}>
              <Text style={{color: 'white', fontWeight: 'bold'}}>Save Edit</Text>
          </TouchableOpacity>
          </View>
          </View>
        </Modal>
      </DataTable>
      </View>
    </ScrollView>
    </SafeAreaView>
  );
}
export default EmployeeInfoScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#51a4fb',
  },

  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
    paddingLeft: 10
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },

  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    elevation: 24
  },

  modalText: {
    fontSize: 15,
    textAlign: 'center',
  },

  modalInput: {
    fontSize: 15,
    height: 30,
    width: 100,
    borderWidth: 1,
    borderColor: 'grey',
    marginTop: 20,
  }, 

  modalSaveButton: {
    backgroundColor: '#51a4fb',
    borderRadius: 20,
    padding: 10,
    marginTop: 20,
    elevation: 2
  }

});