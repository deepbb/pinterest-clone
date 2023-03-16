import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Masonry from '../Components/Masonry'
import { Feather,Entypo } from '@expo/vector-icons';
import { useNhostClient, useSignOut } from '@nhost/react'

const Profile = () => {
  const nhost = useNhostClient()
  const [pins,setPins] = useState([])
  const {signOut} = useSignOut()

  const fetchPins = async()=> {
    const response = await nhost.graphql.request(`
    query MyQuery {
      pins {
        created_at
        id
        image
        title
        user_id
      }
    }
    `);
    if(response.error) {
      Alert.alert("Error getting pins")
    } else {
      setPins(response.data.pins)
    }
}
useEffect(()=> {
  fetchPins()
},[])
   return (
    <View style={styles.wrapper}>
    <View style={styles.container}>
    <View style={styles.icons}>
    <Pressable onPress={signOut}>
      <Feather name='share' size={24} color="black" style={styles.icon} />
    </Pressable>
        <Entypo name='dots-three-horizontal'
        size={24} color="black"
        style={styles.icon}
         />
    </View>
    <Image style={styles.image} source={{uri:"https://notjustdev-dummy.s3.us-east-2.amazonaws.com/pinterest/6.jpeg"}}/>
      <Text style={styles.text}>Pradeep B B</Text>
      <Text style={styles.subtext}>120 Followers | 100 following</Text>
      </View>
      <ScrollView>
      <Masonry pins={pins} />
      </ScrollView>
      </View>
  )
}

export default Profile

const styles = StyleSheet.create({
  container:{
    justifyContent:"center",
    alignItems:"center"
  },
  wrapper:{
    flex:1,
    flexDirection:"column",
    backgroundColor:"white"
  },
  text:{
    fontSize:20,
    fontWeight:"bold",
    marginTop:10
  },
  subtext:{
    fontSize:14,
    marginTop:5
  },
  image:{
    width:200,
    height:100,
    aspectRatio:1,
    borderRadius:50
  },
  icons:{
    flexDirection:"row",
    alignSelf:"flex-end",
    padding:10
  },
  icon:{
    paddingHorizontal:10
  }
})