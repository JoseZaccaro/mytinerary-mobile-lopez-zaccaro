import React, { useState } from 'react'
import {View,StyleSheet, ScrollView, Image, TouchableHighlight} from 'react-native'
import { Icon } from 'react-native-elements'
const NavBar = ({props})=>{

    const [state, setState] = useState({
        isOpen:false
    })
    const {header, logo, navText, burger, burgerPosition} = styles
    return (
            <ScrollView >
                <View style={header}>
                    <TouchableHighlight onPress={() => props.openDrawer()} >
                        <Image source={require('../assets/burger-menu.png')} style={!state.isOpen ? burger : burgerPosition} />
                    </TouchableHighlight>
                    {
                    props.canGoBack() ?
                    <TouchableHighlight onPress={() => props.goBack()} >
                        {/* <Image source={require('../assets/burger-menu.png')} style={!state.isOpen ? burger : burgerPosition} /> */}
                        <Icon name="arrow-back" type="material" color="#1591d8" size={35}/>
                    </TouchableHighlight>
                    : null
                    }
                </View>
            </ScrollView>
    )
}

const styles = StyleSheet.create({
    header:{
        width:'100%',
        height:50,
        backgroundColor:'black',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    logo:{
        width:46,
        height:46,
        marginLeft:10,
    },
    navText:{
        color:'white',
        fontSize:20
    },
    burger:{
        width:46,
        marginLeft:5,
    },
    burgerPosition:{
        width:46,
        marginLeft:400
    }

})


export default NavBar