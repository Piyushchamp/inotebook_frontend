import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  // const host = import.meta.env.VITE_BACKEND_URL;
const host = process.env.REACT_APP_BACKEND_URL;

  const initialnotes = [];
  const [notes, setNotes] = useState(initialnotes);

  // Get Notes
  const getnote = async () => {
    // API call
    const response = await fetch(`${host}/api/notes/fetchallnodes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjg1ZWE3OThhNmQ5MDU5MTUwNDFiNDk2In0sImlhdCI6MTc1MTEyMTY4MH0.phz1wLupW-oKmCTbfMpcWPCbm7SKmXGI1UK_4CAbi3E",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    console.log(json);
    setNotes(json);
  };

  // Add Notes
  const addnote = async (title, description, tags) => {
    // API call
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tags }),
    });
    const note = await response.json();
    setNotes(notes.concat(note));
  };

  // Delete Notes
  const deletenote = async (id) => {
    
    const response = await fetch(`${host}/api/notes/deletenotes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        // "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjg1ZWE3OThhNmQ5MDU5MTUwNDFiNDk2In0sImlhdCI6MTc1MTEyMTY4MH0.phz1wLupW-oKmCTbfMpcWPCbm7SKmXGI1UK_4CAbi3E",
        "auth-token": localStorage.getItem("token"),

      },
    });
    const json = await response.json();
    console.log(json);

    console.log("deleting note with id" + id);
    const newnotes = notes.filter((notes) => {
      return notes._id !== id;
    });
    setNotes(newnotes);
  };

  // Edit Notes
  const editnote = async (id, title, description, tags) => {
    // API call
    const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
        // "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjg1ZWE3OThhNmQ5MDU5MTUwNDFiNDk2In0sImlhdCI6MTc1MTEyMTY4MH0.phz1wLupW-oKmCTbfMpcWPCbm7SKmXGI1UK_4CAbi3E",

      },
      body: JSON.stringify({ title, description, tags }),
    });
    const json = await response.json();

    let newnotes = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < newnotes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        newnotes[index].title = title;
        newnotes[index].description = description;
        newnotes[index].tags = tags;
        break;
      }
    }
    setNotes(newnotes);
  };

  return (
    <NoteContext.Provider
      value={{ notes, addnote, deletenote, editnote, getnote }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
