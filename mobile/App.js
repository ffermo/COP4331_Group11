import 'react-native-gesture-handler';

import * as React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';

import Login from './src/components/Authentication/Login/Login';
//import AuthenticationScreen from './src/components/Authentication'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { create } from 'react-test-renderer';


const Stack = createStackNavigator();

export default function App() {
  return (

    <NavigationContainer>
        <Stack.Navigator>
        <Stack.Screen name="Auth" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>

    // <Login></Login>

    // <View style={styles.container}>
    //   <Text style={styles.welcome}>Welcome to React Native!</Text>
    //   <Text style={styles.instructions}>To get started, edit App.js</Text>
    //   <Text style={styles.instructions}>{instructions}</Text>
    // </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
