import  NoteContext  from "./noteContext";
import { useState } from "react";

const NoteState = (props) =>{
    const notesInitial = 
        [
            {
              "_id": "64217ce36bd50bb49339a91a",
              "user": "64215c640834815c88bdc7c5",
              "title": "Alarm",
              "description": "Please wake up early morning for the test.",
              "tag": "Personal",
              "date": "2023-03-27T11:24:19.153Z",
              "__v": 0
            },
            {
              "_id": "64217ce46bd50bb49339a91c",
              "user": "64215c640834815c88bdc7c5",
              "title": "Alarm",
              "description": "Please wake up early morning for the test.",
              "tag": "Personal",
              "date": "2023-03-27T11:24:20.154Z",
              "__v": 0
            },
            {
              "_id": "64217ce83a9e7488f3ec45c4",
              "user": "64215c640834815c88bdc7c5",
              "title": "Alarm",
              "description": "Please wake up early morning for the test.",
              "tag": "Personal",
              "date": "2023-03-27T11:24:24.590Z",
              "__v": 0
            }
          ]
          const [notes, setNotes] = useState(notesInitial)
    return (
        <NoteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;