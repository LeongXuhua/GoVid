import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, Platform, ActivityIndicator } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { DataTable } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/core';
import firebase from 'firebase';
import "firebase/firestore";


const CheckInLogScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [orgId, setOrgId]= useState();
  const isFocused = useIsFocused();
  const [locationLog, setLocationLog] = useState([]);
  const [users, setUsers] = useState({});
  const userDict = {};
  const [userLoaded, setUserLoaded] = useState(false);
  const [logLoaded, setLogLoaded] = useState(false);

  const [tableData, setTableData] = useState([
    /*{ time: "10.00AM", name: "Mary Tan", email: "abc@test.com", location: "Block A", vaccinated: "Fully Vaccinated", ARTResult: "Negative" },
    { time: "11.00AM", name: "John Jones", email: "test@test.com", location: "Block B", vaccinated: "Fully Vaccinated", ARTResult: "Negative" },
    { time: "12.00PM", name: "Bob", email: "zxc@test.com", location: "Block A", vaccinated: "Partially Vaccinated", ARTResult: "Negative" },
    { time: "13.00PM", name: "Tony Stark", email: "123@test.com", location: "Block D", vaccinated: "Partially Vaccinated", ARTResult: "Negative" },
  */])

  const [filteredData, setFilteredData] = useState([
    /*{ time: "10.00AM", name: "Mary Tan", email: "abc@test.com", location: "Block A", vaccinated: "Fully Vaccinated", ARTResult: "Negative" },
    { time: "11.00AM", name: "John Jones", email: "test@test.com", location: "Block B", vaccinated: "Fully Vaccinated", ARTResult: "Negative" },
    { time: "12.00PM", name: "Bob", email: "zxc@test.com", location: "Block A", vaccinated: "Partially Vaccinated", ARTResult: "Negative" },
    { time: "13.00PM", name: "Tony Stark", email: "123@test.com", location: "Block D", vaccinated: "Partially Vaccinated", ARTResult: "Negative" },
  */])

  const searchCheckIn = (text) => {
    if (text) {
      const newData = tableData.filter((item) => {
        const itemData = item.checkIn ? item.checkIn.toUpperCase() : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(newData);
    }
    else {
      setFilteredData(tableData);
    }
  }

  const searchCheckOut = (text) => {
    if (text) {
      const newData = tableData.filter((item) => {
        const itemData = item.checkOut ? item.checkOut.toUpperCase() : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(newData);
    }
    else {
      setFilteredData(tableData);
    }
  }

  const searchName = (text) => {
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

  const searchLocation = (text) => {
    if (text) {
      const newData = tableData.filter((item) => {
        const itemData = item.location ? item.location.toUpperCase() : "".toUpperCase();
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

  const searchARTResult = (text) => {
    if (text) {
      const newData = tableData.filter((item) => {
        const itemData = item.ARTResult ? item.ARTResult.toUpperCase() : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(newData);
    }
    else {
      setFilteredData(tableData);
    }
  }

  const getVar = (uid, field)=>{
    var output = field==='email'
    ?users[uid].email
    :field==='ARTResult'
    ?users[uid].ARTResult
    :field==='vaccinationResult'
    ?users[uid].vaccinationResult
    :null

    return output;
  }

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
    setIsLoading(true)
    const fetchCheckIn = async()=>{
      setLogLoaded(false)
      if (orgId){
        setTableData([]);
        setFilteredData([]);
        
        const snapshot2 = await firebase.firestore()
          .collection('organisations')
          .doc(orgId)
          .collection('check-ins')
          .get()
        
        var checkInLog=[];

        snapshot2.docs.map((doc)=>{
          var checkOut = null;
          if(doc.data().checkOut){
            checkOut = doc.data().checkOut.toDate().toString();
          }
          checkInLog.push({
            id: doc.data().id,
            name: doc.data().name,
            location: doc.data().location,
            checkIn: doc.data().checkIn.toDate().toString(),
            checkOut: checkOut,
            uid: doc.data().uid,
          })
          setTableData(checkInLog)
          setFilteredData(checkInLog)
        })
        setLogLoaded(true)
        }
      }

    const fetchUsers = async()=>{
      setUserLoaded(false)
      if (orgId){
        const snapshot2 = await firebase.firestore()
          .collection('organisations')
          .doc(orgId)
          .collection('employees')
          .get()

        snapshot2.docs.map((doc)=>{
          console.log(doc.data());
          userDict[doc.id]=doc.data();
          setUsers(userDict);
        })
        setUserLoaded(true)
        }
      }
    fetchCheckIn();
    fetchUsers();
  }, [orgId, isFocused])

  useEffect(()=>{
    if(userLoaded&&logLoaded){
      setIsLoading(false)
    }
  },[userLoaded,logLoaded])

  if (isLoading){
    return <ActivityIndicator />
  }
  return (
    <SafeAreaView>
      <Text>Click on the table header to search</Text>
    <ScrollView horizontal>
      
      <DataTable>
        <DataTable.Header>

          <DataTable.Title><TouchableOpacity><TextInput
            placeholder="Check-In"
            style={{padding: 2.5, width: Platform.OS === 'android' ? 100:200, fontWeight: 'bold'}}
            onChangeText={(text) => searchCheckIn(text)} /></TouchableOpacity></DataTable.Title>
            <DataTable.Title><TouchableOpacity><TextInput
            placeholder="Check-Out"
            style={{padding: 2.5, width: Platform.OS === 'android' ? 100:200, fontWeight: 'bold'}}
            onChangeText={(text) => searchCheckOut(text)} /></TouchableOpacity></DataTable.Title>
          <DataTable.Title><TouchableOpacity><TextInput
            placeholder="Name"
            style={{padding: 2.5, width: Platform.OS === 'android' ? 100:200, fontWeight: 'bold'}}
            onChangeText={(text) => searchName(text)} /></TouchableOpacity></DataTable.Title>
          <DataTable.Title><TouchableOpacity><TextInput
            placeholder="Email"
            style={{padding: 2.5, width: Platform.OS === 'android' ? 100:200, fontWeight: 'bold'}}
            onChangeText={(text) => searchEmail(text)} /></TouchableOpacity></DataTable.Title>
          <DataTable.Title><TouchableOpacity><TextInput
            placeholder="Location"
            style={{padding: 2.5, width: Platform.OS === 'android' ? 100:200, fontWeight: 'bold'}}
            onChangeText={(text) => searchLocation(text)} /></TouchableOpacity></DataTable.Title>
          <DataTable.Title><TouchableOpacity><TextInput
            placeholder="Vaccinated"
            style={{padding: 2.5, width: Platform.OS === 'android' ? 100:200, fontWeight: 'bold'}}
            onChangeText={(text) => searchVaccinated(text)} /></TouchableOpacity></DataTable.Title>
          <DataTable.Title><TouchableOpacity><TextInput
            placeholder="ART Result"
            style={{padding: 2.5, width: Platform.OS === 'android' ? 100:200, fontWeight: 'bold'}}
            onChangeText={(text) => searchARTResult(text)} /></TouchableOpacity></DataTable.Title>
        </DataTable.Header>

        <FlatList
          data={filteredData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <DataTable.Row>
              <View style={{width: Platform.OS === 'android' ? 100:200}}><Text>{item.checkIn}</Text></View>
              <View style={{width: Platform.OS === 'android' ? 100:200}}><Text>{item.checkOut}</Text></View>
              <View style={{width: Platform.OS === 'android' ? 100:200}}><Text>{item.name}</Text></View>
              <View style={{width: Platform.OS === 'android' ? 100:200}}><Text>{users[item.uid].email}</Text></View>
              <View style={{width: Platform.OS === 'android' ? 100:200}}><Text>{item.location}</Text></View>
              <View style={{width: Platform.OS === 'android' ? 100:200}}><Text>{users[item.uid].vaccinationResult}</Text></View>
              <View style={{width: Platform.OS === 'android' ? 100:200}}><Text>{users[item.uid].ARTResult}</Text></View>
            </DataTable.Row>
          )}
        />
      </DataTable>
    </ScrollView>
    </SafeAreaView>
  );
}
export default CheckInLogScreen;

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