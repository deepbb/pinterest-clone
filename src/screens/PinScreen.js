import { Alert, Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { AntDesign } from '@expo/vector-icons';
import { useNavigation,useRoute} from "@react-navigation/native";
import { useNhostClient } from '@nhost/react';

const GET_PINS = `
query MyQuery ($id: uuid!) {
  pins_by_pk(id: $id) {
    created_at
    id
    image
    title
    user_id
    user {
      avatarUrl
      displayName
      id
    }
  }
}
`;



const PinScreen = () => {
    const [pins,setPins] = useState(null)
    const nhost = useNhostClient()
    const navigation = useNavigation()
    const route = useRoute();
    // const [ratio,setRatio] = useState(1)
    
    const pinId = route.params?.id

    console.log(pinId);

    const fetchPins = async(pinId)=> {
        const response = await nhost.graphql.request(GET_PINS,{id:pinId});
        if(response.error) {
            Alert.alert("Error fetching pins",response.error.message)
        } else {
            setPins(response.data.pins_by_pk)
        }
    }
    console.log(pins);
    useEffect(()=> {
        fetchPins(pinId)
    },[pinId])


    if(!pins) {
        return <Text>Pin is Not found</Text>
    }

    const goBack = () => {
        navigation.goBack();
      };
  return (
    <ScrollView style={{backgroundColor:"black"}}>
    <StatusBar style='light' />
    <View style={styles.container}>
      <Image source={{uri:pins?.image}}  style={[styles.image]}/> 
      <Text style={styles.title}>{pins?.title}</Text>
      <Pressable onPress={goBack} style={styles.back}>
        <AntDesign name="left" size={20} color="white" />
      </Pressable>
    </View>
    </ScrollView>
  )
}

export default PinScreen

const styles = StyleSheet.create({
    container:{
        backgroundColor:"black",
        height:"100%",
        marginTop:35,
        borderTopLeftRadius:40,
        borderTopRightRadius:40,
        overflow:"hidden"
    },
    image:{
        width:"100%",
        borderTopLeftRadius:40,
        borderTopRightRadius:40
    },
    title:{
        fontSize:24,
        fontWeight:"bold",
        textAlign:"center",
        lineHeight:35,
        color:"white"
    },
    back:{
        position:"absolute",
        top:20,
        left:10
    }
})