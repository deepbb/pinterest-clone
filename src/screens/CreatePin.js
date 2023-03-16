import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, TextInput,StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNhostClient } from '@nhost/react';
import { useNavigation } from '@react-navigation/native';

const CREATE_PIN = `
mutation MyMutation($image:String,$title:String) {
  insert_pins(objects: {image: $image, title: $title}) {
    returning {
      created_at
      id
      image
      title
      user_id
    }
  }
}
`;

export default function CreatePin() {
  const [imageUri, setImageUri] = useState(null);
  const [title,setTitle] = useState("")

  const nhost = useNhostClient()
  const navigation = useNavigation()


  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.5,
    });

    
 
    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const upLoadFile = async()=> {
    if(!imageUri) {
      return {
        error: {
          message:"Error uploading image"
        }
      }
    }

    const parts = imageUri.split("/");
    const name = parts[parts.length - 1];
    const nameParts = name.split(".");
    const extension = nameParts[nameParts.length - 1];

    const uri =  imageUri;
   const uploadResponse = await nhost.storage.upload({
    file: {
    name,
    type: `image/${extension}`,
    uri,
 },
 });

   return uploadResponse;

  }



  const onSubmit = async()=> {

   const uploadresult = await upLoadFile()

   if(uploadresult.error) {
    Alert.alert("Error uploading image", uploadresult.error.message)
   }

    const result = await nhost.graphql.request(CREATE_PIN,{
      title,
      image:uploadresult.fileMetadata.id
    });
    console.log(result);
    if(result.error) {
      Alert.alert("error uploading Pin", result.error.message)
    } else {
      navigation.goBack()
    }
  }

  return (
    <View style={styles.container}>
    <StatusBar style='dark' />
    <ScrollView>
    <View style={styles.btnconteiner}>
    <Button style={{borderRadius:20}} title="Upload your Pin" onPress={pickImage}  color="#E60023" />
    </View>
      {imageUri && 
      <View>
      <View style={styles.imagecontainer}>
      <Image source={{ uri: imageUri }} style={styles.image}/>
      </View>
      <TextInput 
      placeholder='Pin Title.....'
      value={title}
      onChangeText={setTitle}
       style={styles.input} />
       <View style={styles.upload}>
         <Button color="#E60023" title='Submit Pin' onPress={onSubmit} />
       </View>
      </View>
      }
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"white"
  },
  input:{
    width:"100%",
    borderBottomWidth:1,
    borderColor:"gainsboro",
    padding:10
  },
  btnconteiner:{
    marginTop:10,
    borderRadius:20,
    width:"100%"
  },
  image:{
    width:"100%",
    aspectRatio:1,
    resizeMode:"contain",
  },
  imagecontainer :{
    padding:10,
    borderRadius:20
  },
  upload:{
    width:"90%",
    alignSelf:"center",
    padding:10
  }
})