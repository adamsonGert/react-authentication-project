import React, { useRef, useState, useEffect } from 'react'
import { Form, Button, Alert } from 'react-bootstrap'
import styled from "styled-components";
import { useAuth } from '../contexts/AuthContext'
import { database } from '../firebase'
import { set, ref, onValue } from "firebase/database";
import { Link, useNavigate } from 'react-router-dom'

export default function UpdateProfile() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { currentUser, updatePassword, updateEmail  } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const [name, setName] = useState('');
    const [names, setNames] = useState([]);

    useEffect(() => {
        onValue(ref(database, `/${currentUser.uid}/users`), (snapshot) => {
          const data = snapshot.child("name").val();
            setNames(data);
          })
     });

    function handleSubmit(e) {
        e.preventDefault() //prevent refreshing

        set(ref(database, `/${currentUser.uid}/users`), {
            name: name
        });
        
        setName("");
          
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Passwords do not match')
        }

        const promises = [] 
        setLoading(true) //disable button before
        setError('')
        if (emailRef.current.value !== currentUser.email ) {
            promises.push(updateEmail(emailRef.current.value))
        }

        if (passwordRef.current.value) {
            promises.push(updatePassword(passwordRef.current.value))
        }

        Promise.all(promises).then(() => {
            navigate('/')
        }).catch(() => {
            setError('Failed to update account')
        }).finally(() => {
            setLoading(false)
        })
    }

  return (
    <>
    <Card className='m-auto h-100'>
        <h2 className='text-white mb-4'>Update Profile</h2>    
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group id='name' className='mb-2'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type='name' placeholder='Please add a name' defaultValue={names}
                    onChange={(e) => setName(e.target.value)} />
                </Form.Group>
                <Form.Group id='email' className='mb-2'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type='email' ref={emailRef} required defaultValue={currentUser.email} />
                </Form.Group>
                <Form.Group id='password' className='mb-2'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' ref={passwordRef} placeholder='Leave blank to keep the same' />
                </Form.Group>
                <Form.Group id='password-confirm'>
                    <Form.Label>Password Confirmation</Form.Label>
                    <Form.Control type='password' ref={passwordConfirmRef} placeholder='Leave blank to keep the same' />
                </Form.Group>
                <Button disabled={loading} variant="outline-primary" className='w-100 text-white mt-4' type='submit'>Update</Button>
            </Form>
            <div className='w-100 text-center mt-2'>
                <Link className='text-decoration-none link-secondary' to='/'>Cancel</Link>
            </div>
    </Card>
    </>
  )
}

const Card = styled.div`
    color: rgb(158, 158, 158);
    background-color: var(--cardBg);
    border-radius: 10px;
    padding: 2rem;
    box-shadow: var(--cardBoxShadow); 
    
    @media screen and (min-width: 375px) {
      width: 400px;
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
  `;
