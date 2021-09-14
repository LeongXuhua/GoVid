import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';


const ScanQRScreen = () =>{
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  
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
    alert(`QR code with data ${data} has been scanned!`);
  };


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

  return (
    <View style={styles.container}>

    <View>
    <Text style={styles.headertext}> Scan SafeEntry QR code </Text>
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