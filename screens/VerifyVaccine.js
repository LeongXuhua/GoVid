import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, Button, Platform } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { ActivityIndicator,DataTable, Switch, Colors, Subheading } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/core';
import firebase from 'firebase';
import "firebase/firestore";
import * as WebBrowser from 'expo-web-browser';

const VerifyVaccineScreen = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [orgId, setOrgId]= useState();
  const [webResult, setWebResult] = useState(null);
  const [counterRefresh, setCounterRefresh] = useState(0);
  const isFocused = useIsFocused();
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
      if (orgId){
        const employee =[];

        const snapshot2 = await firebase.firestore()
          .collection('organisations')
          .doc(orgId)
          .collection('employees').where("vaccinationVerified","==","Unverified")
          .get()

        setTableData([]);
        setFilteredData([]);

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
              verified: doc.data().vaccinationVerified,
              uid: doc.id,
            }
          )
          setTableData(employee)
          setFilteredData(employee)
          setIsLoading(false)
        })
        setIsLoading(false)}
      }
    fetchEmployee();
  }, [orgId, isFocused, counterRefresh])



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

  const processVaccine = (uid, choice)=>{
    firebase.firestore()
        .collection('organisations')
        .doc(orgId)
        .collection("employees")
        .doc(uid)
        .update({
            "vaccinationVerified": choice,
        }).then((function () {
            alert('Vaccination results successfully '+choice+'!')
            setCounterRefresh(counterRefresh+1)
        }))
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

          <View><TouchableOpacity><TextInput
            placeholder="ID"
            style={{height: 40, width: Platform.OS === 'android' ? 25:150, fontWeight: 'bold'}}
            onChangeText={(text) => searchEmployeeID(text)} /></TouchableOpacity></View>
          <View><TouchableOpacity><TextInput
            placeholder="Name"
            style={{height: 40, width: Platform.OS === 'android' ? 100:250, fontWeight: 'bold'}}
            onChangeText={(text) => searchEmployeeName(text)} /></TouchableOpacity></View>
            <View><TouchableOpacity><TextInput
            placeholder="Vaccine Status"
            style={{height: 40, width: Platform.OS === 'android' ? 100:250, fontWeight: 'bold'}}
            onChangeText={(text) => searchEmployeeVaccinated(text)} /></TouchableOpacity></View>
            <View><TouchableOpacity><TextInput
            placeholder="No. of Dose"
            style={{height: 40, width: Platform.OS === 'android' ? 100:250, fontWeight: 'bold'}}
            onChangeText={(text) => searchEmployeeNum(text)} /></TouchableOpacity></View>
            <View><TouchableOpacity><TextInput
            placeholder="Date"
            style={{height: 40, width: Platform.OS === 'android' ? 100:250, fontWeight: 'bold'}}
            onChangeText={(text) => searchEmployeeDate(text)} /></TouchableOpacity></View>
            <View><TouchableOpacity><TextInput
            placeholder="Certificate"
            style={{height: 40, width: Platform.OS === 'android' ? 100:250, fontWeight: 'bold'}}
            onChangeText={(text) => searchEmployeeCertificate(text)} /></TouchableOpacity></View>
           <View><TouchableOpacity><TextInput
            placeholder="Action"
            style={{height: 40, width: Platform.OS === 'android' ? 100:250, fontWeight: 'bold'}}
             /></TouchableOpacity></View>

       
        </DataTable.Header>

        <FlatList
          data={filteredData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <DataTable.Row>
              <View style={{width: Platform.OS === 'android' ? 25:150}}><Text>{item.id}</Text></View>
              <View style={{width: Platform.OS === 'android' ? 100:250}}><Text>{item.name}</Text></View>
              <View style={{width: Platform.OS === 'android' ? 100:250}}><Text>{item.vaccinated}</Text></View>
              <View style={{width: Platform.OS === 'android' ? 100:250}}><Text>{item.num}</Text></View>
              <View style={{width: Platform.OS === 'android' ? 100:250}}><Text>{item.date}</Text></View>
              <View>{item.certificate?<Button title="Download" onPress={()=>{_handlePressButtonAsync(item.certificate)}}/>:<Text>No Certificate Found</Text>}</View>
              <View style={styles.fixToText}>
                 <Button title="Accept" onPress={()=>{processVaccine(item.uid, 'Verified')}}/> 
                 <View style={{paddingLeft: 10}}>
                 <Button title="Reject" onPress={()=>{processVaccine(item.uid, 'Rejected')}}/>
                 </View>
              </View>
            </DataTable.Row>
          )}
        />
      </DataTable>
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
  
  fixToText: {
    flexDirection: 'row',
    paddingLeft: Platform.OS === 'android' ? 15:150,
    height: 35
  },
});