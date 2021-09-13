import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, SafeAreaView, Image, Button, TextInput } from 'react-native';

import HomeScreen from './screens/Home';
import LoginScreen from './screens/Login';

const Stack = createNativeStackNavigator();

function App(){
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName={"Login"}
        screenOptions={({ navigation})=>({
          headerStyle:{
            backgroundColor:'#51a4fb',
          },
          headerRight: ()=> <Button title="Logout" onPress={()=>navigation.navigate('Login')}/>,
          })}
      >
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="Login" component={LoginScreen} options={{headerRight:()=>{}}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#51a4fb',
    alignItems: 'center',
    justifyContent: 'center',
  },

  logo: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
  },

  loginTitle: {
    width: "70%",
    color: "#AAAAAA",
    fontSize: 28,
  },

  loginTitleView: {
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
    backgroundColor: "#FFFFFF",
    width: "70%",
    height: 45,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: "center",
  },
  
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },

  buttonView: {
    width: "70%",
    borderRadius: 10,
    marginBottom: 20,
    marginTop: 20,
    alignItems: "flex-end",
  },

  registerView: {
    width: "70%",
    borderRadius: 10,
    marginBottom: 20,
    marginTop: 20,
    alignItems: "center",
    flexDirection:"row",
  },



});

export default App;