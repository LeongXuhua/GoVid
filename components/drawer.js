import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Text,
  Linking,
  Button,
  TouchableOpacity
} from 'react-native';

import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import firebase from 'firebase';



const CustomSidebarMenu = (props) => {
  
  const [orgId, setOrgId] = useState();
  const [name, setName] = useState();

        firebase.firestore()
        .collection('users')
        .doc(firebase.auth().currentUser.uid)
        .get().then((snapshot)=>{setOrgId(snapshot.data().organisationId)})

        firebase.firestore()
        .collection('organisations')
        .doc(orgId)
        .collection('employees')
        .doc(firebase.auth().currentUser.uid)
        .get().then((snapshot)=>{setName(snapshot.data().name)})


  return (
    <SafeAreaView style={{flex: 1, backgroundColor:"white",}}>
      {/*Top Large Image */}
      <Image
        source={require("../assets/logo.png")}
        style={styles.sideMenuProfileIcon}
      />
      <View style={{flexDirection: 'row'}}>
        <Text style={{marginTop: 0, marginBottom: 0}}> {name} </Text>
        <TouchableOpacity>
          <MaterialCommunityIcons name="bell" size={30} style={{ color: "#007AFF", marginLeft: 95 }} />
        </TouchableOpacity>
      </View>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <Button title="logout" onPress={() => firebase.auth().signOut().then(()=>props.navigation.popToTop())} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sideMenuProfileIcon: {
    resizeMode: 'center',
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    alignSelf: 'center',
    marginTop: 30,
  },
  iconStyle: {
    width: 15,
    height: 15,
    marginHorizontal: 5,
  },
  customItem: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default CustomSidebarMenu;