import React, { useState } from 'react'
import {connect} from 'react-redux'
import citiesActions from '../redux/actions/citiesActions'
import { Image, ImageBackground, StyleSheet, View } from 'react-native'
import { FloatingLabelInput } from 'react-native-floating-label-input'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";

const Search = (props)=>{
    const [value, setValue] = useState("")
    const filtro = (event)=>{
        props.filtrar(event) 
        setValue(event)
    }
    
    return(<> 
    <View style={styles.viewExterior}>
        <View style={styles.viewInterior}>
            <View>
                <FloatingLabelInput label="Find the city of your dreams" customLabelStyles={{
                    fontSizeFocused:wp('5%'),
                    fontSizeBlurred:wp('5%'),
                    topFocused:hp('-5%'),
                }} value={value} onChangeText={(event)=> filtro(event)} containerStyles={{
                    borderWidth:2,
                    alignSelf:'center',
                    marginHorizontal:hp('2.5%'),
                    marginTop:hp('2.5%'),
                    padding:10,
                    borderRadius:15,
                    borderColor:'black'
                }}
                inputStyles={{
                    fontSize:wp('8%')
                }}
                labelStyles={{
                    backgroundColor:'white',
                }}
                />
                {/* <input type="text" autoComplete="off" id="country" ="input-text" placeholder="United Kingdom" style={props.disabled ? {opacity:"1"} : {opacity:"0",transform:"translate(-1000px)"}} onChange={(event)=>{props.filtrar(event)}} value={props.initialValue}></input> */}
            </View>
        </View>
    </View>
    </>)
}

const styles = StyleSheet.create({
    viewExterior:{

    },
    viewInterior:{

    }
})
const mapStateToProps = state =>{
return {
    // checked: state.citiesReducer.checked,
    // disabled: state.citiesReducer.disabled,
    initialValue: state.citiesReducer.initialValue,
    citiesReference : state.citiesReducer.citiesReference
}
}
const mapDispatchToProps = {
        filtrar: citiesActions.findCities,
        // check: citiesActions.check
}

export default connect(mapStateToProps,mapDispatchToProps)(Search)