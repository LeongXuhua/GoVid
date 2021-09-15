import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, View, StyleSheet, FlatList, Image } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const CasesCountiesScreen = () =>{
    const url = "https://api.covid19api.com/summary";
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
                                uri: `https://www.countryflags.io/${item.CountryCode}/flat/64.png`
                            }}
                            style={styles.flag}
                        />
                    </View>
                    <View style={{ marginRight: 100, marginTop: 5 }}>
                        <Text style={styles.countryName}>{item.Country}</Text>
                    </View>
                    <View>
                        <Text style={styles.totalCases}>{item.TotalConfirmed}</Text>
                    </View>
                </View>
            </View>
        );
    }

    return(
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}> Covid cases by Countires</Text>
            <View
            style={{
            flexDirection: "row", 
            padding: 5,}}>
                <View>
                    <MaterialCommunityIcons name="web" size={70} style={{color:"darkblue"}}/>
                </View>    
                <View >
                    <MaterialCommunityIcons name="pulse" size={30} style={{color:"darkblue"}}/>
                    <Text>Total Global Cases</Text>
                    <Text>{data? data.Global.TotalConfirmed : 0}</Text>
                </View>
                <View >
                    <MaterialCommunityIcons name="coffin" size={30} style={{color:"darkblue"}}/>
                    <Text>Total Global Death</Text>
                    <Text>{data? data.Global.TotalDeaths : 0}</Text>
                </View>  
            </View>
            <View style={styles.flatList}>
                <FlatList 
                    data={data && data.Countries ?  data.Countries : 0}
                    renderItem={({item})=> <ItemRows item={item}/>} 
                />
            </View>
            
        </SafeAreaView>
    )    
}

export default CasesCountiesScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#51a4fb',
        alignItems: 'center',
        justifyContent: 'center'
    },

    title: {
        color: "#EEEEEE",
        fontSize: 30,
        marginTop:100
    },

    flatList:{
        marginTop:10
    },

    rows: {
        width: '100%',
        marginTop: 10,
        marginBottom: 8,
        padding: 10
    },
    countryName: {
        fontSize: 15,
        color:'#fff',
        fontWeight: 'bold'
    },
    totalCases: {
        fontSize: 12,
        color:'#fff',
        fontWeight: 'bold',
        marginTop: 5
    },
    flag: {
        height: 30,
        width: 40,
        padding: 10, 
        borderRadius: 1000
    }
});

