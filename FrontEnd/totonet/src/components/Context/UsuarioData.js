import { createContext, useEffect, useState } from "react";
import Axios from 'axios';
import Cookies from 'js-cookie';

//creamos el contexto
const AuthContext = createContext();


const AuthProvider = ({children})=>{
  const [user, setUser] = useState({})  
  const [RedirectC, setRedirectC] = useState(false)
  const [nombre, setNombre] = useState("")
  const [pass, setPass] = useState("")


  //metodo del login no copiar
  const SubmitForm = ()=>{
    
    Axios.post("http://localhost:3001/Login",{
         Nombre: nombre,
         Password: pass,
     }).then((res)=>{
            Cookies.set("refreshToken",res.data.refreshToken);
            setUser(res.data);
            setRedirectC(true);
     }).catch((err)=>{
         console.log(err)
     });
  };
  
  
  const refresh = () =>{
    let data_cookie = Cookies.get("refreshToken")
    if(data_cookie){
      Axios.post("http://localhost:3001/refreshToken",{
        token : data_cookie
    }).then((res)=>{
          Cookies.remove("refreshToken");
          Cookies.set("refreshToken",res.data.refreshToken); 
           //silent refresh
          setUser(res.data);
          setTimeout(() => {
            refresh()
          }, 850000)

    }).catch((err)=>{
        console.log(err)
    });
    }
  }


  useEffect(() => {
    refresh();
    // eslint-disable-next-line
  }, []);

  const data = {
    user,
    SubmitForm,
    RedirectC,
    setNombre,
    setPass
  }

  return(
    <AuthContext.Provider value={data}>
      {children}
    </AuthContext.Provider>
  )
};
export {AuthProvider};
export default AuthContext;