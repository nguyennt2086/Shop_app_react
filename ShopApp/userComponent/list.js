import React from "react";
import {StyleSheet, Text, TouchableOpacity, View, FlatList, Image, TextInput, ImageBackground} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";

import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { fetchAllCourses, searchItem } from "../redux/actions/courseAction";
import store from "../redux/stores/stores";
import colors from "../misc/colors";

const ListItemUser = ({params,navigation,route}) =>{
    const dispatch = useDispatch();
    const db = useSelector(store=>store.courses);
    const {userId}= route.params;
    const [amie,setAmie]=useState(false);
    const [click,setClick]=useState(0);
    const [red,setRed]=useState(0);
    const [orange,setOrange]=useState(0);
    const [yellow,setYellow]=useState(0);
    const [green,setGreen]=useState(0);
    const [blue,setBlue]=useState(0);
    const [indigo,setIndigo]=useState(0);
    const [violet,setViolet]=useState(0);

    const pasnum = [1,1,2,1];
    const pascolor = [red,yellow,violet,blue];

    const [search, setSearch] = useState('');
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [originData, setOriginData] = useState([]);

    const checkPas=()=>{
        if (pascolor[0] == pasnum[0]) {
            if (pascolor[1] == pasnum[1]) {
                if (pascolor[2] == pasnum[2]) {
                    if (pascolor[3] == pasnum[3]) {
                        navigation.replace('List',{userId:userId})
                        setAmie(false);
                        setRed(0);
                        setOrange(0);
                        setYellow(0);
                        setGreen(0);
                        setBlue(0);
                        setIndigo(0);
                        setViolet(0);
                        console.log('red'+red+'orange'+orange+'yellow'+yellow+'green'+green+'blue'+blue+'indigo'+indigo+'violet'+violet);
                    }
                }
            }
            
        }
    }
    // const IPHOST='http://192.168.1.9:5555'
    // const IPHOST='http://10.104.23.189:5555'
    
    const IPHOST = "http://localhost:5555";
    useEffect(()=>{
        fetch(IPHOST+'/api/courses')
        .then((response) => response.json())
        .then((responseJson) => {
        setFilteredDataSource(responseJson);
        setOriginData(responseJson);
        console.log(userId);
      })
      .catch((error) => {
        console.error(error);
      });
    },[]
    )
    const goDetailTag=(id,name,nameImg,price,user)=>{
        navigation.navigate('DetailUser',{tagId:id,tagName:name,tagImg:nameImg,tagPrice:price,User:user});
    }

    const searchFilterFunction = (text) => {
        // text có trống?
        if (text) {
            // Lọc dữ liệu chính
            if(text=='Nguyên Nguyênn'){
                setAmie(true);
            }else{
                const newData = originData.filter(
                    (item)=> {
                        const itemData = item.name
                            ? item.name.toUpperCase()
                            : ''.toUpperCase();
                        const textData = text.toUpperCase();
                        return itemData.indexOf(textData) > -1;
                    });
                setAmie(false)
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
            {amie? 
            
            // <TouchableOpacity
            // style={{width: '100%', height:100, backgroundColor:colors.RED}}
            //     onPress={() => {
            //         setClick(click + 1); 
            //         if (click > 3) {
            //             navigation.reset({
            //                 index: 0,
            //                 routes: [{ name: 'List' }],
            //             })
            //             setAmie(false);
            //         }
            //     }}
            // >
            // </TouchableOpacity>
                <View style={{flexWrap:'wrap'}}>
                    <TouchableOpacity
                        style={{ width: 50, height: 50, backgroundColor: colors.RED }}
                        onPress={() => {
                            setRed(red + 1);
                            console.log('red'+red+'orange'+orange+'yellow'+yellow+'green'+green+'blue'+blue+'indigo'+indigo+'violet'+violet);
                        }}
                    >
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ width: 50, height: 50, backgroundColor: colors.ORANGE }}
                        onPress={() => {
                            setOrange(orange + 1);
                            console.log('red'+red+'orange'+orange+'yellow'+yellow+'green'+green+'blue'+blue+'indigo'+indigo+'violet'+violet);
                        }}
                    >
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ width: 50, height: 50, backgroundColor: colors.YELLOW }}
                        onPress={() => {
                            setYellow(yellow + 1);
                            console.log('red'+red+'orange'+orange+'yellow'+yellow+'green'+green+'blue'+blue+'indigo'+indigo+'violet'+violet);
                        }}
                    >
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ width: 50, height: 50, backgroundColor: colors.GREEN }}
                        onPress={() => {
                            setGreen(green + 1);
                            console.log('red'+red+'orange'+orange+'yellow'+yellow+'green'+green+'blue'+blue+'indigo'+indigo+'violet'+violet);
                        }}
                    >
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ width: 50, height: 50, backgroundColor: colors.BLUE }}
                        onPress={() => {
                            setBlue(blue + 1);checkPas();
                            console.log('red'+red+'orange'+orange+'yellow'+yellow+'green'+green+'blue'+blue+'indigo'+indigo+'violet'+violet);
                        }}
                    >
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ width: 50, height: 50, backgroundColor: colors.INDIGO }}
                        onPress={() => {
                            setIndigo(indigo + 1);
                            console.log('red'+red+'orange'+orange+'yellow'+yellow+'green'+green+'blue'+blue+'indigo'+indigo+'violet'+violet);
                        }}
                    >
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ width: 50, height: 50, backgroundColor: colors.VIOLET }}
                        onPress={() => {
                            setViolet(violet + 1);
                            console.log('red'+red+'orange'+orange+'yellow'+yellow+'green'+green+'blue'+blue+'indigo'+indigo+'violet'+violet);
                        }}
                    >
                    </TouchableOpacity>
                    {/* {checkPas()} */}
                </View>
           
            
            :null}
           
            
            
            <FlatList 
            data={filteredDataSource}
            numColumns={2}
            renderItem={({item})=><ItemComponent 
                onPress={()=>goDetailTag(item.id,item.name,item.nameImg,item.price,userId)}
                item={item}
            ></ItemComponent>}
            //ListHeaderComponent={HeaderComponent}
            ></FlatList>
            
            
            
        </View>
    );
}

