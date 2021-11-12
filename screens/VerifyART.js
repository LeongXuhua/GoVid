import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, Button, Platform } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { ActivityIndicator,DataTable, Switch, Colors, Subheading } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/core';
import firebase from 'firebase';
import "firebase/firestore";
import * as WebBrowser from 'expo-web-browser';

const VerifyARTScreen = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [orgId, setOrgId]= useState();
  const [webResult, setWebResult] = useState(null);
  const [counterRefresh, setCounterRefresh] = useState(false);
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
            .collection('employees').where("ARTVerified","==","Unverified")
            .get()

        setTableData([]);
        setFilteredData([]);

        snapshot2.docs.map(function(doc){
                employee.push(
                  {
                    //add employee fields into here
                    id: doc.data().id,
                    name: doc.data().name,
                    result: doc.data().ARTResult,
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
        setIsLoading(false)
      }
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

  const searchEmployeeResult = (text) => {
    if (text) {
      const newData = tableData.filter((item) => {
        const itemData = item.result ? item.result.toUpperCase() : "".toUpperCase();
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
    setCounterRefresh(!counterRefresh);
    firebase.firestore()
        .collection('organisations')
        .doc(orgId)
        .collection("employees")
        .doc(uid)
        .update({
            "ARTVerified": choice,
        }).then((function () {
            alert('ART results successfully '+choice+'!')
        }
        ));
    setCounterRefresh(!counterRefresh);
  }



  if (isLoading){
    return <ActivityIndicator />
  }

  return (
    <SafeAreaView>
    <ScrollView horizontal>
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
            placeholder="ART Status"
            style={{height: 40, width: Platform.OS === 'android' ? 100:250, fontWeight: 'bold'}}
            onChangeText={(text) => searchEmployeeResult(text)} /></TouchableOpacity></View>
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
              <View style={{width: Platform.OS === 'android' ? 100:250}}><Text>{item.result}</Text></View>
              <View style={{width: Platform.OS === 'android' ? 100:250}}><Text>{item.date}</Text></View>
              <View>{item.certificate?<Button title="Download" onPress={()=>{_handlePressButtonAsync(item.certificate)}}/>:<Text>No Certificate Found</Text>}</View>
              <View style={styles.fixToText}>
                 <Button title="Accept" onPress={()=>{processART(item.uid, 'Verified')}}/> 
                 <View style={{paddingLeft: 10}}>
                 <Button title="Reject" onPress={()=>{processART(item.uid, 'Rejected')}}/>
                 </View>
              </View>
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
  
  fixToText: {
    flexDirection: 'row',
    paddingLeft: Platform.OS === 'android' ? 15:150,
    height: 35
  },
});