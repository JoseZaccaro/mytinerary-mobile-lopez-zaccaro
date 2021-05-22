import { LinearGradient } from 'expo-linear-gradient'
import React, { useState } from 'react'
import {View,StyleSheet, ScrollView, Image, TouchableHighlight, TouchableOpacity} from 'react-native'
import { Icon } from 'react-native-elements'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
  } from 'react-native-responsive-screen';


const NavBar = ({props})=>{

    const [state, setState] = useState({
        isOpen:false
    })
    const {header, logo, navText, burger, burgerPosition} = styles

    return(
                <View style={header}>
                    <TouchableOpacity activeOpacity={0.7} onPress={() => props.openDrawer()} >
                        <Image source={require('../assets/burger-menu.png')} style={burger} />
                    </TouchableOpacity>
                    {
                        props.canGoBack() ?
                        <TouchableOpacity style={styles.iconoDerecho} activeOpacity={0.7} onPress={() => props.goBack()} >
                            <Icon name="arrow-back" type="material" color="#1591d8" size={35}/>
                        </TouchableOpacity>
                        :<TouchableOpacity style={styles.iconoDerecho} activeOpacity={0.7} onPress={() => props.navigate('cities')} >
                                <Icon name="map-marker" color="#c92b2a" type="material-community" size={35} />
                         </TouchableOpacity>
                    }
                </View>
    )
}

const styles = StyleSheet.create({
    header:{
        width:wp('100%'),
        height:hp('10%'),
        backgroundColor:'#1d1d1f',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    navText:{
        color:'white',
        fontSize:20
    },
    burger:{
        width:wp('15%'),
        marginLeft:hp('1.5%'),
    },
    iconoDerecho:{
        marginRight:wp('3%')
    }

})


export default NavBar