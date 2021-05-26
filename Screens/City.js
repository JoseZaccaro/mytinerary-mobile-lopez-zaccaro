import React, {useEffect} from 'react'
import {View,StyleSheet, ScrollView, Text,StatusBar, ImageBackground, Image, TouchableHighlight, TouchableOpacity, ActivityIndicator} from 'react-native'
import { connect } from 'react-redux';
import NavBar from '../Components/NavBar'
import citiesActions from '../redux/actions/citiesActions'
import itinerariesActions from '../redux/actions/ItinerariesActions'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
  } from 'react-native-responsive-screen';
import { LinearGradient } from 'expo-linear-gradient';
import Itinerary from '../Components/Itinerary';


class City extends React.Component {

    state = {
        viewMore:false,
        viewImage:false
    }
    componentDidMount(){
        this.props.navigation.addListener('focus',()=>{
                this.props.findItineraries(this.props.route.params.city._id)
            })
        this.props.navigation.addListener('blur', ()=>{
            this.props.resetItineraries()
            this.setState({viewMore:false,viewImage:false})
        })
    }

    render(){
        const {city} = this.props.route.params
        const imagenUri = city.image.slice(14,(city.image.length))
        if(this.props.itineraries.length < 1){
            return <ActivityIndicator color="red" size={100} style={{marginTop:hp('30%')}}/>
            
        }
        return (
            <ScrollView>
                <NavBar navigation={this.props.navigation} route={this.props.route}/>
                    <TouchableOpacity activeOpacity={0.8} onPress={()=> this.setState({...this.state,viewImage:!this.state.viewImage})}>
                        <ImageBackground source={{uri:`https://mytinerary-lopez-zaccaro.herokuapp.com/assets/cities/${imagenUri}`}} style={styles.portada}>
                            <Text style={[styles.textoPortada, !this.state.viewImage ? null : styles.borrar]}>
                                {
                                    city.city + " awaits you!!"
                                }

                            </Text>
                            <Text style={[styles.textoPortada, !this.state.viewImage ? null : styles.borrar]}>For more information about the itineraries of this city. Scroll a little further down to see all the info.</Text>
                        </ImageBackground>
                    </TouchableOpacity>
                    <View style={styles.descriptionContainer}>
                        <Text style={styles.textDescription}>
                            {this.state.viewMore ? 
                                city.description :
                                city.description.slice(0,200)+"..."
                            }</Text>
                            <TouchableOpacity style={styles.touchableViewMore} activeOpacity={0.7} onPress={()=>this.setState({...this.state,viewMore:!this.state.viewMore})}>
                                <LinearGradient start={{x:0,y:0}} end={{x:0.8,y:0.8}} colors={['#rgba(22,233,218,0.4)', '#rgba(52,119,247,0.4)']}>
                                    <Text style={styles.textoBoton}>{!this.state.viewMore ?  "View More" : "View Less"}</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                    </View>
                    <View>  
                        {
                            this.props.itineraries[0] === 'NoItineraries' ?
                             <ImageBackground source={{uri:'https://mytinerary-lopez-zaccaro.herokuapp.com/assets/Oops.jpg'}} style={styles.noItineraries}>
                                <Text style={[styles.textoNoItineraries]}> We don't have any itineraries yet for this city.</Text>
                            </ImageBackground>
                            :
                            this.props.itineraries.map((itinerary, index)=>{
                                return <Itinerary key={index} itinerary={itinerary} navigation={this.props.navigation} />
                            })
                        }
                    </View>
            </ScrollView>
        )
    }

}

const styles = StyleSheet.create({
    portada:{
        marginVertical:wp('2.5%'),
        width:wp('90%'),
        height:hp('30%'),
        borderRadius:10,
        overflow:'hidden',
        alignSelf:'center',
        justifyContent:'center'
    },
    textoPortada:{
        width:'100%',
        textAlign:'center',
        color:'white',
        backgroundColor:'#rgba(0,0,0,0.5)',
        paddingVertical:5,
        paddingHorizontal:'5%',
        fontSize:wp('4%')
        // paddingBottom:10
        // alignItems:'center',
        // justifyContent:'center'
        // height:'10%'
    },
    touchableViewMore:{
        width:wp('50%'),
        height:hp('4.5%'),
        alignSelf:'center',
        borderRadius:20,
        borderWidth:2,
        borderColor:'gray',
        // paddingVertical:5,
        marginTop:20,
        overflow:'hidden'
    },
    textDescription:{
        width:wp('100%'),
        paddingHorizontal:wp('5%'),
        marginTop:hp('3%'),
        fontSize:wp('4%')
        // fontWeight:'500'
    },
    textoBoton:{
        width:'100%',
        height:hp('4.5%'),
        fontSize:wp('5%'),
        textAlign:'center',
        fontWeight:'bold',
        color:'#1d1d1f'
    },
    borrar:{
        opacity:0,
    },
    descriptionContainer:{
        marginBottom:hp('5%')
    },
    noItineraries:{
        marginVertical:wp('10%'),
        width:wp('90%'),
        height:hp('30%'),
        borderRadius:10,
        overflow:'hidden',
        alignSelf:'center',
        justifyContent:'center',
        borderWidth:2
    },
    textoNoItineraries:{
        width:'100%',
        textAlign:'center',
        color:'white',
        backgroundColor:'#rgba(0,0,0,0.8)',
        paddingVertical:wp('10%'),
        paddingHorizontal:'5%',
        fontSize:wp('4%')
    }

})

const mapStateToProps = (state) => {
    return {
    itineraries: state.itinerariesReducer.itineraries,

    };
  };
  
  const mapDispatchToProps = {
    findItineraries: itinerariesActions.findItineraries,
    resetItineraries: itinerariesActions.resetItineraries

};
  
  export default connect(mapStateToProps, mapDispatchToProps)(City);
  