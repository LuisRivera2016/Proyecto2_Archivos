import React,{useState} from 'react'
import PDFViewer from 'pdf-viewer-reactjs';


function CV(curr) {
    
    return (
        <PDFViewer
            document={{url:curr.curr,}}
        />
    )
}

export default CV
