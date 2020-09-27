import React,{useState} from 'react'
import { Button, View,Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import Calendar from '../../components/CalendarPicker'





const StudentHome = ({navigation}) => {

    return(
        <>
        
                {/* <Calendar style={{margin:20 , padding:20 , borderRadius:20 , elevation:5 , marginTop:30}} /> */}
                <SafeAreaView style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                <View>
                    <Text style={{fontSize:20}}>Student Home Screen</Text>
                </View>
                <View style={{marginTop:30}}>
                <Button title="Check wifi and go to face recognition" onPress={() => navigation.navigate('StudentFaceCheckIn')} />
                </View>
                <View style={{marginTop:30}}>
                <Button title="Go to Class Room" onPress={() => navigation.navigate('InClass')} />
                </View>
                </SafeAreaView>

        </>
            
        
        
        
        

    );

}

export default StudentHome