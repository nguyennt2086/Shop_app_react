import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, TextInput, Image, FlatList } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";

import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import store from "../redux/stores/stores";

import * as ImagePicker from "expo-image-picker";

import { fetchAllCarts } from "../redux/actions/cartAction";
import colors from "../misc/colors";
var mone = 0;

const CartItem = ({ params, route }) => {
    const dispatch = useDispatch();
    const db = useSelector((store) => store.cart);
    const [data, setData] = useState([]);
    const [choice, setChoice] = useState(false);
    
    const { userId } = route.params;

    useEffect(() => {
        dispatch(fetchAllCarts(userId));
        setData(db.cart);
        console.log(db.cart);
    }, []
    )
    const chooseAll=()=>{
        setChoice(!choice);
    }

    const Order=()=>{

    }

    return (
        <View style={styles.container}>
            <FlatList
                data={db.cart}
                renderItem={({ item }) => <ItemComponent item={item} value={choice} />}

            ></FlatList>
            <View style={{flexDirection:'row', alignItems:'center',justifyContent:'space-between', }}>
                <View style={{ alignItems:'center', flexDirection:'row'}}>
                    <TouchableOpacity style={{ width: 20, height: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: choice ? colors.DARKPINK : colors.WHITE, marginLeft: 10, }}
                        onPress={() => chooseAll()}
                    >
                        <Ionicons name="checkmark-outline" size={20} color={colors.WHITE} />
                    </TouchableOpacity>
                    <Text style={{ marginLeft: 10 }}>Chọn hết</Text>
                </View>
               
                <Text style={{marginLeft:10}}>Tổng tiền: {mone} đ</Text>
                <TouchableOpacity style={styles.btnBuy}
                    onPress={()=> Order()}
                >
                    <Text style={{ color: '#fff' }}>Thanh toán</Text>
                </TouchableOpacity>
            </View>
            

        </View>
    );

}

const ItemComponent = ({item,value,}) => {
    
    const [tagPrice,setTagPrice] = useState(item.price);
    const [num, setNum] = useState(item.num);
    const [valueAll, setValueAll] = useState(false);
    const Add = () => {
        setNum(num + 1)
        if (num > 98) {
            setNum(1)
        }
    };
    const Rev = () => {
        setNum(num - 1)
        if (num < 2) {
            setNum(99)
        }
    };
    var allPrice = Number(tagPrice) * num;

    var decnum = parseInt((allPrice / 1000 - parseInt(allPrice / 1000)) * 1000);
    var valuenum = decnum == 0 ? ",000" : "," + decnum;
    var stringPrice = (parseInt(allPrice / 1000) + valuenum);
    const TotalMoney = () => {
        if(!valueAll){
            mone=mone+allPrice;
        }
        else{
            mone=mone-allPrice;
        }
    }

    return (
        <View style={styles.btnContainer}>
            <TouchableOpacity
                style={[styles.cartContainer,{backgroundColor:valueAll?colors.DARKPINK:colors.BTNADD&&value?colors.DARKPINK:valueAll?colors.DARKPINK:colors.BTNADD}]}
                onPress={()=>{setValueAll(!valueAll); TotalMoney();}}
            >
                <Image
                    style={styles.img}
                    source={{ uri: item.img }}
                    resizeMode="contain"
                />
                <View style={styles.textContainer}>
                    <Text style={{fontWeight:'bold', fontSize:20, color:colors.WHITE}}>{item.name}</Text>
                    <Text style={{fontSize:15, color:colors.WHITE}}>Giá tiền:{tagPrice}Đ</Text>
                    <View
                        style={[styles.row,{backgroundColor:valueAll||value?colors.BTNADD:colors.BTNBACKGROUND}]}
                    >
                        <TouchableOpacity style={styles.btnRev}
                            onPress={Rev}
                        >
                            <Ionicons name={"remove-outline"} size={10} color={colors.DARKPINK} />
                        </TouchableOpacity>
                        <TextInput style={[styles.inputText,{backgroundColor:valueAll||value?colors.BTNADD:colors.BTNBACKGROUND}]} value={num} />
                        <TouchableOpacity style={styles.btnAdd}
                            onPress={Add}
                        >
                            <Ionicons name={"add-outline"} size={10} color={colors.DARKPINK} />
                        </TouchableOpacity>
                    </View>
                    <Text style={{fontSize:15, color:colors.WHITE}}>Tổng tiền: {allPrice > 1000 ? stringPrice : allPrice}Đ</Text>
                </View>

            </TouchableOpacity>
            {/* <Text>{item.id}</Text> */}
            
        </View>
    )
}

export default CartItem;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.BTNBACKGROUND,
    },
    btnContainer:{
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:colors.BTNBACKGROUND,
        
    },
    cartContainer:{
        flexDirection:'row',
        width: '90%',
        alignItems:'center',
        borderRadius:10,
        marginTop:10,
        // marginBottom:10,
    },
    textContainer:{
        alignItems:'center',
        marginLeft:10,
    },
    img:{
        width: 100,
        height:100,
        marginTop: 10,
        marginBottom:10,
        marginLeft:10,
        borderRadius:15,
        backgroundColor:colors.WHITE,
        borderColor:colors.GREY,
        borderWidth:1,
    },
    btnAdd:{
        backgroundColor: colors.WHITE, 
        width: 30, 
        height: 20, 
        borderTopStartRadius: 10, 
        alignItems: 'center', 
        justifyContent: 'center',

    },
    btnRev:{
        backgroundColor: colors.WHITE, 
        width: 30, 
        height: 20, 
        borderBottomEndRadius: 10, 
        alignItems: 'center', 
        justifyContent: 'center',
    },
    btnBuy:{
        backgroundColor:'#ff4081', 
        width:100, 
        height: 40, 
        alignItems:'center', 
        justifyContent:'center',
        borderRadius:140/2,
        marginRight:10,
    },
    row:{
        flexDirection:'row',
        justifyContent:'center',
    },
    inputText: {
        width:30,
        height:20,
        color:colors.WHITE,
        textAlign:'center',
        justifyContent:'center',
        fontSize:15,
    },
})
