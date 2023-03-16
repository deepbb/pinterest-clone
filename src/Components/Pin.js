import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { AntDesign } from '@expo/vector-icons';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useNhostClient } from '@nhost/react';



const Pin = (props) => {
  const navigation = useNavigation()
    const [ratio,setRatio] = useState(1)
    const [imageUri,setImageUri] = useState("")
    const nhost = useNhostClient()
    const {id,image,title} = props.pin

const fetchImages = async()=> {
  const result = await nhost.storage.getPresignedUrl({
    fileId:image
  })
 
  if(result.presignedUrl?.url) {
    setImageUri(result.presignedUrl.url)
  }
}

useEffect(()=> {
   fetchImages()
},[image])
    useEffect(()=> {
        if(imageUri) {
            Image.getSize(imageUri,(width,height)=> setRatio(width/height))
        }
    },[imageUri])

    const goToPinPage = () => {
      navigation.navigate("pinscreen", {id });
    };
  return (
    <ScrollView >
    <View style={styles.imagecontainer}>
    <StatusBar style='light'/>
    <View>
    <Pressable onPress={goToPinPage}>
    {imageUri &&
         <Image style={[styles.image,{aspectRatio:ratio}]} source={{uri:imageUri}} />}
         </Pressable>
        <Pressable style={styles.heartBtn}>
         <AntDesign name="hearto" size={16} color="black" />
         </Pressable>
    </View>
      <Text style={styles.text} numberOfLines={2}>{title}</Text> 
    </View>
    </ScrollView>
  )
}

export default Pin

const styles = StyleSheet.create({
    container:{
       flex:1,
       alignItems:"center",
       justifyContent:"center"
      },
    text:{
        fontSize:16,
        lineHeight:22,
        fontWeight:"600",
        color:"#181818",
        margin:5
      },
      imagecontainer:{
        width:'100%',
        padding:5
      },
      image:{
        width:"100%",
        borderRadius:20,
        padding:5
      },
      heartBtn:{
        backgroundColor:"#D3CFD4",
        position:"absolute",
        bottom:10,
        right:10,
        padding:5,
        borderRadius:50
      }
})