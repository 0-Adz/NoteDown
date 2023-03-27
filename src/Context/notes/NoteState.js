import  NoteContext  from "./noteContext";
import { useState } from "react";

const NoteState = (props) =>{

    const s1 = {
        "name": "Aadarsh",
        "class" : "5b"
    }
    const [state, setState] = useState(s1);
    const update = () => {
        setTimeout(()=> {
        setState({
            "name":"Aadi",
            "class":"6a"
        })
    },1000)
    }
    return (
        <NoteContext.Provider value={{state,update}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;