const HeaderComponent = ({item})=>{
    const [search, setSearch] = useState("");
    const arrayholder = [] 
    const searchFilterFunction = text => {    
        const newData = arrayholder.filter(() => {      
            const itemData = `${item.name}`;
            const textData = text;
            console.log(item.name)
            return itemData.indexOf(textData) > -1;    
        });    
        setSearch({ newData });  
      };
    return(
        <View style={styles.container}>
            <TextInput value={search} onChangeText={text=>searchFilterFunction(text)}  />
        </View>
    )
}
const ItemComponent = ({item, onPress}) =>{
    
    return(
        <View style={styles.btnContainer}>
            
            <TouchableOpacity style={styles.btn}
            onPress={onPress}
            >
               
                    <Image style={styles.img} 
                        source={{uri: item.nameImg}}
                        resizeMode="contain"
                    />
                    <View >
                        <Text style={styles.txtBtn}>{item.name}</Text>
                        <Text style={styles.txtBtn}>Giá: {item.price}Đ</Text>
                    </View>
                    
            
            </TouchableOpacity>

            
        </View>
    )
}



export default ListItemUser;

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.BACKGROUND,
        alignItems:'center',
    },
    btnContainer:{
        
        alignItems:'center',
        justifyContent:'center',
        width: 180,
        height: 200,
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
        color:colors.DARKPINK,
        width:'100%',
        marginLeft:10,
        marginRight:10,
        textTransform:'capitalize'
    },
    btn:{
        width:'90%',
        height:180,
        borderRadius:10,
        backgroundColor:colors.BTNBACKGROUND,
        alignItems:"center",
        justifyContent:'center',
       
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
        width: 120, 
        height:120, 
        borderRadius:10, 
        borderColor:colors.GREY,
        borderWidth:1, 
        backgroundColor:colors.WHITE,
        marginBottom:10,
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