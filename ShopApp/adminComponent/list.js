import React from "react";
import {StyleSheet, Text, TouchableOpacity, View, FlatList, Image, TextInput, ImageBackground} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";

import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { fetchAllCourses, searchItem } from "../redux/actions/courseAction";
import store from "../redux/stores/stores";
import colors from "../misc/colors";

const ListItem = ({params,navigation,route}) =>{
    const dispatch = useDispatch();
    const db = useSelector(store=>store.courses);
    const [amie,setAmie]=useState(false);
    const [click,setClick]=useState(0);
    const {userId}= route.params;
    const [search, setSearch] = useState('');
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [originData, setOriginData] = useState([]);

    const IPHOST = "http://localhost:5555";
    useEffect(()=>{
        fetch('http://127.0.0.1:5555/api/courses')
        .then((response) => response.json())
        .then((responseJson) => {
        setFilteredDataSource(responseJson);
        setOriginData(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
    },[]
    )
    const goDetailTag=(id,name,nameImg,price)=>{
        navigation.navigate('Detail',{tagId:id,tagName:name,tagImg:nameImg,tagPrice:price});
    }

    const searchFilterFunction = (text) => {
        // text có trống?
        if (text) {
            // Lọc dữ liệu chính
            if(text=='Bye Bye'){
                setAmie(true);
            }else{
                const newData = originData.filter(
                    function (item) {
                        const itemData = item.name
                            ? item.name.toUpperCase()
                            : ''.toUpperCase();
                        const textData = text.toUpperCase();
                        return itemData.indexOf(textData) > -1;
                    });
                setAmie(false);
                setFilteredDataSource(newData);// update dữ liệu mới
                setSearch(text);
            }
        } else {
            // update dữ liệu về dữ liệu chính
            setFilteredDataSource(originData);
            setSearch(text);
        }
    };
    return(
        <View style={styles.container}>
            <ImageBackground 
                style={styles.imgLogo} 
                source={require('../assets/background_milk.png')}
            >
                    <View style={styles.searchStyle}>
                    <Ionicons name="search" size={20} color="#a0a0a0" />
                    <TextInput
                        style={styles.textInputStyle}
                        onChangeText={(text) => searchFilterFunction(text)}
                        value={search}
                        underlineColorAndroid="transparent"
                        placeholder="Tìm kiếm"
                        placeholderTextColor={"#aaaaaa"}
                    />
                </View>
            </ImageBackground>
            {amie? <TouchableOpacity
            style={{width: '100%', height:100, backgroundColor:colors.BLUE}}
                onPress={() => {
                    setClick(click + 1); 
                    if (click > 3) {
                        navigation.replace('Home',{userId:userId})
                        setAmie(false);
                    }
                }}
            >
                
            </TouchableOpacity>:null}
            <FlatList 
            data={filteredDataSource}
            renderItem={({item})=><ItemComponent 
                onPress={()=>goDetailTag(item.id,item.name,item.nameImg,item.price)}
                item={item}
            ></ItemComponent>}
            //ListHeaderComponent={HeaderComponent}
            ></FlatList>
            
            <View style={styles.containerAdd}>
                <TouchableOpacity
                    onPress={() => navigation.navigate("Post")}
                >
                    <Ionicons name="add" size={30} color={"#fff"}/>
                </TouchableOpacity>
            </View>
            
        </View>
    );
}

const HeaderComponent = ()=>{
    return(
        <View style={styles.container}>
            <Text style={styles.txtWelcome}>Chào mừng bạn đã trở lại,</Text>
            <Text style={styles.txtName}>Guest User</Text>
            <Text style={styles.txtQuery}>Hôm nay, chúng ta nên làm gì?</Text>
        </View>
    )
}
const ItemComponent = ({item, onPress}) =>{
    
    return(
        <View style={styles.btnContainer}>
            
            <TouchableOpacity style={styles.btn}
            onPress={onPress}
            >
                <View style={styles.row}>
                    <Image style={styles.img} 
                        source={{uri: item.nameImg}}
                        resizeMode="contain"
                    />
                    <View >
                        <Text style={styles.txtBtn}>{item.name}</Text>
                        <Text style={styles.txtBtn}>Giá: {item.price}Đ</Text>
                    </View>
                    
                </View>
            </TouchableOpacity>

            
        </View>
    )
}



export default ListItem;

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.BACKGROUND
    },
    btnContainer:{
        marginTop: 10,
        alignItems:'center',
        justifyContent:'center'
    },
    txtWelcome:{
        fontSize:15,
        color:'#000',
        marginLeft: 10,
    },
    txtName:{
        fontSize: 20,
        color:'#000',
        marginLeft:10,
    },
    txtQuery:{
        fontSize:20,
        color:'#000',
        marginLeft:10,
        marginTop:15,
        fontWeight:'bold',
    },
    txtBtn:{
        fontSize:15,
        color:'#000',
        width:'100%',
        marginLeft:10,
        marginRight:10,
        marginTop:5,
        marginBottom:5,
    },
    btn:{
        width:'90%',
        height:60,
        backgroundColor:colors.BTNBACKGROUND,
        borderRadius:10,
        //alignItems:"center",
        justifyContent:'center',
        marginTop: 10,
    },
    row:{
        //flex:1,
        flexDirection: 'row',
        alignItems: "center",
        //justifyContent: 'center',
    },
    icon:{
        width:40,
        height: 40,
        borderRadius:20,
        
        alignItems:"center",
        justifyContent:'center',
        marginRight:15,
        right: 0,
    },
    
    img:{
        marginLeft: 5, 
        width: 50, 
        height:50, 
        borderRadius:10, 
        borderColor:colors.GREY,
        borderWidth:1, 
        backgroundColor:colors.WHITE,
    },
    imgLogo:{
        width: '100%',
        height: 80,
        alignItems:'center',
    },
    containerAdd:{
        position:'absolute',
        right:15,
        bottom:'25%',
        backgroundColor:colors.BTNADD,
        width: 60,
        height: 60,
        borderRadius:30,
        
        alignItems:'center',
        justifyContent:'center'
    },
    textInputStyle:{
        
        
        color:colors.BLACK,
        outlineStyle: 'none',
        
    },
    searchStyle:{
        //flex:1,
        flexDirection: 'row',
        alignItems: "center",
        backgroundColor:colors.GREY,
        
        padding:10,
        //height:30,
        width: '80%',
        marginTop:10,
    },
})