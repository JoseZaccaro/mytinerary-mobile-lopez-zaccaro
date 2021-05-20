import React from 'react'
import {View,StyleSheet, ScrollView, Text, Button, ImageBackground, Image} from 'react-native'
import NavBar from './NavBar'
import * as Font from 'expo-font';
require('./assets/ShadowsIntoLightTwo-Regular.ttf')


const Index = (props)=>{

    const {scrollIndex, fondo1, logoHero, hero, heroTitle, heroText, fondo2, callToActionCtn} = styles
        return (<>
            <ScrollView style={scrollIndex}>
            <NavBar props={props.navigation}/>
                <ImageBackground source={require('./assets/fondoX.jpg')} style={fondo1}>
                    <View style={hero}>
                        <Image source={require('./assets/logo.png')} style={logoHero}></Image>
                        <Text style={heroTitle}>MYTINERARY!</Text>    
                    </View>
                    <Text style={heroText}>Find your perfect trip, designed by insiders who know and love their cities!</Text>
                </ImageBackground>
                <ImageBackground source={require('./assets/fondo2.jpg')} style={fondo2}>
                    <ImageBackground source={require('./assets/CallToAction.jpg')} style={callToActionCtn}>

                    </ImageBackground>
                </ImageBackground>
            </ScrollView>
            </>
    )   
        }

const styles = StyleSheet.create({
    scrollIndex:{
        width:'100%',
        height:'100%'
    },
    fondo1:{
        width:'100%',
        height:630,
        resizeMode:'cover',
        justifyContent:'center',
        alignItems:'center'
    },
    logoHero:{
        width:140,
        height:140
    },
    hero:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        paddingHorizontal:35

    },
    heroTitle:{
        fontSize:38,
        fontWeight:'bold',
        color:'white',
        textShadowColor: '#03045e',
        textShadowOffset:{width:6, height:-4},
        textShadowRadius:4
        
    },
    heroText:{
        fontSize:20,
        textAlign:'center',
        paddingHorizontal:50,
        fontWeight:'bold',
        color:'#03045e',
        textShadowColor: 'white',
        textShadowOffset:{width:1, height:1},
        textShadowRadius:10
    },
    fondo2:{
        width:'100%',
        height:680,
        alignItems:'center',
        justifyContent:'center'
    },
    callToActionCtn:{
        width:'90%',
        height:'80%',
        marginLeft:40,
        marginTop:100,
        borderColor:'red',
        borderStyle:'solid'
    }
})


export default Index