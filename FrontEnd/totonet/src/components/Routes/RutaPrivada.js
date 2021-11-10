import { useContext } from "react";
import {Route,Redirect} from "react-router-dom"
import AuthContext  from "../Context/UsuarioData";
import Cookies from 'js-cookie';

function RutaProtegida(props){
    const {user} = useContext(AuthContext);
    const {component: Component, ...rest} = props;
    return(
        <Route
            {...rest}
            render={(props)=>{
                if(Cookies.get("refreshToken")){
                    return <Component/>;
                }else{
                    return(
                        <Redirect to={{pathname:"/",state:{from:props.location}}}/>
                    );
                }
            } }

        
        />
    );
}

export default RutaProtegida