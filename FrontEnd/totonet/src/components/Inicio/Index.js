import { useEffect, useState } from 'react'
import Axios from 'axios'


function Index() {

    let fileReader;
    //const [data, setdata] = useState()
    
    const handleFileRead = (e) => {
        const content = fileReader.result;
        // … do something with the 'content' …
    };
    
    const handleFileChosen = (file) => {
        fileReader = new FileReader();
        fileReader.onloadend = handleFileRead;
        fileReader.readAsText(file);
    };

    const submitForm = (event) => {
        event.preventDefault();

        const dataArray = new FormData();
        //dataArray.append("uploadFile", uploadFile);

        //console.log(uploadFile);
        // axios.post("api_url_here", dataArray, {
        //         headers: {
        //             "Content-Type": "multipart/form-data"
        //         }
        //     })
        //     .then((response) => {
        //         // successfully uploaded response
        //     })
        //     .catch((error) => {
        //         // error response
        //     });
    };


    useEffect(() => {
        Axios.get('http://localhost:3001/getUsers', {
        }).then(Response => {
            console.log(Response.data);
        }, err => {
            console.log(err)
        });
    }, [])

    return (
        <div>
            <form onSubmit={submitForm}>
                <br/>
                <input type="file" onChange={e => handleFileChosen(e.target.files[0])} />
                <br/>
                <input type="submit"onClick={()=> console.log(fileReader.data)}/>

            </form>
        </div>
    )
}

export default Index
