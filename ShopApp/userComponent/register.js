import React from "react";
import { ImageBackground, StyleSheet, Text, View, TextInput, Image, TouchableOpacity, Switch } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from "../misc/colors";

import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useCallback } from "react";
import { addUser } from "../redux/actions/tagAction";

const RegisterView = ({ params, navigation }) => {
    const dispatch = useDispatch();
    const db = useSelector((store) => store.tag);

    const [isEnabled, setIsEnabled] = useState(false);
    const [showPass, setShowPass] = useState(true);
    const onToggleSwitch = () => setIsEnabled(previousState => !previousState);

    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");
    const [lastname, setLastname] = useState("");
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");

    const saveUser = () => {
        let newUser = {
            user: user,
            pass: pass,
            lastname: lastname,
            name: name,
            address: address,
            phone: phone,
            img: 'https://firebasestorage.googleapis.com/v0/b/tes1-787c4.appspot.com/o/images%2FFacebook-Avatar.png?alt=media&token=4e59b437-617d-4889-9fa6-3135ae160bf0'
        }

        dispatch(addUser(newUser));

        navigation.navigate('Login');

    }

    return (
        <View style={styles.loginContainer}>
            <Image
                source={require('../assets/background_milk.png')}
                style={styles.logo} />
            <Text style={styles.signinText}>Đăng ký tài khoản</Text>

            <View style={styles.formContainer}>
                <View style={styles.inputContainer}>
                    <Ionicons name='person' color={colors.BTNADD} size={20} />
                    <TextInput
                        placeholder=' Tài khoản'
                        placeholderTextColor={"#cfcfcf"}
                        underlineColorAndroid="transparent"
                        style={styles.inputText} 
                        onChangeText={(val) => setUser(val)}
                    />
                    

                </View>
                <View style={styles.inputContainer}>
                    <Ionicons name='lock-closed' color={colors.BTNADD} size={20} />
                    <TextInput
                        placeholder=' Mật khẩu'
                        placeholderTextColor={"#cfcfcf"}
                        style={styles.inputText} 
                        onChangeText={(val) => setPass(val)}
                    />
                    
                </View>
                <View style={styles.inputContainer}>
                    <Ionicons name='body' color={colors.BTNADD} size={20} />
                    <View style={{ width: '80%', flexDirection: 'row', height: '100%', marginLeft: 5, }}>
                        <TextInput
                            placeholder=' Họ'
                            placeholderTextColor={"#cfcfcf"}
                            underlineColorAndroid="transparent"
                            style={styles.inputLastname}
                            onChangeText={(val) => setLastname(val)}
                        />
                        <TextInput
                            placeholder=' Tên'
                            placeholderTextColor={"#cfcfcf"}
                            underlineColorAndroid="transparent"
                            style={styles.inputName}
                            onChangeText={(val) => setName(val)}
                        />
                    </View>


                </View>

                <View style={styles.inputContainer}>
                    <Ionicons name='call' color={colors.BTNADD} size={20} />
                    <TextInput
                        placeholder=' Số điện thoại'
                        placeholderTextColor={"#cfcfcf"}
                        underlineColorAndroid="transparent"
                        style={styles.inputText}
                        onChangeText={(val) => setPhone(val)}
                    />


                </View>
                <View style={styles.inputContainer}>
                    <Ionicons name='home' color={colors.BTNADD} size={20} />
                    <TextInput
                        placeholder=' Địa chỉ'
                        placeholderTextColor={"#cfcfcf"}
                        underlineColorAndroid="transparent"
                        style={styles.inputText}
                        onChangeText={(val) => setAddress(val)}
                    />


                </View>
                <View style={styles.row}>
                    <Switch onValueChange={onToggleSwitch} value={isEnabled} />
                    <Text style={styles.swiTxt}>Chấp nhận các điều khoản</Text>
                </View>

                <TouchableOpacity style={styles.btn}
                onPress={()=>saveUser()}
                >
                    <Text style={styles.btnText}>Đăng ký</Text>
                </TouchableOpacity>

            </View>


        </View>
    );
}

export default RegisterView;

const styles = StyleSheet.create({
    loginContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: colors.BACKGROUND,
    },
    logo:
    {
        height: 100,
        width: '100%',
        alignItems: 'top',
        justifyContent: 'top',
    },
    logoLogin: {
        width: 60,
        height: 60,
        borderRadius: 60 / 2,
        backgroundColor: '#d81b60',
        alignItems: 'center',
        justifyContent: 'center',
    },
    signinText: {
        // color: '#448bbf',
        color: colors.BTNADD,
        fontSize: 20,
        marginTop: 5,
        fontWeight: 'bold',
    },
    formContainer: {
        //backgroundColor: 'black'
        width: '100%',
        alignItems: 'center',
    },
    inputContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        width: "100%",
        height: "20%",
        marginTop: 10,
        outlineStyle: 'none',
    },
    inputText: {
        color: colors.BLACK,
        marginLeft: 5,
        backgroundColor: colors.WHITE,
        width: "80%",
        height: "100%",

    },
    inputLastname: {
        color: colors.BLACK,
        // marginLeft:5,
        backgroundColor: colors.WHITE,
        width: "50%",
        height: "100%",

    },
    inputName: {
        color: colors.BLACK,
        marginLeft: 5,
        backgroundColor: colors.WHITE,
        width: "50%",
        height: "100%",

    },
    btn: {
        backgroundColor: colors.BTNADD,
        width: '80%',
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    btnText: {
        color: '#fff',
    },
    row: {
        marginTop: 10,
        flexDirection: 'row',
        width: '80%',
        alignItems: 'left',
        justifyContent: 'left',
    },
    swiTxt: {
        marginLeft: 10,
        color: colors.BLUE,
        alignItems: 'center',
    },
    formSp: {
        marginTop: 50,
        alignItems: 'center',
        justifyContent: 'end',
    },
    spTxt: {
        color: '#1560c0',
        marginBottom: 10,
    },
})