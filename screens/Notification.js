import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { ActivityIndicator, DataTable } from 'react-native-paper';
import firebase from 'firebase';
import "firebase/firestore";

const NotificationScreen = ({ navigation }) => {
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
                ARTResult: doc.data().name
              }
            )
          setData(employee)
          setIsLoading(false)
        })
        
        
    setIsLoading(false)}
    fetchEmployee();
  }, [orgId])

  const [data, setData] = useState([])


if (isLoading){
  return <ActivityIndicator />
}

  return (
    <SafeAreaView>
    <ScrollView>
    <View>

        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={{padding: 20}}>
                <Text>Employee ID: {item.id}</Text>
                <Text>Employee Name: {item.name}</Text>
                <Text style={{fontSize: 15}}>tested positve for ART on {item.ARTDate}</Text>
                
            </View>
          )}
          ItemSeparatorComponent={()=>{return(<View style={styles.divider}/>)}}
        />
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