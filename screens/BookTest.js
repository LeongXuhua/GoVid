
import React, {useCallback, useEffect, useState} from 'react';
import { Alert, Linking, Button, StyleSheet, Text, View, Image, SafeAreaView} from 'react-native';

const url1 = "https://flu.gowhere.gov.sg/";

const url2 = "abcd://abcd.com";


const BookTestScreen = () => {

//Alert
const openUrl = async (url) => {
    const isSupported = await Linking.canOpenURL(url);
    if(isSupported){
        await Linking.openURL(url);
    } else {
        Alert.alert ('This webpage is not found: ${url}');
    }
}

    return (
      <SafeAreaView style={styles.container}>
        
        <Image source={require("../assets/logo.png")} style={styles.logo}/>
        
        <Text style={styles.welcomeText}> Book Covid Test </Text>

        <Text style={styles.newsTitle}>Select Clinic</Text>

        <View style={styles.menuContainer}>
        <View style={styles.buttonContainer}>
            <Button title="Open One" onPress={() => 
            {
                openUrl(url1)
            }} color = "steelblue" />
        </View>

        <View style={styles.buttonContainer}>
            <Button title="Open Two" onPress={() => 
            {
                openUrl(url2)
            }} color = "steelblue" />
        </View>

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


    menuContainer: {
        backgroundColor: 'pink',
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

    newsTitle: {
        color: "#555555",
        fontSize: 18,
        marginTop: 10,
        marginBottom: 10,
    },

   


  });