import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
//import React, {useState} from 'react';
import * as React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, Button, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import firebase from 'firebase';

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
import uploadARTScreen from './screens/UploadART';
import uploadVaccinationScreen from './screens/UploadVaccination';
import OrgAdminHomeScreen from './screens/OrgAdminHome';
import CheckInLogScreen from './screens/CheckInLog';
import EmployeeInfoScreen from './screens/EmployeeInfo';
import VerifyVaccineScreen from './screens/VerifyVaccine';


const firebaseConfig = {
  apiKey: "AIzaSyDaaAbFMM4ki7OOTJbM1sy8ocpplngW0uo",
  authDomain: "govid-fcb26.firebaseapp.com",
  databaseURL: "https://govid-fcb26-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "govid-fcb26",
  storageBucket: "govid-fcb26.appspot.com",
  messagingSenderId: "613399245284",
  appId: "1:613399245284:web:c179e304aa81e4539cd7f1",
};
if (firebase.apps.length < 2) {
  firebase.initializeApp(firebaseConfig)
}

const NavigationDrawerStructure = (props) => {
  //Structure for the navigatin Drawer
  const toggleDrawer = () => {
    //Props to open/close the drawer
    props.navigationProps.toggleDrawer();
  };

  return (
    <View style={{flexDirection: 'row', }}>
      <TouchableOpacity onPress={toggleDrawer}>
        {/*Donute Button Image */}
        <Image 
          style={{width: 25, height: 25, marginLeft: 55}}
          source={{
            uri:
              'https://raw.githubusercontent.com/AboutReact/sampleresource/master/drawerWhite.png',
          }}
          
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
        height: 95
      },
      headerTitleContainerStyle: {
        marginBottom: 5,
      },
      headerTintColor: '#fff', //Set Header text color
      headerTitleStyle: {
        fontWeight: 'bold', //Set Header text style
      },
      drawerStyle:{
        width: 220,
      },
      
    }}
    drawerContent={(props) => <CustomSidebarMenu {...props} />}>
    
    <Drawer.Screen
      name="Home"
      component={HomeScreen}
      options={{
      drawerLabel: 'Home',
      }}
    />
    <Drawer.Screen
      name="Scan QR"
      component={ScanQRScreen}
      options={{
      drawerLabel: 'Scan QR',
      }}
    />

<Drawer.Screen
      name="Verify Vaccine"
      component={VerifyVaccineScreen}
      options={{
      drawerLabel: 'Verify Vaccine',
      }}
    />


    <Drawer.Screen
      name="Upload ART Result"
      component={uploadARTScreen}
      options={{
      drawerLabel: 'Upload ART Result',
      }}
    />

    <Drawer.Screen
      name="UploadVaccination"
      component={uploadVaccinationScreen}
      options={{
      drawerLabel: 'upload Vaccination',
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
      name="Health Declaration"
      component={HealthDeclarationScreen}
      options={{
      drawerLabel: 'Health Declaration',
      }}
    />

    <Drawer.Screen
      name="Covid Test Result"
      component={CovidTestScreen}
      options={{
      drawerLabel: 'Covid Test Result',
      }}
    />

    <Drawer.Screen
      name="Book Vaccination"
      component={BookVaccinationScreen}
      options={{
      drawerLabel: 'Book Vaccination',
      }}
    />

    <Drawer.Screen
      name="Book PCR Swab Test"
      component={BookTestScreen}
      options={{
      drawerLabel: 'Book PCR Swab Test',
      }}
    />

    <Drawer.Screen
      name="Check Crowd"
      component={CheckCrowdScreen}
      options={{
      drawerLabel: 'Check Crowd',
      }}
    />

    <Drawer.Screen
      name="Travel Information"
      component={TravelInformationScreen}
      options={{
      drawerLabel: 'Travel Information',
      }}
    />

    <Drawer.Screen
      name="World Covid-19 Tracker"
      component={CasesCountriesScreen}
      options={{
      drawerLabel: 'World Covid-19 Tracker',
      }}
    />
    
    <Drawer.Screen
      name="Register Employee"
      component={RegisterEmployeeScreen}
      options={{
      drawerLabel: 'Register Employee',
      }}
    />

    <Drawer.Screen
      name="Organisation Admin Home"
      component={OrgAdminHomeScreen}
      options={{
      drawerLabel: 'Organisation Admin Home',
      }}
    />

    <Drawer.Screen
      name="Check-In Log"
      component={CheckInLogScreen}
      options={{
      drawerLabel: 'Check-In Log',
      }}
    />

    <Drawer.Screen
      name="Employee Information"
      component={EmployeeInfoScreen}
      options={{
      drawerLabel: 'Employee Information',
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
        <Stack.Screen name="RegisterAdmin" component={RegisterAdminScreen} 
        options={
          {headerRight:()=>{},
           headerLeft:()=>{},
            activeTintColor: '#fff',
            itemStyle: {marginVertical: 5},
            headerStyle: {
              backgroundColor: '#30659c', //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}/>
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