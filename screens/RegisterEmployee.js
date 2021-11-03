import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, SafeAreaView, ScrollView, Button, Picker} from 'react-native';
import firebase from 'firebase';
import "firebase/firestore";
import { secondaryApp } from '../App';
import { ActivityIndicator } from 'react-native-paper';

const RegisterEmployeeScreen = () => {
    const [id, setId]=useState('');
    const [name, setName]=useState('');
    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');
    const [role, setRole]=useState('');
    const [managerId, setManagerId]=useState('');
    const [managerName, setManagerName]=useState('');
    const [orgId, setOrgId] = useState();
    const [managerList, setManagerList] = useState([]);
    const [isLoading, setIsloading] = useState(true);
    const [managerUid, setManagerUid] = useState();

    const fetchData = async () => {
        setIsloading(true);
        try {
          const snapshot = await firebase.firestore()
          .collection('users')
          .doc(firebase.auth().currentUser.uid)
          .get()
    
          const organisationId = await snapshot.data().organisationId;
          setOrgId(organisationId);
        }
        catch (e) {
          console.log(e)
        }
      }
    
      useEffect(() => {
        fetchData();
      }, []);
    
      useEffect(()=>{
        const fetchEmployee = async()=>{
        const manager =[];
    
        const snapshot2 = await firebase.firestore()
            .collection('organisations')
            .doc(orgId)
            .collection('managers').orderBy('id')
            .get()
    
        snapshot2.docs.map(function(doc){
                manager.push(
                  {
                    id: doc.data().id,
                    name: doc.data().name,
                    uid: doc.id,
                  }
                )
              setManagerList([...manager])
            })
        setIsloading(false)
    }
        fetchEmployee();
      }, [orgId])

      const setManagerDetail= async (uid)=>{
        const manager = await firebase.firestore()
        .collection("organisations")
        .doc(orgId)
        .collection("managers")
        .doc(uid).get()

        setManagerName(manager.data().name)
        setManagerId(manager.data().id)
      }

var    registerUser = () => {
        
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
                
                //check if theres manager data
                if(managerUid){
                    setManagerDetail(managerUid)
                }else{
                    setManagerName(null)
                    setManagerId(null)
                };

                //add user details into org's collection
                firebase.firestore().collection("organisations")
                .doc(orgId)
                .collection('employees')
                .doc(secondaryApp.auth().currentUser.uid)
                .set({
                    id:id,
                    name:name,
                    email:email,
                    role:role,
                    managerId:managerId,
                    managerName:managerName,
                    ARTDate: null,
                    ARTResult: null,
                    ARTResultLink: null,
                    ARTVerified: false,
                    vaccinationResultLink: null,
                    vaccinationResult: 'Not Vaccinated',
                    vaccinationDose: 0,
                    vaccinationDate: null,
                    vaccinationType: null,
                    vaccinationVerified: false,
                    workStatus: 'office',

                });

                //add manager record / add into manager's record
                if (role=='manager'){
                    firebase.firestore().collection("organisations")
                    .doc(orgId)
                    .collection('managers')
                    .doc(secondaryApp.auth().currentUser.uid)
                    .set({
                        name:name,
                        id:id,
                    });
                    alert('An account for '+name+' has been successfully created!')
                }else{
                    //update manager's collection of employees
                    firebase.firestore().collection("organisations")
                        .doc(orgId)
                        .collection('managers')
                        .doc(managerUid)
                        .collection('employees')
                        .doc(secondaryApp.auth().currentUser.uid)
                        .set({
                            name:name,
                            id:id,
                        });

                    alert('An account for '+name+' has been successfully created!')
                    }                   
            })
        };
    };

    if (isLoading){
        return <ActivityIndicator />;
    }else{
    return (
        
        <SafeAreaView><ScrollView>

            <Text style={styles.text}>
            Employee ID
            </Text>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="ID"
                    style={styles.textInput}
                    value={id}
                    onChangeText={(value)=>setId(value)}
                />
            </View>

            <Text style={styles.text}>
                Employee Name
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
            Employee email
            </Text>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="email"
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

            <Text style={styles.text}>
                Employment Type
            </Text>
            <View style={styles.inputContainer}>
                <Picker
                    selectedValue={role}
                    style={styles.textInput}
                    value={role}
                    onValueChange={(value, index)=>setRole(value)}
                >
                    <Picker.item label="employee" value="employee"/>
                    <Picker.item label="manager" value="manager"/>
                </Picker>
            </View>

            <Text style={styles.text}>
                    Manager ID
            </Text>

            <View style={styles.inputContainer}>

            <Picker
                    selectedValue={managerUid}
                    style={styles.textInput}
                    value={managerUid}
                    onValueChange={(value, index)=>setManagerUid(value)}
                >
                    <Picker.item label="No Manager" value=''/>
                {managerList.map((manager)=>(
                    <Picker.item label={manager.id+" "+manager.name} value={manager.uid}/>
                ))}
                </Picker>

                
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
}    
export default RegisterEmployeeScreen;

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