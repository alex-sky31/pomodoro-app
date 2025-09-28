import { Tabs } from 'expo-router';
import React from 'react';
import {Ionicons} from "@expo/vector-icons";
import {useTimerState} from "@/app/contexts/TimerStateContext";

export default function TabLayout() {
    const { isRunning } = useTimerState();

    return (
       <Tabs
           screenOptions={{
               headerShown: false,
               tabBarStyle: {
                   backgroundColor: '#121212', // fond sombre pour toute la TabBar
                   borderTopWidth: 0,
                   height: 60,
                   position: 'absolute',
                   left: 0,
                   right: 0,
                   bottom: 0,
                   elevation: 0,
               },
               tabBarActiveTintColor: '#4ECDC4', // couleur accent active
               tabBarInactiveTintColor: 'rgba(255,255,255,0.5)', // inactive clair
           }}
        >
           <Tabs.Screen
               name="index"
               options={({ route }) => ({
                   title: 'Timer',
                   tabBarIcon: ({ color, size }) => <Ionicons name="timer-outline" size={size} color={color} />,
                   tabBarStyle: isRunning
                       ? { display: 'none' } // masque la tabBar si le timer tourne
                       : {
                           backgroundColor: 'transparent',
                           opacity: 1,
                           borderTopWidth: 1,
                           height: 60,
                           position: 'absolute',
                           left: 0,
                           right: 0,
                           bottom: 1,
                           elevation: 0,
                       },
               })}
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