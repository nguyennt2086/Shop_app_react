import React from "react";
import {StyleSheet, Text, TouchableOpacity, View, FlatList, Modal, TextInput} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";

import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { fetchAllAnswers, removeAnswer, updateCmt, writeAnswer} from "../redux/actions/tagAction";
import store from "../redux/stores/stores";
import colors from "../misc/colors";
// const item = [
//     {id:'ff',user:'Á',cmt:'quá dở'},
//     {id:'ee',user:'â',cmt:'quá tốt'},
// ]

const Ans = ({params,id,id2,users,cmts,numcmt,times,like,dislike}) =>{
    const dispatch = useDispatch();
    const db = useSelector(store=>store.tag);
    const [data, setData] = useState([]);

    useEffect(()=>{
        dispatch(fetchAllAnswers(id,id2));
        setData(db.tag2);
        //console.log(data);
    },[]
    )
    

    return(
        <View style={styles.container}>
            <FlatList 
            data={db.tag2}
            renderItem={({item,})=><ItemComponents 
            item={item} 
            id={id} 
            id2={id2} 
            users={users} 
            cmts={cmts} 
            numcmt={numcmt} 
            times={times}
            likes={like}
            dislikes={dislike}
            /> }
            ></FlatList>
            
            
        </View>
    );
}


const ItemComponents = ({item,id,id2,users,cmts,numcmt,times,likes,dislikes}) =>{
    const dispatch=useDispatch();
    const [user, setUser] = useState("");
    const [cmt, setCmt] = useState("@"+item.user+" ");
    const [showInput, SetShowInput] = useState(false);

    const [textShown, setTextShown] = useState(false); 
    const [ showMore, setShowMore ] = useState(false);

    const [like,setLike] = useState(item.like);
    const [dislike,setDislike] = useState(item.dislike);
    const changeValueLike = () =>{
        setLike(parseInt(like)+1);
    }
    const changeValueDislike = () =>{
        setDislike(parseInt(dislike)+1);
    }
    
    const toggleNumberOfLines = () => { 
        setTextShown(!textShown);
    }
    const onTextLayout = (e)=> {
            setShowMore(e.nativeEvent.lines > 1); 
        }

        const day= new Date().getDate();
        const month= new Date().getMonth()+1;
        const year= new Date().getFullYear();
        const time= new Date().getTime();
        const dates= `d${day}${month}${year}${time}`;

    const saveCmt = (id, id2, num) => {
        let newCmt = {
            user: user,
            cmt: cmt,
            time: dates,
            like: like,
            dislike: dislike,
        }
        let count = {
            user: users,
            cmt: cmts,
            numcmt: num,
            time: times,
            like: likes,
            dislike: dislikes,
        }
        if (user == "") {
            alert('Tên khách để trống')
        }
        else if (cmt.length < 10 || cmt == "") {
            alert('Bình luận phải trên 10 ký tự và không được để trống')
        } else {
            dispatch(writeAnswer(newCmt, id, id2));
            dispatch(updateCmt(count, id, id2),);
            dispatch(fetchAllAnswers(id));
            setCmt("");
        }

    }
    const deleteCmt=(id,id2,id3,num) =>{
        let count = {
            user: users,
            cmt: cmts,
            numcmt: num,
            time: times,
            like: likes,
            dislike: dislikes,
        }
        dispatch(removeAnswer(id,id2,id3))
        dispatch(updateCmt(count,id,id2));
        dispatch(fetchAllAnswers(id));
    }

    const changeValue = () =>{
        SetShowInput(!showInput);
    }
    const Show = () => {
        if (showInput == true) {
            return (
                <Modal visible={true} animationType='fade'>
                    <View style={{ flex: 1, backgroundColor: colors.BACKGROUND }}>
                        <View style={styles.cmtContainer}>
                            <TextInput
                                placeholder="Khách"
                                style={styles.txtUser}
                                onChangeText={(val) => setUser(val)}
                            />
                            <TextInput
                                placeholder="Trả lời"
                                value={cmt}
                                style={styles.txtComment}
                                onChangeText={(val) => setCmt(val)}
                                multiline
                                editable
                                numberOfLines={4}
                            />
                            <View style={styles.iconCmt} >
                                <TouchableOpacity
                                    style={{ marginLeft: 10, marginRight: 10, }}
                                    onPress={() => {
                                        saveCmt(id, id2, parseInt(numcmt) + 1);
                                        changeValue();
                                    }}
                                >
                                    <Ionicons name="chatbox-ellipses-outline" size={15} color={colors.BLUE} />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{ marginLeft: 10, marginRight: 10, }}
                                    onPress={() => {
                                        changeValue();
                                    }}
                                >
                                    <Ionicons name="close" size={15} color={colors.RED} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            );
        } else {
            return null;
        }
    }
    return(
        <View style={styles.btnContainer}>
            <View style={styles.row}>
                <View style={styles.icon}>
                    <Ionicons name="person" size={20} color="#fff" />
                </View>
                {/* <Text>{numcmt}</Text> */}
                <View style={{flex:3,}}>
                    <View style={styles.btn}>
                        <Text style={styles.txtName}>{item.user}</Text>
                        <Text
                            onTextLayout={onTextLayout}
                            numberOfLines={textShown ? 0 : 2}//textShown có true? 
                            style={styles.txtCmt}
                            ellipsizeMode="tail"
                        >{item.cmt}
                        </Text>
                        {
                            showMore == false ?
                                <Text
                                    onPress={() => toggleNumberOfLines()}
                                    style={styles.textShowMore}>{textShown ? 'Thu gọn' : 'Xem thêm'}
                                </Text>
                                : null
                        }
                    </View>
                    <View style={{left:10, flexDirection:'row'}}>

                        <TouchableOpacity
                        onPress={()=>changeValue()}
                        style={{marginLeft:10,flexDirection:'row',alignItems:'center'}}
                        >
                            <Ionicons name="chatbubble" size={15} color={colors.RED}/> 
                            <Text style={{fontSize:15,}}>Phản hồi</Text> 
                        </TouchableOpacity>
                        <TouchableOpacity
                        onPress={()=>changeValueLike()}
                        style={{marginLeft:10,flexDirection:'row',alignItems:'center'}}
                        >
                            <Ionicons name="thumbs-up" size={15} color={colors.RED}/>
                            <Text style={{fontSize:15,}}>{like}</Text> 
                        </TouchableOpacity>
                        <TouchableOpacity
                        onPress={()=>changeValueDislike()}
                        style={{marginLeft:10,flexDirection:'row',alignItems:'center'}}
                        >
                            <Ionicons name="thumbs-down" size={15} color={colors.RED}/> 
                            <Text style={{fontSize:15,}}>{dislike}</Text> 
                        </TouchableOpacity>
                        
                        
                    </View>
                    {Show()}
                    
                </View>
                <TouchableOpacity 
                    style={styles.icon}
                    onPress={()=>deleteCmt(id,id2,item.id,parseInt(numcmt)-1)}
                >
                    <Ionicons name="trash" size={20} color={colors.RED}/>
                </TouchableOpacity>
            </View>
            
        </View>
    )
}



