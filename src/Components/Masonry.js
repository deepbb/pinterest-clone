import { RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import React from 'react'
import Pin from './Pin'
import { StatusBar } from 'expo-status-bar';
import { NhostProvider, useNhostClient } from '@nhost/react';
// import pins from '../../assets/data/pins'

const Masonry = ({pins}) => {
  const nhost = useNhostClient()
  console.log("profile screen" + nhost);
    const width = useWindowDimensions().width;
    
    const numRows = width < 500 ? 2 : 3
  return (
    <ScrollView>
    <StatusBar style='dark' />
    <View style={styles.container}>
    {Array.from(Array(numRows)).map((_,colIndex)=> (
        <View key={`column_${colIndex}`} style={{flex:1}}>
     {pins.filter((_,index)=> index % numRows === colIndex).map((pin)=> (
      <Pin key={pin.id} pin={pin} />
     ))}
     </View>
    ))}
    </View>
    </ScrollView>
  )
}

export default Masonry

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:10,
        flexDirection:"row",
        // marginTop:40
      
      },
})