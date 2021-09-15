import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, Button, TouchableOpacity, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const HomeScreen = ({navigation}) => {
    return (
<ScrollView>

<SafeAreaView style={styles.container}>
        <Image source={require("../assets/logo.png")} style={styles.logo}/>
        
        <Text style={styles.welcomeText}> WELCOME! </Text>

        <View style={styles.divider} />

        <View style={styles.newsContainer}>
            <Text style={styles.newsTitle}> Daily News </Text>
            
            <View style={styles.newsArticle}>
                <Text> Update on Local COVID-19 Situation and Vaccination Progress (4 Sep 2021) </Text>
            </View>

            <View style={styles.newsArticle}>
                <Text> 253 Cases of Locally Transmitted COVID-19 Infection </Text>
            </View>
        </View>

        <View style={styles.divider} />

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

        <Text style={styles.newsTitle}>What do you want to do today?</Text>

        <View style={styles.categoryContainer}>
        <TouchableOpacity
          style={styles.categoryBtn}
          onPress={() =>
            navigation.navigate('Root', {screen: 'ScanQR'})
          }>
              <View style={styles.categoryIcon}>
            <MaterialCommunityIcons
              name="qrcode-scan"
              size={35}
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
              size={35}
              color="#000000"
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
              size={35}
              color="#000000"
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
              size={35}
              color="#000000"
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
              size={35}
              color="#000000"
            />
          </View>
          <Text style={styles.categoryBtnTxt}>Book Covid Test</Text>
        </TouchableOpacity>
     
        <TouchableOpacity
          style={styles.categoryBtn}
          onPress={() =>
            navigation.navigate({title: 'Cluster & Crowd'})
          }>
          <View style={styles.categoryIcon}>
            <MaterialCommunityIcons
              name="account-group"
              size={35}
              color="#000000"
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
              size={35}
              color="#000000"
            />
          </View>
          <Text style={styles.categoryBtnTxt}>Travel Information</Text>
        </TouchableOpacity>
     
        <TouchableOpacity
          style={styles.categoryBtn}
          onPress={() =>
            navigation.navigate('CardListScreen', {title: 'More'})
          }>
          <View style={styles.categoryIcon}>
            <MaterialCommunityIcons
              name="more"
              size={35}
              color="#000000"
            />
          </View>
          <Text style={styles.categoryBtnTxt}>More</Text>
        </TouchableOpacity>
     

      </View>

      

            <View style={styles.menuBox}>
                <Button title="Book Covid Testing" />
            </View>

            <View style={styles.menuBox}>
                <Button title="Book Vaccination" />
            </View>

            <View style={styles.menuBox}>
                <Button title="Travel Declaration" />
            </View>

     

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
        width: "70%",
      },
    
    statusContainer: {
        backgroundColor: '#51a4fb',
        flexDirection: "row",
        justifyContent: 'flex-start',
        marginTop: 10,
        marginBottom: 10,
        height: "10%",
    },

    menuContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        backgroundColor: 'pink',
        width: "70%",
        justifyContent: "space-around",
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
        height: "100%",
        alignItems: "center",
        borderRadius: 10,
        marginRight: 10,
        marginLeft: 10,
      },

    statusIcon: {
        height: "75%",
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
        width: "70%",
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
      width: 70,
      height: 70,
      backgroundColor: '#FFFFFF' /* '#FF6347' */,
      borderRadius: 50,
    },
    categoryBtnTxt: {
      alignSelf: 'center',
      marginTop: 5,
      color:"#FFFFFF",
    },

  });