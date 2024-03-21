import React from "react";
import {StyleSheet, Text, TouchableOpacity, View, Platform, Image, TextInput} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";

import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { writeCmt, fetchAllCmts } from "../redux/actions/tagAction";

  
import * as ImagePicker from "expo-image-picker";
import Cmt from "./cmt";
import colors from "../misc/colors";

const DetailItem = ({route, navigation}) => {
    const dispatch = useDispatch();
    const db = useSelector((store)=>store.course);

    const {tagId}= route.params;
    const {tagName}= route.params;
    const {tagImg}= route.params;
    const {tagPrice}= route.params;

    const [user, setUser] = useState("");
    const [cmt, setCmt] = useState("");
    const [like,setLike] = useState(0);
    const [dislike,setDislike] = useState(0);
    
    const day= new Date().getDate();
    const month= new Date().getMonth()+1;
    const year= new Date().getFullYear();
    const time= new Date().getTime();
    const dates= `d${day}${month}${year}${time}`;

    const saveCmt=(id)=>{
        let newCmt = {
            user: user,
            cmt: cmt,
            numcmt: 0,
            time: dates,
            like: like,
            dislike:dislike,
        }
        if(user==""){
            alert('Tên khách để trống')
        }
        else if(cmt.length<10||cmt==""){
            alert('Bình luận phải trên 10 ký tự và không được để trống')
        }else{
            dispatch(writeCmt(newCmt,id));
            dispatch(fetchAllCmts(id));
            setCmt("");
        }
    }
    const goEditTag=(id,name,nameImg,price)=>{
        navigation.navigate('Edit',{tagId:id,tagName:name,tagImg:nameImg,tagPrice:price});
    }
    const goCartTag=(img,name,price,number)=>{
        navigation.navigate('Cart',{tagImg:img,tagName:name,tagPrice:price,tagNum:number});
    }

    const [num, setNum] = useState(1);
    const Add=()=>{
        setNum(num+1)
        if(num>98){
            setNum(1)
        } 
    };
    const Rev=()=>{
        setNum(num-1)
        if(num<2){
            setNum(99)
        } 
    };
    var allPrice = Number(tagPrice) * num;

    var decnum = parseInt((allPrice / 1000 - parseInt(allPrice / 1000)) * 1000);
    var valuenum = decnum == 0 ? ",000" : "," + decnum;
    var stringPrice = (parseInt(allPrice / 1000) + valuenum);

    return(
        <View style={styles.container}>
            <TouchableOpacity
                onPress={()=>goEditTag(tagId,tagName,tagImg,tagPrice)}
            >
                <Image
                    style={styles.img}
                    source={{ uri: tagImg }}
                    resizeMode="contain"
                />
            </TouchableOpacity>
            
            <Text>{tagName}</Text>
            {/* <Text>{tagId}</Text> */}
            <Text>Giá tiền:{tagPrice}Đ</Text>
            <View
                style={styles.row}
            >
                <TouchableOpacity style={styles.btnRev}
                    onPress={Rev}
                >
                    <Ionicons name={"remove-outline"} size={10} color="#fff" />
                </TouchableOpacity>
                <TextInput style={styles.inputText} value={num} />
                <TouchableOpacity style={styles.btnAdd}
                    onPress={Add}
                >
                    <Ionicons name={"add-outline"} size={10} color="#fff" />
                </TouchableOpacity>
            </View>
            <Text>Tổng tiền: {allPrice>1000?stringPrice:allPrice}Đ</Text>
            <TouchableOpacity style={styles.btnBuy}
            onPress={()=>goCartTag(tagImg,tagName,tagPrice,num)}
            >
                <Text style={{color:'#fff'}}>Chọn Mua</Text>
            </TouchableOpacity>
            <View style={styles.cmtContainer}>
                <TextInput 
                    placeholder="Khách" 
                    
                    style={styles.txtUser} 
                    onChangeText={(val)=>setUser(val)}
                />
                <TextInput
                    placeholder="Đánh giá sản phẩm"
                    value={cmt}
                    style={styles.txtComment}
                    onChangeText={(val) => setCmt(val)}
                />
                <View style={styles.iconCmt} >
                    <TouchableOpacity
                        onPress={()=>saveCmt(tagId)}
                    >
                        <Ionicons name="chatbox-ellipses-outline" size={15} color={'blue'}  />
                    </TouchableOpacity>
                    
                </View>
                
                
                
            </View>
            <View style={{width: '100%',}}>
                <Cmt
                    id={tagId}
                />
            </View>
        </View>
    )
}

export default DetailItem;

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.BACKGROUND,
        alignItems:'center',
    },
    txtInput:{
        backgroundColor:'#fff',
        height:30,
        width: '80%',
        color:"#111",
        marginTop:10,
        borderRadius: 20,
    },
    txtInput1:{
        backgroundColor:'#fff',
        height:30,
        width:'60%',
        color:"#111",
        marginTop:10,
        //borderRadius: 20,
        borderBottomLeftRadius:20,
        borderTopLeftRadius:20,
    },
    img:{
        width: 100,
        height:100,
        marginTop: 10,
        marginBottom:10,
        borderRadius:15,
        backgroundColor:colors.WHITE,
        borderColor:colors.GREY,
        borderWidth:1,
    },
    btnContainer:{
        marginTop: 10,
        padding:10,
    },
    btnAdd:{
        backgroundColor: '#ff4081', 
        width: 30, 
        height: 20, 
        borderTopStartRadius: 10, 
        alignItems: 'center', 
        justifyContent: 'center',

    },
    btnRev:{
        backgroundColor: '#ff4081', 
        width: 30, 
        height: 20, 
        borderBottomEndRadius: 10, 
        alignItems: 'center', 
        justifyContent: 'center',
    },
    btnBuy:{
        backgroundColor:'#ff4081', 
        width:'80%', 
        height: 40, 
        alignItems:'center', 
        justifyContent:'center',
        marginTop:10,
    },
    row:{
        flexDirection:'row',
        marginTop:10,
        
        backgroundColor:colors.WHITE,
    },
    inputText: {
        width:30,
        height:20,
        backgroundColor:'#fff',
        color:'#000',
        textAlign:'center',
        justifyContent:'center',
        fontSize:15,
    },
    txtUser:{
        backgroundColor:'#fff',
        height:40,
        width: '20%',
        color:"#333",
        outlineStyle: 'none',
        borderRightWidth:1,
        padding:10,
        borderTopLeftRadius:20,
        borderBottomLeftRadius:20,
        justifyContent:'center',
    },
    txtComment:{
        backgroundColor:'#fff',
        height:40,
        width: '60%',
        color:"#333",
        outlineStyle: 'none',
        justifyContent:'center',
        padding:10,
        
    },
    iconCmt:{
        backgroundColor:colors.WHITE,
        height:40,
        width: '20%',
        
        borderTopRightRadius:20,
        borderBottomRightRadius:20,
        justifyContent:'center',
        alignItems:'center',
    },
    cmtContainer:{
        width:'80%',
        
        flexDirection:'row', 
        marginTop:10,
        borderRadius:20,
        borderWidth:1,
        justifyContent:'center'
    },
})
