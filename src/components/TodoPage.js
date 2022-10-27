import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import styled from "styled-components";
import { database } from '../firebase'
import { Form } from 'react-bootstrap'
import { uid } from 'uid'
import { set, query, ref, onValue, remove, update, serverTimestamp, orderByChild } from "firebase/database";
import { useEffect, useState } from "react";
import { XSquare, Save } from 'react-bootstrap-icons';

export default function TodoPage() {
  const [title, setTitle] = useState('');
  const [titles, setTitles] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [tempUidd, setTempUidd] = useState("");
  const { currentUser  } = useAuth()

  useEffect(() => {
    const q = query(ref(database, `/${currentUser.uid}`), orderByChild('created'));
        onValue(q, (snapshot) => {
          setTitles([]);
          snapshot.forEach((title) => {
            setTitles((oldArray) => [...oldArray, title.val()])
          });
        });
    
        
    }, [currentUser.uid]);

  const handleSubmit = () => {
    const uidd = uid(),
          createdAt = serverTimestamp();
    set(ref(database, `/${currentUser.uid}/${uidd}`), {
      title: title,
      uidd: uidd,
      created: createdAt 
    });

    setTitle("");
  };

  const handleUpdate = (title) => {
    setIsEdit(true);
    setTitle(title.title);
    setTempUidd(title.uidd);
  };

  const handleEditConfirm = () => {
    update(ref(database, `/${currentUser.uid}/${tempUidd}`), {
      title: title,
      tempUidd: tempUidd
    });

    setTitle("");
    setIsEdit(false);
  };

  const handleDelete = (uid) => {
    remove(ref(database, `/${currentUser.uid}/${uid}`));
  };

  return (
    <>
    <Card className='card'>
      <CardBody>
        <h1 className='mb-4 text-white'>Todo List</h1>

        {titles.map((title, index) => (title.title == null ? '' :
          <div key={index} className="row w-100 d-flex align-items-center">
            <div className="col-9">
              <h3 className='w-100 text-white me-3 mb-0'>{title.title}</h3>
            </div>
            <div className="col-3 d-flex">
            <Save
              fontSize="large"
              onClick={() => handleUpdate(title)}
              className="action-icon me-3"
            />
              <XSquare
              fontSize="large"
              onClick={() => handleDelete(title.uidd)}
              className="action-icon"
            />
            </div>
          </div>
        ))}
      </CardBody>
      <CardFooter className='d-flex align-items-center'>
        <Form.Group className='me-3 w-100'>
          <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Enter todo' />
        </Form.Group>
        {isEdit ? (
          <div>
            <button onClick={handleEditConfirm} className="btn btn-outline-primary w-100 text-white">Change</button>
          </div>
          ) : (
          <div>
            <button onClick={handleSubmit} className="btn btn-outline-primary w-100 text-white">Submit</button>
          </div>
          )}
        </CardFooter>
      </Card>
    </>
    )
}

const Card = styled.div`
  color: rgb(158, 158, 158);
  background-color: var(--cardBg);
  border-radius: 10px;
  box-shadow: var(--cardBoxShadow);
  @media screen and (min-width: 767px) {
    width: 400px;
  }

  h3 {
    font-size: 20px;
  }

  .row + .row {
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: .5px solid var(--color-gray);
  }

  & input, textarea {
      border-radius: 3px;
      border: 0;
      background: #040620;
      color: white;

      &:focus,
      &:valid {
        background: #040620;
        color: white;
      }

      ::placeholder {
        color: var(--color-gray);
      }
    }

    .action-icon {
      font-size: 20px;
      color: white;

      &:hover {
        cursor: pointer;
        opacity: .5;
      }
    }
`;

const CardBody = styled.div`
  padding: 1.5rem;
`;

const CardFooter = styled.div`
  padding: 1rem 1.5rem;
  background-color: var(--cardFooterBg);
`;
