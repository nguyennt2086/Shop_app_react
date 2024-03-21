import React from "react";
import {ImageBackground, StyleSheet, Text, View, TextInput, Image, TouchableOpacity, Switch } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from "../misc/colors";

import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useCallback } from "react";
import { checkUser } from "../redux/actions/tagAction";


const LoginView = ({params,navigation}) => {
    const dispatch = useDispatch();
    const db = useSelector((store) => store.tag);
    const [data, setData] = useState([]);
    const IPHOST = "http://localhost:5555";
    
    useEffect(()=>{
        fetch(IPHOST+'/api/accounts')
        .then((response) => response.json())
        .then((responseJson) => {
        setData(responseJson);
        // setOriginData(responseJson);
        // console.log(userId);
      })
      .catch((error) => {
        console.error(error);
      });
        
        
    },[]
    )

    const [isEnabled, setIsEnabled] = useState(false);
    const [showPass, setShowPass] = useState(true)
    const onToggleSwitch = () => setIsEnabled(previousState => !previousState);

    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");
    // const [id, setId] = useState();
  
    const useritem = data.some(obj=>obj.user==user)
    const passitem = data.some(obj=>obj.pass==pass)
    const iditem= data
    .find(obj => {
        return obj.user === user;
      });
    const id=Object.values(iditem||{})
    console.log(id[0]||{});
  
    const goRegister = ()=>{
        navigation.navigate('Register');
    }

    const isUser = (u,p) => { 
          
        if(useritem&&passitem){  
            // navigation.reset({
            //     index: 0,
            //     actions: [navigation.navigate('ItemUser',{userId:id[0]||{}}),],
                
            // })
            // navigation.navigate('ItemUser',{userId:id[0]||{}})
            navigation.replace('Home',{userId:id[0]||{}})
        }else{
            alert('Tên đăng nhập hoặc mật khẩu không đúng!');
            setUser("");
            setPass("");
        }


        

    }
    return(
        <View style={styles.loginContainer}>
            <Image 
                source={require('../assets/background_milk.png')}
                style={styles.logo} />
            <Text style={styles.signinText}>Đăng nhập tài khoản</Text>
            
            <View style={styles.formContainer}>
                <View style={styles.inputContainer}>
                    <Ionicons name='person'  color={colors.BTNADD} size={20} />
                    <TextInput 
                    placeholder=' Tên Đăng Nhập' 
                    placeholderTextColor={"#cfcfcf"}
                    underlineColorAndroid="transparent"
                    style={styles.inputText} 
                    value={user}
                    onChangeText={(val) => setUser(val)}
                    /> 
                    
                    
                </View>
                <View style={styles.inputContainer}>
                    <Ionicons name='lock-closed' color={colors.BTNADD} size={20} />
                    <TextInput 
                    placeholder=' Mật khẩu' 
                    placeholderTextColor={"#cfcfcf"}
                    // value="*"
                    secureTextEntry={showPass}
                    style={styles.inputText} 
                    value={pass}
                    onChangeText={(val) => setPass(val)}
                    />
                    
                </View>
                
                <View style={styles.row}>
                    <Switch onValueChange={onToggleSwitch} value={isEnabled}/>
                    <Text style={styles.swiTxt}>Nhớ mật khẩu?</Text>
                </View>
                    
                <TouchableOpacity style={styles.btn}
                onPress={()=>isUser(user,pass)}
                >
                    <Text style={styles.btnText}>Đăng nhập</Text>
                </TouchableOpacity>
                
            </View>
            <TouchableOpacity style={styles.formSp}
            onPress={()=>goRegister()}
            ><Text style={styles.spTxt}>Chưa có tài khoản? Đăng ký ngay!</Text></TouchableOpacity>
            
        </View>
    );
}

export default LoginView;

const styles = StyleSheet.create({
    loginContainer: {
        flex: 1,
        alignItems:'center',
        backgroundColor:colors.BACKGROUND,
    },
    logo:
    {
        height:100,
        width: '100%',
        alignItems: 'top',
        justifyContent: 'top',
    },
    logoLogin: {
        width: 60,
        height:60,
        borderRadius: 60/2,
        backgroundColor: '#d81b60',
        alignItems: 'center',
        justifyContent: 'center',
    },
    signinText: {
        // color: '#448bbf',
        color: colors.BTNADD,
        fontSize:20,
        marginTop:5,
        fontWeight:'bold',
    },
    formContainer: {
        //backgroundColor: 'black'
        width: '100%',
        alignItems:'center',
    },
    inputContainer: {
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
        width: "100%",
        height: "20%",
        marginTop:10,
        outlineStyle: 'none',
    },
    inputText: {
        color:colors.BLACK,
        marginLeft:5,
        backgroundColor:colors.WHITE,
        width: "80%",
        height: "100%",
        
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