
import React, {useCallback, useEffect, useState} from 'react';
import { Alert, Linking, Button, StyleSheet, Text, View, Image, SafeAreaView} from 'react-native';

const url1 = "https://preregister.vaccine.gov.sg/";


const CovidTestScreen = () => {
  
    return (
      <SafeAreaView style={styles.container}>
           <Text style={styles.welcomeText}> Covid Test Result </Text>

        <Image source={require("../assets/Sample1.jpeg")} style={styles.logo}/>
        
        <View style={styles.menuContainer}>
            <View style={styles.buttonContainer}>
            <Button title="View Full Cert" onPress={() => 
            {
              
            }} color = "steelblue" />
            </View>
        </View>


    
      </SafeAreaView>
    );
  }

export default CovidTestScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#51a4fb',
      alignItems: 'center',
      justifyContent: 'center',

    },

    buttonContainer:
    {
        margin:-20
    },


    menuContainer: {
        backgroundColor: '#51a4fb',
    },

    logo: {
      width: '80%',
      height: '80%',
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