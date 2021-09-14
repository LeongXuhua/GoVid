import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button } from 'react-native';

const CheckSymptomsScreen = () => {
    const data = [
        {
            question: "Do you have a fever? (High temperature over 38 degrees celsius)",
            description: "Symptoms of a fever can include feeling tired and being warm or hot to touch."
        },
        {
            question: "Do you have any type of cough?",
            description: "Coughing a lot for more than an hour, or three or more coughing in 24hours."
        },
        {
            question: "Do you have any diffuculty breathing?",
            description: "Panting or feeling like you can't fill your lungs."
        },
        {
            question: "Do you have any loss or change to your sense of taste or smell?",
            description: "Noticed that you cannot smell or taste anything, or that things smell or taste different to normal."
        }
    ]

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [countYesResponse, setCountYesResponse] = useState(0)
    const [showQuestion, setShowQuestion] = useState(true)
    const [showSafeReccomendation, setShowSafeReccomendation] = useState(false)
    const [showInfectedReccomendation, setShowInfectedReccomendation] = useState(false)

    const renderQuestion = () => {
        return(
            <View>
                <View>
                    <Text style={styles.questionNumber}>{currentQuestionIndex+1} /{data.length}</Text>
                </View>
                    <Text style={styles.question}>{data[currentQuestionIndex]?.question}</Text>
                    <Text style={styles.description}>{data[currentQuestionIndex]?.description}</Text>
                <Button
                    title="No"
                    onPress={()=>handleNext('no')}
                    style={styles.button}>
                </Button>
                <Button
                    title="Yes"
                    onPress={()=>handleNext('yes')}
                    style={styles.button}>
                </Button>
            </View>
        )
    }

    const handleNext = (type) => {
        if(currentQuestionIndex == data.length-1){
            if(countYesResponse > 0){
                setShowQuestion(false);
                setShowInfectedReccomendation(true);
                
            }
            else{
                setShowQuestion(false);
                setShowSafeReccomendation(true);
            }
        }
        else{
            setCurrentQuestionIndex(currentQuestionIndex+1);
            if(type == 'yes'){
                setCountYesResponse(countYesResponse+1)
            }
        }
    }

    const restart = () => {
        setCurrentQuestionIndex(0);
        setCountYesResponse(0);
        setShowQuestion(true);
        setShowSafeReccomendation(false);
        setShowInfectedReccomendation(false);
    }

    return(
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}> Check Symptoms</Text>

            <View style={styles.questionContainer}>
                { showQuestion ?(renderQuestion()) :null }
            
                { showSafeReccomendation ?(
                    <View>
                        <Text style={styles.question}>You are safe! Please continue to be safe.</Text>
                        <Button title="Restart" onPress={restart}/>
                    </View>
                ) : null}
                { showInfectedReccomendation ?(
                    <View>
                        <Text style={styles.question}>You may be infected!</Text>
                        <Text style={styles.description}>You are recommended to do the following:</Text>
                        <Button title="Facetime a doctor" />
                        <Button title="Book a Covid test" />
                        <Button title="Restart" onPress={restart}/>
                    </View>
                ) :null}
            </View>
        </SafeAreaView>
    )
}
export default CheckSymptomsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#51a4fb',
        alignItems: 'center',
        justifyContent: 'center'
      },

    title: {
        color: "#EEEEEE",
        fontSize: 32,
    },

    questionContainer: {
        flex: 1,
        paddingHorizontal: 25,
        marginTop: 30,
        marginBottom: 250,
        backgroundColor: '#eaeaea',
        borderColor: '#505050',
        borderRadius: 8,
        borderWidth: 2,
        textAlign: 'center',
        fontWeight: 'bold',

    },

    questionNumber: {
        color: '#EEEEEE',
        fontSize: 18
    },

    question: {
        color: '#101010',
        fontSize: 20,
        textAlign: 'left'
    },

    description: {
        color: '#101010',
        fontSize: 16,
        textAlign: 'left'
    },

    button: {
        marginTop: 20, 
        width: '25%', 
        padding: 20, 
        borderRadius: 8
    }
})