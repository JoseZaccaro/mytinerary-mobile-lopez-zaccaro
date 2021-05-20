import React from 'react';
import { StyleSheet } from 'react-native';
import Index from './Index'
import Cities from './Cities';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();


export default function App() {
  return (
    <NavigationContainer style={styles.container}>
      <Stack.Navigator  style={styles.container}>
        <Stack.Screen
          name="Home"
          component={Index}
          options={{ title: 'Welcome to MyTinerary' }}
          style={styles.container}
          />
        <Stack.Screen name="Cities" component={Cities} style={styles.container}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container:{
    width:'100%',
    height:'100%'
  }
});
