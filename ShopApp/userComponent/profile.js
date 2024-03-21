import React from "react";
import {ImageBackground, StyleSheet, Text, View, TextInput, Image, TouchableOpacity, Switch, FlatList } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from "../misc/colors";

import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useCallback } from "react";
import { checkUser } from "../redux/actions/tagAction";
import * as ImagePicker from "expo-image-picker";

import {getStorage,uploadString, ref, getDownloadURL, uploadBytesResumable  } from 'firebase/storage';

const ProfileView = ({params,navigation,route}) => {
    const dispatch = useDispatch();
    const db = useSelector((store) => store.tag);
    const [data, setData] = useState([]);
    const IPHOST = "http://localhost:5555";
    const {userId} = route.params;
    
    useEffect(()=>{
        fetch(IPHOST+'/api/accounts')
        .then((response) => response.json())
        .then((responseJson) => {
        setData(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
        
        
    },[]
    )

    
    const arr = [
        {
            id: 'ZFt8yZ5jevKYoZ14n1Km',
            phone: '0987654321',
            address: 'Nghĩa trang 28 lô quận thiên đường',
            name: 'kri',
            pass: 'kri',
            user: 'nak',
            lastname: 'nak',
            img: 'https://firebasestorage.googleapis.com/v0/b/tes1-787c4.appspot.com/o/images%2Fimg-ios-1671360222399.jpg?alt=media&token=2712595a-2046-40fe-a638-96f7b5e94aa9',
        }
    ]
    const iditem= data
    .filter(obj => {
        return obj.id === userId;
      });
    const id=Object.values(iditem||{})
    console.log(iditem);
    const LogOut = ()=>{
        navigation.reset({
            index: 0 ,
            route: [{name:'Login'}],
        })
    }
    
    return(
        <View style={styles.loginContainer}>

            
            <FlatList
                data={iditem}
                renderItem={({ item }) => <ItemComponent item={item} />}
            >

            </FlatList>
            <TouchableOpacity
            style={{width: '100%',height: 30, backgroundColor:colors.RED, alignItems:'center',justifyContent:'center',marginBottom:20}}
            onPress={()=>{
                navigation.reset({
                    index: 0 ,
                    routes: [{name:'Login'}],
                })
                // navigation.navigate('Login');
            }}
            >
                <Text>Đăng xuất</Text>
            </TouchableOpacity>
        </View>
    );
}

const ItemComponent = ({item,})=>{
    const [selectedImage, setSelectedImage] = useState({localURI:item.img})
    const openImage = async()=>{
        const result = await ImagePicker.launchImageLibraryAsync({base64:true})
        if(result.cancelled)
        return;
        //console.log(result)
        let uri = result.uri;
        setSelectedImage({localURI:result.uri});
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
                console.log('downloadURL',downloadURL)
            })
        }
        )
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
                console.log('downloadURL',downloadURL)
            })
        }) 
    }
    return (
        <View style={styles.formContainer}>
            <View style={{ width: '100%', height: 150, }}>
                <View style={{ height: 70, backgroundColor: colors.DARKPINK }}>
                    <Image
                        source={{ uri: selectedImage.localURI }}
                        resizeMode='stretch'
                        style={styles.img} />
                </View>


                <TouchableOpacity
                    style={styles.btnUpload}
                    onPress={()=>openImage()}
                >
                    <Ionicons name="camera-outline" size={20} color={colors.DARKPINK} />
                </TouchableOpacity>
                <Text
                    style={styles.nameTxt}

                >{item.lastname + ' ' + item.name}</Text>

            </View>

            <View style={styles.infoContainer}>
                <Text style={styles.infoHeadText}>Thông tin:</Text>
                <Text style={styles.infoText}>Địa chỉ: {item.address}</Text>
                <Text style={styles.infoText}>Điện thoại: {item.phone}</Text>

            </View>
        </View>
    );
}

export default ProfileView;

const styles = StyleSheet.create({
    loginContainer: {
        flex: 1,
        // alignItems:'center',
        backgroundColor:colors.BACKGROUND,
    },
    logo:
    {
        height:100,
        width: '100%',
        alignItems: 'top',
        justifyContent: 'top',
    },
    img: {
        width: 100,
        height: 100,
        borderRadius: 100/2,
        marginLeft:10,
        marginTop:10,
        borderWidth:5,
        borderColor:colors.BACKGROUND,
        backgroundColor:colors.BACKGROUND,
    },
    infoHeadText: {
        // color: '#448bbf',
        color: colors.BTNADD,
        fontSize:20,
        fontWeight:'bold',
        marginBottom:5,
        marginLeft:10,
    },
    formContainer: {
        //backgroundColor: 'black'
        width: '100%',
        // alignItems:'center',
    },
    nameTxt:
    { 
        marginTop: 10, 
        marginLeft: 20, 
        fontSize: 20, 
        fontWeight: 'bold', 
        textTransform: 'capitalize', 
    },    
    infoContainer: {  
        marginTop:10,
    },
    infoText: {
        color:colors.BLACK,
        marginLeft:5,
      
    },
    btn: {
        backgroundColor: colors.BTNADD,
        width: '80%',
        height:45,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:10,
    },
    btnText: {
        color: '#fff',
    },
    btnUpload:{ 
        width: 30, 
        height: 30, 
        borderRadius: 15, 
        backgroundColor: colors.BTNBACKGROUND, 
        alignItems: 'center', 
        justifyContent: 'center', 
        marginLeft: 80, },
    row:{
        marginTop:10,
        flexDirection:'row',
        width: '80%',
        alignItems:'left',
        justifyContent:'left',
    },
    swiTxt:{
        marginLeft:10,
        color:colors.BLUE,
        alignItems:'center',
    },
    formSp:{
        marginTop: 50,
        alignItems:'center',  
        justifyContent:'end',
    },
    spTxt:{
        color:'#1560c0',
        marginBottom:10,
    },
})