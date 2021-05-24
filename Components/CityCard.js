import React, { useEffect } from 'react'
import { Text, TouchableWithoutFeedback, View, StyleSheet, Image, ImageBackground, TouchableOpacity} from 'react-native'

const CityCard = (props)=>{
    const {city } = props
    if(!city){
        return null
    }
    useEffect(()=>{

    })
    
    const imagenUri = city.image.slice(14,(city.image.length))
    return(
        <View>
            <View style={styles.contenedorFotoTexto}>
                <TouchableOpacity style={styles.contenedorFoto} activeOpacity={0.7} onPress={()=> props.navigation.navigate('city',{city:city})}>
                    <ImageBackground loadingIndicatorSource={{uri:'https://loading.io/asset/482091'}} style={styles.foto} source={{uri:`https://mytinerary-lopez-zaccaro.herokuapp.com/assets/cities/${imagenUri}`}
                }>  
                    <View style={styles.contenidoFoto}>
                        <Text style={styles.textoCity}>
                            {city.city}
                        </Text>
                        <Text style={styles.textoCity}>
                            {city.country}
                        </Text>
                    </View>
                    </ImageBackground>
                </TouchableOpacity>
                <Text>

                </Text>
            </View>
        </View>
       )


}
const styles = StyleSheet.create({
    contenedorFotoTexto:{
        flexDirection:'row',
        width:'90%',
        height:200,
        borderRadius:25,
        marginTop:20,
        marginLeft:20,
        overflow:'hidden',
    },
    contenedorFoto:{
        width:'100%',
        height:'100%',
    },
     foto:{
        width:'100%',
        height:'100%',
        justifyContent:'flex-end'

    },
    contenidoFoto:{
        alignItems:'center',
        backgroundColor:'#rgba(0,0,0,0.5)',
        paddingVertical:7.5
    },
    textoCity:{
        color:'white',
        fontSize:18
    }

})

export default CityCard