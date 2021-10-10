import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, SafeAreaView, ScrollView, Button } from 'react-native';
import firebase from 'firebase';
import "firebase/firestore";
/*
const firebaseConfig2 = {
    apiKey: "AIzaSyDaaAbFMM4ki7OOTJbM1sy8ocpplngW0uo",
    authDomain: "govid-fcb26.firebaseapp.com",
    databaseURL: "https://govid-fcb26-default-rtdb.asia-southeast1.firebasedatabase.app",
};

var secondaryApp = firebase.initializeApp(firebaseConfig2, "Secondary");
*/
const RegisterAdminScreen = () => {
   /* const [orgName, setOrgName]=useState('');
    const [name, setName]=useState('');
    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');

    const [orgId, setOrgId] = useState();

    function getOrganisationId(userId){
        firebase.firestore()
        .collection('users')
        .doc(userId)
        .get().then((snapshot)=>{setOrgId(snapshot.data().organisationId)})
    };

    getOrganisationId(firebase.auth().currentUser.uid);
    
    registerUser = () => {
        
        if (0!=0){
            //logic to catch invalid registration
        }
        else{
            secondaryApp.auth().createUserWithEmailAndPassword(email, password).then((result)=>{
                //add user into user collection, so can map to organisation ID
                firebase.firestore().collection("users")
                .doc(secondaryApp.auth().currentUser.uid)
                .set({
                    organisationId:orgId,
                    email
                });
                
                //add user details into org's collection
                firebase.firestore().collection("organisations")
                .doc(orgId)
                .collection('employee')
                .doc(secondaryApp.auth().currentUser.uid)
                .set({
                    id:id,
                    name:name,
                    email:email,
                    department:department,
                    role:role,
                    managerId:managerId,
                    managerName:managerName
                });

            })
        };
    };*/

    return (
        
        <SafeAreaView><ScrollView>

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
                    onPress={()=>registerUser()}
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
        alignItems: 'center',
        justifyContent: 'center',
    },

    text: {
        marginTop: 10,
        marginLeft: 10,
    },

    inputContainer: {
        borderWidth: 1,
        borderColor: 'lightgrey',
        paddingBottom: 5,
        paddingLeft: 10,
        marginLeft: 10,
        marginRight: 10
    },

    textInput: {
        paddingLeft: 10,
        height: 40,
        padding: 10,
        color: 'grey',
    },

    button: {
        marginTop: 50,
        paddingRight: 70,
        paddingLeft: 70,
    }
});