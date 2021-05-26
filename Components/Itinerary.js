import React, { useEffect } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
  } from 'react-native-responsive-screen';


const Itinerary = (props)=>{
    const {itinerary} = props
    let priceDollars = []
    for (let i = 0; i < itinerary.price; i++) {
        priceDollars.push( <Image key={`box-${i}`} source={{uri:"https://mytinerary-lopez-zaccaro.herokuapp.com/assets/authors/dollars.png"}} style={styles.cash}/> );
      }


      useEffect(()=>{
          props.navigation.addListener('focus',()=>{
            
          })
      },[])

    const imagenUri = itinerary.autor.profilePhoto.slice(15,(itinerary.autor.profilePhoto.length))
    return(
        <TouchableOpacity activeOpacity={0.8} style={styles.contenedorItinerario} onPress={()=> props.navigation.navigate('itineraryInfo',{itinerary})}>
            <View style={styles.titleContainer}>
                <Text style={[styles.text, styles.titleText]}>
                    {itinerary.title}
                </Text>
            </View>
            <View style={styles.dataContainerContainer}>
                <View style={styles.dataContainer}>
                    <View style={styles.contenedorBilletes}>
                        <Text style={[styles.text, styles.dataText]}>Price:</Text>
                        {priceDollars.map(dollar => dollar)}
                    </View>
                    <View style={styles.contenedorBilletes}>
                        <Text style={[styles.text, styles.dataText]}>Duration: {itinerary.duration} Hs</Text>
                    </View>
                </View>
                <View style={styles.dataContainer}>
                    <View>
                        <Text style={[styles.text, styles.autorText]}>
                            {itinerary.autor.fullName}
                        </Text>
                        <Image style={styles.imagenAutor} source={{uri:`https://mytinerary-lopez-zaccaro.herokuapp.com/assets/authors/${imagenUri}`}}/>
                    </View>
                </View>
                <View style={styles.dataContainerLong}>
                            {
                            itinerary.hashTags.map((tag, i) => <Text key={i} style={[styles.text, styles.hashTagText]}>#{tag}</Text>)
                            }
                </View>
            <Text style={[styles.text, styles.autorText, styles.viewMoreItinerary]}>View more...</Text>
            </View>
        </TouchableOpacity>
    )

}
const styles = StyleSheet.create({
    contenedorItinerario:{
        width:wp('80%'),
        height:hp('50%'),
        backgroundColor:'#1f1d1f',
        flexDirection:'row',
        alignSelf:'center',
        marginBottom:hp('5%'),
        flexWrap:'wrap',
        borderRadius:10,
        paddingVertical:10
    },
    imagenAutor:{
        width:wp('20%'),
        height:wp('20%'),
        borderRadius:wp('100%'),
        alignSelf:'center',
        marginVertical:5
    },
    titleContainer:{
        width:'100%',
        alignItems:'center',
        height:'20%'
    },
    dataContainerContainer:{
        width:'100%',
        height:'40%',
        flexDirection:'row',
        paddingHorizontal:10,
        flexWrap:'wrap'
    },
    dataContainer:{
        width:'50%',
        justifyContent:'center',
        height:'100%',
        justifyContent:'flex-start'
    },
    dataContainerLong:{
        width:'100%',
        justifyContent:'center',
        height:'70%',
        flexDirection:'row',
        alignItems:'center',
        flexWrap:'wrap',
        paddingHorizontal:'5%'
    },
    text:{
        color:'white'
    },
    autorText:{
        fontSize:wp('4%'),
        textAlign:'center'
    },
    titleText:{
        marginBottom:5,
        fontSize:wp('5%'),
        textDecorationLine:'underline',
        textAlign:'center',
        paddingHorizontal:10,
        color:'#rgba(22,233,218,0.4)',
        fontWeight:'bold'
    },
    contenedorBilletes:{
        flexDirection:'row',
        width:'100%',
        marginVertical:5,
        marginTop:25
    },
    hashTagText:{
        fontSize:wp('5%'),
        marginHorizontal:5,
        marginTop:15
    },
    viewMoreItinerary:{
        marginTop:20
    },
    cash:{
        width:wp('5%'),
        height:wp('5%'),
        marginHorizontal:5,
        marginTop:2.5
    }
})



export default Itinerary