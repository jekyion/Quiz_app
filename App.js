import 'react-native-gesture-handler';
import _, { shuffle } from 'lodash';
import { createStackNavigator } from '@react-navigation/stack';
import { AsyncStorage } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ScrollView,Text,StyleSheet,Button, View, TouchableOpacity ,TextInput, Items} from 'react-native';
import { createDrawerNavigator,DrawerContentScrollView,DrawerItemList,DrawerItem ,DrawerScreen} from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import TableComponenet from './table_component.js'
import QuizComponenet from './quiz_component.js'
import SQLite from 'react-native-sqlite-storage'
import NetInfo from '@react-native-community/netinfo'

function HomeScreen({ navigation}) {
  const [data, setData] = useState([]);
  const [conn, setConn] = useState(false);
  const [quizdata, setquizdata] = useState([]);
  useEffect(() => {
    NetInfo.fetch().then(state => {
      setConn(state.isConnected)
      
    });

    fetch('https://tgryl.pl/quiz/tests')
      .then((response) => response.json())
      .then((json) => setData(json))
      
      AsyncStorage.setItem('quizdata', JSON.stringify(data))
      if(conn== false)
        AsyncStorage.getItem('quizdata')
        .then((value) => {
          setquizdata(JSON.parse(value)) 
        })
      else
        setquizdata(data)
     _.shuffle(data)
  }, [conn]);

 


  if(Object.keys(data).length == 0){
    return(<ScrollView style={styles.container}></ScrollView>);
  }else{
    return (
      <ScrollView style={styles.container}>
        {_.shuffle(data.map((answerOption, index) => (
          <View style={styles.calculation} key={index+55} onStartShouldSetResponder={(e) => {return true}} onResponderRelease={() =>  navigation.navigate('Test',{otherKey: answerOption.id})} >
            <Text key={index+10} style={styles.TestTitle}>{answerOption.name}</Text>
            <Text key={index+66}>{answerOption.tags[0]}</Text>
            <Text key={index+77}>{answerOption.description}</Text>
          </View>
          
       )))}
        <View style={styles.Stopka}>
        <Text style={styles.TestTitle}>Get to know your ranking result</Text>
        <Button
          style={styles.Btn}
          onPress={() => navigation.navigate('Result')}
          title="Check!"
        />
        </View>
      </ScrollView>
    );
  }
}

function NotificationsScreen({navigation}) {

  return (
    <TableComponenet/>
  );
}
function WelcomeScreen({ navigation }) {
  useEffect(()=>{
    AsyncStorage.getItem('welcomesss').then((value)=>{
      if(value!=null){
        navigation.navigate('Home Page')
      }
      else{
        AsyncStorage.setItem('welcome','true')
      }
    })
  })
  return (
    <ScrollView style={styles.container}><View style={styles.calculation}><Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ut massa ut odio congue tempus. Aliquam pharetra laoreet lectus, quis blandit neque consectetur placerat. Etiam lacus mi, vehicula in ullamcorper nec, convallis vitae libero. Sed molestie ipsum id faucibus porta. Ut sollicitudin ex nec hendrerit efficitur. Maecenas et ipsum sit amet eros auctor laoreet. Fusce eros dolor, sagittis a volutpat id, bibendum vehicula massa. Donec rhoncus vel turpis sed pulvinar. Vestibulum venenatis urna vitae tempor sagittis. Donec dolor leo, fringilla in turpis in, lacinia vehicula tortor. Donec vehicula molestie nisi. Duis congue metus in velit fringilla, at gravida mi efficitur. Pellentesque viverra congue molestie. Praesent massa velit, convallis a viverra vitae, faucibus vel ante. Sed posuere scelerisque semper. Suspendisse cursus ante nec vehicula condimentum.

    Etiam vehicula leo nec erat molestie imperdiet. Sed in tincidunt metus. In mattis hendrerit risus, vitae pharetra massa suscipit sed. Nunc semper lectus quis magna pulvinar, a imperdiet arcu hendrerit. Interdum et malesuada fames ac ante ipsum primis in faucibus. Curabitur aliquam semper accumsan. In at pretium urna. Praesent euismod urna tellus, sit amet malesuada eros scelerisque ac. Nullam velit elit, condimentum sit amet consectetur in, luctus vitae nibh. Suspendisse non rhoncus neque. Donec dictum sapien in quam euismod, nec elementum sapien aliquam. Nunc laoreet turpis vitae velit scelerisque, at dapibus ante consequat. Nulla dignissim tortor congue nulla tristique, ut vestibulum ante porta. Praesent ac felis dui.
    
    Quisque ipsum nisl, scelerisque sed molestie eget, imperdiet et turpis. Suspendisse elit lacus, porta eu arcu eget, maximus efficitur est. Fusce vel est sit amet augue viverra rhoncus. Donec rhoncus maximus purus. Pellentesque eu convallis augue. Vestibulum consectetur sed ex nec efficitur. Etiam imperdiet, sapien non rhoncus convallis, elit felis rutrum diam, quis consequat lacus dolor in nisl. Donec hendrerit porta egestas. Vestibulum suscipit auctor magna, at molestie metus scelerisque quis. Maecenas vulputate erat at neque feugiat pharetra. Ut porttitor tellus vitae ornare fermentum. Pellentesque sit amet ligula quis lorem cursus vulputate. Nulla nibh orci, varius nec vehicula in, luctus pulvinar metus.
    
    Fusce id nisl libero. Sed leo tellus, rhoncus sit amet consectetur quis, commodo vitae quam. Donec fermentum augue tortor. Sed fermentum vitae dolor placerat gravida. Quisque aliquet condimentum tellus, non molestie nibh posuere nec. Nulla interdum, turpis non euismod lobortis, urna elit aliquet lectus, eget viverra sem tortor eget lectus. Donec sit amet massa sapien. Suspendisse tempor sodales dapibus. Aenean ultricies ut quam eget commodo.
    
    Maecenas volutpat tincidunt ullamcorper. Proin in mauris nunc. Vestibulum porta in est at ornare. Nulla fringilla eros lorem, non maximus tellus maximus in. Integer euismod venenatis nunc ut hendrerit. Proin condimentum venenatis semper. Fusce convallis cursus dictum. Nullam id neque nisl. Donec eleifend elit nisi, aliquam tristique quam varius ac. Nam a magna in est placerat vulputate tristique at nisl. Duis tempus pharetra eros sit amet porttitor. Donec efficitur sagittis facilisis. Vivamus a mi a erat euismod sollicitudin. Donec nec ipsum id sapien hendrerit egestas in non ligula. Pellentesque at lectus ac justo malesuada commodo. Sed quis enim nec tortor fermentum aliquet nec imperdiet metus.
    
    Pellentesque bibendum velit sed velit tempus mattis. Cras cursus tortor a elit pretium, nec egestas mi hendrerit. Donec porttitor, est eget hendrerit sollicitudin, nibh quam congue enim, et tempus nibh sapien a felis. In scelerisque interdum leo ac pretium. Vivamus consectetur tortor elementum, cursus diam at, tempor eros. Sed lorem nisi, ultrices in semper eget, viverra ac est. Mauris sit amet arcu velit. Pellentesque justo tellus, faucibus eget quam ut, tristique cursus mi.
    
    Sed sed erat id eros pharetra tempus. Mauris accumsan leo ac diam venenatis rutrum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vivamus maximus eu nisl quis cursus. Proin sit amet lacus pharetra, facilisis erat a, euismod erat. Suspendisse erat orci, sollicitudin non mollis sit amet, placerat vel risus. Aliquam sit amet turpis augue. Donec ultrices non lectus vitae scelerisque. Morbi vitae mauris eu lectus cursus luctus. Aliquam dapibus urna a lorem rutrum, vitae faucibus ipsum bibendum.
    
    Suspendisse potenti. Maecenas augue felis, dictum ac sodales vitae, pellentesque sit amet mauris. Nulla eu vestibulum lectus. Ut scelerisque tempus ex, id ultrices risus tempus eget. Nunc risus nulla, accumsan eu magna sit amet, tempor aliquet risus. Morbi lacinia ante sed bibendum bibendum. Donec mollis lectus ut dolor tristique porttitor. Sed vitae pharetra nibh, nec finibus nibh.</Text></View><Button onPress={() => navigation.navigate('Home Page')  } title="Agree"></Button></ScrollView>
    
  );
}

