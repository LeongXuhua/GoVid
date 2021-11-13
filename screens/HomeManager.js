import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, ScrollView, FlatList, Linking } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import firebase from 'firebase';
import "firebase/firestore";
import { ActivityIndicator,} from 'react-native-paper';
import { useIsFocused } from '@react-navigation/core';

const HomeScreen = ({ navigation }) => {
  const url = "https://wrapapi.com/use/yx/moh/covidstatistic/latest?wrapAPIKey=6acPafdyuNtO4dJQlEwc4xLhOGLOzol8";
  const [data, setData] = useState();
  const [isLoading, setIsloading] = useState(false);
  const [orgId, setOrgId] = useState();
  const [user, setUser]=useState();
  const [refreshCounter, setRefreshCounter]=useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchCovidData = async () => {
      setIsloading(true);
      try {
        const result = await fetch(url);
        const response = await result.json();
        setData(response)
        setIsloading(false);
        
        const snapshot = await firebase.firestore()
          .collection('users')
          .doc(firebase.auth().currentUser.uid)
          .get()
    
        const organisationId = await snapshot.data().organisationId;
        setOrgId(organisationId);
      }
      catch (e) {
        console.log(e)
      }
    }
    fetchCovidData();
  }, []);

  useEffect(()=>{
    try{
      const fetchWorkStatus = async () => {
        if (orgId){
          const snapshot = await firebase.firestore()
              .collection('organisations')
              .doc(orgId)
              .collection('employees')
              .doc(firebase.auth().currentUser.uid)
              .get()

          setUser(snapshot.data());
          const workStatus = await snapshot.data().workStatus;
          setWorkStatus(workStatus)
          setIsloading(false);
          }
        }
      fetchWorkStatus();
    }
    catch (e) {
      console.log(e)
    }
  }, [orgId, isFocused, refreshCounter])

  const checkOut=()=>{
    if (user.checkIn){
      const date = new Date();
      //check out from check-ins collection
      const checkinlogName = user.checkIn.date.slice(-4)
        +user.checkIn.date.slice(3,5)
        +user.checkIn.date.slice(0,2)
        +user.checkIn.time.slice(0,2)
        +user.checkIn.time.slice(3,5)
        +user.checkIn.time.slice(6,8)
        +user.checkIn.location;

      firebase.firestore().collection("organisations")
        .doc(orgId)
        .collection('check-ins')
        .doc(checkinlogName)
        .update({
            checkOut:firebase.firestore.Timestamp.fromDate(date),
        });
      //check out from location's collection
      firebase.firestore().collection("organisations")
        .doc(orgId)
        .collection('locations')
        .doc(user.checkIn.location)
        .collection(user.checkIn.date)
        .doc(user.checkIn.time)
        .update({
          checkOut:firebase.firestore.Timestamp.fromDate(new Date()),
        });
      //check out from employee's collection
        firebase.firestore().collection("organisations")
        .doc(orgId)
        .collection('employees')
        .doc(firebase.auth().currentUser.uid)
        .update({
            checkIn:null,
        });
      alert('checked out from '+user.checkIn.location)
      }else{
        alert('no locations to check out from!')
      }
    setRefreshCounter(!refreshCounter)
  }

  const urlNews = "https://newsapi.org/v2/top-headlines?country=sg&q=covid&apiKey=88ccbf5968f446d1a11595782665a8d4";
  const [news, setNews] = useState();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const result = await fetch(urlNews);
        const response = await result.json();
        setNews(response)
      }
      catch (e) {
        console.log(e)
      }
    }
    fetchNews();
  }, []);

  const ItemRows = ({ item }) => {
    return (
      <View style={styles.rows}>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-around'
        }}>
          <View>
            <Image
              source={{
                uri: `${item.urlToImage}`
              }}
              style={styles.picture}
            />
          </View>
          <View style={styles.newsBox}>
            <TouchableOpacity onPress={() => Linking.openURL(item.url)}>
              <Text numberOfLines={5}
                style={styles.newsTitle}>{item.title}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }


  const [workStatus, setWorkStatus]=useState("office");

  const toggleWorkStatus = () => {
    if (workStatus=='home'){
      setWorkStatus('office')
      firebase.firestore().collection("organisations")
      .doc(orgId)
      .collection('employees')
      .doc(firebase.auth().currentUser.uid)
      .update({
          workStatus: 'office',
      })
    }else{
      setWorkStatus('home')
      firebase.firestore().collection("organisations")
      .doc(orgId)
      .collection('employees')
      .doc(firebase.auth().currentUser.uid)
      .update({
          workStatus: 'home',
      })
      if(user.checkIn){
        checkOut();
      }
    }
    setRefreshCounter(refreshCounter+1)
  }
