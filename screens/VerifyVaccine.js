import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, Button, Linking } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { ActivityIndicator, DataTable } from 'react-native-paper';
import firebase from 'firebase';
import "firebase/firestore";
import * as WebBrowser from 'expo-web-browser';

const VerifyVaccineScreen = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [orgId, setOrgId]= useState();
  const [webResult, setWebResult] = useState(null);

  const _handlePressButtonAsync = async (url) => {
    console.log(url)
    const webResult = await WebBrowser.openBrowserAsync(url);
    setWebResult(webResult);
    console.log(webResult)
  };

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
                vaccinated: doc.data().vaccinationResult,
                num: doc.data().vaccinationDose,
                date: doc.data().vaccinationDate,
                certificate: doc.data().vaccinationResultLink,
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
    { id: "12388", name:"Mary Tan", department:"Finance", vaccinated:"Yes", num: "2", date:"08/08/2021", certificate: "vaccine1.jpg"   },
    {  id: "12399", name:"John Jones", department:"HR", vaccinated:"Yes", num: "2", date:"09/09/2021", certificate: "vaccine1.jpg"   },
    { id: "12377", name:"Bruce Wayne", department:"Logistics", vaccinated:"No", num: "2", date:"07/07/2021", certificate: "vaccine1.jpg"   },
    { id: "12366", name:"Tony Stark",  department:"Research", vaccinated:"Yes", num: "3", date:"06/06/2021", certificate: "vaccine1.jpg"   },
    
  ])

  const [filteredData, setFilteredData] = useState([
    { id: "12388", name:"Mary Tan", department:"Finance", vaccinated:"Yes", num: "2", date:"08/08/2021", certificate: "vaccine1.jpg"   },
    {  id: "12399", name:"John Jones", department:"HR", vaccinated:"Yes", num: "2", date:"09/09/2021", certificate: "vaccine1.jpg"   },
    { id: "12377", name:"Bruce Wayne", department:"Logistics", vaccinated:"No", num: "2", date:"07/07/2021", certificate: "vaccine1.jpg"   },
    { id: "12366", name:"Tony Stark",  department:"Research", vaccinated:"Yes", num: "3", date:"06/06/2021", certificate: "vaccine1.jpg"   },
    
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



  if (isLoading){
    return <ActivityIndicator />
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
            placeholder="Vaccine Status"
            style={{padding: 2.5, width: 100}}
            onChangeText={(text) => searchEmployeeVaccinated(text)} /></TouchableOpacity></DataTable.Title>
            <DataTable.Title><TouchableOpacity><TextInput
            placeholder="No. of Dose"
            style={{padding: 2.5, width: 100}}
            onChangeText={(text) => searchEmployeeNum(text)} /></TouchableOpacity></DataTable.Title>
            <DataTable.Title><TouchableOpacity><TextInput
            placeholder="Date"
            style={{padding: 2.5, width: 100}}
            onChangeText={(text) => searchEmployeeDate(text)} /></TouchableOpacity></DataTable.Title>
            <DataTable.Title><TouchableOpacity><TextInput
            placeholder="Certificate"
            style={{padding: 2.5, width: 100}}
            onChangeText={(text) => searchEmployeeCertificate(text)} /></TouchableOpacity></DataTable.Title>
       
       
       
       
        </DataTable.Header>

        <FlatList
          data={filteredData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <DataTable.Row>
              <DataTable.Cell>{item.id}</DataTable.Cell>
              <DataTable.Cell>{item.name}</DataTable.Cell>
              <DataTable.Cell>{item.department}</DataTable.Cell>
              <DataTable.Cell>{item.vaccinated}</DataTable.Cell>
              <DataTable.Cell>{item.num}</DataTable.Cell>
              <DataTable.Cell>{item.date}</DataTable.Cell>
              <DataTable.Cell>{item.certificate?<Button title="Download" onPress={()=>{_handlePressButtonAsync(item.certificate)}}/>:<Text>No Certificate Found</Text>}</DataTable.Cell>
            </DataTable.Row>
          )}
        />
      </DataTable>
      <View style={styles.container}>
        <Text> SAMPLE TEXT HERE </Text>
      <Text>{webResult && JSON.stringify(webResult)}</Text>
    </View>
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