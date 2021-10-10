import React from 'react';
import { StyleSheet, Text, View, TextInput, SafeAreaView, Button } from 'react-native';

const RegisterAdminScreen = () => {
    return (
        <SafeAreaView>
            <Text style={styles.text}>
            Organisation Name
            </Text>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Organisation Name"
                    style={styles.textInput}
                />
            </View>

            <Text style={styles.text}>
                Administrator Name
            </Text>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Full Name"
                    style={styles.textInput}
                />
            </View>
            
            <Text style={styles.text}>
                Password
            </Text>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Password"
                    style={styles.textInput}
                />
            </View>

            <Text style={styles.text}>
                Email Address
            </Text>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Email"
                    style={styles.textInput}
                />
            </View>

            
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