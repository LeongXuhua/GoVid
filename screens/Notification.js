import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { ActivityIndicator, DataTable } from 'react-native-paper';
import firebase from 'firebase';
import "firebase/firestore";
import { useIsFocused } from '@react-navigation/core';

const NotificationScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [orgId, setOrgId]= useState();
  const isFocused = useIsFocused();

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
    setIsLoading(true);
    const fetchEmployee = async()=>{
      if(orgId){
        const employee =[];
        setData([])
        const snapshotART = await firebase.firestore()
          .collection('organisations')
          .doc(orgId)
          .collection('employees').where("ARTVerified","==","Unverified")
          .get()
        snapshotART.docs.map(function(doc){
          employee.push(
            {
              //add employee fields into here
              id: doc.data().id,
              name: doc.data().name,
              verifyType: 'ART',
            }
          )
          setData(employee)
        })

        const snapshotVaccination = await firebase.firestore()
          .collection('organisations')
          .doc(orgId)
          .collection('employees').where("vaccinationVerified","==","Unverified")
          .get()
        snapshotVaccination.docs.map(function(doc){
          employee.push(
            {
              //add employee fields into here
              id: doc.data().id,
              name: doc.data().name,
              verifyType: 'Vaccine',
            }
          )
          setData(employee)
        }) 
        setIsLoading(false)
      }
    }
    fetchEmployee();
  }, [orgId, isFocused])

  const [data, setData] = useState([])


if (isLoading){
  return <ActivityIndicator />
}

  return (
    <SafeAreaView>
    <ScrollView>
    <View>
      {data.length<1?<Text>There are no notifications</Text>:<FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={{padding: 20}}>
              <TouchableOpacity
                onPress={()=>navigation.navigate('Verify'+item.verifyType)}>
                <Text>Employee ID: {item.id}</Text>
                <Text>Employee Name: {item.name}</Text>
                <Text style={{fontSize: 15}}>updated record for: {item.verifyType}</Text>
              </TouchableOpacity>
            </View>
          )}
          ItemSeparatorComponent={()=>{return(<View style={styles.divider}/>)}}
        />}
        
      </View>
    </ScrollView>
    </SafeAreaView>
  );
}
export default NotificationScreen;

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
  
  divider:{
    height: 1,
    backgroundColor: "#CED0CE",
  }
});