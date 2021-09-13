import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, Button, ScrollView } from 'react-native';

const HomeScreen = ({navigation}) => {
    return (
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

        <Text style={styles.newsTitle}>What do you want to do today?</Text>

        <View style={styles.menuContainer}>
            <View style={styles.menuBox}>
                <Button title="SafeEntry Check In"    onPress={()=>navigation.navigate('BookTest')} />
            </View>

            <View style={styles.menuBox}>
                <Button title="Check Symptoms" />
            </View>

            <View style={styles.menuBox}>
                <Button title="Test Results" />
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

            <View style={styles.menuBox}>
                <Button title="Show Cluster" />
            </View>

            <View style={styles.menuBox}>
                <Button title="Premises Crowd" />
            </View>
        </View>

        <Text style={styles.newsTitle}> BOTTOM TEXT </Text>

        <StatusBar style="auto" />
      </SafeAreaView>
    );
  }

export default HomeScreen;

const styles = StyleSheet.create({
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
        backgroundColor: 'pink',
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
        flex: 1,
        backgroundColor: "white",
        width: "30%",
        alignItems: "center",
        borderRadius: 10,
        marginTop: 10,
        marginRight: 10,
      },

    divider: {
        borderBottomColor: '#EEEEEE',
        borderBottomWidth: 1,
        width: "70%",
    },

  });