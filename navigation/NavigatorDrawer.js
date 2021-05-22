import React, { useState } from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import Index from '../Screens/Index';
import Cities from '../Screens/Cities';
import { Image, ScrollView, StyleSheet, View, Text, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Icon } from 'react-native-elements'
import SignIn from '../Screens/SignIn';
import SignUp from '../Screens/SignUp';
import City from '../Screens/City';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
  } from 'react-native-responsive-screen';

const Drawer = createDrawerNavigator();

const NavigatorDrawer = (props) => {
    const [state, setState] = useState({
        drawerIsOpen:true
    })
    const header = (props)=>{
        return (
        <DrawerContentScrollView>
            <View style={styles.header}>
                <View style={styles.contenedorImagen}>
                    { 
                    state.drawerIsOpen ?<>
                    <TouchableWithoutFeedback onPress={()=> state.drawerIsOpen ? props.navigation.navigate('signin') : null }>
                        <Icon name='account-circle' type='material' size={styles.iconoUsuario.fontSize} style={styles.iconoUsuario}/>
                    </TouchableWithoutFeedback>
                    <View>
                            <Text style={styles.userName}>
                                Welcome!
                            </Text>
                    </View>
                    </>
                    : <Image source={require('../assets/icons/user.png')} style={styles.imagenUsuario}/>
                    }
                </View>

            </View>
            <TouchableHighlight>
                    <DrawerItem 
                    style={styles.drawerItemStyle} 
                    label="Home"
                    icon={ () => <Icon 
                        name="home"
                        type='material'
                        color='#00aced'
                    />}
                    onPress={()=> props.navigation.navigate('home')}
                    />
                </TouchableHighlight>
            <TouchableHighlight >
                <DrawerItem 
                style={styles.drawerItemStyle} 
                label="Cities"
                icon={ () => <Icon 
                name="explore"
                type='material'
                color='#00aced'
                />}
                onPress={()=> props.navigation.navigate('cities')}
                />
            </TouchableHighlight>
        </DrawerContentScrollView>)
    }

  return (
      <Drawer.Navigator drawerContent={header} initialRouteName="home" drawerType="front" edgeWidth={15} drawerStyle={styles.drawerStyle}>
        <Drawer.Screen name="home" component={Index} />
        <Drawer.Screen name="cities" component={Cities}/>
        <Drawer.Screen name="signin" component={SignIn}/>
        <Drawer.Screen name="signup" component={SignUp}/>
        <Drawer.Screen name="city" component={City}/>
      </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
    drawerStyle:{
        width:'65%',
        // backgroundColor: '#rgba(255,255,255,0.9)'
    },
    drawerItemStyle:{
        marginLeft:wp('7.5%'),
    },
    header:{
        width:wp('100%'),
        height:hp('15%'),
        borderBottomWidth:2,
        borderBottomColor:'#3bc9f3'
        // backgroundColor:'wheat'
    },
    contenedorImagen:{
        width:'100%',
        height:'50%',
        marginLeft:wp('5%'),
        marginTop:wp('5%'),
        flexDirection:'row',
        alignItems:'center',
        
    },
    iconoUsuario:{
        fontSize:60,

    },
    imagenUsuario:{
        width:50,
        height:50,
        backgroundColor:'#3bc9f3',
        borderRadius:50
    },
    userName:{
        marginLeft:10,
        marginVertical:5,
        fontSize:18,
        // backgroundColor: "#DDDDDD",

    }
})

export default NavigatorDrawer