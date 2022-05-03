import React from 'react';

const NotesList = (props) => {
  return (
    <ol>
      {props.data.map((note) => (
        <li key={note.id}>
          {note.firstname} {note.lastname} | {note.phone} | {note.role} |{' '}
          {note.message} <button > edit </button> <button onClick={() => props.delete(note.id)}> delete </button>
        </li>
      ))}
    </ol>
  );
};

export default NotesList;