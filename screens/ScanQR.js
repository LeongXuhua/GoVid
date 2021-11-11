import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, ActivityIndicator, } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import firebase from 'firebase';
import "firebase/firestore";
import { set } from 'react-native-reanimated';

const ScanQRScreen = () =>{
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [isLoading, setIsloading] = useState(true);
  const [orgId, setOrgId] = useState();
  //const [date, setDate] = useState();
  const [time, setTime] = useState();
  const date = new Date();
  const [user, setUser] = useState();

  const fetchData = async () => {
    setIsloading(true);
    try {
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

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(()=>{
    const fetchUser = async()=>{

      const snapshot2 = await firebase.firestore()
        .collection('organisations')
        .doc(orgId)
        .collection('employees')
        .doc(firebase.auth().currentUser.uid)
        .get().then((snapshot)=>{
          setUser({
            id: snapshot.data().id,
            name: snapshot.data().name,
            time: date,
          })
          setIsloading(false)
        })
      
}
    fetchUser();
  }, [orgId])


  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  /*
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

*/

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    checkIn(data)
  };

  //check in
  function checkIn(location){
    //add to location's collection
    firebase.firestore().collection("organisations")
              .doc(orgId)
              .collection('locations')
              .doc(location)
              .collection(date.getDate() + '-' + (date.getMonth()+1) + '-' + date.getFullYear())
              .doc(date.getHours()+":"+date.getMinutes()+":"+date.getSeconds())
              .set({
                  id: user.id,
                  name: user.name,
                  time: date,
              });
    alert(user.name+" has successfully checked-in to "+location)
  }

  //Check permission 

  if (hasPermission === null) {
    <View style={styles.container}>
    return <Text>Requesting for camera permission</Text>;
    </View>
  }
  if (hasPermission === false) {
    <View style={styles.container}>
    return <Text>No access to camera</Text>;
    </View>
  }

  // Return the view 
  if(isLoading){
    return(
      <ActivityIndicator/>
    )
  }
  return (
    <View style={styles.container}>

    <View>
    <Text style={styles.headertext}> Scan check-in QR code </Text>
    </View>

    <View style={styles.barcodebox}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={{ height: 400, width: 400 }} />
      </View>

     

      <View style={styles.buttonContainer}>
      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} color= '#306296'  />}
    </View>

  </View>
 
  );
}

export default ScanQRScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#51a4fb',
    alignItems: 'center',
     justifyContent: 'center',
  },

  maintext: {
    fontSize: 16,
    margin: 20,
  },

headertext: {
  color: "#FFFFFF",
  fontSize: 20,
  margin: 20,
  justifyContent: 'center',
},


barcodebox: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    width: 300,
    overflow: 'hidden',
    borderRadius: 30,
    backgroundColor: '#51a4fb'
  },


  buttonContainer:
  {
      margin:20
     
  },



});