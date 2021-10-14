
import React, {useCallback, useEffect, useState} from 'react';
import { Alert, Linking, Button, StyleSheet, Text, View, Image, SafeAreaView} from 'react-native';

const url1 = "https://flu.gowhere.gov.sg/";

const url3 = "https://www.parkwaydigihealth.com/sdh/book-covid19-test?source=PSPL";

const url4 = "https://www.centralclinic.com.sg/book-antigen-rapid-test"

const number = `+65 67819033`
{/*
const zoom = Platform.select ({
    default: 'https://zoom.us/signin',
});*/}



const BookTestScreen = () => {

//Alert
const openUrl = async (url) => {
    const isSupported = await Linking.canOpenURL(url);
    if(isSupported){
        await Linking.openURL(url);
    } else {
        Alert.alert (`This webpage is not found: ${url}`);
    }
}

    return (
      <SafeAreaView style={styles.container}>
        
        <Image source={require("../assets/logo.png")} style={styles.logo}/>
        
        <Text style={styles.welcomeText}> Book Covid Test </Text>

      
        <View style={styles.buttonContainer}>
            <Button title="Search Nearby Clinic" onPress={() => 
            {
                openUrl(url1)
            }} color = "steelblue" />
        </View>

        <Text style={styles.welcomeText}>Select a Clinic </Text>
      

        <View style={styles.buttonContainer}>
            <Button title="Parkway Shenton" onPress={() => 
            {
                openUrl(url3)
            }} color = "steelblue" />
        </View>

        <View style={styles.buttonContainer}>
            <Button title="24H Central Clinic Group" onPress={() => 
            {
                openUrl(url4)
            }} color = "steelblue" />
        </View>

        <View style={styles.buttonContainer}>
            <Button title="Raffles Medical (Changi)" onPress={() => 
            {
                Linking.openURL(`tel: ${number}`)
            }} color = "steelblue" />
        </View>

        
        
  
      </SafeAreaView>
    );
  }

export default BookTestScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#51a4fb',
      alignItems: 'center',
      justifyContent: 'center',

    },

    buttonContainer:
    {
        margin:10
    },

    logo: {
      width: '100%',
      height: '20%',
      resizeMode: 'contain',
    },

    welcomeText: {
        color: "#EEEEEE",
        fontSize: 24,
    },

    header: {
        color: "#FFFFFF",
        fontSize: 18,
        marginTop: 10,
        marginBottom: 10,
        alignItems: 'center',
      justifyContent: 'center',
    },

  });