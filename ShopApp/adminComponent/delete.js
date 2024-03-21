import React from "react";
import {StyleSheet, Text, TouchableOpacity, View, Modal} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";

import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { deleteCourse, } from "../redux/actions/courseAction";

import * as ImagePicker from "expo-image-picker";
import { notInitialized } from "react-redux/es/utils/useSyncExternalStore";

const DeleteItem = ({route, navigation, visible, onClose}) => {
    const dispatch = useDispatch();
    const db = useSelector((store)=>store.course);
    
    const {tagId}= route.params;
    


    const saveCourse = (id) => {
        dispatch(deleteCourse(id));
        onClose();
    }
    const cancelCourse = () => {
        onClose();
    }

    
    return(
        <Modal style={styles.container}
            visible={visible}
        >
            
            <Text>Bạn có muốn xóa?</Text>
            <View style={{flexDirection:'row'}}>
                <TouchableOpacity
                    style={styles.btnContainer}
                    onPress={() => { saveCourse(tagId) }}
                >
                    <View style={styles.btn}>
                        <Text>Yes</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.btnContainer}
                    onPress={() => { cancelCourse() }}
                >
                    <View style={styles.btn}>
                        <Text>No</Text>
                    </View>
                </TouchableOpacity>
            </View>
            
        </Modal>
    )
}

export default DeleteItem;

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#12005e",
        alignItems:'center',
    },
    txtInput:{
        backgroundColor:'#fff',
        height:30,
        width: '80%',
        color:"#111",
        marginTop:10,
        outlineStyle: 'none',
        borderRadius: 20,
        padding:10,
    },
    txtInput1:{
        backgroundColor:'#fff',
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
        backgroundColor: '#FFF', 
        alignItems:'center', 
        justifyContent:'center',

    },
    btn1:{
        width: '40%', 
        height: 30, 
        //borderRadius: 25,
        borderBottomRightRadius:20,
        borderTopRightRadius:20, 
        backgroundColor: '#FFF', 
        marginTop:10,
        alignItems:'center', 
        justifyContent:'center',

    },
})
