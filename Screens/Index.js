import React from 'react'
import {Animated, View,StyleSheet, ScrollView, Text, Button, ImageBackground, Image, TouchableHighlight} from 'react-native'
import NavBar from '../Components/NavBar'
import * as Font from 'expo-font';


const animation = (props)=>{
    const Slide = Animated.createAnimatedComponent(ScrollView)
}



const Index = (props)=>{
    const {scrollIndex, fondo1, logoHero, hero, heroTitle, heroText, getStarted, getStartedText, carouselStyle} = styles
        return (<>
            <ScrollView style={scrollIndex}>
            <NavBar props={props.navigation}/>
                <ImageBackground source={require('../assets/fondoX.jpg')} style={fondo1}>
                    <View style={hero}>
                        <Image source={require('../assets/logo.png')} style={logoHero}></Image>
                        <Text style={heroTitle}>MYTINERARY!</Text>    
                    </View>
                    <Text style={heroText}>Find your perfect trip, designed by insiders who know and love their cities!</Text>
                    <TouchableHighlight style={getStarted} onPress={()=> props.navigation.navigate('signup')}>
                        <Text style={getStartedText}> Sign Up for Free!</Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={getStarted} onPress={()=> props.navigation.navigate('signin')}>
                        <Text style={getStartedText}> Or Sign In!</Text>
                    </TouchableHighlight>
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
        height:900,
        resizeMode:'cover',
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
        paddingHorizontal:35,
        marginTop:50
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
        textShadowRadius:10,
        marginBottom:50
    },
    getStarted:{
        marginTop:50,
        borderStyle:'solid',
        borderWidth:2,
        borderRadius:20,
        borderColor:'teal',
  
    },
    getStartedText:{
        color:'teal',
        fontSize:50,
        textShadowColor: 'white',
        textShadowOffset:{width:2, height:-2},
        textShadowRadius:5,
        textAlign:'center'
        
    },
    carouselStyle:{
        width:500,
        height:500
    }

})


export default Index