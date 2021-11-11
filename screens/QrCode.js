
import React, {useCallback, useEffect, useState} from 'react';
import { Alert, Linking, Button, StyleSheet, Text, View, Image, SafeAreaView} from 'react-native';
import QRCode from 'react-native-qrcode-svg';


const QrCodeScreen = ({route}) => {
    return (
      <SafeAreaView style={styles.container}>        
        <Text style={styles.welcomeText}> {route.params.location} </Text>

        <QRCode 
          value={route.params.location}
        />


      </SafeAreaView>
    );
  }

export default QrCodeScreen;

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
        backgroundColor: '#51a4fb',
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