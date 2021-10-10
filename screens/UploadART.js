import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Button, Platform, Text, Image,TouchableOpacity,ToastAndroid, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import RadioForm, {
  RadioButton, 
  RadioButtonInput, 
  RadioButtonLabel
} from 'react-native-simple-radio-button';
import * as ImagePicker from 'expo-image-picker';

const UploadARTScreen = () =>{

  var result = [
    {label: "Negative", value: 0},
    {label: "Positive", value: 1},
  ];

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [text, setText] = useState('Empty')

  const onChange = (event, selectedDate) => {
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

  const [selectedImage, setSelectedImage] = useState();
  /*useEffect(() => {
    if (image) {
      console.log("useEffect: " + image);
      setSelectedImage({ uri: image });
    }
  }, [image])*/

  const pickImage = async () => {
      result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
    console.log(result);

    if (!result.cancelled) {
      setSelectedImage(result.uri);
      console.log(result.uri);
    }
  };

   return (
    <View style={styles.container}>

    <Text style={styles.headerText}> ART Result Submission </Text>

    <Image source={require("../assets/logo.png")} style={styles.logo}/>
            
    <Text style={styles.questionText}> What is your ART Result?   </Text>

        <RadioForm
              radio_props={result}
              initial={2}
              onPress={(value) => {ToastAndroid.show(value.toString(), ToastAndroid.SHORT)}}
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
              onChange={onChange} 
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
                <Button title="Submit" onPress={() => 
                { }} color = "yellowgreen" />
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