import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, SafeAreaView, Button, Image, Modal, TouchableOpacity } from 'react-native';
import firebase from 'firebase';
import "firebase/firestore";

const RegisterAdminScreen = ({navigation}) => {
    const [orgName, setOrgName]=useState('');
    const [name, setName]=useState('');
    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');

    const registerOrg = () => {
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

    const [isModalVisible, setIsModalVisible] = useState(false);

    const showPayment = () => {
        setIsModalVisible(true);
    }
    const onPressSaveEdit = () => {
        setIsModalVisible(false);
    }

    return (
        <SafeAreaView style={styles.container}>

            <Image source={require("../assets/logo.png")} style={styles.logo}/>

            <Text style={styles.title}>Register Your Company</Text>
            <View style={styles.inputLabelView}>
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
            </View>

            <View style={styles.inputLabelView}>
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
            </View>

            <View style={styles.inputLabelView}>
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
            </View>

            <View style={styles.inputLabelView}>
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
            </View>

            <View style={styles.button}>
                <Button
                    title="     Register     "
                    onPress={()=>showPayment()}
                />
            </View>
            <View style={styles.button}>
                <Button
                    title="Back To Login"
                    onPress={()=>navigation.popToTop()}
                />
            </View>

            <Modal
            animationType='slide'
            transparent={true}
            visible={isModalVisible}
            onRequestClose={() => setIsModalVisible(false)}
            >
            <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <Text style={styles.modalText}>Please scan the QR code below to make payment:</Text>
                <Image source={require("../assets/paymentQRcode.jpg")} style={{width: 200, height: 200}}/>
            <TouchableOpacity
                style={styles.modalSaveButton}
                onPress={()=> onPressSaveEdit()}>
                <Text style={{color: 'white', fontWeight: 'bold'}}>Payment Done</Text>
            </TouchableOpacity>
            </View>
            </View>
            </Modal>
            </SafeAreaView>
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

    logo: {
        width: '100%',
        height: '20%',
        resizeMode: 'contain',
      },

    title: {
        color: "#EEEEEE",
        fontSize: 32,
        alignSelf: "center"
    },

    text: {
        marginTop: 10,
    },

    inputLabelView: {
        width: "70%",
        justifyContent: 'flex-start',
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
        width: "100%",
        alignSelf: "center"
    },

    textInput: {
        paddingLeft: 5,
        height: 40,
        color: 'grey',
    },

    button: {
        width: "70%",
        borderRadius: 10,
        marginBottom: 20,
        marginTop: 20,
        alignItems: "flex-end",
    },

    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
    
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        elevation: 24,
        borderWidth: 1,
        borderColor: 'grey',
      },
    
      modalText: {
        fontSize: 15,
        textAlign: 'center',
      },
    
      modalSaveButton: {
        backgroundColor: '#51a4fb',
        borderRadius: 20,
        padding: 10,
        marginTop: 20,
        elevation: 2
      }
});