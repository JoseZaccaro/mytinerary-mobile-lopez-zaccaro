import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios"

const authActions = {
    signUp: (formData)=>{
        return async (dispatch, getState)=>{
            try{
            const userToLogg = await axios.post("https://mytinerary-lopez-zaccaro.herokuapp.com/api/auth/signUp", formData)
            if(userToLogg.data.success){
                dispatch({type:"SIGN_IN", payload: userToLogg.data})
            }else{
                return(userToLogg.data)
            }
        }catch (errores){
            return({success:false,errores:["Error trying to sign up user"]})
            }
        }
    },
    signIn: (formData)=>{
        return async(dispatch, getState) =>{
            try{
            const userToLogg = await axios.post("https://mytinerary-lopez-zaccaro.herokuapp.com/api/auth/signIn", formData)
            if(userToLogg.data.success){
                dispatch({type: "SIGN_IN", payload: userToLogg.data})
            }else{
                return(userToLogg.data)
            }
        }catch(errores){
            return({success:false,errores:["Error trying to login user"]})
            }
        }
    },
    signInLS:()=>{
        return async(dispatch, getState)=>{
            try{
                const token = await AsyncStorage.getItem('token')
                const userToLogg = await axios.get("https://mytinerary-lopez-zaccaro.herokuapp.com/api/auth/signInLS",{
                headers:{
                'Authorization':'Bearer '+ token
            }
            })
            if (userToLogg.data.success) {
                dispatch({type:"SIGN_IN", payload:{...userToLogg.data, token}})
            }else{
                return(userToLogg.data)
            }
        }catch (errores){
            console.log(errores)
            dispatch({type:"SIGN_OUT",payload:{user:null}})
            return("noUser")
        }
        }
    },
    signOut: ()=>{
        return (dispatch, getState)=>{
            dispatch({type: "SIGN_OUT",payload:{user:null}})
        }
    },

    fetchCountries: () => {
        return async()=>{
        let response
        let errores
        try{
            response = await axios.get("https://restcountries.eu/rest/v2/all")
        }catch(e){
            errores = e 
            response = [{name:"No countries avaibles at this moment.", numericCode:0 }]
        }
            return({
                success: !errores ? true:false,
                response: !errores ? response.data : response,
                errores
            })
        }
    },
    toastShowedFunction: ()=>{
        return (dispatch, getState)=>{
                dispatch({type:"TOAST_SHOWED"})
        }
    },
    updateUser: (updates)=>{
        return async (dispatch, getState)=>{
            try{
                const userUpdate = await axios.put("https://mytinerary-lopez-zaccaro.herokuapp.com/api/auth/userUpdate",updates)
                if(userUpdate.data.success){
                    dispatch({type:'SIGN_IN',payload: userUpdate.data})
                    return {success:true}
                }else{
                    return userUpdate.data
                }
            }catch (error){
                return {errores:{message:error}}
            }
        }
    },
    getUser: (email)=>{
        return async (dispatch, getState)=>{
            try{
                const user = await axios.post("https://mytinerary-lopez-zaccaro.herokuapp.com/api/auth/user",{email})
                return user
            }catch (error){
                console.log(error)
            }

        }
    }
}


export default authActions