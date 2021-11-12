import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, Button, Linking } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { ActivityIndicator,DataTable, Switch, Colors, Subheading } from 'react-native-paper';

import firebase from 'firebase';
import "firebase/firestore";
import * as WebBrowser from 'expo-web-browser';

const VerifyARTScreen = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [orgId, setOrgId]= useState();
  const [webResult, setWebResult] = useState(null);
  const [counterRefresh, setCounterRefresh] = useState(0);

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
        .collection('employees').where("vaccinationVerified","==","Unverified")
        .get()

    snapshot2.docs.map(function(doc){
            console.log(doc.data().name+doc.data().ARTVerified)
            employee.push(
              {
                //add employee fields into here
                id: doc.data().id,
                name: doc.data().name,
                result: doc.data().ARTResult,
                num: doc.data().vaccinationDose,
                date: doc.data().ARTDate,
                certificate: doc.data().ARTResultLink,
                verified: doc.data().ARTVerified,
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



  const [tableData, setTableData] = useState([])

  const [filteredData, setFilteredData] = useState([])

  
  const [value, setValue] = React.useState(false);

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

  const processART = (uid, choice)=>{
    firebase.firestore()
        .collection('organisations')
        .doc(orgId)
        .collection("employees")
        .doc(uid)
        .update({
            "ARTVerified": choice,
        }).then((function () {
            alert('ART results successfully '+choice+'!')
            setCounterRefresh(counterRefresh+1)
        }))
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
            placeholder="ART Status"
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
              <DataTable.Cell>{item.department}</DataTable.Cell>
              <DataTable.Cell>{item.vaccinated}</DataTable.Cell>
              <DataTable.Cell>{item.num}</DataTable.Cell>
              <DataTable.Cell>{item.date}</DataTable.Cell>
              <DataTable.Cell>{item.certificate?<Button title="Download" onPress={()=>{_handlePressButtonAsync(item.certificate)}}/>:<Text>No Certificate Found</Text>}</DataTable.Cell>
              <DataTable.Cell>
               {/*<Switch
                 value={value}
                   onValueChange={() => setValue(!value)}
                />
                 <Subheading>{switchValueLabel}</Subheading>*/}
                 <Button title="Accept" onPress={()=>{processART(item.uid, 'Verified')}}/> <Button title="Reject" onPress={()=>{processART(item.uid, 'Rejected')}}/>
                 </DataTable.Cell>
            </DataTable.Row>
          )}
        />
      </DataTable>
      <View style={styles.container}>
    </View>
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