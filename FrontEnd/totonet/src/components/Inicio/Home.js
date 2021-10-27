import React from 'react'
import { useEffect,useState ,useContext} from 'react';
import {UserContexto} from '../Context/UsuarioData.js';
import {Link} from 'react-router-dom';


function Home() {
    const {usuario} = useContext(UserContexto);
    return (
        <div>
            <h1>Usuario:{usuario}</h1><br/><br/>
            <Link to="/Login">
            <button className="btn btn-success">Login
            </button>
            </Link>
        </div>
    )
}

export default Home
