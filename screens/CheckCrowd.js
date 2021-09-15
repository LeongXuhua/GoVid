import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, Button, TextInput } from 'react-native';

const CheckCrowdScreen = ({navigation}) => {

  const [location, setLocation] = useState('');

  return (

    <SafeAreaView style={styles.container}>

      <Image source={require("../assets/logo.png")} style={styles.logo}/>
      

      <Image source={require("../assets/logo.png")} style={styles.logo}/>
      

      <View style={styles.crowdTitleView}>
        <Text style={styles.crowdTitle}>
          Check crowd at location
        </Text>
      </View>

      <View style={styles.inputLabelView}>
        <Text style={styles.inputLabel}>
          Enter Search Location 
        </Text>
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="location"
          placeholderTextColor="grey"
          onChangeText={(location) => setLocation(location)}
        />

        <Button title="Search" style={styles.inputButton}/>
      </View>

      

      <View style={styles.tableContainer}>
        <View style={styles.tableRowHeader}>
          <View style={styles.tableLocationHeader}>
            <Text> Location </Text>
          </View>
          <View style={styles.tablePaxHeader}>
            <Text> Pax </Text>
          </View>
        </View>

        <View style={styles.tableRow}>
          <View style={styles.tableLocation}>
            <Text> OurTampinesHub </Text>
          </View>
          <View style={styles.tablePax}>
            <Text> 856 </Text>
          </View>
        </View>

        <View style={styles.tableRow}>
          <View style={styles.tableLocation}>
            <Text> TampinesOne </Text>
          </View>
          <View style={styles.tablePax}>
            <Text> 485 </Text>
          </View>
        </View>

        <View style={styles.tableRow}>
          <View style={styles.tableLocation}>
            <Text> Tampines Mall </Text>
          </View>
          <View style={styles.tablePax}>
            <Text> 637 </Text>
          </View>
        </View>

      </View>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

export default CheckCrowdScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#51a4fb',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  logo: {
    width: '100%',
    height: '20%',
    resizeMode: 'contain',
  },

  crowdTitle: {
    width: "70%",
    color: "#AAAAAA",
    fontSize: 28,
  },

  crowdTitleView: {
    justifyContent: 'center',
  },

  inputLabel: {
    width: "70%",
    justifyContent: 'flex-start',
  },

  inputLabelView: {
    width: "70%",
    justifyContent: 'flex-start',
  },

  inputView: {
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
    flexDirection: "row",
  },
  
  TextInput: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    flex: 7,
    padding: 10,
    marginRight: 5,
  },

  inputButton: {
    flex: 3,
    borderRadius: 10,
    alignItems: "flex-end",
  },

  tableContainer: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: "70%",
  },

  tableRowHeader: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: "100%",
    flexDirection: 'row',
    borderColor: 'black',
  },
  tableLocationHeader: {
    flex: 8,
    backgroundColor: 'green',
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: "100%",
    flexDirection: 'row',
    borderColor: 'black',
    borderWidth: 1,
  },

  tablePaxHeader: {
    flex: 2,
    backgroundColor: 'green',
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: "100%",
    flexDirection: 'row',
    borderColor: 'black',
    borderWidth: 1,
  },

  tableRow: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: "100%",
    flexDirection: 'row',
  },

  tableLocation: {
    flex: 8,
    backgroundColor: 'white',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: "100%",
    flexDirection: 'row',
    borderWidth: 1,
  },

  tablePax: {
    flex: 2,
    backgroundColor: 'white',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    width: "100%",
    flexDirection: 'row',
    borderWidth: 1,
  },

});
