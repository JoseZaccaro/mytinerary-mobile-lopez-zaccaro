import Carousel from 'react-native-snap-carousel';
import React from 'react'
import {ImageBackground, View, Text, StyleSheet, Dimensions, TouchableOpacity} from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
  } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    slide:{
        width:wp('80%'),
        height:hp('30%'),
        borderRadius:20,
        overflow:'hidden',
        alignItems:'center',
        justifyContent:'flex-end'
    },
    title:{
        fontSize:wp('6%'),
        color:'white',
        backgroundColor:'#rgba(0,0,0,0.6)',
        width:'100%',
        textAlign:'center',
        paddingVertical:hp('3%'),
        // paddingBottom:hp('1%')
    }
})

export default class ActivitiesCarousel extends React.Component {

    _renderItem = ({item, index}) => {
        const imageUri = item.image.slice(18,item.image.length)
        return (                 
            <ImageBackground resizeMethod={'auto'} defaultSource={require('../assets/icons/loading.gif')} key={index} style={styles.slide} source={{uri:'https://mytinerary-lopez-zaccaro.herokuapp.com/assets/activities/'+imageUri}} >
                <Text style={styles.title}>{ item.title }</Text>
                {/* <Text style={styles.title}></Text> */}
            </ImageBackground>
            );
        }
        
        render () {
            return (
            <Carousel
                // layout={'tinder'}
                // layoutCardOffset={1}
                ref={(c) => { this._carousel = c; }}
                data={this.props.activitiesList}
                renderItem={this._renderItem}
                sliderWidth={wp('100%')}
                itemWidth={wp('80%')}
                sliderHeight={300}
                itemHeight={300}
                initialScrollIndex={1}
            />
        );
    }
}