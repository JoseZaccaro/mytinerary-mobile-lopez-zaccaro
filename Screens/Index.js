import React, { useEffect } from 'react'
import {Dimensions ,Animated, View,StyleSheet, ScrollView, Text, Button, ImageBackground, Image, TouchableHighlight} from 'react-native'
import NavBar from '../Components/NavBar'
import { LinearGradient } from 'expo-linear-gradient';
import Carousel from '../Components/Carousel';
import { connect } from 'react-redux';
import citiesActions from '../redux/actions/citiesActions'


// const animation = (props)=>{
//     const Slide = Animated.createAnimatedComponent(ScrollView)
// }



const Index = (props)=>{
    const {fondo1, logoHero, hero, heroTitle, heroText, getStarted, getStartedSignIn, getStartedText, signIn, signUp} = styles

    useEffect(()=>{
            props.getAllCitiesReference();
    })
        return (<>
                <View style={[styles.View]}> 
                <NavBar props={props.navigation}/> 
                    <View style={hero}>
                        <Image source={require('../assets/logo.png')} style={logoHero}></Image>
                        <Text style={heroTitle}>MYTINERARY!</Text>    
                    </View>
                    <Text style={heroText}>Find your perfect trip, designed by insiders who know and love their cities!</Text>
                    <Carousel navigation={props.navigation}/>
                    <TouchableHighlight  underlayColor="#rgba(0,0,0,0.5)" style={getStarted} onPress={()=> props.navigation.navigate('signup')}>
                        <LinearGradient start={{x:0,y:0}} end={{x:0.8,y:0.8}}   colors={['#rgba(22,233,218,0.4)', '#rgba(52,119,247,0.4)']}>
                            <Text style={[getStartedText, signUp]}> Sign Up for Free!</Text>
                        </LinearGradient>
                    </TouchableHighlight>
                    <TouchableHighlight underlayColor="#rgba(0,0,0,0.5)"  style={getStartedSignIn} onPress={()=> props.navigation.navigate('signin')}>
                        <LinearGradient start={{x:0,y:0}} end={{x:0.8,y:0.8}} colors={['#rgba(22,233,218,0.4)', '#rgba(52,119,247,0.4)']}>
                            <Text style={[getStartedText, signIn]}> Or Sign In!</Text>
                        </LinearGradient>
                    </TouchableHighlight>
            </View>
               

            </>
    )   
        }

const styles = StyleSheet.create({
     View: {
       backgroundColor: '#f4f4f4',
       width:'100%',
       height:'100%'
     },
    
    logoHero:{
        width:100,
        height:100
    },
    hero:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        paddingRight:30,
        marginTop:5
    },
    heroTitle:{
        fontSize:26,
        fontWeight:'bold',
        color:'#1d1d1f',
    },
    heroText:{
        fontSize:16,
        textAlign:'center',
        paddingHorizontal:25,
        fontWeight:'bold',
        color:'#1d1d1f',

        marginBottom:20
    },
    getStarted:{
        marginVertical:15,
        borderStyle:'solid',
        borderWidth:1,
        borderRadius:200,
        borderColor:'#rgba(228,228,228,.4)',
        overflow:'hidden',
        width:'75%',
        alignSelf:'center',
        justifyContent:'center'
    },
    getStartedSignIn:{
        marginVertical:15,
        borderStyle:'solid',
        borderWidth:1,
        borderRadius:200,
        borderColor:'#rgba(228,228,228,.4)',
        overflow:'hidden',
        width:'50%',
        alignSelf:'center',
        justifyContent:'center'
    },
    getStartedText:{
        color:'#141518',
        textAlign:'center',
        paddingVertical:10,
        paddingHorizontal:10,
    },
    signUp:{
        fontSize:22,
        height:50,
        justifyContent:'center'
    },
    signIn:{
        fontSize:18,
        height:50,
        justifyContent:'center',
    }
})
const mapDispatchToProps = {
    getAllCitiesReference: citiesActions.getAllCities,
  };

export default connect(null,mapDispatchToProps)(Index)