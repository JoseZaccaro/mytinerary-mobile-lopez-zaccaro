import AsyncStorage from '@react-native-async-storage/async-storage'
const initialState = {
    user: null,
    token: null,
    error:null,
    errores:null,
    toastShowed:false
}


const authReducer = (state = initialState, action)=>{

    // console.log(action.payload)
    // console.log(state)
    switch(action.type){
        case 'SIGN_IN':
            if(action.payload.success){
                if(action.payload.response.token){
                    AsyncStorage.setItem("token",action.payload.response.token) 
                    }
                }
                return{
                    ...state,
                    ...action.payload.response
                }
            
        case 'SIGN_OUT':
            AsyncStorage.clear()
            return{
                ...state,
                token:null,
                errores:null,
                ...action.payload
            }
        case 'TOAST_SHOWED':
            return{
                ...state,
                toastShowed:true
            }

        default:
            return state
    }
}

export default authReducer