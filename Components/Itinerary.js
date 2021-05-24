import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
  } from 'react-native-responsive-screen';


const Itinerary = (props)=>{
    console.log(props)
    const {itinerary} = props
    const imagenUri = itinerary.autor.profilePhoto.slice(15,(itinerary.autor.profilePhoto.length))
    return(
        <View style={styles.contenedorItinerario}>
            <View style={styles.titleContainer}>
                <Text>
                    {itinerary.title}
                </Text>
            </View>
            <View>
                <View style={styles.dataContainer}>
                    <View>
                        <Text>Price:</Text>
                        {/* <Image/> */}
                    </View>
                    <View>
                        <Text>Duration:</Text>
                        {/* <Image/> */}
                    </View>
                </View>
                <View style={styles.dataContainer}>
                    <View>
                        <Text>
                            {itinerary.autor.fullName}
                        </Text>
                        <Image style={styles.imagenAutor} source={{uri:`https://mytinerary-lopez-zaccaro.herokuapp.com/assets/authors/${imagenUri}`}}/>
                    </View>
                </View>
                <View style={styles.dataContainer}></View>
            </View>
        </View>
    )

}
const styles = StyleSheet.create({
    contenedorItinerario:{
        width:wp('80%'),
        height:hp('30%'),
        backgroundColor:'red',
        alignSelf:'center',
        // marginTop:hp('5%'),
        marginBottom:hp('5%'),
    },
    imagenAutor:{
        width:wp('20%'),
        height:wp('20%')
    }
})



export default Itinerary