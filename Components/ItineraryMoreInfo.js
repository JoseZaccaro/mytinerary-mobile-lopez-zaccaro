import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import NavBar from './NavBar'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { FloatingLabelInput } from "react-native-floating-label-input";
import { Icon } from 'react-native-elements'
import { connect } from "react-redux";
import Comment from './Comment'
import itinerariesActions from '../redux/actions/ItinerariesActions'
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import ActivitiesCarousel from "./ActivitiesCarousel";

const ItineraryMoreInfo = (props) => {
    // console.log(props.route.params)
    const {itinerary} = props.route.params
    const [newComment, setNewComment] = useState("")
    const [likes, setLikes] = useState(itinerary.like);
    const [activitiesAndComments, setActivitiesAndComments] = useState()
    const [activities, setActivities] = useState()
    const [comments, setComments] = useState()
    const [like, setLike] = useState();
    const [procesing, setProcesing] = useState(false)
    const [numberOfLikes, setNumberOfLikes] = useState(itinerary.like.length)
    const [activitiesToRender, setActivitiesToRender] = useState([])
    const [viewComments, setViewComments] = useState(false)
    const inputValues = (e)=>{
        setNewComment(e)
    }
    let token
    const obtenerToken = async()=>{
       token = await AsyncStorage.getItem('token')
    }
    if(!token){
        obtenerToken()
    }
    const likeOrDislike = () => {
        if(props.user && props.user.userId && token){
          if(!procesing){
            setProcesing(true)
            props.likeOrDislike({userId:props.user.userId, itineraryId:itinerary._id, like:!like})
            .then(response => {  
                console.log(response)      
              setLikes(response)
              setLike(!like);
              setNumberOfLikes(response.length)
              setProcesing(false)
            })
            .catch(error => {
              console.log(error)
              setProcesing(false)
            })
          } 
        }else{
            Toast.show({
                type: 'error',
                text1: "You must be logged to like itineraries",
                visibilityTime: 3000,
                autoHide: true,
                })
        }
      };


    const sendComment = ()=>{
        if(newComment.trim() !== ""){
            props.sendComment(newComment,itinerary._id)
            .then(otherNewComment => setComments(otherNewComment))
            .catch(error => console.log(error))
            setComments([...comments,{comment:{text:newComment},user:{firstName:props.user.firstName,image:props.user.image}}])
            setNewComment("")
          }
    }
    useEffect(()=>{
        props.navigation.addListener('blur',()=>{
            setActivitiesToRender(null)
            setActivities(null)
            setComments(null)
            setActivitiesAndComments(null)
        })
    },[])

    useEffect(()=>{
        const fetch = async()=>{
            const actAndCmt = await props.getActivitiesAndComments(props.route.params.itinerary._id)
            setActivities(actAndCmt.activities)
            setComments(actAndCmt.comments)
            setActivitiesToRender(Object.keys(actAndCmt.activities))
            setActivitiesAndComments(actAndCmt)


        }
        fetch()
        setLikes(itinerary.like)
        setNumberOfLikes(itinerary.like.length)
    },[props.route.params.itinerary])

    useEffect(()=>{
        setLike(props.user && likes.find(userId => JSON.stringify(userId) === JSON.stringify(props.user.userId)))
    },[likes])
    
    
    // console.log(activitiesAndComments)
    if(!activitiesAndComments){
        return <ActivityIndicator color="red" size={100} style={{marginTop:hp('30%')}}/>
    }
  return (
    <ScrollView style={styles.contenedor} >
      <NavBar navigation={props.navigation} route={props.route} />
      <View style={styles.contenedorCarousel}>
        <ActivitiesCarousel activitiesList={activitiesToRender.map(activity => activities[activity])}/>
      </View>
      <View style={styles.contendorLike}>
            <TouchableOpacity  onPress={likeOrDislike} style={styles.contenedorLikeCorazon}>
                <Text style={styles.numberOfLikes}>{numberOfLikes}</Text>
         { props.user && like ?
            <Icon name="favorite" type="material" color="red" size={wp('10%')}/>
        :   
            <Icon name="favorite-border" type="material" color="black" size={wp('10%')}/>
        }
            </TouchableOpacity>

      </View>
      <View style={styles.contenedorItinerary}>
        <View style={styles.titleCtn}> 
            <Text style={styles.title}>Comments</Text>
        </View>
        <View style={styles.linea}></View>
        <View style={styles.contenedorCtnComentarios}>
            <ScrollView style={styles.contenedorComentarios}>
                {   comments[0] ?
                    comments.map((comment, i) =>{
                        return <Comment key={i} comment={comment} itinerary={itinerary}/>
                    })
                    : null
                }
            </ScrollView>
            <View style={styles.linea}></View>
            {props.user ? <FloatingLabelInput
            label="Send Comment"
            value={newComment}
            onChangeText={inputValues}
            containerStyles={{
                paddingHorizontal: 10,
                backgroundColor: '#fff',
                height:hp('10%'),
                alignSelf:'center',
            }}
            customLabelStyles={{
                fontSizeFocused:wp('4%'), 
                fontSizeBlurred:wp('5%'),
                colorFocused: 'black',
                colorBlurred:'black',
            }}
            labelStyles={{
                backgroundColor: 'transparent',
                paddingHorizontal: 5,
            }}
            inputStyles={{
                color: 'black',
                paddingHorizontal: 10,
                fontSize:wp('6%'),
                paddingTop:wp('2.5%')
            }}
            rightComponent={
                <TouchableOpacity style={styles.sendComment} onPress={()=>sendComment()}>
                    <Icon name="send" type="material" size={wp('7.5%')}  />
                </TouchableOpacity>
            }
            />
            :
                <Text style={styles.mustBe}>You must be logged first to comment</Text>            
            }
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    width: wp("100%"),
    height:hp('100%'),
    // backgroundColor:'green'
  },
  contenedorItinerary:{
    width:wp('90%'),
    height:hp('80%'),
    alignSelf:'center',
    backgroundColor:'white',
    alignItems:'center',
    marginVertical:wp('5%'),
    borderRadius:10,
    borderWidth:wp('.25%'),
    overflow:'hidden'
  },
  linea:{
    marginTop:hp('1%'),
    width:'100%',
    height:hp('.25%'),
    backgroundColor:'black',
  },
  contenedorCtnComentarios:{
      width:'100%',
      height:'87.5%',
    //   marginTop:hp('2.5%'),
    //   backgroundColor:'red',
    borderRadius:10,
    overflow:'hidden'
  },
  contenedorComentarios:{
      width:'100%',
      backgroundColor:'white',
    //   borderRadius:10
  },
  titleCtn:{
      justifyContent:'center',
      height:hp('7.5%'),
      alignItems:'center'
  },
  title:{
    fontSize:wp('7.5%')
  },
  sendComment:{
      justifyContent:'center',
  },
  mustBe:{
      height:hp('10%'),
      fontSize:wp('5%'),
      color:'black',
      fontWeight:'bold',
      justifyContent:'center',
      alignItems:'center',
      textAlign:'center',
      textAlignVertical:'center'
  },
  contendorLike:{
      width:wp('80%'),
    //   borderWidth:2,
      alignSelf:'center',
      flexDirection:'row',
      justifyContent:'center',
      marginTop:wp('3%')
  },
  contenedorLikeCorazon:{
      flexDirection:'row',
      width:wp('80%'),
      justifyContent:'center',
      alignSelf:'center',
      alignItems:'center'
  },
  numberOfLikes:{
      fontSize:wp('15%')
  },
  contenedorCarousel:{
      marginTop:wp('5%')
  }
});

const mapStateToProps = state =>{
    return {
        user : state.authReducer.user
    }
}

const mapDispatchToProps = {
    getActivitiesAndComments: itinerariesActions.getActivitiesAndComments,
    sendComment: itinerariesActions.sendComment,
    likeOrDislike: itinerariesActions.likeOrDislike
  }
export default connect (mapStateToProps, mapDispatchToProps)(ItineraryMoreInfo);