function TestScreen({navigation , route}) {
  var {otherKey} = route.params;
    return(
      <QuizComponenet ID={otherKey} />
    );
}



const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const refreshBTN = () => {

};
export default function App() {

  const [data, setData] = useState([]);
  useEffect(() => {
    fetch('https://tgryl.pl/quiz/tests')
      .then((response) => response.json())
      .then((json) => setData(json))
      AsyncStorage.getItem('quizdata')
      .then((value) => {
        setData(JSON.parse(value))

      })
  }, []);
    return (
      <NavigationContainer >
        
        <Drawer.Navigator 
        
        
        initialRouteName="Terms of use" screenOptions={{drawerActiveBackgroundColor: '#eb7a34',  drawerStyle:{backgroundColor: '#77767C'}, drawerLabelStyle:{color: 'white'}}} 
        drawerContent={props => {
          return (
            <DrawerContentScrollView {...props}>
              <DrawerItemList {...props} />
              <DrawerItem label="Losuj" onPress={() => props.navigation.navigate("Test",{otherKey: _.shuffle(data)[0].id})} />
            </DrawerContentScrollView>
          )
        }}>

          
          <Drawer.Screen name="Home Page" component={HomeScreen} options={{
              title: 'Home Page',
              headerStyle: { backgroundColor: '#eb7a34',},headerTintColor: 'black',}}/>
            <Drawer.Screen name="Test" component={TestScreen} options={{
              title: ' ',
              headerStyle: { backgroundColor: '#eb7a34',},headerTintColor: 'black',}}
              initialParams={{ otherKey: '61316f7f99149c1a92250e46'}}/>
           {_.shuffle(data).map(index => {
            return(
              <Drawer.Screen key={index+1} initialParams={{otherKey: index.id}} name={index.name} component={TestScreen} title={index.name} options={{headerStyle: {backgroundColor:'#eb7a34' }, headerTintColor:'black'}}/>
            )
          })}
          <Drawer.Screen name="Result" component={NotificationsScreen} options={{
              title: 'Result',
              headerStyle: { backgroundColor: '#eb7a34',},headerTintColor: 'black',}}
              />
          
          <Drawer.Screen name="Terms of use" component={WelcomeScreen} initialParams={{ otherKey: "61316f7f99149c1a92250e46" }}options={{
              title: 'Terms of use',
              headerStyle: { backgroundColor: '#eb7a34',},headerTintColor: 'black',}}/>
          
        </Drawer.Navigator>
      </NavigationContainer>
    );
  // }
  
}

const styles = StyleSheet.create({
  container: {backgroundColor: '#77767C',flex:1},
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
    flexDirection:'row',
    padding: '3%',
  
   
    backgroundColor: '#eb7a34',
  },

  Answer:{
    display: 'flex',
    alignContent: 'space-between',
    justifyContent: 'center',
    flexDirection:'row',
    padding: '10%',
    paddingTop: '10%',
    marginBottom: 0,
    marginTop: 30,
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



