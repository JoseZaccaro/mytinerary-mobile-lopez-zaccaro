import React, {useEffect} from 'react'
import {View,StyleSheet, ScrollView, Text,StatusBar, ImageBackground, Image, TouchableHighlight, TouchableOpacity} from 'react-native'
import { connect } from 'react-redux';
import NavBar from '../Components/NavBar'
import citiesActions from '../redux/actions/citiesActions'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
  } from 'react-native-responsive-screen';


class City extends React.Component {

    state = {
        viewMore:false
    }

    render(){
        const {city} = this.props.route.params
        const imagenUri = city.image.slice(14,(city.image.length - 4))
        // const descriptionSliced = 
        return (
            <ScrollView>
                <NavBar props={this.props.navigation}/>
                    <Image source={{uri:`https://mytinerary-lopez-zaccaro.herokuapp.com/assets/cities/${imagenUri}.jpg`}} style={styles.portada}></Image>
                    <View>
                        <Text style={styles.textDescription}>
                            {this.state.viewMore ? 
                                city.description :
                                city.description.slice(0,200)+"..."
                            }</Text>
                            <TouchableOpacity style={styles.touchableViewMore} onPress={()=>this.setState({viewMore:!this.state.viewMore})}>
                                <Text> View More</Text>
                            </TouchableOpacity>
                    </View>
            </ScrollView>
        )
    }

}

const styles = StyleSheet.create({
    portada:{
        marginTop:wp('5%'),
        width:wp('90%'),
        height:hp('30%'),
        borderRadius:10,
        overflow:'hidden',
        alignSelf:'center'
    },
    touchableViewMore:{
        width:wp('50%'),
        alignItems:'center',
        alignSelf:'center',
        borderRadius:20,
        borderWidth:1,
        paddingVertical:5,
        marginTop:20
    },
    textDescription:{
        width:wp('100%'),
        paddingHorizontal:wp('5%'),
        marginTop:hp('3%')
    },
})

const mapStateToProps = (state) => {
    return {
    //   citiesReference: state.citiesReducer.citiesReference,
    //   cities: state.citiesReducer.cities,
    //   error: state.citiesReducer.error,
    };
  };
  
  const mapDispatchToProps = {
    // getAllCitiesReference: citiesActions.getAllCities
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(City);
  