if (isLoading){
  return <ActivityIndicator/>
}
  return (
    <ScrollView>

      <SafeAreaView style={styles.container}>
        {/*Statistic*/}
        <View style={styles.statusContainer}>
          <View style={styles.covidCasesBox}>
            <MaterialCommunityIcons name="account-multiple" size={25} style={{ color: "#007AFF" }} />
            <Text style={styles.topText}>
              <Text>Daily Cases</Text>
            </Text>
            <Text style={styles.baseText}>
              <Text>{data ? data.data.newcases : 0}</Text>
            </Text>
          </View>
          <View style={styles.covidCasesBox}>
            <MaterialCommunityIcons name="hospital-building" size={25} style={{ color: "#007AFF" }} />
            <Text style={styles.topText}>
              <Text>Hospitalised</Text>
            </Text>
            <Text style={styles.baseText}>
              <Text>{data ? data.data.hospitalised : 0}</Text>
            </Text>
          </View>
          <View style={styles.covidCasesBox}>
          <MaterialCommunityIcons name="resistor" size={25} style={{ color: "#007AFF" }} />
            <Text style={styles.topText}>
            <Text style={{fontSize: 10}}>Weekly Infection Growth Rate</Text>
            </Text>
            <Text style={styles.baseText}>
              <Text>{data ? data.data.deaths : 0}</Text>
            </Text>
          </View>
        </View>
        <Text style={{ fontSize: 10, marginTop: -30, marginLeft: -180 }}>
          {data ? data.data.date : "null"}
        </Text>

        <View style={styles.casesCountries}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Manager', { screen: 'CasesCountries' });
            }
            }>
            <Text style={styles.countriesText}>
              <Text>World Covid-19 Tracker</Text>
            </Text>
          </TouchableOpacity>
        </View>
        {/*news*/}
        <View style={styles.newsContainer}>
          <Text style={styles.otherText}>Daily News </Text>
          <View style={{ height: 80 }}>
            <ScrollView horizontal>
              <FlatList
                horizontal
                data={news && news.articles}
                renderItem={({ item }) => <ItemRows item={item} />}
              />
            </ScrollView>
          </View>
        </View>

        <View style={styles.divider} />

 <View style={styles.statusContainer2}>

          <View style={styles.statusBox}>
            <Text style={styles.topText}> {user?user.vaccinationResult:'No results'}</Text>
            <MaterialCommunityIcons name="account-remove" size={45} style={{ color: "green" }} />
            <Text style={styles.topText}> {user?user.vaccinationVerified:''}</Text>
          </View>
     

            {/*ART Positive*/}
          <View style={styles.statusBox}>
            <Text style={styles.topText}> ART {user?user.ARTResult:'No results'} </Text>
            <MaterialCommunityIcons name="alert-plus" size={45} style={{ color: "red" }} />
            <Text style={styles.topText}> {user?user.ARTVerified:''}</Text>
          </View>

     </View>

   <View style={styles.statusContainer2}>

 {/*Work Status*/}
          <View style={styles.statusBox}>
            <TouchableOpacity
              onPress={toggleWorkStatus}>
              <Text style={styles.topText}>Work Status</Text>
              {(!user)
                ?[<MaterialCommunityIcons name='home' size={45} style={{ color: 'green' }} />,<Text>Home</Text>]
                :user.checkIn
                ?[<MaterialCommunityIcons name='office-building' size={45} style={{ color: '#007AFF' }} />,<Text>{user.checkIn.location}</Text>]
                :workStatus==='office'
                ?[<MaterialCommunityIcons name='office-building' size={45} style={{ color: '#007AFF' }} />,<Text>Office</Text>]
                :[<MaterialCommunityIcons name='home' size={45} style={{ color: 'green' }} />,<Text>Home</Text>]}
            </TouchableOpacity>
          </View>

 {/*Check Out*/}
          <View style={styles.statusBox}>
            <TouchableOpacity
              onPress={checkOut}>
              <Text style={styles.topText}>Check Out</Text>
              <MaterialCommunityIcons name="exit-to-app" size={45} style={{ color: "green" }} />
            </TouchableOpacity>
          </View>

        </View>



        <View style={styles.divider} />

        {/* MENU BUTTONS */}

        <Text style={styles.otherText}>What do you want to do today?</Text>

        <View style={styles.categoryContainer}>
        <TouchableOpacity
            style={styles.categoryBtn}
            onPress={() =>
              navigation.navigate('Manager', { screen: 'EmployeeInfo' })
            }>
            <View style={styles.categoryIcon}>
              <MaterialCommunityIcons
                name="account-multiple-check"
                size={30}
                color="black"
              />
            </View>
            <Text style={styles.categoryBtnTxt}>View Employee</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.categoryBtn}
            onPress={() =>
              navigation.navigate('Manager', { screen: 'VerifyART' })
            }>
            <View style={styles.categoryIcon}>
              <MaterialCommunityIcons
                name="newspaper-plus"
                size={30}
                color="black"
              />
            </View>
            <Text style={styles.categoryBtnTxt}>Verify ART</Text>
          </TouchableOpacity>

        

          <TouchableOpacity
            style={styles.categoryBtn}
            onPress={() =>
              navigation.navigate('Manager', { screen: 'VerifyVaccine' })
            }>
            <View style={styles.categoryIcon}>
              <MaterialCommunityIcons
                name="shield-check"
                size={30}
                color="black"
              />
            </View>
            <Text style={styles.categoryBtnTxt}>Verify Vaccine</Text>
          </TouchableOpacity>

