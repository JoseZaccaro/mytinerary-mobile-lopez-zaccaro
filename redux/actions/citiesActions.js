import axios from "axios"

const citiesActions = {

    getAllCities: ()=>{
        return (dispatch,getState)=>{
                axios.get("https://mytinerary-lopez-zaccaro.herokuapp.com/api/cities")
                .then(data => {
                    if(data.data.success){        
                        dispatch({type:'ALL_CITIES', payload: {cities: data.data.response, citiesReference:data.data.response, error:false }})
                    }else{
                        dispatch({type:'ALL_CITIES', payload: {error:true}})
                    }
                })
                .catch(error => dispatch({type:'ALL_CITIES', payload: {error: true}}))
            
        }
    },
    findCities: (event) => {
        return (dispatch, getState)=>{

            dispatch({type: 'FIND_CITIES', payload: {initialValue: event.toLowerCase().trim(), search:"city",}})
        }        
    },
    check: (event) => {
        return (dispatch, getState) => {
            dispatch({type:'CHECK_STATE', payload: {checked:event.target.checked, initialValue:""}})
        }
    },
    findCity: (id)=>{
        return (dispatch, getState)=>{
                axios.get(`https://mytinerary-lopez-zaccaro.herokuapp.com/api/city/${id}`)
                .then(respuesta => {
                    if(respuesta.data.success){
                        dispatch({type:'FIND_CITY', payload: {city: respuesta.data.response, error:false}})
                    }
                    else{
                        dispatch({type:'FIND_CITY', payload: {error:true }})
                    }
                })
                .catch(error => {
                    dispatch({type:'FIND_CITY', payload:{error:true}})
                })
        }
    }    
}

export default citiesActions
