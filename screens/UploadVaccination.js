import React, { useState, useEffect} from 'react';
import { StyleSheet, Text, View, picker, SafeAreaView, ScrollView, Button} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import * as DocumentPicker from 'expo-document-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

import RadioForm, {
  RadioButton, 
  RadioButtonInput, 
  RadioButtonLabel
} from 'react-native-simple-radio-button';

import firebase from 'firebase';
import "firebase/firestore";
import 'firebase/firebase-storage';

const UploadVaccinationScreen = () =>{

  useEffect(()=>{
    if(vaccinationResult==='Not Vaccinated'){
      setDose(null);
      setType(null);
      setDate(new Date());
    }
  },[vaccinationResult])

  const [dose, setDose]= useState('1')
  const [type, setType]= useState('Pfizer')

  var result = [
    {label: "Yes", value: 'Fully Vaccinated'},
    {label: "Partial", value: "Partially Vaccinated"},
    {label: "No", value: 'Not Vaccinated'},
  ];
  const [vaccinationResult, setVaccinationResult]=useState('Not Vaccinated');
  const [selectedImage, setSelectedImage] = useState('');





  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [text, setText] = useState('Empty')
  

  const onChangeDate = (event, selectedDate) => {
    setShow(false)
    const currentDate = selectedDate || date;
  
    setDate(currentDate);

    // Process the date values
    let tempDate = new Date(currentDate);
    let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
    setText(fDate)

    // Log the Date values
    console.log(tempDate)
    
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };


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
      if(vaccinationResult==='Not Vaccinated'){
        firebase.firestore()
          .collection('organisations')
          .doc(orgId)
          .collection("employees")
          .doc(userId)
          .update({
              "vaccinationResultLink" : null,
              "vaccinationResult": vaccinationResult,
              "vaccinationType": null,
              "vaccinationDose": null,
          }).then((function () {
              alert('Vaccination results successfully uploaded!')
          }))
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
  }
    //save vaccine date and download link
    const saveUploadData = (downloadURL) => {
      firebase.firestore()
          .collection('organisations')
          .doc(orgId)
          .collection("employees")
          .doc(userId)
          .update({
              "vaccinationResultLink" : downloadURL,
              "vaccinationResult": vaccinationResult,
              "vaccinationType": type,
              "vaccinationDose": dose,
              "vaccinationVerified": 'Unverified',
          }).then((function () {
              alert('Vaccination results successfully uploaded!')
          }))
  };

  }

  return (
    <View style={styles.container}>
       
    <Text style={styles.questionText}> Are you Vaccinated?   </Text>

        <RadioForm
              radio_props={result}
              initial={2}
              onPress={(value) => {setVaccinationResult(value)}}
              buttonSize={10}
              buttonOuterSize={20}
              selectedButtonColor={'white'}
              selectedLabelColor={'white'}
              labelStyle={{ fontSize: 20, }}
              disabled={false}
              formHorizontal={false}
            />
{vaccinationResult==="Not Vaccinated"?<Text/>:[
<Text style={styles.questionText}> Vaccine Type?  </Text>,

<View style={styles.container}> 
  <Picker

  selectedValue={type}
  style={styles.picker}
  value={type}
  onValueChange={(value, index)=>setType(value)}
  >
  <Picker.Item label="Pfizer" value="Pfizer"/>
  <Picker.Item label="Moderna" value="Moderna"/>
  <Picker.Item label="Sinovac" value="Sinovac"/>

  </Picker>
      </View>,

      <Text style={styles.questionText}> No. of doses taken </Text>,

<View style={styles.container}>
<Picker
                 selectedValue={dose}
                 style={styles.picker}
                 value={dose}
                 onValueChange={(value, index)=>setDose(value)}
             >
                 <Picker.Item label="1" value="1"/>
                 <Picker.Item label="2" value="2"/>
                 <Picker.Item label="3" value="3"/>

             </Picker>
      </View>,


    <Text style={styles.questionText}> Please enter date of latest dose.  </Text>,

    <Text style={{ fontWeight: 'bold', fontSize: 14 }}>{text}</Text>,
    <View style={{ margin: 10 }}>
      <Button onPress={() => showMode('date')} title="Select Date" />
      </View>]}
          
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={onChangeDate} 
            />
          )}

{vaccinationResult==="Not Vaccinated"?<Text/>:[<Text style={styles.questionText}> Please Upload Certificate.</Text>,

<View style={styles.container}>
<Text>Selected File: {docName}</Text>
<View style={{ margin: 10 }}></View>
<Button title="Upload Document" onPress={pickDocument}/>
</View>]}
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




  questionText: {
    color: "#000000",
    marginTop: 12,
    marginBottom: 8,
    fontSize: 18,
  
},

  buttonContainer: {
    marginTop: 30,
    marginBottom: 30,
  },

  text: {
    marginTop: 10,
    marginLeft: 10,
},

    picker: {
        width: 150,
        height: 30,
        borderColor:'blue',
        color: 'white',
    }

});