import React from "react";
import {StyleSheet, Text, TouchableOpacity, View, Platform, Image, TextInput, FlatList,} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";

import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useCallback } from "react";
import { writeCmt,getAllCmts, fetchAllCmts, } from "../redux/actions/tagAction";
import {addCart} from '../redux/actions/cartAction';
  
import * as ImagePicker from "expo-image-picker";
import Cmt from "./cmt";
import colors from "../misc/colors";

const DetailItemUser = ({route, navigation}) => {
    const dispatch = useDispatch();
    const db = useSelector((store)=>store.course);
    const [data, setData] = useState([]);
    const IPHOST = "http://localhost:5555";

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

    const {User}=route.params;
    const {tagId}= route.params;
    const {tagName}= route.params;
    const {tagImg}= route.params;
    const {tagPrice}= route.params;

    const [user, setUser] = useState("");
    const [cmt, setCmt] = useState("");
    const [like,setLike] = useState(0);
    const [dislike,setDislike] = useState(0);

    // const [refreshing, setRefreshing] = useState(false);
    // const onRefresh = useCallback(() => {
    //     setRefreshing(true);
    //     wait(2000).then(() => setRefreshing(false));
    //   }, []);
    
    const day= new Date().getDate();
    const month= new Date().getMonth()+1;
    const year= new Date().getFullYear();
    const time= new Date().getTime();
    const dates= `d${day}${month}${year}${time}`;

    const iditem= arr
    .filter(obj => {
        return obj.id === User;
      });
    const id=Object.values(iditem||{})
    console.log(iditem);

    const saveCmt=(id,name)=>{
        let newCmt = {
            user: name,
            cmt: cmt,
            numcmt: 0,
            time: dates,
            like: like,
            dislike:dislike,
        }
        if(cmt.length<10||cmt==""){
            alert('Bình luận phải trên 10 ký tự và không được để trống')
        }else{
            dispatch(writeCmt(newCmt,id));
            dispatch(fetchAllCmts(id));
            setCmt("");
        }
        
    }
    const goCartTag=(id,img,name,price,number)=>{
        //navigation.navigate('Cart',{tagImg:img,tagName:name,tagPrice:price,tagNum:number});
        let newCart = {
            img:img,
            name:name,
            price:price,
            num:number,
        }
        dispatch(addCart(newCart,id));
        
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
            <View
                
            >
                <Image
                    style={styles.img}
                    source={{ uri: tagImg }}
                    resizeMode="contain"
                />
            </View>
            
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
            onPress={()=>goCartTag(User,tagImg,tagName,tagPrice,num)}
            >
                <Text style={{color:'#fff'}}>Chọn Mua</Text>
            </TouchableOpacity>
            <View style={{ width: '100%', alignItems: 'center' }}>
                <FlatList

                    data={iditem}
                    renderItem={({ item }) => <ChatBox item={item} onPress={() => saveCmt(tagId, item.name)} cmt={cmt} scmt={(val) => setCmt(val)} ></ChatBox>}
                ></FlatList>
            </View>
           
            
            <View style={{width: '100%',}}>
                <Cmt
                    id={tagId}
                    
                ></Cmt>
            </View>
        </View>
    )
}

const ChatBox = ({ item, onPress, cmt, scmt }) => {
    const [name,setName] = useState(item.name);
    return (
        <View style={styles.cmtContainer}>
            <Text style={styles.txtUser}>{name}</Text>
            <TextInput
                placeholder="Đánh giá sản phẩm"
                value={cmt}
                style={styles.txtComment}
                onChangeText={scmt}
            />
            <View style={styles.iconCmt} >
                <TouchableOpacity
                    onPress={onPress}
                >
                    <Ionicons name="chatbox-ellipses-outline" size={15} color={'blue'} />
                </TouchableOpacity>

            </View>



        </View>
    )
}

export default DetailItemUser;

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
        backgroundColor:'#fff',
        height:40,
        width: '20%',
        
        borderTopRightRadius:20,
        borderBottomRightRadius:20,
        justifyContent:'center',
        alignItems:'center',
    },
    cmtContainer:{
        width:'100%',
        
        flexDirection:'row', 
        marginTop:10,
        borderRadius:20,
        borderWidth:1,
        justifyContent:'center'
    },
})
