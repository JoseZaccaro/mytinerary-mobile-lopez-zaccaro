import React from 'react'
import {View,StyleSheet, ScrollView, Text,StatusBar} from 'react-native'
import NavBar from './NavBar'

const Cities = (props)=>{

    return (
            <ScrollView style={styles.scroll}>
               <NavBar props={props.navigation}/>
            </ScrollView>
    )
}

const styles = StyleSheet.create({
    scroll:{
        height:'100%',
        width:'100%',
        backgroundColor:'wheat'
    }

})


export default Cities