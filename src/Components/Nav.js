import React from 'react'

export default function Nav(props) {
    return (
        <div>
           <input type="file" accept=".json" onChange={props.onUpload}></input> 
        </div>
    )
}
