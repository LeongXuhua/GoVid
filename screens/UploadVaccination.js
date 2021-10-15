import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Button, Platform, Text, Image,TouchableOpacity,ToastAndroid, ScrollView } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import firebase from 'firebase';
import "firebase/firestore";
import 'firebase/firebase-storage';

const UploadVaccinationScreen = () =>{

  const [selectedDocument, setSelectedDocument] = useState();
  const [docName, setDocName] = useState('None');

  //select document
  const pickDocument = async () => {
    var result = await DocumentPicker.getDocumentAsync();
    console.log(result);
    if (result.type !== 'cancel') {
      setSelectedDocument("file://"+result.uri);
      setDocName(result.name);
      console.log("file://"+result.uri);
    }
  };

  //get user and org id
  const [orgId, setOrgId] = useState();
  const userId = firebase.auth().currentUser.uid
  firebase.firestore()
        .collection('users')
        .doc(userId)
        .get().then((snapshot)=>{setOrgId(snapshot.data().organisationId)});

  //upload document cloud
  async function uploadResult(document){
    if(0!=0){ //SET CONDITIONS FOR REJECT UPLOAD

    }else{
      //upload document to storage
      const uri = document;
      const childPath = `${orgId}/vaccinationResult/${userId}`;
      console.log(childPath)
      const response = await fetch(uri).catch((error)=>{console.log(error)});
      const blob = await response.blob().catch((error)=>{console.log(error)});

      const task = firebase
          .storage()
          .ref()
          .child(childPath)
          .put(blob);

      const taskProgress = snapshot => {
          console.log(`transferred: ${snapshot.bytesTransferred}`)
      }

      const taskCompleted = () => {
          task.snapshot.ref.getDownloadURL().then((snapshot) => {
              saveUploadData(snapshot);
              console.log(snapshot)
          })
      }

      const taskError = snapshot => {
          console.log(snapshot)
      }

      task.on("state_changed", taskProgress, taskError, taskCompleted);
    }

    //save art date and download link
    const saveUploadData = (downloadURL) => {

      firebase.firestore()
          .collection('organisations')
          .doc(orgId)
          .collection("employees")
          .doc(userId)
          .update({
              "VaccinationResult" : downloadURL,
          }).then((function () {
              alert('Vaccination results successfully uploaded!')
          }))

  };

  }


  return (
    <View style={styles.container}>

    <Image source={require("../assets/logo.png")} style={styles.logo}/>
 
 
    <Text style={styles.headerText}> Vaccination Status</Text>

 <Text style={styles.questionText}> Please Upload Certificate.</Text>

<View style={styles.container}>
<Text>Selected File: {docName}</Text>
<Button title="Upload Document" onPress={pickDocument}/>
</View>
 <View style={styles.buttonContainer}>
              <Button title="Submit" onPress={()=>{uploadResult(selectedDocument)}} color = "yellowgreen" />
          </View>

        </View>
      );
    };

export default UploadVaccinationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#51a4fb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: '100%',
    height: '20%',
    resizeMode: 'contain',
  },

  headerText: {
    color: "#555555",
    fontSize: 24,
    marginBottom: 10,
},

  questionText: {
    color: "#EEEEEE",
    marginTop: 14,
    marginBottom: 10,
    fontSize: 18,
},

  buttonContainer: {
    marginBottom: 50,
  }

});