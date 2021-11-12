import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, ActivityIndicator, } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import firebase from 'firebase';
import "firebase/firestore";

const ScanQRScreen = () =>{
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [isLoading, setIsloading] = useState(true);
  const [orgId, setOrgId] = useState();
  //const [date, setDate] = useState();
  const [time, setTime] = useState();
  const date = new Date();
  const [user, setUser] = useState();
  const [checkInDetail, setCheckInDetail] =  useState();
  const [refreshCounter, setRefreshCounter] = useState(0);

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
          setCheckInDetail(snapshot.data().checkIn)
          setIsloading(false)
        })
      
}
    fetchUser();
  }, [orgId, refreshCounter])


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
    const fullDate = date
    const dateName = date.getDate().toString().padStart(2,0) + '-' + (date.getMonth()+1).toString().padStart(2,0) + '-' + date.getFullYear()
    const timeName = date.getHours().toString().padStart(2,0)+":"+date.getMinutes().toString().padStart(2,0)+":"+date.getSeconds().toString().padStart(2,0)

    //check out of previous location
    if (checkInDetail){
      firebase.firestore().collection("organisations")
        .doc(orgId)
        .collection('locations')
        .doc(checkInDetail.location)
        .collection(checkInDetail.date)
        .doc(checkInDetail.time)
        .update({
            checkOut:date,
        });
      }

    //add to location's collection
    firebase.firestore().collection("organisations")
              .doc(orgId)
              .collection('locations')
              .doc(location)
              .collection(dateName)
              .doc(timeName)
              .set({
                  id: user.id,
                  name: user.name,
                  time: fullDate,
                  checkOut: null,
              });

    // add to user's collection of current location
    firebase.firestore().collection("organisations")
              .doc(orgId)
              .collection('employees')
              .doc(firebase.auth().currentUser.uid)
              .update({
                  workStatus: 'office',
                  checkIn: {
                    location: location,
                    date: dateName,
                    time: timeName,
                  },
              });

    alert(user.name+" has successfully checked-in to "+location)
    setRefreshCounter(refreshCounter+1)
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