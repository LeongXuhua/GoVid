import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, Button, TouchableOpacity, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const HomeScreen = ({navigation}) => {
  const url = "https://wrapapi.com/use/yx/moh/covidsituation/latest?wrapAPIKey=6acPafdyuNtO4dJQlEwc4xLhOGLOzol8";
    const [data, setData] = useState();
    const [isLoading, setIsloading] = useState(false);
    const [error,setError] = useState();

    useEffect(() => {
        const fetchCovidData = async () => {
            setIsloading(true);
            try {
                const result = await fetch(url);
                const response = await result.json();
                setData(response)
                setIsloading(false);
            }
            catch (e) {
                console.log(e)
            }
        }
        fetchCovidData();
    }, []);

    return (
<ScrollView>

<SafeAreaView style={styles.container}>
        <Image source={require("../assets/logo.png")} style={styles.logo}/>
        
        <Text style={styles.welcomeText}> WELCOME! </Text>

        <View style={styles.divider} />
        {/*Statistic*/}
        <View
          style={{
          flexDirection: "row", 
          padding: 20,}}>
            <View style={styles.covidCasesBox}>
              <MaterialCommunityIcons name="pulse" size={30} style={{color:"green"}}/>
              <Text style={styles.topText}>
              <Text>Daily Cases</Text>
              </Text>
              <Text style={styles.baseText}>
              <Text>{data? data.data.newcases : 0}</Text>
              </Text>
            </View>
            <View style={styles.covidCasesBox}>
              <MaterialCommunityIcons name="hospital-building" size={30} style={{color:"blue"}}/>
              <Text style={styles.topText}>
              <Text>Hospitalised</Text>
              </Text>
              <Text style={styles.baseText}>
              <Text>{data? data.data.hospitalised : 0}</Text>
              </Text>
            </View>
            <View style={styles.covidCasesBox}>
              <MaterialCommunityIcons name="account-multiple" size={30} style={{color:"black"}}/>
              <Text style={styles.topText}>
              <Text>Total Cases</Text>
              </Text>
              <Text style={styles.baseText}>
              <Text>73131</Text>
              </Text>
            </View>  
          </View>
          <Text style={{fontSize: 10, marginTop: -20, marginLeft: -180}}>
          {data? data.data.date : 0}
          </Text>

          <View style={styles.casesCountries}>
     <TouchableOpacity
          onPress={() =>
            navigation.navigate('Root', {screen: 'CasesCountries'})
          }>
           <Text style={styles.countriesText}>
         <Text>World Covid-19 tracker</Text>
         </Text>
          </TouchableOpacity>
</View>
        {/*news*/}
        <View style={styles.newsContainer}>


        <Text style={styles.otherText}>
            Daily News </Text>
        


            <View style={styles.newsArticle}>
                <Text> Update on Local COVID-19 Situation and Vaccination Progress (4 Sep 2021) </Text>
            </View>

            <View style={styles.newsArticle}>
                <Text> 253 Cases of Locally Transmitted COVID-19 Infection </Text>
            </View>
        </View>

        <View style={styles.divider} />

          {/*status*/}
        <View style={styles.statusContainer}>
            <View style={styles.statusBox}>
                <Text> Vaccinated</Text>
                <Image source={require("../assets/tick.png")} style={styles.statusIcon}/>
            </View>

            <View style={styles.statusBox}>
                <Text> No Exposure</Text>
                <Image source={require("../assets/tick.png")} style={styles.statusIcon}/>
            </View>
        </View>

        <View style={styles.divider} />

{/* MENU BUTTONS */}

<Text style={styles.otherText}>What do you want to do today?</Text>

        <View style={styles.categoryContainer}>
        <TouchableOpacity
          style={styles.categoryBtn}
          onPress={() =>
            navigation.navigate('Root', {screen: 'ScanQR'})
          }>
              <View style={styles.categoryIcon}>
            <MaterialCommunityIcons
              name="qrcode-scan"
              size={20}
              color="#000000"
            />
          </View>
          <Text style={styles.categoryBtnTxt}>Scan QR</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.categoryBtn}
          onPress={() =>
            navigation.navigate('Root', {screen: 'CheckSymptoms'})
          }>
          <View style={styles.categoryIcon}>
            <MaterialCommunityIcons
              name="format-list-checks"
              size={20}
              color="green"
            />
          </View>
          <Text style={styles.categoryBtnTxt}>Check Symptoms</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.categoryBtn}
          onPress={() =>
            navigation.navigate('Root', {screen: 'CovidTest'})
          }>
          <View style={styles.categoryIcon}>
            <MaterialCommunityIcons
              name="newspaper-plus"
              size={20}
              color="blue"
            />
          </View>
          <Text style={styles.categoryBtnTxt}>Test Result</Text>
        </TouchableOpacity>

