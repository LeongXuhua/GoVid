
import React from 'react';
import { Alert, Linking, Button, StyleSheet, Text, View, Image, SafeAreaView} from 'react-native';

const url1 = "https://www.mfa.gov.sg/where-are-you-travelling-to";


const TravelInformationScreen = () => {

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
        
        <Text style={styles.welcomeText}> Book Vaccination </Text>

        <View style={styles.menuContainer}>
            <View style={styles.buttonContainer}>
            <Button title="Click for more travel information" onPress={() => 
            {
                openUrl(url1)
            }} color = "steelblue" />
            </View>
        </View>


      </SafeAreaView>
    );
  }

export default TravelInformationScreen;

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