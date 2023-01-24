import React, { useRef, useState } from 'react'
import { Form, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Signup() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { signup } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault() //prevent refreshing

        //validation

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Passwords do not match')
        }

        if (!passwordRef.current.value.match(/\d+/) || !passwordConfirmRef.current.value.match(/\d+/)) {
            return setError('Passwords must include atleast 1 number');
          }

        try {
            setError('')
            setLoading(true) //disable button before
            await signup(emailRef.current.value, passwordRef.current.value)
            navigate('/')
            } catch(error) {
                setError('Failed to create an account')
                console.log(error)
            }

            setLoading(false)
    }

  return (
    <>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
            <Form.Group id='email' className='mb-3'>
                <Form.Control type='email' placeholder='Email' ref={emailRef} autoComplete="true" required />
            </Form.Group>
            <Form.Group id='password' className='mb-3'>
                <Form.Control type='password' placeholder='Password' ref={passwordRef} autoComplete="true" required />
            </Form.Group>
            <Form.Group id='password-confirm' className='mb-3'>
                <Form.Control type='password' placeholder='Confirm Password' ref={passwordConfirmRef} autoComplete="true" required />
            </Form.Group>
            <Button disabled={loading} variant="outline-primary" className="mt-2 w-100 text-white" type='submit'>Sign Up</Button>
        </Form>
    </>
  )
}
