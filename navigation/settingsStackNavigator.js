import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import SettingsScreen from './screens/settings';
import EditProfileScreen from './screens/editProfile';

const Stack = createStackNavigator()

class App extends Component{
    render(){
        return (
            <Stack.Navigator>
                <Stack.Screen name="Settings" component={SettingsScreen} />
                <Stack.Screen name="Edit Profile" component={EditProfileScreen} />
            </Stack.Navigator>
        );
    }
}

export default App;