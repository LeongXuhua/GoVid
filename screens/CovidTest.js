import {StatusBar} from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image} from 'react-native';
import Swiper from 'react-native-web-swiper';


const CovidTestScreen = () => {
  return (



<View style={styles.container}>


        <Text style={styles.topText}>
        <Text> Covid Test Result </Text>
        </Text>

<StatusBar style ="auto" />
<Swiper
dot={
<View style={{
width:15,
height:5,
borderRadius:4,
margin: 2,
backgroundColor: 'grey',
}}></View>
}
>
<Text>Slide 1</Text>
<Text>Slide 2</Text>
{/*
<Image
source={require("../assets/Sample2.jpeg")}

style={styles.image}
  />
  <Image
source={require("../assets/Sample1.jpeg")}

style={styles.image}
/>*/}
  
  </Swiper>

  <Text style={styles.bottomText}>
        <Text> Swipe to view Certificate </Text>
        </Text>

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
      width: "100%",
      height: "100%",
    },



   topText: {
   color: '#FFFFFF',
    fontSize: 20,
    fontWeight: "bold",
   margin: 40,

  },

   bottomText: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 30,
    },
    
  
  });