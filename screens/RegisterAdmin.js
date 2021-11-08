import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, SafeAreaView, ScrollView, Button } from 'react-native';
import firebase from 'firebase';
import "firebase/firestore";

const RegisterAdminScreen = ({navigation}) => {
    const [orgName, setOrgName]=useState('');
    const [name, setName]=useState('');
    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');

    registerOrg = () => {
        if (0!=0){
            //conditionals
        }
        else{
            //create new document under organisation
            firebase.firestore().collection("organisations").add({
                name: orgName
            }).then((docRef)=>{
                //create admin account for org
                firebase.auth().createUserWithEmailAndPassword(email, password).then((result)=>{
                    //add user into user collection, so can map to organisation ID
                    firebase.firestore().collection("users")
                    .doc(firebase.auth().currentUser.uid)
                    .set({
                        organisationId:docRef.id,
                        email
                    })
                    
                    //add user details into org's collection
                    firebase.firestore().collection("organisations")
                    .doc(docRef.id)
                    .collection('employees')
                    .doc(firebase.auth().currentUser.uid)
                    .set({
                        name:name,
                        email:email,
                        role:'admin',
                    })
                    alert('An account for '+name+' of '+orgName+' has been successfully created!')
                    navigation.navigate('Login')
                }).catch((error) => {
                    if(orgName == '' && name == '' && email == '' && password == ''){
                        alert("All fields are empty! Please try again")
                    }
                    else if(orgName == '' || name == '' || email == '' || password == ''){
                        alert("One of the fields if empty! Please try again")
                    }else{
                        alert(error)
                    }
                    
                });
                
            });
            
            
            
        };
    };
    
    return (
        
        <SafeAreaView style={styles.container}><ScrollView>
            <Text style={styles.title}>Register Your Company</Text>
            <Text style={styles.text}>
                Organisation Name
            </Text>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Organisation Name"
                    style={styles.textInput}
                    value={orgName}
                    onChangeText={(value)=>setOrgName(value)}
                />
            </View>

            <Text style={styles.text}>
                Administrator Name
            </Text>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Full Name"
                    style={styles.textInput}
                    value={name}
                    onChangeText={(value)=>setName(value)}
                />
            </View>

            <Text style={styles.text}>
            Administrator Email
            </Text>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Email"
                    style={styles.textInput}
                    value={email}
                    onChangeText={(value)=>setEmail(value)}
                />
            </View>

            <Text style={styles.text}>
                Password
            </Text>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Password"
                    style={styles.textInput}
                    value={password}
                    onChangeText={(value)=>setPassword(value)}
                />
            </View>

            <View style={styles.button}>
                <Button
                    title="Register"
                    onPress={()=>registerOrg()}
                />
            </View>
        </ScrollView></SafeAreaView>
    )
}
    
export default RegisterAdminScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#51a4fb',
    },

    title: {
        marginTop: 80,
        marginBottom: 30,
        color: "#EEEEEE",
        fontSize: 32,
        alignSelf: "center"
    },

    text: {
        marginTop: 10,
        marginLeft: 40,
        
    },

    inputContainer: {
        borderWidth: 1,
        borderColor: 'lightgrey',
        backgroundColor: 'white',
        paddingBottom: 5,
        paddingLeft: 10,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 5,
        borderRadius: 10,
        height: 40,
        width: "80%",
        alignSelf: "center"
    },

    textInput: {
        paddingLeft: 5,
        height: 40,
        color: 'grey',
    },

    button: {
        marginTop: 50,
        paddingRight: 70,
        paddingLeft: 70,
    }
});