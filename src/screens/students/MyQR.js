import React,{useState} from 'react'
import { Button, View,Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';






const MyQR = () => {

    return(
        <>
                <SafeAreaView style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                <View>
                    <Text style={{fontSize:20}}>My QR Code</Text>
                </View>
                
                </SafeAreaView>

        </>
            
        
        
        
        

    );

}

export default MyQR