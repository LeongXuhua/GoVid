import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
//import React, {useState} from 'react';
import * as React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, Button, TextInput, TouchableOpacity, LogBox } from 'react-native';
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
import VerifyARTScreen from './screens/VerifyART';
import HomeManagerScreen from './screens/HomeManager'
import NotificationScreen from './screens/Notification';
import ManageCheckInScreen from './screens/ManageCheckIn';
import QrCodeScreen from './screens/QrCode';

LogBox.ignoreAllLogs();
console.warn = ()=>{};

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

const firebaseConfig2 = {
  apiKey: "AIzaSyDaaAbFMM4ki7OOTJbM1sy8ocpplngW0uo",
  authDomain: "govid-fcb26.firebaseapp.com",
  databaseURL: "https://govid-fcb26-default-rtdb.asia-southeast1.firebasedatabase.app",
};
export const secondaryApp = firebase.initializeApp(firebaseConfig2, 'secondary');

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

function Employee({navigation}){
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
      name="ScanQR"
      component={ScanQRScreen}
      options={{
      drawerLabel: 'Scan QR',
      }}
    />

    <Drawer.Screen
      name="UploadART"
      component={uploadARTScreen}
      options={{
      drawerLabel: 'Upload ART Result',
      }}
    />

    <Drawer.Screen
      name="UploadVaccination"
      component={uploadVaccinationScreen}
      options={{
      drawerLabel: 'Upload Vaccination',
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
      }}
    />

    <Drawer.Screen
      name="CovidTest"
      component={CovidTestScreen}
      options={{
      drawerLabel: 'Covid Test Result',
      }}
    />

    <Drawer.Screen
      name="BookVaccination"
      component={BookVaccinationScreen}
      options={{
      drawerLabel: 'Book Vaccination',
      }}
    />

    <Drawer.Screen
      name="BookTest"
      component={BookTestScreen}
      options={{
      drawerLabel: 'Book PCR Swab Test',
      }}
    />

    <Drawer.Screen
      name="CheckCrowd"
      component={CheckCrowdScreen}
      options={{
      drawerLabel: 'Check Crowd',
      }}
    />

    <Drawer.Screen
      name="TravelInformation"
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

function Manager({navigation}){
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
      component={HomeManagerScreen}
      options={{
      drawerLabel: 'Home',
      }}
    />
    <Drawer.Screen
      name="ScanQR"
      component={ScanQRScreen}
      options={{
      drawerLabel: 'Scan QR',
      }}
    />

<Drawer.Screen
      name="VerifyVaccine"
      component={VerifyVaccineScreen}
      options={{
      drawerLabel: 'Verify Vaccine',
      }}
    />

<Drawer.Screen
      name="VerifyART"
      component={VerifyARTScreen}
      options={{
      drawerLabel: 'Verify ART',
      }}
    />



    <Drawer.Screen
      name="UploadART"
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
      name="HealthDeclaration"
      component={HealthDeclarationScreen}
      options={{
      drawerLabel: 'Health Declaration',
      }}
    />

    <Drawer.Screen
      name="BookVaccination"
      component={BookVaccinationScreen}
      options={{
      drawerLabel: 'Book Vaccination',
      }}
    />

    <Drawer.Screen
      name="BookTest"
      component={BookTestScreen}
      options={{
      drawerLabel: 'Book PCR Swab Test',
      }}
    />

    <Drawer.Screen
      name="CheckCrowd"
      component={CheckCrowdScreen}
      options={{
      drawerLabel: 'Check Crowd',
      }}
    />

    <Drawer.Screen
      name="TravelInformation"
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
      name="EmployeeInfo"
      component={EmployeeInfoScreen}
      options={{
      drawerLabel: 'Employee Information',
      }}
    />  
    <Drawer.Screen
      name="Notification"
      component={NotificationScreen}
      options={{
      drawerLabel: 'Notification',
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

function Admin({navigation}){
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
      component={OrgAdminHomeScreen}
      options={{
      drawerLabel: 'Home',
      }}
    />

<Drawer.Screen
      name="ManageCheckIn"
      component={ManageCheckInScreen}
      options={{
      drawerLabel: 'Manage Locations',
      }}
    />

<Drawer.Screen
      name="VerifyVaccine"
      component={VerifyVaccineScreen}
      options={{
      drawerLabel: 'Verify Vaccine',
      }}
    />

<Drawer.Screen
      name="VerifyART"
      component={VerifyARTScreen}
      options={{
      drawerLabel: 'Verify ART',
      }}
    />

    <Drawer.Screen
      name="CheckCrowd"
      component={CheckCrowdScreen}
      options={{
      drawerLabel: 'Check Crowd',
      }}
    />
    
    <Drawer.Screen
      name="RegisterEmployee"
      component={RegisterEmployeeScreen}
      options={{
      drawerLabel: 'Register Employee',
      }}
    />

    <Drawer.Screen
      name="CheckInLog"
      component={CheckInLogScreen}
      options={{
      drawerLabel: 'Check-In Log',
      }}
    />

    <Drawer.Screen
      name="EmployeeInfo"
      component={EmployeeInfoScreen}
      options={{
      drawerLabel: 'Employee Information',
      }}
    />  


<Drawer.Screen
      name="QrCode"
      component={QrCodeScreen}
      options={{
      drawerLabel: '',
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
        <Stack.Screen name="Employee" component={Employee}/>
        <Stack.Screen name="Admin" component={Admin}/>
        <Stack.Screen name="Manager" component={Manager}/>
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