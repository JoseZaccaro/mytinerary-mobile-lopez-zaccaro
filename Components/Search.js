import { CustomInput } from 'reactstrap'
import {connect} from 'react-redux'
import citiesActions from '../redux/actions/citiesActions'
import { Image, ImageBackground, View } from 'react-native'


const Search = (props)=>{

        const finding = "Finding by countries."

        const find = "Do you prefer find by country?"

    return(<> 
    <View style={styles.viewExterior}>
        <View style={styles.viewInterior}>
            <View>
                {/* <input type="text" autoComplete="off" id="country" ="input-text" placeholder="United Kingdom" style={props.disabled ? {opacity:"1"} : {opacity:"0",transform:"translate(-1000px)"}} onChange={(event)=>{props.filtrar(event)}} value={props.initialValue}></input> */}
            </View>
        </View>
    </View>
    </>)
}


const mapStateToProps = state =>{
return {
    checked: state.citiesReducer.checked,
    disabled: state.citiesReducer.disabled,
    initialValue: state.citiesReducer.initialValue,
    citiesReference : state.citiesReducer.citiesReference
}
}
const mapDispatchToProps = {


        filtrar: citiesActions.findCities,
        check: citiesActions.check
    

}

export default connect(mapStateToProps,mapDispatchToProps)(Search)