import React, {useEffect} from 'react'
import {View,StyleSheet, ScrollView, Text,StatusBar} from 'react-native'
import { connect } from 'react-redux';
import CityCard from '../Components/CityCard';
import NavBar from '../Components/NavBar'

class Cities extends React.Component {

    render(){
        return (
            <ScrollView style={styles.scroll}>
                <NavBar props={this.props.navigation}/>
                {
                    this.props.cities.map((city, index)=>{
                        return(
                            <CityCard key={index} city={city} navigation={this.props.navigation}/>
                            )
                    })
                }
           
            </ScrollView>
        )
    }

}

const styles = StyleSheet.create({
    scroll:{
        height:'100%',
        width:'100%',
        backgroundColor:'white'
    }

})

const mapStateToProps = (state) => {
    return {
      citiesReference: state.citiesReducer.citiesReference,
      cities: state.citiesReducer.cities,
      error: state.citiesReducer.error,
    };
  };
  

  
  export default connect(mapStateToProps)(Cities);
  