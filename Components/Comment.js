import React, { useState } from 'react'
import {
    Alert,
    Image,
    ImageBackground,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from "react-native";
  import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";
  import { Icon } from 'react-native-elements'
import { connect } from 'react-redux';
import { FloatingLabelInput } from 'react-native-floating-label-input';
import itinerariesActions from '../redux/actions/ItinerariesActions'
import Toast from 'react-native-toast-message';


const Comment = (props)=>{
    const {comment, itinerary} = props
    // console.log(comment)
    const text = comment.comment.text
    const [editing, setEditing] = useState(false)
    const [initialValue, setInitialValue] = useState(comment.comment.text)
    const [deleted, setDeleted] = useState()
    const edit = ()=>{
        setEditing(true)
        const edited = ()=>{
            setEditing(!editing) 
            Toast.show({
                type: 'success',
                text1: "Success",
                text2:"Comment edited correctly",
                visibilityTime: 3000,
                autoHide: true,
                })
        }
        if(editing){
            props.modifyComment(initialValue, comment.comment._id, itinerary._id)
            .then(edited).catch(error => Alert.alert("Error triying to edit comment."))

           
        }
    }
    const cancelEdit = ()=>{
        setInitialValue(text)
        setEditing(!editing)
        Toast.show({
            type: 'info',
            text1: "Edit Cancelled",
            text2:"No changes.",
            visibilityTime: 3000,
            autoHide: true,
            })
    }
    const deleteComment = ()=>{
        const deleteIt = ()=>{
            props.deleteComment(comment.comment._id, itinerary._id)
            Toast.show({
                type: 'success',
                text1:"Your comment has been deleted.",
                visibilityTime: 3000,
                autoHide: true,
            })
            setDeleted(true)
        }
        Alert.alert( "Are you sure ?",
        "You will not be able to recover this comment!",
        [
          {
            text: "Yes, delete it.",
            onPress: () => deleteIt(),
            style: "ok",
          },
          {
            text: "Cancel",
            onPress: () => Toast.show({
                type: 'info',
                text1:"Your comment is safe.",
                visibilityTime: 3000,
                autoHide: true,
                }),
            style: "cancel",
          },
        ],
        {
          cancelable: true,
          onDismiss: () =>
          Toast.show({
            type: 'info',
            text1:"Your comment is safe.",
            visibilityTime: 3000,
            autoHide: true,
            })
        }
      );
    }


      if(deleted){
          return null
      }
    return(
        <View style={styles.containerExt}>
            <View style={styles.userImageCtn}>
                <Image source={{uri:comment.user.image}} style={styles.userImage} />
            </View>
            <View style={styles.container}>
                <View style={styles.contenedorUserName}>
                    <Text style={styles.userName}>
                        {comment.user.firstName}
                    </Text>
                    {
                        props.user && (comment.user.userId === props.user.userId) ? 
                        <View style={styles.contenedorEditDelete}>
                            {!editing ? <>
                            <TouchableOpacity>
                                <Icon name="mode-edit" type="material" size={28} color="orange" onPress={edit}/>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Icon name="delete-sweep" type="material" size={28} color="orangered" onPress={deleteComment}/>
                            </TouchableOpacity>
                            </>
                            :
                            <>
                            <TouchableOpacity>
                                <Icon name="done" type="material" color="green" size={28} onPress={edit}/>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Icon name="close" type="material" size={28} color="orangered" onPress={cancelEdit}/>
                            </TouchableOpacity>
                            </>
                            }
                            
                        </View>
                        :null
                    }
                </View>
                {!editing ?
                <Text style={styles.comment}>
                    {initialValue}
                </Text>
                : <FloatingLabelInput 
                    value={initialValue}
                    onChangeText={(e)=>setInitialValue(e)}
                    inputStyles={{
                        fontSize:wp('6%'),
                        borderColor:'red',
                        color:'green'
                    }}
                    containerStyles={{
                        borderWidth:1,
                        borderColor:'black',
                        borderRadius:10,
                        padding:10
                    }}
                />
                }
            </View>
        </View>
    )

}
const styles = StyleSheet.create({
    containerExt:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'center'
    },
    container:{
        width:wp('65%'),
        // backgroundColor:'red',
        minHeight:hp('10%'),
        alignSelf:'flex-end',
        borderRadius:20,
        borderWidth:2,
        marginTop:10,
        marginRight:15,
        padding:10,
    },
    comment:{
        fontSize:wp('6%'),
    },
    userImage:{
        width:'100%',
        height:'100%',
    },
    userImageCtn:{
        width:wp('12.5%'),
        height:wp('12.5%'),
        borderRadius:200,
        borderWidth:wp('.75%'),
        overflow:'hidden',
        marginHorizontal:5,
        marginTop:wp('2.5%')
    },
    userName:{
        fontSize:wp('7.5%'),
        fontWeight:'bold',
        marginTop:hp('-1%'),
    },
    contenedorUserName:{
        flexDirection:'row',
        alignItems:'center',
        marginLeft:5,
        justifyContent:'space-between'
    },
    contenedorEditDelete:{
        flexDirection:'row',

    }
})

const mapStateToProps = state => {
    return{
        user: state.authReducer.user
    }
}
const mapDispatchToProps = {
    // getActivitiesAndComments: itinerariesActions.getActivitiesAndComments,
    // sendComment: itinerariesActions.sendComment,
    modifyComment: itinerariesActions.modifyComment,
    deleteComment: itinerariesActions.deleteComment,
    likeOrDislike: itinerariesActions.likeOrDislike
  }

export default connect(mapStateToProps, mapDispatchToProps)(Comment)