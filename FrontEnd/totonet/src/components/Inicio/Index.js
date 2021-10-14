import {useEffect} from 'react'
import Axios from 'axios'

function Index() {

    useEffect(() => {
        Axios.get('http://localhost:3001/getUsers',{
        }).then(Response=>{
            console.log(Response.data);
        },err=>{
            console.log(err)
        });
    }, [])

    return (
        <div>
            hola mundo
        </div>
    )
}

export default Index
