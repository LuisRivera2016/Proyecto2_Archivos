import React from 'react'
import { useEffect,useState ,useContext} from 'react';
import AuthContext from '../Context/UsuarioData.js';
import {Link} from 'react-router-dom';


function Home() {
    const {user} = useContext(AuthContext);
    return (
        <div>
            <h1>Usuario:{user.Nombre}</h1><br/><br/>
            <Link to="/Login">
            <button className="btn btn-success">Login
            </button>
            </Link>
        </div>
    )
}

export default Home
