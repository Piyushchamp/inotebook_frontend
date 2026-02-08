import React, { useContext, useState } from "react";
import NoteContext from "../context/notes/NoteContext.js";

const Addnote = (props) => {
  const context = useContext(NoteContext);
  const { addnote } = context;
  const[note,setNote] = useState({title:"",description:"",tags:""})

  // const notearr = object.values(note);

  const handleClick = (e)=>{
    e.preventDefault();
    addnote(note.title,note.description,note.tags);
    setNote({title:"",description:"",tags:""});
    props.showalert("Added successfully", "success");

  }

  const onChange = (e)=>{
    setNote({...note, [e.target.name]:e.target.value})
  }

  return (
    <div className="container my-3">
      <h1>Add a Note</h1>
      <form>
        <div className="mb-3">
          <label htmfor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            aria-describedby="emailHelp"
            value={note.title}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmfor="description" className="form-label">
            Decscription
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            value={note.description}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmfor="tags" className="form-label">
            Tags
          </label>
          <input
            type="text"
            className="form-control"
            id="tags"
            value={note.tags}
            name="tags"
            onChange={onChange}
          />
        </div>
        <button type="submit" className="btn btn-primary" onClick={handleClick}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Addnote;
