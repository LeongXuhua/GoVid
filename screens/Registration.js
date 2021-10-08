import React from 'react';
import { StyleSheet, Text, View, TextInput, SafeAreaView, Button } from 'react-native';

const RegistrationScreen = () => {
    return (
        <SafeAreaView>
            <Text style={styles.text}>
            Employee ID
            </Text>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="ID"
                    style={styles.textInput}
                />
            </View>

            <Text style={styles.text}>
                Employee Name
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
                Department
            </Text>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Department"
                    style={styles.textInput}
                />
            </View>

            <Text style={styles.text}>
                Employment Type
            </Text>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Employee or Manager"
                    style={styles.textInput}
                />
            </View>

            <Text style={styles.text}>
                    Manager ID
            </Text>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Manager ID"
                    style={styles.textInput}
                />
            </View>

            <Text style={styles.text}>
                    Manager Name
            </Text>
            <View style={styles.inputContainer}>
                
                <TextInput
                    placeholder="Full Name"
                    style={styles.textInput}
                />
            </View>

            <View style={styles.button}>
                <Button
                title="Register">Register</Button>
            </View>
        </SafeAreaView>
    )
}
    
export default RegistrationScreen;

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