import 'react-native-gesture-handler';
import _ from 'lodash';

import React, { useState, useEffect,useCallback } from 'react';
import { ScrollView,Text,StyleSheet,Button, View,TouchableOpacity, TextInput } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

export default function quiz_component({navigation,ID}) {


  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    fetch('https://tgryl.pl/quiz/test/'.concat(ID))
      .then((response) => response.json())
      .then((json) => setData(_.shuffle(json.tasks)))
    fetch('https://tgryl.pl/quiz/test/'.concat(ID))
      .then((res) => res.json())
      .then((json2) => setData2(json2))
      _.shuffle(data)
  }, [ID]);

  


  const isfinished = () => {
    setLoading(true)
 
  }
  const [text, setText] = useState('');

  const wys = () => {
    fetch('https://tgryl.pl/quiz/result', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    nick: text,
    score: score,
    total: data.length,
    type: data2.tags[0]
  })
  });
  setLoading(false)
  setCurrentQuestion(0)
  setShowScore(false)
  
  setScore(0)
  setText('')
  }
  
  const handleAnswerButtonClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
      
    }
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < data.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      // setLoading(false)
      return setShowScore(true);
      
    }
  };

  if(loading == false ){
    return( 
      <View style={styles.container}><View style={styles.GZ} >
        <Text style={{fontSize: 24}}></Text>
        <Text style={{fontSize: 24}}>{data2.name}</Text>
        <Text style={{fontSize: 18}}>{data2.description}</Text>
        <Text style={{fontSize: 18}}>Poziom trudności: {data2.level}</Text>
        
        <View style={{padding: '10%'}}>  
        <Button style={{margin: 10}} key="start" onPress={() =>  
                  isfinished() } title= 'Start'></Button>  
        </View></View>
        
        
        </View>
      
    )
  }
 
  else if(showScore==false){
    return (
      
      <View style={styles.container}>
        <Text></Text>
        <View style={styles.Qtext} >
        
        <Text  >Question {currentQuestion + 1} of {data.length} </Text> 
        <Text  style={{justifyContent:'flex-end',}}>30 sec</Text>
        
        </View>
        <View style={styles.Qtext2} >
        <Text  style={{fontSize: 20}}>
          {data[currentQuestion].question}
        </Text> 
        </View>
          {_.shuffle(data[currentQuestion].answers.map((answerOption, index) => (
             
                <View style={styles.Answer} key={index + 10}>
                <Button style={{margin: 10}} key={index} onPress={() =>  
                  handleAnswerButtonClick(answerOption.isCorrect)  } title= {answerOption.content}></Button></View>
              
            
          )))}
          
        </View>
      
    )
  }else{
      return(
        <View style={styles.container}>
          
      
          <View style={{flex: 4, justifyContent: 'center',alignItems: 'center', }}><Text style={{fontSize: 28, color: '#eb7a34'}}>You scored {score} out of {data.length}</Text>
          <TextInput
          style={{height: 40,fontSize: 20, color: '#eb7a34'}}
          placeholder="Podaj Nick"
          onChangeText={text => setText(text)}
          defaultValue={text}
          />
          </View>
          <Button title = "Prześlij" onPress={() => wys()}></Button>
        </View>
      )
    } 
  }
 
const styles = StyleSheet.create({
  container: { backgroundColor: '#77767C',flex:1},
  calculation: {
    padding: '3%',
    margin: 10,
    marginTop: 30,
    backgroundColor: '#eb7a34',
    
  },
  TestTitle: {
    fontSize: 20,
    lineHeight: 40 
  },
  Stopka:{
    marginTop: 30,
    backgroundColor: '#eb7a34',
    padding: 10
  },
  Btn: {
    color: 'white',
    margin: '10px',
    
  },
  Qtext: {
    flexDirection:'row',
    padding: '3%',
 
    marginBottom: 0,
    marginTop: 30,
    justifyContent:'space-between',
    backgroundColor: '#eb7a34',
  },
  Qtext2: {
    flexDirection:'column',
    padding: '3%',
  
   
    backgroundColor: '#eb7a34',
  },

  Answer:{
    display: 'flex',
    alignContent: 'space-between',
    justifyContent: 'center',
    flexDirection:'column',
    padding: '5%',

    marginBottom: 0,
    justifyContent:'space-between',
    backgroundColor: '#eb7a34',
    
  },
  Abutton: {
    marginBottom: '30%'
  },
  Answer2:{
    display: 'flex',
    alignContent: 'space-around',
    justifyContent: 'center',
    flexDirection:'row',
    padding: '10%',
    paddingTop: '0%',
    marginBottom: 0,
    marginTop: 0,
    justifyContent:'space-between',
    backgroundColor: '#eb7a34',
    
  },
  GZ: {
    marginTop: '10%',
    marginBottom: '10%',
    marginLeft: '5%',
    marginRight: '5%',
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eb7a34',
  }
})