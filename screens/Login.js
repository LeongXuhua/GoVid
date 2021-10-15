import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, Button, TextInput } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import firebase from 'firebase'
import RegisterAdminScreen from './RegisterAdmin';

const LoginScreen = ({navigation}) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function login(email, password){
    firebase.auth().signInWithEmailAndPassword(email, password)
            .then((result) => {
                console.log(result);
                navigation.navigate('Root');
            })
            .catch((error) => {
                alert(error)
            })
    }


  return (

    <SafeAreaView style={styles.container}>

      <Image source={require("../assets/logo.png")} style={styles.logo}/>
      
      <View style={styles.loginTitleView}>
        <Text style={styles.loginTitle}>
          Welcome!
        </Text>
      </View>

      <View style={styles.inputLabelView}>
        <Text style={styles.inputLabel}>
          Email 
        </Text>
      </View>
      <View style={styles.inputView}>
      <MaterialCommunityIcons name="account-outline" size={20} style={styles.texticon}/>
        <TextInput
          style={styles.TextInput}
          placeholder="Your Email"
          placeholderTextColor="grey"
          autoCapitalize="none"
          onChangeText={(email) => setEmail(email)}
        />
      </View>
      
      <View style={styles.inputLabelView}>
        <Text style={styles.inputLabel}>
          Password 
        </Text>
      </View>
      <View style={styles.inputView}>
      <MaterialCommunityIcons name="lock-outline" size={20} style={styles.texticon}/>
        <TextInput
          style={styles.TextInput}
          placeholder="Your Password"
          placeholderTextColor="grey"
          autoCapitalize="none"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>
      
      <View style={styles.buttonView}>
        <Button 
          title="LOGIN"
          //onPress={()=>navigation.navigate('Root')}
          onPress={()=>login(email, password)}
        >
          LOGIN
        </Button>
      </View>
    
      <View style={styles.registerView}>
        <Text> Don't have an account? </Text>
        <Text style={{textDecorationLine:'underline'}} onPress={()=>navigation.navigate('RegisterAdmin')}>Register</Text>
      </View>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

export default LoginScreen;

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

  loginTitle: {
    color: "#EEEEEE",
    fontSize: 32,
  },

  loginTitleView: {
    justifyContent: 'center',
  },


  inputLabel: {
    width: "70%",
    justifyContent: 'flex-start',
  },

  inputLabelView: {
    width: "70%",
    justifyContent: 'flex-start',
  },

  inputView: {
    backgroundColor: "#FFFFFF",
    width: "70%",
    height: 40,
    borderRadius: 10,
    marginBottom: 20,
    marginTop: 5,
    flexDirection: "row",
  },

  texticon: {
    color: "black",
    height: 40,
    padding: 10,
  },
  
  TextInput: {
    height: 40,
    width: "100%",
  },

  buttonView: {
    width: "70%",
    borderRadius: 10,
    marginBottom: 20,
    marginTop: 20,
    alignItems: "flex-end",
  },

  registerView: {
    width: "70%",
    borderRadius: 10,
    marginBottom: 20,
    marginTop: 20,
    alignItems: "center",
    flexDirection:"row",
  },



});