</View>
        <View style={[styles.categoryContainer, { marginTop: 10 }]}>

    
          <TouchableOpacity
            style={styles.categoryBtn}
            onPress={() =>
              navigation.navigate('Manager', { screen: 'ScanQR' })
            }>
            <View style={styles.categoryIcon}>
              <MaterialCommunityIcons
                name="qrcode-scan"
                size={30}
                color="black"
              />
            </View>
            <Text style={styles.categoryBtnTxt}>Scan QR</Text>
          </TouchableOpacity>

   
          <TouchableOpacity
            style={styles.categoryBtn}
            onPress={() =>
              navigation.navigate('Employee', { screen: 'UploadVaccination' })
            }>
            <View style={styles.categoryIcon}>
              <MaterialCommunityIcons
                name="note-plus"
                size={30}
                color="black"
              />
            </View>
            <Text style={styles.categoryBtnTxt}>Upload Vaccination</Text>
          </TouchableOpacity>
        
          <TouchableOpacity
            style={styles.categoryBtn}
            onPress={() =>
              navigation.navigate('Manager', { screen: 'UploadART' })
            }>
            <View style={styles.categoryIcon}>
              <MaterialCommunityIcons
                name="newspaper-plus"
                size={30}
                color="black"
              />
            </View>
            <Text style={styles.categoryBtnTxt}>Upload ART</Text>
          </TouchableOpacity>

</View>
        <View style={[styles.categoryContainer, { marginTop: 10 }]}>


          <TouchableOpacity
            style={styles.categoryBtn}
            onPress={() =>
              navigation.navigate('Manager', { screen: 'HealthDeclaration' })
            }>
            <View style={styles.categoryIcon}>
              <MaterialCommunityIcons
                name="format-list-checks"
                size={30}
                color="black"
              />
            </View>
            <Text style={styles.categoryBtnTxt}>Health Declaration</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.categoryBtn}
            onPress={() =>
              navigation.navigate('Manager', { screen: 'BookVaccination' })
            }>
            <View style={styles.categoryIcon}>
              <MaterialCommunityIcons
                name="doctor"
                size={30}
                color="black"
              />
            </View>
            <Text style={styles.categoryBtnTxt}>Book Vaccine</Text>
          </TouchableOpacity>
      
          <TouchableOpacity
            style={styles.categoryBtn}
            onPress={() =>
              navigation.navigate('Manager', { screen: 'BookTest' })
            }>
            <View style={styles.categoryIcon}>
              <MaterialCommunityIcons
                name="medical-bag"
                size={30}
                color="black"
              />
            </View>
            <Text style={styles.categoryBtnTxt}>Book PCR Test</Text>
          </TouchableOpacity>


