import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, Text, View, SafeAreaView, TextInput } from "react-native";
import { Dimensions, ActivityIndicator } from "react-native";
import { DataTable } from 'react-native-paper';
import ActivityRings from "react-native-activity-rings";
import { FlatList } from "react-native-gesture-handler";
import { useIsFocused } from '@react-navigation/core';
import firebase from 'firebase';
import "firebase/firestore";


const OrgAdminHomeScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [orgId, setOrgId]= useState();
  const [org, setOrg]=useState();
  const isFocused = useIsFocused();
  const windowWidth = Dimensions.get('screen').width;
  const [configRing, setConfigRing] = useState(true);
  const [ring, setRing] = useState();
  const [fullyVacData, setFullyVacData] = useState([
    { value: 0.8, label: " ", color: "#69b947", backgroundColor: "#cccccc" }
  ]);
  const [partiallyVacData, setPartiallyVacData] = useState([
    { value: 0.1, label: " ", color: "#cb5f18", backgroundColor: "#cccccc" },
  ]);
  const [notVacData, setNotVacData] = useState([
    { value: 0.1, label: " ", color: "#86040f", backgroundColor: "#cccccc" },
  ]);
  const [officeVacData, setOfficeVacData] = useState([
    { value: 0.1, label: " ", color: "#86040f", backgroundColor: "#cccccc" },
  ]);

  const ringConfig = () => {
    if (windowWidth > 1500) {
      console.log(windowWidth);
      setRing({ width: 150, height: 150, radius: 45, ringSize: 14 });
      setConfigRing(false);
    } else {
      console.log(windowWidth);
      setRing({ width: 50, height: 50, radius: 15, ringSize: 6 });
      setConfigRing(false);
    }
  }

  const [tableData, setTableData] = useState([
    { time: "10.00AM", name: "Mary Tan", email: "abc@test.com", location: "Block A", vaccinated: "Fully Vaccinated", artResult: "Negative" },
    { time: "11.00AM", name: "John Jones", email: "test@test.com", location: "Block B", vaccinated: "Fully Vaccinated", artResult: "Negative" },
    { time: "12.00PM", name: "Bob", email: "zxc@test.com", location: "Block A", vaccinated: "Partially Vaccinated", artResult: "Negative" },
    { time: "13.00PM", name: "Tony Stark", email: "123@test.com", location: "Block D", vaccinated: "Partially Vaccinated", artResult: "Negative" },
  ])

  const [filteredData, setFilteredData] = useState([
    { time: "10.00AM", name: "Mary Tan", email: "abc@test.com", location: "Block A", vaccinated: "Fully Vaccinated", artResult: "Negative" },
    { time: "11.00AM", name: "John Jones", email: "test@test.com", location: "Block B", vaccinated: "Fully Vaccinated", artResult: "Negative" },
    { time: "12.00PM", name: "Bob", email: "zxc@test.com", location: "Block A", vaccinated: "Partially Vaccinated", artResult: "Negative" },
    { time: "13.00PM", name: "Tony Stark", email: "123@test.com", location: "Block D", vaccinated: "Partially Vaccinated", artResult: "Negative" },
  ])

  const searchTime = (text) => {
    if (text) {
      const newData = tableData.filter((item) => {
        const itemData = item.time ? item.time.toUpperCase() : "".toUpperCase();
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
    const fetchEmployee = async()=>{
      if (orgId){
        const employee =[];

        const snapshot2 = await firebase.firestore()
          .collection('organisations')
          .doc(orgId)
          .collection('employees').orderBy("id")
          .get()

        setTableData([]);
        setFilteredData([]);

        var org = {
          vacFull:0,
          vacPartial:0,
          vacNot:0,
          empNum:0,
          empOffice:0,
          empPositive:0,
          empOfficeFull:0,
        }

        snapshot2.docs.map(function(doc){
          employee.push({...doc.data(),})

          //increment employee count
          //org.empNum=org.empNum+1

          //distribute vaccination numbers
          if(doc.data().vaccinationResult=="Fully Vaccinated"){
            org.vacFull=org.vacFull+1;
            if(doc.data().workStatus=="office"){
              org.empOfficeFull=org.empOfficeFull+1;
            };
          }else if(doc.data().vaccinationResult=="Partially Vaccinated"){
            org.vacPartial=org.vacPartial+1;
          }else{
            org.vacNot=org.vacNot+1;
          };
          //distribute work status
          if(doc.data().workStatus=="office"){
            org.empOffice=org.empOffice+1;
          };
          //distribute positive cases
          if(doc.data().ARTResult=="positive"){
            org.empOffice=org.empOffice+1;
          };
          setTableData(employee);
          setFilteredData(employee);
        })

        //tabulate employee count
        org.empNum=org.vacPartial+org.vacFull+org.vacNot;
        setOrg(org);
        setFullyVacData([
          { value: org.vacFull/org.empNum, label: " ", color: "#69b947", backgroundColor: "#cccccc" }
        ])
        setPartiallyVacData([
          { value: org.vacPartial/org.empNum, label: " ", color: "#cb5f18", backgroundColor: "#cccccc" },
        ]);
        setNotVacData([
          { value: org.vacNot/org.empNum, label: " ", color: "#86040f", backgroundColor: "#cccccc" },
        ]);
        setOfficeVacData([
          { value: org.empOfficeFull/org.empOffice, label: " ", color: "#69b947", backgroundColor: "#cccccc" }
        ])
        setIsLoading(false)}
      }
    fetchEmployee();
  }, [orgId, isFocused])

  if (isLoading){
    return <ActivityIndicator />
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Overview</Text>
        {configRing ? ringConfig() : null}
        <View style={styles.overiewContainer}>
          <View style={styles.overviewBox}>
            <Text style={styles.titleBox}>Vaccinated Fully</Text>
            <Text style={styles.descriptionBox}>Percentage of employee that have been fully vaccinated</Text>
            <ActivityRings legend={true} data={fullyVacData} config={ring} theme={"light"} />
            <Text style={styles.descriptionBox}>{org?org.vacFull:"NIL"} out of {org?org.empNum:"NIL"}</Text>
          </View>
          <View style={styles.overviewBox}>
            <Text style={styles.titleBox}>Vaccinated Partially</Text>
            <Text style={styles.descriptionBox}>Percentage of people that have been partially vaccinated</Text>
            <ActivityRings legend={true} data={partiallyVacData} config={ring} theme={"light"} />
            <Text style={styles.descriptionBox}>{org?org.vacPartial:"NIL"} out of {org?org.empNum:"NIL"}</Text>
          </View>
          <View style={styles.overviewBox}>
            <Text style={styles.titleBox}>Not Vaccinated</Text>
            <Text style={styles.descriptionBox}>Percentage of people that have not been vaccinated</Text>
            <ActivityRings legend={true} data={notVacData} config={ring} theme={"light"} />
            <Text style={styles.descriptionBox}>{org?org.vacNot:"NIL"} out of {org?org.empNum:"NIL"}</Text>
          </View>
        </View>

        <Text style={styles.title}>Today's</Text>
        <View style={styles.overiewContainer}>
          <View style={styles.overviewBox}>
            <Text style={styles.titleBox}>Working in office</Text>
            <Text style={styles.descriptionBox}>Number of employee that are working in your site</Text>
            <Text style={styles.bigNum}>{org?org.empOffice:"NIL"}</Text>
          </View>
          <View style={styles.overviewBox}>
            <Text style={styles.titleBox}>Positive</Text>
            <Text style={styles.descriptionBox}>Number of employee working in office that have tested positive for ART</Text>
            <Text style={styles.bigNum}>{org?org.empPositive:"NIL"}</Text>
          </View>
          <View style={styles.overviewBox}>
            <Text style={styles.titleBox}>Vaccinated Fully</Text>
            <Text style={styles.descriptionBox}>Percentage of employee working in office that have been fully vaccinated</Text>
            <ActivityRings legend={true} data={officeVacData} config={ring} theme={"light"} />
            <Text style={styles.descriptionBox}>{org?org.empOfficeFull:"NIL"} of {org?org.empOffice:"NIL"}</Text>
          </View>

        </View>
{/*
        <View>
          <Text style={styles.title}>Check-In's</Text>
          <DataTable style={styles.table}>
            <DataTable.Header>
              <DataTable.Title><TextInput
                placeholder="Time"
                style={{padding: 2.5}}
                onChangeText={(text) => searchTime(text)} /></DataTable.Title>
              <DataTable.Title><TextInput
                placeholder="Name"
                style={{padding: 2.5}}
                onChangeText={(text) => searchName(text)} /></DataTable.Title>
              <DataTable.Title><TextInput
                placeholder="Email"
                style={{padding: 2.5}}
                onChangeText={(text) => searchEmail(text)} /></DataTable.Title>
              <DataTable.Title><TextInput
                placeholder="Check-In Location"
                style={{padding: 2.5}}
                onChangeText={(text) => searchLocation(text)} /></DataTable.Title>
              <DataTable.Title><TextInput
                placeholder="Vaccinated"
                style={{padding: 2.5}}
                onChangeText={(text) => searchVaccinated(text)} /></DataTable.Title>
              <DataTable.Title><TextInput
                placeholder="ART Result"
                style={{padding: 2.5}}
                onChangeText={(text) => searchArtResult(text)} /></DataTable.Title>
            </DataTable.Header>

            <FlatList
              data={filteredData}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <DataTable.Row>
                  <DataTable.Cell>{item.time}</DataTable.Cell>
                  <DataTable.Cell>{item.name}</DataTable.Cell>
                  <DataTable.Cell>{item.email}</DataTable.Cell>
                  <DataTable.Cell>{item.location}</DataTable.Cell>
                  <DataTable.Cell>{item.vaccinated}</DataTable.Cell>
                  <DataTable.Cell>{item.artResult}</DataTable.Cell>
                </DataTable.Row>
              )}
            />
          </DataTable>

              </View>*/}
      </ScrollView>
    </SafeAreaView>
  );
}
export default OrgAdminHomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#51a4fb",
  },

  overiewContainer: {
    flexDirection: "row",
    marginBottom: 10
  },

  overviewBox: {
    backgroundColor: "white",
    width: "30%",
    height: "100%",
    borderRadius: 25,
    marginLeft: 10,
    padding: 10,
  },

  titleBox: {
    fontSize: 18,
    fontWeight: "bold"
  },

  descriptionBox: {
    fontSize: 12,
    color: "grey",
  },

  bigNum: {
    fontWeight: "bold",
    fontSize: 38,
    textAlign: "center",
    marginTop: 30,
  },

  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
    paddingLeft: 10
  },

  table: {
    height: 400,
    backgroundColor: "white"
  },

  textHeader: {
    fontWeight: "bold"
  },
  textRow: {
    fontSize: 16,
    alignContent: "center"
  }
});