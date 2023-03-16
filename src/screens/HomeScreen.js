import { useNhostClient } from '@nhost/react'
import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import {  Alert, Text, View } from 'react-native'
// import pins from "../../assets/data/pins"
import Masonry from '../Components/Masonry'

const HomeScreen = () => {

  const nhost = useNhostClient()
  const [pins,setPins] = useState([])

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

  if(!pins) {
    return <Text>Pins are loading</Text>
  }
   return (
    <View style={{backgroundColor:"white"}}>
    <StatusBar style="dark" />
        <Masonry pins={pins} />
    </View> 
  )
}

export default HomeScreen