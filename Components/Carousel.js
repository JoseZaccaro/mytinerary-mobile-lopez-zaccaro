import Carousel from 'react-native-snap-carousel';
import React from 'react'
import {ImageBackground, View, Text, StyleSheet, Dimensions, TouchableOpacity} from 'react-native'

const styles = StyleSheet.create({
    slide:{
        width:'100%',
        height:200,
        borderRadius:20,
        overflow:'hidden',
        alignItems:'center',
        justifyContent:'flex-end'
    },
    title:{
        fontSize:16,
        color:'white',
        backgroundColor:'#rgba(0,0,0,0.4)',
        width:'100%',
        textAlign:'center',
        paddingTop:4,
        paddingBottom:5
    }
})

export default class MyCarousel extends React.Component {

    items = [
        {id: 10, altText: 'Córdoba',src:'OpcionCordoba.jpg',caption: 'Argentina'},
        {id: 12, altText: 'Miami',src:'Miami.jpg',caption: 'USA'},
        {id: 8, altText: 'Moscow',src:'Moscow.jpg',caption: 'Russia'},
        {id: 9, altText: 'Sao Paulo',src:'SaoPaulo.jpg',caption: 'Brazil'},
        {id: 3, altText: 'Paris',src:'Paris.jpg',caption: 'France'},
        {id: 1, altText: 'Tokyo', src:'Tokyo.jpg',caption: 'Japan'},
        {id: 5, altText: 'London',src:'London.jpg',caption: 'United Kingdom'},
        {id: 6, altText: 'Osaka',src:'Osaka.jpg',caption: 'Japan'},
        {id: 2, altText: 'New York',src:'NewYork.jpg',caption: 'USA'},
        {id: 4, altText: 'Seoul',src:'Seoul.jpg',caption: 'South Korea'},
        {id: 7, altText: 'Shanghai',src:'Shanghai.jpg',caption: 'China'},
        {id: 11, altText: 'Toronto',src:'Toronto.jpg',caption: 'Canada'},
    
      ]

    _renderItem = ({item, index}) => {
                return (
                    <TouchableOpacity activeOpacity={0.65} onPress={()=> this.props.navigation.navigate('cities')}>
                        <ImageBackground resizeMethod={'auto'} defaultSource={require('../assets/icons/loading.gif')} key={index} style={styles.slide} source={{uri:'https://mytinerary-lopez-zaccaro.herokuapp.com/assets/cities/'+item.src}} >
                            <Text style={styles.title}>{ item.altText }</Text>
                            <Text style={styles.title}>{ item.caption }</Text>
                        </ImageBackground>
                    </TouchableOpacity>
                );
    }
 
    render () {
        return (
            <Carousel
                // layout={'tinder'}
                // layoutCardOffset={1}
                ref={(c) => { this._carousel = c; }}
                data={this.items}
                renderItem={this._renderItem}
                sliderWidth={Dimensions.get("window").width}
                itemWidth={Dimensions.get("window").width - 75}
                sliderHeight={300}
                itemHeight={300}
            />
        );
    }
}