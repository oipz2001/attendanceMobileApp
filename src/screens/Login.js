import React, {
  useState,useEffect
} from 'react'
import {
  View,
  Text,
  Button,
  TouchableHighlight,
  SafeAreaView,
} from 'react-native';
import TextInput from '../components/TextInput'
import AzureAuth from 'react-native-azure-auth';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage'
import TeacherHome from './teachers/Home';

const URL = require('../config/endpointConfig')

const myEndpointURLStudent =  URL.myEndpointStudent
const myEndpointURLTeacher =  URL.myEndpointTeacher

const azureAuth = new AzureAuth({
  clientId: '234c43b9-e653-4646-97c6-1903cfac1c03'
});









const Login = ({navigation}) => {
  const [accessToken, setaccessToken] = useState('')
  const [user, setuser] = useState('')
  const [mail, setmail] = useState('')
  const [userId, setuserId] = useState('')
  const [jobtitle, setjobtitle] = useState('')
  const [isInfoShow,setInfoShow] = useState(false)
  const [studentUserID,setStudentUserID] = useState(null)

  const [teacherUserID,setTeacherUserID] = useState(null)
  const [teacherUserName,setTeacherUserName] = useState(null)
  const [teacherUserMail,setTeacherUserMail] = useState(null)


  useEffect(() => {

    const retrieveUserID = async () => {
      const  studentID = await AsyncStorage.getItem('uniqueIDStudent');

      const  teacherID = await AsyncStorage.getItem('uniqueIDTeacher');
      const  teacherName = await AsyncStorage.getItem('NameTeacher');
      const  teacherMail = await AsyncStorage.getItem('MailTeacher');

      setStudentUserID(studentID)

      setTeacherUserID(teacherID)
      setTeacherUserName(teacherName)
      setTeacherUserMail(teacherMail)
    }

    AsyncStorage.setItem('uniqueIDTeacher','600610749')
    AsyncStorage.setItem('NameTeacher','Parinya Seetawan')
    AsyncStorage.setItem('MailTeacher','parinya_seetawan@cmu.ac.th')

    AsyncStorage.setItem('uniqueIDStudent','600610750')
    AsyncStorage.setItem('NameStudent','Parinyakorn')

    retrieveUserID()

  },[])


  const checkIfTeacherExist = async (teacherID) => {
    await fetch(myEndpointURLTeacher+'/checkIfTeacherExist', {
      method: 'POST',
      headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
        teacherID:teacherID

      })
      })
      .then((response) => response.json())
      .then(async (data) => {
          
          if(data.response == true){
              navigation.navigate('TeacherHome')
          }else{
            await addNewTeacher(teacherUserID,teacherUserName,teacherUserMail)
          }
      })
      .catch((error) => {
      console.error(error);
      });
  }



  const addNewTeacher = async (teacherID,teacherName,teacherMail) => {
    await fetch(myEndpointURLTeacher+'/addNewTeacher', {
      method: 'POST',
      headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
        teacherID:teacherID,
        teacherName:teacherName,
        teacherMail:teacherMail

      })
      })
      .then((response) => response.json())
      .then((data) => {
          
          console.log(data);
          navigation.navigate('TeacherHome')
      })
      .catch((error) => {
      console.error(error);
      });
  }

  
  

 


 

  
  const _isStudentFaceAdded = async (studentID) => {

    await fetch(myEndpointURLStudent+'/isFaceListAdded?studentID='+studentID)
          .then((response) => response.json())
          .then((data) => {
              
              if(data.response == true){
                navigation.navigate('StudentHome')
              }
              else if(data.response == false)
              {
                navigation.navigate('StudentAddFaceList',{response:false})
              }else if(data.response == null)
              {
                navigation.navigate('StudentAddFaceList',{response:null})
              }
          })
          .catch((error) => {
              console.error(error);
          });
  }


  const _Login = async () => {
    try {
      let tokens = await azureAuth.webAuth.authorize({
        scope: 'openid profile User.Read Mail.Read'
      })
      let info = await azureAuth.auth.msGraphRequest({
        token: tokens.accessToken,
        path: '/me'
      })
      // console.log(tokens.expireOn);
      AsyncStorage.setItem('name',info.displayName);
      AsyncStorage.setItem('mail',info.mail);
      AsyncStorage.setItem('id',info.id);
      AsyncStorage.setItem('jobtitle',info.jobTitle);
      setuser(info.displayName);
      setmail(info.mail)
      setuserId(info.id)
      setjobtitle(info.jobTitle)
      setInfoShow(true)
    } catch (error) {
      console.log(error)
    }
  }

  const _onLogout = () => {
    azureAuth.webAuth
      .clearSession()
      .then(success => {
        setaccessToken(null)
        setuser(null)
        setmail(null)
        setuserId(null)
        setjobtitle(null)
        setInfoShow(false)
        AsyncStorage.removeItem('name')
        AsyncStorage.removeItem('mail')
        AsyncStorage.removeItem('id')
        AsyncStorage.removeItem('jobtitle')
      })
      .catch(error => console.log(error));
  };

  const _storeData = async () => {
    try {
      await AsyncStorage.setItem(
        'name',
        'Parinya'
      );
    } catch (error) {
      // Error saving data
    }
  };

  // const _retrieveData = async () => {
  //   try {
  //     const value = await AsyncStorage.getItem('name');
  //     if (value !== null) 
  //       console.log(value);
  //     else
  //     console.log('No data is stored');
  //   } catch (error) {
  //     // Error retrieving data
  //   }
  // };

  // useEffect(() => {
  //   _retrieveData()
  // },[])

  




  return (


    <SafeAreaView style = {{flex: 1, justifyContent: 'center',alignItems: 'center'}} >
      
    <TouchableOpacity onPress={_Login} style={{backgroundColor:'#9E76B4',padding:12,elevation:5,borderRadius:20}}>
      <Text style={{color:'white'}}>Login with CMU</Text>
    </TouchableOpacity>
    {isInfoShow &&
    <View style={{backgroundColor:'#9E76B4',marginTop:30,padding:10,elevation:5,borderRadius:20}}>
      <Text style={{color:"white"}} > Name: {user} </Text> 
      <Text style={{color:"white"}} > Mail: {mail} </Text> 
      <Text style={{color:"white"}} > ID: {userId} </Text> 
      <Text style={{color:"white"}} > JobTitle: {jobtitle} </Text>
      {/* <Text style={{color:"white"}} > JobTitle: Student </Text> */}
    </View>
    }
    
    <TouchableOpacity onPress={_onLogout} style={{backgroundColor:'#9E76B4',padding:12,elevation:5,borderRadius:20,marginTop:30}}>
      <Text style={{color:'white'}}>Logout</Text>
    </TouchableOpacity> 
    <View >
      <View style = {{marginTop: 30}} >
        <Button title = "Go to Teacher Home" onPress = {async () => {
          await checkIfTeacherExist(teacherUserID)
          // navigation.navigate('TeacherHome')
      }}/> 
      </View> 
      <Text>{teacherUserID}</Text>
      <View style = {{marginTop: 30 }} >
        <Button title = "Go to Student Home" onPress = {async () => {
          navigation.navigate('StudentHome')
          } }/> 
      </View> 
      <Text>{studentUserID}</Text>
      <View style = {{marginTop: 30 }} >
        <Button title = "Go to Add Face List" onPress = {async () => {
          const  studentID = await AsyncStorage.getItem('uniqueIDStudent');
          await _isStudentFaceAdded(studentID);
          
          }}/> 
      </View> 
      
    </View>
    </SafeAreaView>
  );

}

export default Login