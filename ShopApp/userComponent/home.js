import React from 'react';
import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from "react-native-vector-icons/Ionicons";

import ListItemUser from './list';
import CartItem from './cart';
import colors from '../misc/colors';

import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import ProfileView from './profile';

const Tab = createBottomTabNavigator();



const HomeScreen=({route,}) =>{
    const {userId}= route.params;
    console.log(userId);
    return (
        <Tab.Navigator
            screenOptions={()=>({
                tabBarStyle: {backgroundColor: colors.BTNADD},
                tabBarActiveTintColor: colors.INDIGO,
                tabBarInactiveTintColor: colors.GREY,
                headerShown:false,
            })}
        >

            <Tab.Screen
                name="ItemUser"
                component={ListItemUser}
                initialParams={{userId:userId}}
                options={{
                    title:"",
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="pricetag" size={24} color={color} />
                    ),
                    
                }}
            />

            <Tab.Screen
                name="Cart"
                component={CartItem}
                initialParams={{userId:userId}}
                options={{
                    title:"",
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="cart" size={24} color={color} />
                    )
                }}
            />

            <Tab.Screen
                name="Profile"
                component={ProfileView}
                initialParams={{userId:userId}}
                options={{
                    title:"",
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="person" size={24} color={color} />
                    )
                }}
            />
        </Tab.Navigator>
    )
}
export default HomeScreen;