import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, ScrollView, FlatList, Linking } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const HomeScreen = ({navigation}) => {
  const url = "https://wrapapi.com/use/yx/moh/covidstatistic/latest?wrapAPIKey=6acPafdyuNtO4dJQlEwc4xLhOGLOzol8";
    const [data, setData] = useState();
    const [isLoading, setIsloading] = useState(false);

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

    return (
<ScrollView>

<SafeAreaView style={styles.container}>
        {/*Statistic*/}
        <View
          style={styles.statusContainer}>
            <View style={styles.covidCasesBox}>
              <MaterialCommunityIcons name="account-multiple" size={25} style={{color:"blue"}}/>
              <Text style={styles.topText}>
              <Text>Daily Cases</Text>
              </Text>
              <Text style={styles.baseText}>
              <Text>{data? data.data.newcases : 0}</Text>
              </Text>
            </View>
            <View style={styles.covidCasesBox}>
              <MaterialCommunityIcons name="hospital-building" size={25} style={{color:"blue"}}/>
              <Text style={styles.topText}>
              <Text>Hospitalised</Text>
              </Text>
              <Text style={styles.baseText}>
              <Text>{data? data.data.hospitalised : 0}</Text>
              </Text>
            </View>
            <View style={styles.covidCasesBox}>
              <MaterialCommunityIcons name="emoticon-dead" size={25} style={{color:"black"}}/>
              <Text style={styles.topText}>
              <Text>Total Deaths</Text>
              </Text>
              <Text style={styles.baseText}>
              <Text>{data? data.data.deaths : 0}</Text>
              </Text>
            </View>  
          </View>
          <Text style={{fontSize: 10, marginTop: -20, marginLeft: -180}}>
          {data? data.data.date : "null"}
          </Text>

          <View style={styles.casesCountries}>
     <TouchableOpacity
          onPress={() =>{
            navigation.navigate('Root', {screen: 'CasesCountries'});
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
            <View style={{height: 80}}>
              <ScrollView horizontal>
                <FlatList
                horizontal
                data={news && news.articles}
                renderItem={({item})=> <ItemRows item={item}/>} 
                />
              </ScrollView>
            </View>
        </View>

        <View style={styles.divider} />

          {/*status*/}
        <View style={styles.statusContainer}>
            <View style={styles.statusBox}>
                <Text style={styles.topText}> Vaccinated</Text>
                <MaterialCommunityIcons name="account-check" size={45} style={{color:"green"}}/>
                {/*<Image source={require("../assets/tick.png")} style={styles.statusIcon}/>*/}
            </View>

            <View style={styles.statusBox}>
                <Text style={styles.topText}>Work Status</Text>
                <MaterialCommunityIcons name="home" size={45} style={{color:"green"}}/>
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
              color="black"
            />
          </View>
          <Text style={styles.categoryBtnTxt}>Scan QR</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.categoryBtn}
          onPress={() =>
            navigation.navigate('Root', {screen: 'HealthDeclaration'})
          }>
          <View style={styles.categoryIcon}>
            <MaterialCommunityIcons
              name="format-list-checks"
              size={20}
              color="black"
            />
          </View>
          <Text style={styles.categoryBtnTxt}>Health Declaration</Text>
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
              color="black"
            />
          </View>
          <Text style={styles.categoryBtnTxt}>ART Test Result</Text>
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
              color="black"
            />
          </View>
          <Text style={styles.categoryBtnTxt}>Book PCR Test</Text>
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
              color="black"
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
        padding: 20,
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
      width: 220,
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