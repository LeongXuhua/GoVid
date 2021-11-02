import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View, SafeAreaView, TextInput } from "react-native";
import { Dimensions } from "react-native";
import { DataTable } from 'react-native-paper';
import ActivityRings from "react-native-activity-rings";
import { FlatList } from "react-native-gesture-handler";

const OrgAdminHomeScreen = ({ navigation }) => {
  const windowWidth = Dimensions.get('screen').width;
  const [configRing, setConfigRing] = useState(true);
  const [ring, setRing] = useState();
  const fullyVacData = [
    { value: 0.8, label: " ", color: "#69b947", backgroundColor: "#cccccc" }
  ];
  const partiallyVacData = [
    { value: 0.1, label: " ", color: "#cb5f18", backgroundColor: "#cccccc" },
  ];
  const notVacData = [
    { value: 0.1, label: " ", color: "#86040f", backgroundColor: "#cccccc" },
  ];

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




  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>

        <Text style={styles.title}>Overview</Text>
        {configRing ? ringConfig() : null}
        <View style={styles.overiewContainer}>
          <View style={styles.overviewBox}>
            <Text style={styles.titleBox}>Vaccinated Fully</Text>
            <Text style={styles.descriptionBox}>Percent of employee that have been fully vaccinated</Text>
            <ActivityRings legend={true} data={fullyVacData} config={ring} theme={"light"} />
            <Text style={styles.descriptionBox}>80 out of 100</Text>
          </View>
          <View style={styles.overviewBox}>
            <Text style={styles.titleBox}>Vaccinated Partially</Text>
            <Text style={styles.descriptionBox}>Percent of people that have been partially vaccinated</Text>
            <ActivityRings legend={true} data={partiallyVacData} config={ring} theme={"light"} />
            <Text style={styles.descriptionBox}>80 out of 100</Text>
          </View>
          <View style={styles.overviewBox}>
            <Text style={styles.titleBox}>Not Vaccinated</Text>
            <Text style={styles.descriptionBox}>Percent of people that have not been vaccinated</Text>
            <ActivityRings legend={true} data={notVacData} config={ring} theme={"light"} />
            <Text style={styles.descriptionBox}>80 out of 100</Text>
          </View>
        </View>

        <Text style={styles.title}>Today's</Text>
        <View style={styles.overiewContainer}>
          <View style={styles.overviewBox}>
            <Text style={styles.titleBox}>Working in office</Text>
            <Text style={styles.descriptionBox}>Number of employee that are working in your site</Text>
            <Text style={styles.bigNum}>0</Text>
          </View>
          <View style={styles.overviewBox}>
            <Text style={styles.titleBox}>Positive</Text>
            <Text style={styles.descriptionBox}>Number of employee working in office that have tested positive for ART</Text>
            <Text style={styles.bigNum}>4156</Text>
          </View>
          <View style={styles.overviewBox}>
            <Text style={styles.titleBox}>Vaccinated Fully</Text>
            <Text style={styles.descriptionBox}>Percent of employee working in office that have been fully vaccinated</Text>
            <ActivityRings legend={true} data={fullyVacData} config={ring} theme={"light"} />
            <Text style={styles.descriptionBox}>0 of 0</Text>
          </View>

        </View>

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

        </View>
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