</View>
        <View style={[styles.categoryContainer, {marginTop: 10}]}>

        <TouchableOpacity
          style={styles.categoryBtn}
          onPress={() =>
            navigation.navigate('Root', {screen: 'BookVaccination'})
          }>
          <View style={styles.categoryIcon}>
            <MaterialCommunityIcons
              name="doctor"
              size={20}
              color="black"
            />
          </View>
          <Text style={styles.categoryBtnTxt}>Book Vaccination</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.categoryBtn}
          onPress={() =>
            navigation.navigate('Root', {screen: 'BookTest'})
          }>
          <View style={styles.categoryIcon}>
            <MaterialCommunityIcons
              name="medical-bag"
              size={20}
              color="green"
            />
          </View>
          <Text style={styles.categoryBtnTxt}>Book Covid Test</Text>
        </TouchableOpacity>
     
        <TouchableOpacity
          style={styles.categoryBtn}
          onPress={() =>
            navigation.navigate('Root', {screen: 'CheckCrowd'})
          }>
          <View style={styles.categoryIcon}>
            <MaterialCommunityIcons
              name="account-group"
              size={20}
              color="blue"
            />
          </View>
          <Text style={styles.categoryBtnTxt}>Cluster & Crowd</Text>
        </TouchableOpacity>
          
          
</View>
        <View style={[styles.categoryContainer, {marginTop: 10}]}>

        <TouchableOpacity
          style={styles.categoryBtn}
          onPress={() =>
            navigation.navigate('Root', {screen: 'TravelInformation'})
          }>
          <View style={styles.categoryIcon}>
            <MaterialCommunityIcons
              name="airplane-takeoff"
              size={20}
              color="#000000"
            />
          </View>
          <Text style={styles.categoryBtnTxt}>Travel Information</Text>
        </TouchableOpacity>
     
     

      </View>

            <View style={styles.menuBox}>
                <Button title="Book Covid Testing" />
            </View>
            
            <View style={styles.menuBox}>
                <Button title="Book Covid Testing" />
            </View>

            <View style={styles.menuBox}>
                <Button title="Book Vaccination" />
            </View>
            <View style={styles.divider} />
            <View style={styles.divider} />
            <View style={styles.divider} />
            <View style={styles.divider} />
          
        <Text style={styles.newsTitle}> BOTTOM TEXT </Text>

        <StatusBar style="auto" />
        
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
        backgroundColor: '#51a4fb',
        flexDirection: "row",
        justifyContent: 'flex-start',
        marginTop: 20,
        height: "10%",
    },

    logo: {
      width: '100%',
      height: '15%',
      resizeMode: 'contain',
    },

    welcomeText: {
        color: "#EEEEEE",
        fontSize: 24,
        margin: 10,
    },

    otherText: {
      color: "#EEEEEE",
      fontSize: 24,
      margin: 10,
  },
    
    covidCasesBox: {
      backgroundColor: "#ffffff", 
      width: 100, 
      height: 100, 
      borderRadius: 25, 
      marginLeft: 10,
      padding: 10,
    },

    newsTitle: {
        color: "#555555",
        fontSize: 18,
       
    },

    newsArticle: {
        backgroundColor: "white",
        width: "100%",
        alignItems: "center",
        borderRadius: 10,
        marginBottom: 10,
      },

    statusBox: {
        backgroundColor: "white",
        width: "30%",
        height: "60%",
        alignItems: "center",
        borderRadius: 10,
        marginRight: 10,
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
      color:"#FFFFFF",
    },

    topText:{
   color:"#000000", //black
   fontWeight: 'bold',
   alignSelf: 'center',
  },

  baseText:{
    color:"#ff0000", //red
    fontWeight: 'bold',
    marginTop: 5,
    alignSelf: 'center',
   },
 

   casesCountries:{
     width:"80%",
    margin:4,
    backgroundColor: '#007AFF',
    borderRadius: 12,
    padding: 10,
   },

   countriesText:{
    color:"#ffffff",
    fontWeight: 'bold',
    alignSelf: 'center',

   },
 


  });