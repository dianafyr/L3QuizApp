import React, {useState} from 'react';
import {
    View,
    Text,
    TextInput,
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';


const styles = StyleSheet.create ({
    Parent: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: 'whitesmoke',
        borderWidth: 1
    },
    Title: {
        fontSize: 18,
        fontWeight: 'bold',
        backgroundColor: 'black',
        color: 'white',
        textAlign: 'center',
        fontFamily: 'serif'
    }
})


const Question = ({No, picture, changeAnswer}) => {
    const [answer, setAnswer] = useState('');
    return (
          <View style={{marginBottom: 20}}>
              <Text style={{textAlign: 'center', borderWidth: 2, marginBottom: 20, fontFamily: 'serif'}}>Q{No}) What breed of cat is this?</Text>
              <Image style={{width:365, height:300}} source={picture}/>
              <RNPickerSelect
                 onValueChange={changeAnswer}
                  items={[
                      {label: 'Bengal', value: 'Bengal'},
                      {label: 'Siamese', value: 'Siamese'},
                      {label: 'Rag doll', value: 'Ragdoll'},
                      {label: 'Persian', value: 'Persian'},
                      {label: 'Maine Coon', value: 'Mainecoon'}
                  ]}
                 placeholder={{label: "Select Cat Breed", value: null}}
              />
          </View>

  );
};


const MyApp = () => {
    const [username, setUsername] = useState('');
    const [answer, setAnswer] = useState({1: '', 2: '', 3: '', 4: '', 5: ''});
    const correctAnswer = {1:'Siamese', 2:'Persian', 3:'Mainecoon', 4:'Ragdoll', 5:'Bengal'}

    const CheckAnswer = () => {
        const unanswered = Object.values(answer).some(answer => answer === '');
        if (unanswered) {
            Alert.alert ("Hey! you left some question(s) blank....");
            return;
        }
        let countCorrect = 0;
        for (let key in correctAnswer) {
            if (answer[key] === correctAnswer[key]) countCorrect ++;
        }

        let message;
        if (countCorrect === 5) {
            message = `Perfect, ${username}! you got all answers right ;)`;
        } else if (countCorrect === 4) {
            message = "Close! you got 4 answers right!";
        } else if (countCorrect === 3) {
            message = "Nice try! you got 3 answers right!";
        } else if (countCorrect === 2) {
            message = "Hmm try harder! you only have 2 right answers...";
        } else {
            message = "You got none right, try again... good try, though :)";
        }
        Alert.alert(message);
    };

    return (
        <ScrollView contentContainerStyle={{paddingBottom: 20}}>
            <View style={[styles.Parent, {padding: 20, paddingTop: 50}]}>
                <View>
                    <Text style={styles.Title}>Cat Quiz</Text>
                </View>
                <View>
                    <Text style={{paddingTop: 10, fontFamily: 'serif'}}>Username:</Text>
                    <TextInput style={{borderWidth: 1}}
                               onChangeText={(text) => setUsername(text)}/>
                    <Text style={{paddingTop:20, paddingBottom:20, fontFamily: 'serif'}}>Hello, {username}</Text>
                </View>

                <Question No={1} picture={require('./img/siamese.jpg')} changeAnswer={(value) => setAnswer({...answer, 1:value})}/>
                <Question No={2} picture={require('./img/persian.jpg')} changeAnswer={(value) => setAnswer({...answer, 2:value})}/>
                <Question No={3} picture={require('./img/mainecoon.jpeg')} changeAnswer={(value) => setAnswer({...answer, 3:value})}/>
                <Question No={4} picture={require('./img/ragdoll.jpeg')} changeAnswer={(value) => setAnswer({...answer, 4:value})}/>
                <Question No={5} picture={require('./img/bengal.jpg')} changeAnswer={(value) => setAnswer({...answer, 5:value})}/>

                <TouchableOpacity onPress={CheckAnswer}>
                    <Text style={{fontFamily: 'serif', textAlign: 'center'}}>Submit</Text>
                </TouchableOpacity>
            </View>

        </ScrollView>
    )
}

export default MyApp;


