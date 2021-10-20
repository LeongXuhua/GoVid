import React, { useState } from "react";
import {  ScrollView,  StyleSheet,  Text,  View,  SafeAreaView,} from "react-native";
import { DataTable } from 'react-native-paper';

const CheckInLogScreen = ({navigation}) => {

    return (
        <SafeAreaView>
            <ScrollView>
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
export default CheckInLogScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#51a4fb",
    },
});