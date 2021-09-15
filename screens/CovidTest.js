import {StatusBar} from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image} from 'react-native';
import Swiper from 'react-native-swiper';


const CovidTestScreen = () => {
  return (

<View style={styles.container}>
<StatusBar style ="auto" />
<Swiper
dot={
<View style={{
width:10,
height:10,
borderRadius:4,
margin: 5,
backgroundColor: 'grey',
}}></View>
}
>
<Image
source={require("../assets/Sample1.jpeg")}

style={styles.image}
  />
  <Image
source={require("../assets/Sample2.jpeg")}

style={styles.image}
  />
  </Swiper>


        <View style={styles.swipeText}>
        <Text> Swipe to view Certificate </Text>
        </View>
  
</View>
    );
  }

export default CovidTestScreen;

const styles = StyleSheet.create({
    container: {
      flex:1,
     backgroundColor: '#51a4fb',
     alignItems: 'center',
     justifyContent: 'center',
    },

    image:
    {
      resizeMode: "center",
      width: "100",
      height: "100",
  
    },


  swipeText: {
        color: "#555555",
        fontSize: 18,
    
       
    },

   


  });