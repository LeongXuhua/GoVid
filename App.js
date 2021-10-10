import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
//import React, {useState} from 'react';
import * as React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, Button, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Swiper from 'react-native-swiper';

import CustomSidebarMenu from './components/drawer';

import HomeScreen from './screens/Home';
import LoginScreen from './screens/Login';
import BookTestScreen from './screens/BookTest';
import BookVaccinationScreen from './screens/BookVaccination';
import ScanQRScreen from './screens/ScanQR';
import CovidTestScreen from './screens/CovidTest';
import CheckCrowdScreen from './screens/CheckCrowd';
import HealthDeclarationScreen from './screens/HealthDeclaration';
import TravelInformationScreen from './screens/TravelInformation';
import CasesCountriesScreen from './screens/CasesCountries';
import RegisterEmployeeScreen from './screens/RegisterEmployee';
import RegisterAdminScreen from './screens/RegisterAdmin';

const NavigationDrawerStructure = (props) => {
  //Structure for the navigatin Drawer
  const toggleDrawer = () => {
    //Props to open/close the drawer
    props.navigationProps.toggleDrawer();
  };

  return (
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity onPress={toggleDrawer}>
        {/*Donute Button Image */}
        <Image
          source={{
            uri:
              'https://raw.githubusercontent.com/AboutReact/sampleresource/master/drawerWhite.png',
          }}
          style={{width: 25, height: 25, marginLeft: 5}}
        />
      </TouchableOpacity>
    </View>
  );
};

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function Root({navigation}){
  return (
    <Drawer.Navigator
    screenOptions={{
      activeTintColor: '#fff',
      itemStyle: {marginVertical: 5},
      headerStyle: {
        backgroundColor: '#30659c', //Set Header color
      },
      headerTintColor: '#fff', //Set Header text color
      headerTitleStyle: {
        fontWeight: 'bold', //Set Header text style
      },
    }}
    drawerContent={(props) => <CustomSidebarMenu {...props} />}>
    
    <Drawer.Screen
      name="Home"
      component={HomeScreen}
      options={{
      drawerLabel: 'Home',
      headerStyle: {
        backgroundColor: '#30659c', //Set Header color
       // backgroundColor: '#30659c', //Set Header color
      },
      headerTintColor: '#fff', //Set Header text color
      headerTitleStyle: {
        fontWeight: 'bold', //Set Header text style
      },
      }}
    />
    <Drawer.Screen
      name="ScanQR"
      component={ScanQRScreen}
      options={{
      drawerLabel: 'Scan QR',
      headerStyle: {
        backgroundColor: '#30659c', //Set Header color
      },
      headerTintColor: '#fff', //Set Header text color
      headerTitleStyle: {
        fontWeight: 'bold', //Set Header text style
      },

      }}
    />

    <Drawer.Screen
      name="HealthDeclaration"
      component={HealthDeclarationScreen}
      options={{
      drawerLabel: 'Health Declaration',
      headerStyle: {
        backgroundColor: '#30659c', //Set Header color
      },
      headerTintColor: '#fff', //Set Header text color
      headerTitleStyle: {
        fontWeight: 'bold', //Set Header text style
      },
      }}
    />

    <Drawer.Screen
      name="CovidTest"
      component={CovidTestScreen}
      options={{
      drawerLabel: 'Covid Test',
      headerStyle: {
        backgroundColor: '#30659c', //Set Header color
      },
      headerTintColor: '#fff', //Set Header text color
      headerTitleStyle: {
        fontWeight: 'bold', //Set Header text style
      },
      }}
    />

    <Drawer.Screen
      name="BookVaccination"
      component={BookVaccinationScreen}
      options={{
      drawerLabel: 'Book Vaccination',
      headerStyle: {
        backgroundColor: '#30659c', //Set Header color
      },
      headerTintColor: '#fff', //Set Header text color
      headerTitleStyle: {
        fontWeight: 'bold', //Set Header text style
      },
      }}
    />

    <Drawer.Screen
      name="BookTest"
      component={BookTestScreen}
      options={{
      drawerLabel: 'Book Swab Test',
      headerStyle: {
        backgroundColor: '#30659c', //Set Header color
      },
      headerTintColor: '#fff', //Set Header text color
      headerTitleStyle: {
        fontWeight: 'bold', //Set Header text style
      },
      }}
    />

    <Drawer.Screen
      name="CheckCrowd"
      component={CheckCrowdScreen}
      options={{
      drawerLabel: 'Check Crowd',
      headerStyle: {
        backgroundColor: '#30659c', //Set Header color
      },
      headerTintColor: '#fff', //Set Header text color
      headerTitleStyle: {
        fontWeight: 'bold', //Set Header text style
      },
      }}
    />

    <Drawer.Screen
      name="TravelInformation"
      component={TravelInformationScreen}
      options={{
      drawerLabel: 'Travel Information',
      headerStyle: {
        backgroundColor: '#30659c', //Set Header color
      },
      headerTintColor: '#fff', //Set Header text color
      headerTitleStyle: {
        fontWeight: 'bold', //Set Header text style
      },
      }}
    />

    <Drawer.Screen
      name="CasesCountries"
      component={CasesCountriesScreen}
      options={{
      drawerLabel: 'Cases by Countries',
      headerStyle: {
        backgroundColor: '#30659c', //Set Header color
      },
      headerTintColor: '#fff', //Set Header text color
      headerTitleStyle: {
        fontWeight: 'bold', //Set Header text style
      },
      }}
    />
    
    <Drawer.Screen
      name="Register Employee"
      component={RegisterEmployeeScreen}
      options={{
      drawerLabel: 'Registrater Employee',
      headerStyle: {
        backgroundColor: '#30659c', //Set Header color
      },
      headerTintColor: '#fff', //Set Header text color
      headerTitleStyle: {
       fontWeight: 'bold', //Set Header text style
      },
      }}
    />

<Drawer.Screen
      name="Register Administrator"
      component={RegisterAdminScreen}
      options={{
      drawerLabel: 'Registrater Admin',
      headerStyle: {
        backgroundColor: '#30659c', //Set Header color
      },
      headerTintColor: '#fff', //Set Header text color
      headerTitleStyle: {
       fontWeight: 'bold', //Set Header text style
      },
      }}
    />

      
  </Drawer.Navigator>
  /*<Drawer.Navigator
    initialRouteName={"Home"}
    screenOptions={({ navigation})=>({
      headerStyle:{
        backgroundColor:'#30659c',
        headerRight: ()=> <Button title="Logout" onPress={()=>navigation.navigate('Login')}/>,
        headerLeft: ()=> <Button title="MENU" onPress={navigation.toggleDrawer}/>,
      },
    })}
  >
    <Drawer.Screen name="Home" component={HomeScreen}/>
  </Drawer.Navigator>*/
);
}

function App(){
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName={"Login"}
        screenOptions={({navigation})=>({
          headerShown: false,
          headerStyle:{
            backgroundColor:'#30659c',
          },
         /* headerRight: ()=> <Button title="Logout" onPress={()=>navigation.navigate('Login')}/>,
          headerLeft: ()=> <Button title="MENU" onPress={navigation.toggleDrawer}/>,*/
          })}
      >
        <Stack.Screen name="Root" component={Root}/>
        <Stack.Screen name="Login" component={LoginScreen} options={{headerRight:()=>{}, headerLeft:()=>{}}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#30659c',
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