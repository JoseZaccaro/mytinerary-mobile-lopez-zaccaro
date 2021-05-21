import React from 'react'
import { Text, TouchableWithoutFeedback, View, StyleSheet, Image, ImageBackground, TouchableOpacity} from 'react-native'

const CityCard = ({city})=>{
    // console.log(city)
    
    if(!city){
        return null
    }
    city.imagen = ".."+city.image
    console.log(imagen)
    return(
        <View>
            {/* <TouchableWithoutFeedback onPress={()=>props.navigation.navigate() console.log("tocasteCity")} style={[styles.cityCard]} >
                <Text>

                </Text>
            </TouchableWithoutFeedback> */}
            <View style={styles.contenedorFotoTexto}>
                <TouchableOpacity style={styles.contenedorFoto} onPress={()=>/*props.navigation.navigate()*/ console.log("tocasteImagen")}>
                    <ImageBackground style={styles.foto} source={city.imagen}>
                        <Text>
                            {city.city}
                        </Text>
                        <Text>
                            {city.country}
                        </Text>
                    </ImageBackground>
                </TouchableOpacity>
                <Text>

                </Text>
            </View>
        </View>
       )


}
const styles = StyleSheet.create({
    foto:{
        width:'70%',
        height:'100%',
        marginLeft:10,
        
    },
    contenedorFoto:{
        width:'100%',
        height:'100%'
    },
    contenedorFotoTexto:{
        flexDirection:'row',
        width:'100%',
        height:200,
        borderRadius:10,
        marginTop:10,
        overflow:'hidden'
    }
})

export default CityCard