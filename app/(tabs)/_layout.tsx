import { Tabs } from 'expo-router';
import React from 'react';
import {Ionicons} from "@expo/vector-icons";

export default function TabLayout() {
    return (
       <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: '#FF6B6B',
                    borderTopWidth: 0,
                    height: 60,
                },
                tabBarActiveTintColor: '#fff',
                tabBarInactiveTintColor: 'rgba(255,255,255,0.6)',
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Timer',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="timer-outline" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="stats"
                options={{
                    title: 'Stats',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="timer-outline" size={size} color={color} />
                    ),
                }}
            />
           <Tabs.Screen
               name="setting"
               options={{
                   title: "Settings",
                   tabBarIcon: ({ color, size }) => (
                       <Ionicons name="settings-outline" size={size} color={color} />
                   ),
               }}
           />
        </Tabs>
    );
}