import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, Button, TextInput } from 'react-native';

const LoginScreen = ({navigation}) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (

    <SafeAreaView style={styles.container}>

      <Image source={require("../assets/logo.png")} style={styles.logo}/>
      
      <View style={styles.loginTitleView}>
        <Text style={styles.loginTitle}>
          Login
        </Text>
      </View>

      <View style={styles.inputLabelView}>
        <Text style={styles.inputLabel}>
          Username 
        </Text>
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Username"
          placeholderTextColor="grey"
          onChangeText={(username) => setUsername(username)}
        />
      </View>
      
      <View style={styles.inputLabelView}>
        <Text style={styles.inputLabel}>
          Password 
        </Text>
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password"
          placeholderTextColor="grey"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>
      
      <View style={styles.buttonView}>
        <Button 
          title="LOGIN"
          onPress={()=>navigation.navigate('Root')}
        >
          LOGIN
        </Button>
      </View>
    
      <View style={styles.registerView}>
        <Text >Don't have an account? </Text>
        <Text style={{textDecorationLine:'underline'}}>Register</Text>
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
    width: "70%",
    color: "#AAAAAA",
    fontSize: 28,
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
    height: 45,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: "center",
  },
  
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
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
