import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Button, Platform, Text, Image,TouchableOpacity,ToastAndroid, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import RadioForm, {
  RadioButton, 
  RadioButtonInput, 
  RadioButtonLabel
} from 'react-native-simple-radio-button';
import * as ImagePicker from 'expo-image-picker';
import firebase from 'firebase';
import "firebase/firestore";
import 'firebase/firebase-storage';

const UploadARTScreen = () =>{

  var result = [
    {label: "Negative", value: 'negative'},
    {label: "Positive", value: 'positive'},
  ];
  const [testResult, setTestResult]=useState('negative');
  const [selectedImage, setSelectedImage] = useState();

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

  
  //select image
  const pickImage = async () => {
      result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
    });
    console.log(result);

    if (!result.cancelled) {
      setSelectedImage(result.uri);
      console.log(result.uri);
    }
  };

  //get user and org id
  const [orgId, setOrgId] = useState();
  const userId = firebase.auth().currentUser.uid
  firebase.firestore()
        .collection('users')
        .doc(userId)
        .get().then((snapshot)=>{setOrgId(snapshot.data().organisationId)});

  //upload results + image to cloud
  async function uploadResult(result, date, image){
    if(0!=0){ //SET CONDITIONS FOR REJECT UPLOAD

    }else{
      //upload image to storage
      const uri = image;
      const childPath = `${orgId}/testResult/${userId}`;
      console.log(childPath)
      const response = await fetch(uri);
      const blob = await response.blob();

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

    //save art date and download link
    const saveUploadData = (downloadURL) => {

      firebase.firestore()
          .collection('organisations')
          .doc(orgId)
          .collection("employees")
          .doc(userId)
          .update({
              "ARTDate" : date,
              "ARTResult" : downloadURL,
          }).then((function () {
              props.navigation.popToTop()
          }))

  };

  return (
    
    <View style={styles.container}>

    <Text style={styles.headerText}> ART Result Submission </Text>
            
    <Text style={styles.questionText}> What is your ART Result?   </Text>

        <RadioForm
              radio_props={result}
              initial={2}
              onPress={(value) => {setTestResult(value)}}
              buttonSize={10}
              buttonOuterSize={20}
              selectedButtonColor={'white'}
              selectedLabelColor={'white'}
              labelStyle={{ fontSize: 20, }}
              disabled={false}
              formHorizontal={false}
            />

    <Text style={styles.questionText}> Please enter date of ART test.   </Text>

    <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{text}</Text>
    <View style={{ margin: 20 }}>
      <Button onPress={() => showMode('date')} title="Select Date" />
      </View>
          
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
          

          <Text style={styles.questionText}> Please attach image.</Text>

          <View style={styles.imageContainer}>
            <Image source={{uri: selectedImage}} style={styles.previewImage} />
          </View>
          <View style={styles.imagebutton}>
            <Button title="Upload Image" onPress={pickImage}/>
          </View>

          <View style={styles.buttonContainer}>
              <Button title="Submit" onPress={()=>{uploadResult(testResult,date,selectedImage)}} color = "green" />
          </View>
        </View>
        
      );
    };

export default UploadARTScreen;

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
    color: "#EEEEEE",
    fontSize: 32,
},

  questionText: {
    color: "#EEEEEE",
    marginTop: 14,
    marginBottom: 10,
    fontSize: 18,
},

  buttonContainer: {
    margin: 5,
  },

  imageContainer: {
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: '#eee',
    width: '80%',
    height: 150
  },
  imagebutton: {
    margin: 8
  },
  previewImage: {
    width: '100%',
    height: '100%'
  }



});