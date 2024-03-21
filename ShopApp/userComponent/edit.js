import React from "react";
import {StyleSheet, Text, TouchableOpacity, View, Platform, Image, TextInput} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";

import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { updateCourse, deleteCourse } from "../redux/actions/courseAction";
import {
    getStorage,
    uploadString,
    ref,
    getDownloadURL,
    uploadBytesResumable,
  } from "firebase/storage"; 
  
import * as ImagePicker from "expo-image-picker";
import { notInitialized } from "react-redux/es/utils/useSyncExternalStore";

const EditItem = ({route, navigation}) => {
    const dispatch = useDispatch();
    const db = useSelector((store)=>store.course);
    
    const {tagId}= route.params;
    const {tagName}= route.params;
    const {tagImg}= route.params;
    const {tagPrice}= route.params;

    const [name, setName] = useState(tagName);
    const [nameImg, setNameImg] = useState({localURI: tagImg });
    const [price, setPrice] = useState(tagPrice);

    const saveCourse = (id) => {
        let newCourse = {
            name: name,
            nameImg: nameImg.localURI,
            price: price,
        }
        dispatch(updateCourse(newCourse,id));
        navigation.reset({
            index: 0,
            routes: [{ name: 'List' }],
          });
    }
    const cancelCourse = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'List' }],
          });
    }
    const deleteItem=(id) =>{
        dispatch(deleteCourse(id))
        navigation.reset({
            index: 0,
            routes: [{ name: 'List' }],
          });
    }

    const openImage = async()=>{
        const result = await ImagePicker.launchImageLibraryAsync({base64:true})
        if(result.cancelled)
        return;
        //console.log(result)
        let uri = result.uri;
        setNameImg({localURI:result.uri});
        if(Platform.OS==='Web'){
            let base64code = result.base64;
            await uploadBase64(base64code);

        }else{
            //device
            let uri = result.uri;
            //step 1-> convert uri ->blod
            const blobfile = await convertURI2NlodFile(uri)
            //step 2-> upload to cloud
            await uploadFile(blobfile);
        }
    }

    const convertURI2NlodFile = async(uri)=>{
        const result = await new Promise((resolve,reject)=>{
            let xmlRequest = new XMLHttpRequest();
            xmlRequest.onload=function(){
                resolve(xmlRequest.response);
            }
            xmlRequest.onerror=function(){
                console.log("error:)))")
            }
            xmlRequest.responseType='blob';
            xmlRequest.open("GET",uri,true);
            xmlRequest.send(null)
        })
        return result;
    };

    const uploadFile = async(blobfile) => {
        let imgname = 'img-ios-' +new Date().getTime();
        let storage = getStorage();
        let storageref = ref(storage, `images/${imgname}.jpg`);
        let metadata = {
            contentType: 'image/jpeg'
        }
        const uploadTask= uploadBytesResumable(storageref,blobfile,metadata);
        uploadTask.on("state_changed",
        (snapshot)=>{},
        (error)=>{},
        ()=>{
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
                console.log('downloadURL',downloadURL);
                setNameImg({localURI:downloadURL});
            })
        })
    }

    const uploadBase64 = async(base64code)=>{
        let imgname = 'img-w-' +new Date().getTime();
        let storage = getStorage();
        let storageref = ref(storage, `images/${imgname}.jpg`);
        let metadata = {
            contentType: 'image/jpeg'
        }
        uploadString(storageref,base64code,'base64',metadata).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((downloadURL) => {
                console.log('downloadURL',downloadURL);
                setNameImg({localURI:downloadURL});
            })
        }) 
    }
    return(
        <View style={styles.container}>
            
            <TextInput 
                value={name} 
                style={styles.txtInput} 
                onChangeText={(val)=>setName(val)}
            />
            <TextInput 
                value={price} 
                style={styles.txtInput} 
                onChangeText={(val)=>setPrice(val)}
            />
            <View style={{flexDirection:'row', width: '80%',}}>
                <TextInput 
                    style={styles.txtInput1} 
                    value={nameImg.localURI} 
                    onChangeText={(val) => setNameImg(val)}
                />

                <TouchableOpacity
                    style={styles.btn1}
                    onPress={openImage}
                >
                    <Text style={{color:'#fff'}}>Chọn ảnh</Text>
                </TouchableOpacity>
            </View>
            
            <View style={{flexDirection:'row'}}>
                <TouchableOpacity
                    style={styles.btnContainer}
                    onPress={() => { saveCourse(tagId) }}
                >
                    <View style={styles.btn}>
                        <Text style={{color:'#fff'}}>Lưu</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.btnContainer}
                    onPress={() => { cancelCourse() }}
                >
                    <View style={styles.btn}>
                        <Text style={{color:'#fff'}}>Hủy</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.btnTrash}
            onPress={()=>deleteItem(tagId)}
            >
                <Ionicons name="trash" size={20} color="red"/>
            </TouchableOpacity>
        </View>
    )
}

export default EditItem;

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#fff",
        alignItems:'center',
    },
    txtInput:{
        backgroundColor:'#ede7f6',
        height:30,
        width: '80%',
        color:"#111",
        marginTop:10,
        outlineStyle: 'none',
        borderRadius: 20,
        padding:10,
    },
    txtInput1:{
        backgroundColor:'#ede7f6',
        height:30,
        width:'60%',
        color:"#111",
        marginTop:10,
        padding:10,
        outlineStyle: 'none',
        borderBottomLeftRadius:20,
        borderTopLeftRadius:20,
    },
    btnContainer:{
        marginTop: 10,
        padding:10,
    },
    btn:{
        width: 100, 
        height: 50, 
        borderRadius: 25, 
        backgroundColor: '#26c6da', 
        alignItems:'center', 
        justifyContent:'center',

    },
    btn1:{
        width: '40%', 
        height: 30, 
        //borderRadius: 25,
        borderBottomRightRadius:20,
        borderTopRightRadius:20, 
        backgroundColor: '#ffa726', 
        marginTop:10,
        alignItems:'center', 
        justifyContent:'center',

    },
    btnTrash:{
        width: 50,
        height: 50,
        borderRadius: 25,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#ffa726',
    }
})
