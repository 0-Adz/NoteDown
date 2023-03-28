import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial);

//******** FETCH ALL NOTE ************************************************************************************************
  const getNotes = async () => {

    // API Call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQyMTVjNjQwODM0ODE1Yzg4YmRjN2M1In0sImlhdCI6MTY3OTkxMjI1Nn0.HSDfULkdYjYhWctHbUlAUjaIM4v_rgeilbmCqWH17cM"
      }
    });

   const json = await response.json()
   console.log(json)
   setNotes(json)
  };

//******** ADD A NOTE *******************************************************************************************************
  const addNote = async (title, description, tag) => {

    // API Call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQyMTVjNjQwODM0ODE1Yzg4YmRjN2M1In0sImlhdCI6MTY3OTkxMjI1Nn0.HSDfULkdYjYhWctHbUlAUjaIM4v_rgeilbmCqWH17cM",
      },
      body: JSON.stringify({title, description, tag}),
    });
    const json = response.json();
    console.log(json);

    const note = {
      _id: "64217ce83a9e7488f3ec45c4",
      user: "64215c640834815c88bdc7c5",
      title: title,
      description: description,
      tag: tag,
      date: "2023-03-27T11:24:24.590Z",
      __v: 0,
    };
    setNotes(notes.concat(note));
  };

//******* DELETE A NOTE ******************************************************************************************************
  const deleteNote = async (id) => {
    // API Call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQyMTVjNjQwODM0ODE1Yzg4YmRjN2M1In0sImlhdCI6MTY3OTkxMjI1Nn0.HSDfULkdYjYhWctHbUlAUjaIM4v_rgeilbmCqWH17cM",
      }
    });
    const json = response.json();
    console.log(json);

    // Deleting the note by not adding that note in the setNote
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };
//******** EDIT A NOTE ****************************************************************************************************
  const editNote = async (id, title, description, tag) => {
    // API Call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQyMTVjNjQwODM0ODE1Yzg4YmRjN2M1In0sImlhdCI6MTY3OTkxMjI1Nn0.HSDfULkdYjYhWctHbUlAUjaIM4v_rgeilbmCqWH17cM",
      },
      body: JSON.stringify({title, description, tag}),
    });
    const json = response.json();
    console.log(json)

    let newNotes = JSON.parse(JSON.stringify(notes))
    // For finding the match of id and updating it.
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes)
  };
  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
