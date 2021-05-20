import React from 'react'
import {View,StyleSheet, ScrollView, Text, Image, ImageBackground, TouchableWithoutFeedback} from 'react-native'

const NavBar = ({props})=>{
    const {header, logo, navText} = styles
    return (
            <ScrollView >
                <View style={header}>
                    <TouchableWithoutFeedback onPress={() => props.navigate('Home')}>
                        <Image source={require('./assets/logo.png')} style={logo} />
                    </TouchableWithoutFeedback>
                    <Text style={navText} onPress={() => props.navigate('Home')}>Home</Text>
                    <Text style={navText} onPress={() => props.navigate('Cities')}>Cities</Text>
                    <Image source={require('./assets/icons/user.png')} style={logo}/>
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
        width:'10%',
        height:40,
        marginLeft:10,
    },
    navText:{
        color:'white',
        fontSize:20
    }

})


export default NavBar