export default Ans;

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.BACKGROUND,
    },
    btnContainer:{
        flex:1,
        //marginLeft: 10,
        marginTop: 10,
        //alignItems:'center',
        justifyContent:'center'
    },
    txtName:{
        fontSize: 20,
        color:'#000000',
        marginLeft:10,
    },
    txtCmt:{
        fontSize:15,
        color:'#000000',
        marginLeft:10,
        marginRight:10,
        marginTop:5,
        marginBottom:5,
        
    },
    btn:{
        width: '100%',
        
        backgroundColor:colors.BTNBACKGROUND,
        borderRadius:10,
        //alignItems:"center",
        justifyContent:'center',
        marginTop: 10,
    },
    row:{
        //flex:1,
        flexDirection: 'row',
        //alignItems: "center",
        // justifyContent: 'space-between',
    },
    icon:{
        width:40,
        height: 40,
        borderRadius:20,
        backgroundColor:colors.BTNBACKGROUND,
        alignItems:"center",
        justifyContent:'center',
        marginRight:15,
        marginLeft:15,
    },
    
    img:{
        marginLeft: 5, 
        width: 50, 
        height:50, 
        borderRadius:10, 
        borderBottomWidth:2,
        borderRightWidth:1, 
    },
    txtUser:{
        backgroundColor:colors.WHITE,
        height:30,
       
        color:colors.BLACK,
        outlineStyle: 'none',
        borderBottomWidth:1,
        padding:10,
       
    },
    txtComment:{
        backgroundColor:colors.WHITE,
        // height:30,
        //width: '100%',
        //flexWrap:'wrap',
        color:colors.BLACK,
        outlineStyle: 'none',
        borderBottomWidth:1,
        padding:10,
        
    },
    iconCmt:{
        backgroundColor:colors.WHITE,
        height:30,
        borderBottomWidth:1,
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
    },
    cmtContainer:{       
        marginTop:10,
    },
    textShowMore: {
        color: colors.RED,
        fontSize: 12,
        lineHeight: 20,
        marginLeft:10,
    },
})