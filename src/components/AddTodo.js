import React, { useState } from 'react'
import { database } from '../firebase'
import { uid } from 'uid'
import { useAuth } from '../contexts/AuthContext'
import { set, ref } from "firebase/database";
import { Save } from 'react-bootstrap-icons';

export default function AddTodo() {
    const [title, setTitle] = useState('');
    const { currentUser  } = useAuth()

    const handleSubmit = () => {
        const uidd = uid();
        set(ref(database, `/${currentUser.uid}/${uidd}`), {
          title: title,
          uidd: uidd
        });
    
        setTitle("");
      };

  return (
    <>
    <div>
    <input
        className="add-edit-input"
        type="text"
        placeholder="Add todo..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

    <Save onClick={handleSubmit} className="add-confirm-icon" />
    </div>
    </>
  )
}
