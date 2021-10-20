import React, { useState } from "react";
import {  ScrollView,  StyleSheet,  Text,  View,  SafeAreaView,} from "react-native";
import { Dimensions } from "react-native";
import { DataTable } from 'react-native-paper';
import ActivityRings from "react-native-activity-rings"; 

const HealthDeclarationScreen = ({navigation}) => {
    const windowWidth = Dimensions.get('screen').width;
    const [configRing, setConfigRing] = useState(true);
    const [ring, setRing] = useState();
      const fullyVacData = [ 
        { value: 0.8, label: " " , color: "#69b947", backgroundColor: "#cccccc" }
      ];
      const partiallyVacData = [ 
        { value: 0.1, label: " ", color: "#cb5f18", backgroundColor: "#cccccc" },
      ];
      const notVacData = [ 
        { value: 0.1, label: " ", color: "#86040f", backgroundColor: "#cccccc" },
      ];

      const ringConfig = () => {
        if(windowWidth > 1500){
          console.log(windowWidth);
          setRing({width: 150, height: 150, radius: 45, ringSize: 14});
          setConfigRing(false);
        }else {
          console.log(windowWidth);
          setRing({width: 50, height: 50, radius: 15, ringSize: 6});
          setConfigRing(false);
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
                <ActivityRings legend={true} data={fullyVacData} config={ring} theme={"light"}/>
                <Text style={styles.descriptionBox}>80 out of 100</Text>
              </View>
              <View style={styles.overviewBox}>
                <Text style={styles.titleBox}>Vaccinated Partially</Text>
                <Text style={styles.descriptionBox}>Percent of people that have been partially vaccinated</Text>
                <ActivityRings legend={true} data={partiallyVacData} config={ring} theme={"light"}/>
                <Text style={styles.descriptionBox}>80 out of 100</Text>
              </View>
              <View style={styles.overviewBox}>
                <Text style={styles.titleBox}>Not Vaccinated</Text>
                <Text style={styles.descriptionBox}>Percent of people that have not been vaccinated</Text>
                <ActivityRings legend={true} data={notVacData} config={ring} theme={"light"}/>
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
                <Text style={styles.descriptionBox}>
                  Number of employee working in office that have tested positive for ART
                </Text>
                <Text style={styles.bigNum}>4156</Text>
              </View>
              <View style={styles.overviewBox}>
                <Text style={styles.titleBox}>Vaccinated Fully</Text>
                <Text style={styles.descriptionBox}>
                  Percent of employee working in office that have been fully vaccinated
                </Text>
                <ActivityRings legend={true} data={fullyVacData} config={ring} theme={"light"}/>
                <Text style={styles.descriptionBox}>0 of 0</Text>
              </View>
              
            </View>
    
            <View>
              <Text style={styles.title}>Check-In's</Text>
              <DataTable style={styles.table}>
        <DataTable.Header>
          <DataTable.Title>Time</DataTable.Title>
          <DataTable.Title>Name</DataTable.Title>
          <DataTable.Title>Email</DataTable.Title>
          <DataTable.Title>Check-In Location</DataTable.Title>
          <DataTable.Title>Vaccinated</DataTable.Title>
          <DataTable.Title>ART Result</DataTable.Title>
        </DataTable.Header>

        <DataTable.Row>
          <DataTable.Cell>10:00AM</DataTable.Cell>
          <DataTable.Cell>John</DataTable.Cell>
          <DataTable.Cell>john@kindacode.com</DataTable.Cell>
          <DataTable.Cell>Block A</DataTable.Cell>
          <DataTable.Cell>Fully Vaccinated</DataTable.Cell>
          <DataTable.Cell>Negative</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
        <DataTable.Cell>10:00AM</DataTable.Cell>
          <DataTable.Cell>Bob</DataTable.Cell>
          <DataTable.Cell>test@test.com</DataTable.Cell>
          <DataTable.Cell>Level 5</DataTable.Cell>
          <DataTable.Cell>Partially Vaccinated</DataTable.Cell>
          <DataTable.Cell>Negative</DataTable.Cell>
        </DataTable.Row>
        </DataTable>
                
            </View>
          </ScrollView>
        </SafeAreaView>
      );
}
export default HealthDeclarationScreen;

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