</View>
        <View style={[styles.categoryContainer, { marginTop: 10 }]}>

  
          <TouchableOpacity
            style={styles.categoryBtn}
            onPress={() =>
              navigation.navigate('Manager', { screen: 'TravelInformation' })
            }>
            <View style={styles.categoryIcon}>
              <MaterialCommunityIcons
                name="airplane-takeoff"
                size={30}
                color="#000000"
              />
            </View>
            <Text style={styles.categoryBtnTxt}>Travel Information</Text>
          </TouchableOpacity>
   

        </View>

     

      </SafeAreaView>
    </ScrollView>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#51a4fb',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  newsContainer: {
    backgroundColor: '#51a4fb',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: "80%",
  },

  statusContainer: {
    flexDirection: "row",
    padding: 30,
  },

    statusContainer2: {
      flexDirection: "row",
      padding: 10,
    },


  logo: {
    width: '100%',
    height: '10%',
    resizeMode: 'contain',
  },

  otherText: {
    color: "#EEEEEE",
    fontSize: 24,
    margin: 10,
  },

  covidCasesBox: {
    backgroundColor: "#ffffff",
    width: "30%",
    height: "100%",
    borderRadius: 25,
    marginLeft: 10,
    padding: 10,
  },

  picture: {
    height: 80,
    width: 90,
    marginLeft: 5,
  },

  newsBox: {
    borderWidth: 1,
    borderColor: 'lightgrey',
    backgroundColor: 'white',
    height: 80,
    width: 230,
  },

  newsTitle: {
    fontWeight: "bold",
    fontSize: 13,
    padding: 5,
  },

  statusBox: {
    backgroundColor: "white",
    width: "30%",
    height: "100%",
    alignItems: "center",
    borderRadius: 25,
    padding: 10,
    marginLeft: 10,
  },

  statusIcon: {
    height: "60%",
    resizeMode: 'contain',
  },

  menuBox: {
    backgroundColor: "white",
    width: "30%",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 10,
  },

  menuBox: {
    backgroundColor: "green",
    width: "30%",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 10,
  },

  menuLabel: {
    fontSize: 14,
    color: "black",
  },

  divider: {
    borderBottomColor: '#EEEEEE',
    borderBottomWidth: 1,
    width: "80%",
    margin: 4,
  },

  categoryContainer: {
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    marginTop: 25,
    marginBottom: 10,
  },
   categoryContainer2: {
     flexDirection: 'row',
      width: '90%',

      marginTop: 25,
      marginBottom: 10,
    },
  categoryBtn: {
    flex: 1,
    width: '30%',
    marginHorizontal: 0,
    alignSelf: 'center',
  },
  categoryIcon: {
    borderWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: 50,
    height: 50,
    backgroundColor: '#FFFFFF' /* '#FF6347' */,
    borderRadius: 50,
  },
  categoryBtnTxt: {
    alignSelf: 'center',
    marginTop: 5,
    color: "#FFFFFF",
  },

  topText: {
    color: "#000000", //black
    fontWeight: 'bold',
    alignSelf: 'center',
  },

  baseText: {
    color: "#ff8000", //orange
    fontWeight: 'bold',
    marginTop: 5,
    alignSelf: 'center',
  },


  casesCountries: {
    width: "80%",
    margin: 4,
    backgroundColor: '#007AFF',
    borderRadius: 12,
    padding: 10,
  },

  countriesText: {
    color: "#ffffff",
    fontWeight: 'bold',
    alignSelf: 'center',

  },



});