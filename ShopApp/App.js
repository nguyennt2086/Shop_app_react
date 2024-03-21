import ExpoStatusBar from 'expo-status-bar/build/ExpoStatusBar';
import React,{useState, useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Provider } from 'react-redux';
import store from './redux/stores/stores';

import ListItem from './adminComponent/list';

import PostItem from './adminComponent/post';
import EditItem from './adminComponent/edit';
import DeleteItem from './adminComponent/delete';
import DetailItem from './adminComponent/detail';
import ModalItem from './adminComponent/cmt';
import CartItem from './userComponent/cart';
import DetailItemUser from './userComponent/detail';
import ListItemUser from './userComponent/list';
import colors from './misc/colors';
import HomeScreen from './userComponent/home';
import LoginView from './userComponent/login';
import RegisterView from './userComponent/register';
import ProfileView from './userComponent/profile';
import Demo from './userComponent/test';


const Stack = createNativeStackNavigator();



export default function App() {
 
  return (
    
    //https://www.youtube.com/watch?v=URPLEngUbr4
   
    // <ImagePickerDemo/>
    // <SampleModalView/>
    
    <Provider store={store}>
       {/* <ListChild/> */}
      <NavigationContainer>
        <Stack.Navigator
        screenOptions={{
          headerStyle: {backgroundColor:colors.BAR}
        }}
        >         
          {/* <Stack.Screen name="Demo" component={Demo} /> */}
          <Stack.Screen name="Login" component={LoginView} options={{title:"",}}/>
          {/* <Stack.Screen name="Register" component={RegisterView} options={{title:"",}}/> */}
          <Stack.Screen name="Home" component={HomeScreen} options={{title:"",}}/>
          {/* <Stack.Screen name="ItemUser" component={ListItemUser} options={{title:"",}}/> */}
          <Stack.Screen name="DetailUser" component={DetailItemUser} options={{title:"",}}/>
          {/* <Stack.Screen name="Cart" component={CartItem} options={{title:"Giỏ hàng",}}/> */}
          <Stack.Screen name="List" component={ListItem} options={{title:"Sữa"}}/>
          <Stack.Screen name="Post" component={PostItem} options={{title:"Thêm"}}/>
          <Stack.Screen name="Detail" component={DetailItem} options={{title:"",}}/>
          <Stack.Screen name="Profile" component={ProfileView} options={{title:"",}}/>
          <Stack.Screen name="Edit" component={EditItem} options={{title:"Sửa"}}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
