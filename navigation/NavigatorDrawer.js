import React, { useState } from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import Index from '../Screens/Index';
import Cities from '../Screens/Cities';
import { Image, ScrollView, StyleSheet, View, Text, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Icon } from 'react-native-elements'
import SignIn from '../Screens/SignIn';
import SignUp from '../Screens/SignUp';

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
            <DrawerItem 
            label="Home"
            icon={ () => <Icon 
            name="home"
            type='material'
            color='#00aced'
            />}
            onPress={()=> props.navigation.navigate('home')}
            />
            <DrawerItem 
            label="Cities"
            icon={ () => <Icon 
            name="explore"
            type='material'
            color='#00aced'
            />}
            onPress={()=> props.navigation.navigate('cities')}
            />

        </DrawerContentScrollView>)
    }

  return (
      <Drawer.Navigator drawerContent={header} initialRouteName="home" drawerType="front" edgeWidth={100} drawerStyle={styles.drawerStyle}>
        <Drawer.Screen name="home" component={Index} />
        <Drawer.Screen name="cities" component={Cities}/>
        <Drawer.Screen name="signin" component={SignIn}/>
        <Drawer.Screen name="signup" component={SignUp}/>
      </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
    drawerStyle:{
        width:'65%',
        // backgroundColor: '#rgba(255,255,255,0.8)'
    },
    header:{
        width:'100%',
        height:120,
        // backgroundColor:'wheat'
    },
    contenedorImagen:{
        width:'100%',
        height:'50%',
        marginLeft:20,
        marginTop:20,
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