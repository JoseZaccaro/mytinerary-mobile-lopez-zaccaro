import React, {useEffect} from 'react'
import {View,StyleSheet, ScrollView, Text,StatusBar} from 'react-native'
import { connect } from 'react-redux';
import CityCard from '../Components/CityCard';
import NavBar from '../Components/NavBar'
import citiesActions from '../redux/actions/citiesActions'

class Cities extends React.Component {
    state = {
        
    }
    componentDidMount(){
            this.props.getAllCitiesReference();
    }

    // static getDerivedStateFromProps(props, state) {
    //     if (props.citiesReference.length !== 0) {
    //       return { loaded: true };
    //     }
    //     return null;
    // }



    render(){
        return (
            <ScrollView style={styles.scroll}>
                <NavBar props={this.props.navigation}/>
                {
                    this.props.cities.map((city, index)=>{
                        return(
                            <CityCard key={index} city={city}/>
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
        backgroundColor:'wheat'
    }

})

const mapStateToProps = (state) => {
    return {
      citiesReference: state.citiesReducer.citiesReference,
      cities: state.citiesReducer.cities,
      error: state.citiesReducer.error,
    };
  };
  
  const mapDispatchToProps = {
    getAllCitiesReference: citiesActions.getAllCities,
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Cities);
  